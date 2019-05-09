using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ayma.Util;

namespace Ayma.Application.Web.Areas.AM_ReportModule.Controllers
{
    /// <summary>
    /// 报表生成
    /// </summary>
    public class GridReportController : MvcControllerBase
    {
        #region 视图功能
        /// <summary>
        /// 显示报表
        /// </summary>
        /// <returns></returns>
        public ActionResult DisplayReport()
        {
            int count = Request.QueryString.Count;
            string dataUrl = "";
            for (int i = 0; i < count; i++)
            {
                string key = Request.QueryString.GetKey(i);
                if (key.ToLower() != "report" && key.ToLower() != "data")
                {

                    dataUrl += "&" + key + "=" + Server.UrlDecode(Request.QueryString[i]);
                }
            }
            ViewBag.DataUrl = dataUrl;
            return View();
        }

        /// <summary>
        /// 设计报表
        /// </summary>
        /// <returns></returns>
        public ActionResult DesignReport()
        {
            return View();
        }

        /// <summary>
        /// 打印报表
        /// </summary>
        /// <returns></returns>
        public ActionResult PrintReport()
        {
            int count = Request.QueryString.Count;
            string dataUrl = "";
            for (int i = 0; i < count; i++)
            {
                string key = Request.QueryString.GetKey(i);
                if (key.ToLower() != "report" && key.ToLower() != "data")
                {

                    dataUrl += "&" + key + "=" + Server.UrlDecode(Request.QueryString[i]);
                }
            }
            ViewBag.DataUrl = dataUrl;
            return View();
        }

        /// <summary>
        /// 报表demo
        /// </summary>
        /// <returns></returns>
        public ActionResult TempIndex()
        {
            return View();
        }

        #endregion
    }
}