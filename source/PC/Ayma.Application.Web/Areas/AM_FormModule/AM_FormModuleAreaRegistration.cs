using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_FormModule
{
    public class AM_FormModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_FormModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_FormModule_default",
                "AM_FormModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}