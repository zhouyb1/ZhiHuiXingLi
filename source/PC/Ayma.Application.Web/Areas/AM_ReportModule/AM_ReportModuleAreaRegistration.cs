using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_ReportModule
{
    public class AM_ReportModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_ReportModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_ReportModule_default",
                "AM_ReportModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}