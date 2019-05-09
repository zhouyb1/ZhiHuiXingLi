using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_CodeGeneratorModule
{
    public class AM_CodeGeneratorModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_CodeGeneratorModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_CodeGeneratorModule_default",
                "AM_CodeGeneratorModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}