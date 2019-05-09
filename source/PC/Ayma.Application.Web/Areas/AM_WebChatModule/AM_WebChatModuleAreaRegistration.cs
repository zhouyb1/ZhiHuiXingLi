using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_WebChatModule
{
    public class AM_WebChatModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AM_WebChatModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AM_WebChatModule_default",
                "AM_WebChatModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}