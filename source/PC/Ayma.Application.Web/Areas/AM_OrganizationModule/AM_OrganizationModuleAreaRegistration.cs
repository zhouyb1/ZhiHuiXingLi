using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_OrganizationModule
{
    public class AM_OrganizationModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_OrganizationModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_OrganizationModule_default",
                "AM_OrganizationModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}