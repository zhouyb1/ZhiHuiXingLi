using Ayma.Cache.Base;
using Ayma.Cache.Factory;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Ayma.Util;

namespace Ayma.Application.Web
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.08
    /// 描 述：应用程序全局设置
    /// </summary>
    public class MvcApplication : HttpApplication
    {
        /// <summary>
        /// 启动应用程序
        /// </summary>
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            // 启动的时候清除全部缓存
            ICache cache = CacheFactory.CaChe();
            var likeKey = Config.GetValue("RedisKey");
            cache.RemoveAll(likeKey, 6);
            DataTextProvider.InitDataFunMap();//初始化报表
        }

        /// <summary>
        /// 应用程序错误处理
        /// </summary>
        /// <param name="sender">sender</param>
        /// <param name="e">EventArgs</param>
        protected void Application_Error(object sender, EventArgs e)
        {
            var lastError = Server.GetLastError();
        }
    }
}
