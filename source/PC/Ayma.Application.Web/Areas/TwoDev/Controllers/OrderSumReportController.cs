using Ayma.Util;
using Ayma.Application.TwoDevelopment.TwoDev;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Data;
//using Senparc.Weixin.TenPay.V3;
using Ayma.Util.Payment;
using Ayma.Application.TwoDevelopment.TwoDev.OrderSumReport;

namespace Ayma.Application.Web.Areas.TwoDev.Controllers
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：订单查询
    /// </summary>
    public partial class OrderSumReportController : MvcControllerBase
    {

        OrderSumReportIBLL ordersumreportibll = new OrderSumReportBLL();
        #region 视图功能

        /// <summary>
        /// 业务综合数据报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult SynthesizeIndex()
        {
            return View();
        }

        #endregion

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSumReport(Pagination pagination, string queryJson)
        {
            var data = ordersumreportibll.GetSumReport(queryJson);
            return Success(data);
        }

    }
}
