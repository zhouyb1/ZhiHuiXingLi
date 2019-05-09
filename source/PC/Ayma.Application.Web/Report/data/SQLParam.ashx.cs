using System;
using System.Collections;
using System.Web;

namespace Ayma.Application.Web.Report.data
{
    public class SQLParam : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //查询SQL从URL的参数中获得
            ArrayList QueryList = new ArrayList();

            string QuerySQL = context.Request.QueryString["QuerySQL"];
            QueryList.Add(new ReportQueryItem(QuerySQL, "QuerySQL"));

            QuerySQL = context.Request.QueryString["QuerySQL2"];
            if (QuerySQL != null && QuerySQL != "")
            {
                QueryList.Add(new ReportQueryItem(QuerySQL, "QuerySQL2"));

                QuerySQL = context.Request.QueryString["QuerySQL3"];
                if (QuerySQL != null && QuerySQL != "")
                {
                    QueryList.Add(new ReportQueryItem(QuerySQL, "QuerySQL3"));
                }
            }

            string DataText = DataTextProvider.Build(QueryList);
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
