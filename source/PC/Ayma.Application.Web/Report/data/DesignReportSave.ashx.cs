using System.Web;
using System.IO;

namespace Ayma.Application.Web.Report.data
{
    /// <summary>
    /// $codebehindclassname$ 的摘要说明
    /// </summary>
    //[WebService(Namespace = "http://tempuri.org/")]
    //[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class DesignReportSave : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            byte[] FormData = context.Request.BinaryRead(context.Request.TotalBytes);

            //写入上传数据，最后保存到文件
            //string strPathFile = context.Server.MapPath("") + @"\..\grf\" + context.Request.QueryString["report"] + ".grf";
            string strPathFile = context.Server.MapPath("/") + context.Request.QueryString["report"];
            BinaryWriter bw = new BinaryWriter(File.Create(strPathFile));
            bw.Write(FormData);
            bw.Close();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
