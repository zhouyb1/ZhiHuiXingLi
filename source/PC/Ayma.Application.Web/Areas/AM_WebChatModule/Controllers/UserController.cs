using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ayma.Application.Web.Areas.AM_WebChatModule.Controllers
{
    public class UserController : Controller
    {
        // GET: AM_WebChatModule/User
        public ActionResult Index()
        {
            return View();
        }
    }
}