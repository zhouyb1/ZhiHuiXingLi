using Nancy;

namespace Ayma.Application.WebApi.Modules
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.05.12
    /// 描 述：通用功能
    /// </summary>
    public class UtilityApi : BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public UtilityApi()
            : base("/ayma/adms")
        {
            Get["/heart"] = Heart;
        }

        /// <summary>
        /// 登录接口
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response Heart(dynamic _)
        {
            return Success("成功");
        }
    }
}