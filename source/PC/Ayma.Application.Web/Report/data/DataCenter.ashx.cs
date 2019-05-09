using System.Web;

namespace Ayma.Application.Web.Report.data
{
    public class DataCenter : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            //根据HTPP请求中的产生，生成对应的报表文本形式(XML 或 JSON)的数据
            string DataText = DataTextProvider.BuildByHttpRequest(context.Request);

            //将获取到的报表文本数据(XML 或 JSON)响应给客户端
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
