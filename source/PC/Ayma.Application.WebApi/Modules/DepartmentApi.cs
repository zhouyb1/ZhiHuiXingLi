using Ayma.Application.Organization;
using Ayma.Util;
using Nancy;

namespace Ayma.Application.WebApi.Modules
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.01.04
    /// 描 述：部门管理
    /// </summary>
    public class DepartmentApi: BaseApi
    {
        public DepartmentApi()
          : base("/ayma/adms/department")
        {
            Get["/map"] = GetMap;// 获取组织机构数据映射表
        }
        private DepartmentIBLL departmentIBLL = new DepartmentBLL();
        /// <summary>
        /// 获取部门映射表
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetMap(dynamic _)
        {
            string ver = this.GetReqData();// 获取模板请求数据
            var data = departmentIBLL.GetModelMap();
            string md5 = Md5Helper.Encrypt(data.ToJson(), 32);
            if (md5 == ver)
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
    }
}