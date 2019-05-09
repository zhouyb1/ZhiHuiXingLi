using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_SystemModule
{
    public class AM_SystemModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_SystemModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_SystemModule_default",
                "AM_SystemModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}