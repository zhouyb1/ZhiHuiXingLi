using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.TwoDev
{
    public class TwoDevAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "TwoDev";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "TwoDev_default",
                "TwoDev/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}