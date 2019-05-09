using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_WorkFlowModule
{
    public class AM_WorkFlowModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_WorkFlowModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_WorkFlowModule_default",
                "AM_WorkFlowModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}