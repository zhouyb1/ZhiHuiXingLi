using System;
using System.Text;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Web;

namespace Ayma.Application.Web
{

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //以下枚举指定报表数据的格式类型
    public enum ResponseDataType
    {
        PlainText, //报表数据为XML或JSON文本，在调试时可以查看报表数据。数据未经压缩，大数据量报表采用此种方式不合适
        ZipBinary, //报表数据为XML或JSON文本经过压缩得到的二进制数据。此种方式数据量最小(约为原始数据的1/10)，但用Ajax方式加载报表数据时不能为此种方式
        ZipBase64, //报表数据为将 ZipBinary 方式得到的数据再进行 BASE64 编码的数据。此种方式适合用Ajax方式加载报表数据
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ReportQueryItem
    public class ReportQueryItem
    {
        public string QuerySQL;
        public string RecordsetName;

        public ReportQueryItem(string AQuerySQL, string ARecordsetName)
        {
            QuerySQL = AQuerySQL;
            RecordsetName = ARecordsetName;
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GridReportDataResponse
    public class GridReportDataResponse
    {
        //指定报表的默认数据类型，便于统一定义整个报表系统的数据类型
        //在报表开发调试阶段，通常指定为 ResponseDataType.PlainText, 以便在浏览器中查看响应的源文件时能看到可读的文本数据
        //在项目部署时，通常指定为 ResponseDataType.ZipBinary 或 ResponseDataType.ZipBase64，这样可以极大减少数据量，提供报表响应速度
        public const ResponseDataType DefaultDataType = ResponseDataType.PlainText; //PlainText ZipBinary ZipBase64 

        //将报表XML数据文本输出到HTTP请求
        public static void Response(HttpResponse Response, string DataText, ResponseDataType DataType)
        {
            //报表XML数据的前后不能附加任何其它数据，否则XML数据将不能成功解析，所以调用ClearContent方法清理网页中前面多余的数据
            Response.ClearContent();

            if (ResponseDataType.PlainText == DataType)
            {
                // 把xml对象发送给客户端
                //Response.ContentType = "text/xml";
                Response.Write(DataText);
            }
            else
            {
                //将string数据转换为byte[]，以便进行压缩
                System.Text.UTF8Encoding converter = new System.Text.UTF8Encoding();
                byte[] XmlBytes = converter.GetBytes(DataText);

                //在 HTTP 头信息中写入报表数据压缩信息
                Response.AppendHeader("gr_zip_type", "deflate");                  //指定压缩方法
                Response.AppendHeader("gr_zip_size", XmlBytes.Length.ToString()); //指定数据的原始长度
                Response.AppendHeader("gr_zip_encode", converter.HeaderName);     //指定数据的编码方式 utf-8 utf-16 ...

                // 把压缩后的xml数据发送给客户端
                if (ResponseDataType.ZipBinary == DataType)
                {
                    DeflateStream compressedzipStream = new DeflateStream(Response.OutputStream, CompressionMode.Compress, true);
                    compressedzipStream.Write(XmlBytes, 0, XmlBytes.Length);
                    compressedzipStream.Close();
                }
                else //ResponseDataType.ZipBase64
                {
                    MemoryStream memStream = new MemoryStream();
                    DeflateStream compressedzipStream = new DeflateStream(memStream, CompressionMode.Compress, true);
                    compressedzipStream.Write(XmlBytes, 0, XmlBytes.Length);
                    compressedzipStream.Close(); //这句很重要，这样数据才能全部写入 MemoryStream

                    // Read bytes from the stream.
                    memStream.Seek(0, SeekOrigin.Begin); // Set the position to the beginning of the stream.
                    int count = (int)memStream.Length;
                    byte[] byteArray = new byte[count];
                    count = memStream.Read(byteArray, 0, count);

                    string Base64Text = Convert.ToBase64String(byteArray);
                    Response.Write(Base64Text);
                }
            }

            //报表XML数据的前后不能附加任何其它数据，否则XML数据将不能成功解析，所以调用End方法放弃网页中后面不必要的数据
            Response.End();
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //class XMLReportData 产生报表需要的xml数据
    public class XMLReportData
    {
        //根据 DataSet 产生提供给报表需要的XML文本数据
        public static string FromDataSet(DataSet ReportDataSet)
        {
            return ReportDataSet.GetXml();
        }

        //根据 DataTable 产生提供给报表需要的XML文本数据
        public static string FromDataTable(DataTable mydt)
        {
            DataSet ds = new DataSet();
            ds.Tables.Add(mydt);
            return FromDataSet(ds);
        }

        //根据IDataReader, 产生提供给报表需要的XML文本数据
        public static string FromDataReader(IDataReader dr)
        {
            string XMLText = "<xml>\n";
            while (dr.Read())
            {
                XMLText += "<row>";
                for (int i = 0; i < dr.FieldCount; ++i)
                {
                    string FldName = dr.GetName(i);
                    if (FldName == "")
                        FldName = "Fld" + i;
                    XMLText += String.Format("<{0}>{1}</{0}>", FldName, HttpUtility.HtmlEncode(dr.GetValue(i).ToString()));
                }
                XMLText += "</row>\n";
            }
            XMLText += "</xml>\n";

            return XMLText;
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //class JSONReportData 产生报表需要的 JSON 格式数据
    public class JSONReportData
    {
        //根据 DataSet 产生提供给报表需要的JSON文本数据
        public static string FromDataSet(DataSet ds)
        {
            //如果这里编译不过，请将项目属性的“生成->目标 Framework”设置为“.Net FrameWork4”或更高版本
            System.ServiceModel.Dispatcher.JsonQueryStringConverter jqsc = new System.ServiceModel.Dispatcher.JsonQueryStringConverter();

            StringBuilder sbJSONText = new StringBuilder("{\n");
            foreach (DataTable dt in ds.Tables)
            {
                //"recordset":[
                sbJSONText.Append('"');
                sbJSONText.Append(dt.TableName);
                sbJSONText.Append("\":[\n");
                foreach (DataRow dr in dt.Rows)
                {
                    sbJSONText.Append('{');
                    for (int i = 0; i < dt.Columns.Count; ++i)
                    {
                        if (!dr.IsNull(i))
                        {
                            //用 ConvertValueToString 转换,这样数字类型才不会加引号
                            //如果日期类型也用ConvertValueToString转换，则为 "\/Date(-152438400000+0800)\/" 这样的形式
                            string Value;
                            if (dt.Columns[i].DataType.IsArray)
                            {
                                Value = "\"" + Convert.ToBase64String((byte[])dr[i]) + "\"";
                            }
                            else if (dt.Columns[i].DataType == typeof(System.DateTime))
                            {
                                Value = "\"" + dr[i].ToString() + "\"";
                            }
                            else
                            {
                                Value = jqsc.ConvertValueToString(dr[i], dt.Columns[i].DataType);
                            }
                            sbJSONText.AppendFormat("\"{0}\":{1},", dt.Columns[i].ColumnName, Value);
                        }
                    }
                    sbJSONText.Remove(sbJSONText.Length - 1, 1); //去掉每笔记录最后一个字段后面的","
                    sbJSONText.Append("},\n");
                }
                if (dt.Rows.Count > 0) //如果无明细记录，则不要回退
                    sbJSONText.Remove(sbJSONText.Length - 2, 1); //去掉最后一条记录后面的","
                sbJSONText.Append("],\n");
            }
            sbJSONText.Remove(sbJSONText.Length - 2, 1); //去掉最后一记录集后面的","
            sbJSONText.Append("}");

            return sbJSONText.ToString();
        }

        //根据 DataTable 产生提供给报表需要的JSON文本数据
        public static string FromDataTable(DataTable dt)
        {
            DataSet ds = new DataSet();
            ds.Tables.Add(dt);
            return FromDataSet(ds);
        }

        ////如果数据中包含有JSON规范中的特殊字符(" \ \r \n \t)，多特殊字符加 \ 编码
        //public static void PrepareValueText(ref string ValueText)
        //{
        //    bool HasSpecialChar = false;
        //    foreach(char ch in ValueText)
        //    {
        //        if (ch == '"' || ch == '\\' || ch == '\r' || ch == '\n' || ch == '\t')
        //        {
        //            HasSpecialChar = true;
        //            break;
        //        }
        //    }
        //    if (HasSpecialChar)
        //    {
        //        StringBuilder NewValueText = new StringBuilder();
        //        foreach (char ch in ValueText)
        //        {
        //            if (ch == '"' || ch == '\\' || ch == '\r' || ch == '\n' || ch == '\t')
        //            {
        //                NewValueText.Append( '\\');
        //                if (ch == '"' || ch == '\\')
        //                    NewValueText.Append( ch  );
        //                else if (ch == '\r')
        //                    NewValueText.Append( 'r' );
        //                else if (ch == '\n')
        //                    NewValueText.Append( 'n' );
        //                else if (ch == '\t')
        //                    NewValueText.Append( 't' );
        //            }
        //            else
        //            {
        //                NewValueText.Append( ch  );
        //            }
        //        }
        //        ValueText = NewValueText.ToString();
        //    }
        //}
    }
}