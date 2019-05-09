using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_AuthorizeModule
{
    public class AM_AuthorizeModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_AuthorizeModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_AuthorizeModule_default",
                "AM_AuthorizeModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}