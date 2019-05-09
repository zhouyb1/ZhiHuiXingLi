using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_OAModule
{
    public class AM_OAModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_OAModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_OAModule_default",
                "AM_OAModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}