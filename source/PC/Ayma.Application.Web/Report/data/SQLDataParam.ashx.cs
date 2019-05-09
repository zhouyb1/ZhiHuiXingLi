using System;
using System.Web;
using System.Text;

namespace Ayma.Application.Web.Report.data
{
    public class SQLDataParam : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //从客户端发送的数据包中获取报表查询参数，URL有长度限制，当要传递的参数数据量比较大时，应该采用这样的方式
            //这里演示了用这样的方式传递一个超长查询SQL语句。
            byte[] FormData = context.Request.BinaryRead(context.Request.TotalBytes);
            UTF8Encoding Unicode = new UTF8Encoding();
            int charCount = Unicode.GetCharCount(FormData, 0, context.Request.TotalBytes);
            char[] chars = new Char[charCount];
            int charsDecodedCount = Unicode.GetChars(FormData, 0, context.Request.TotalBytes, chars, 0);
            String QuerySQL = new String(chars);

            string DataText = DataTextProvider.Build(QuerySQL);

            GridReportDataResponse.Response(context.Response, DataText, GridReportDataResponse.DefaultDataType);
        }

        public bool IsReusable
        {
            get
            {
                return true; //false;
            }
        }
    }
}
