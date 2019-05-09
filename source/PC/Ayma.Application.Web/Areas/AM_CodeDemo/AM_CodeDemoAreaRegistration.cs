using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_CodeDemo
{
    public class AM_CodeDemoAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return  "AM_CodeDemo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_CodeDemo_default",
                "AM_CodeDemo/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}