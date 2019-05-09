using Ayma.Application.Base.SystemModule;
using Ayma.Util;
using Nancy;

namespace Ayma.Application.WebApi.Modules
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.01.04
    /// 描 述：数据源接口
    /// </summary>s
    public class DataSourceApi : BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public DataSourceApi()
            : base("/ayma/adms/datasource")
        {
            Get["/map"] = GetDataTable;// 获取数据表数据
        }
        DataSourceIBLL dataSourceIBLL = new DataSourceBLL();
        /// <summary>
        /// 获取数据表数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response GetDataTable(dynamic _)
        {
            reqModel req = this.GetReqData<reqModel>();// 获取模板请求数据
            var data = dataSourceIBLL.GetDataTable(req.code, "");

            string md5 = Md5Helper.Encrypt(data.ToJson(), 32);
            if (md5 == req.ver)
            {
                return Success("no update");
            }
            else
            {
                var jsondata = new
                {
                    data = data,
                    ver = md5
                };
                return Success(jsondata);
            }
        }

        private class reqModel {
            /// <summary>
            /// 编码
            /// </summary>
            public string code { get; set; }
            /// <summary>
            /// 版本
            /// </summary>
            public string ver { get; set; }
        }
    }
}