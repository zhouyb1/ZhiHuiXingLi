using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_CRMModule
{
    public class AM_CRMModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_CRMModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_CRMModule_default",
                "AM_CRMModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}