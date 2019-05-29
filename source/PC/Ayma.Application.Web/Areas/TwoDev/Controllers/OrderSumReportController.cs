using Ayma.Util;
using Ayma.Application.TwoDevelopment.TwoDev;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Data;
using System;
using System.Linq;
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

        /// <summary>
        /// 财务数据报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FinanceDataIndex()
        {
            return View();
        }

        /// <summary>
        /// 分拣员工作数据报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult SorterDataIndex()
        {
            return View();
        }

        #endregion

        /// <summary>
        /// 业务综合数据报表
        /// </summary>
        /// <param name="pagination"></param>
        /// <param name="queryJson"></param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSumReport(Pagination pagination, string queryJson)
        {
            var data = ordersumreportibll.GetSumReport(queryJson);
            return Success(data);
        }

        /// <summary>
        /// 财务数据报表
        /// </summary>
        /// <param name="pagination"></param>
        /// <param name="queryJson"></param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFinanceReport(Pagination pagination, string queryJson)
        {
            var data = ordersumreportibll.GetFinanceReport(queryJson);
            List<FinanceReportModel> returndatas = new List<FinanceReportModel>();//返回的数据
            if (data != null && data.Count() > 0)
            {
                FinanceReportModel sum = new FinanceReportModel();
                sum.OrderNum = "合计";
                //收入金额
                double? ChargeMoney = data.Sum(r => r.ChargeMoney);
                sum.ChargeMoney = Math.Round(ChargeMoney.Value, 2);
                //快递费用<第三方费用>
                double? ThirdMoney = data.Sum(r => r.ThirdMoney);
                sum.ThirdMoney = Math.Round(ThirdMoney.Value, 2);
                //毛利润
                double? GrossProfit = data.Sum(r => r.GrossProfit);
                sum.GrossProfit = Math.Round(GrossProfit.Value, 2);

                returndatas.AddRange(data);
                returndatas.Add(sum);
            }
            return Success(returndatas);
        }

        /// <summary>
        /// 分拣员工作数据报表
        /// </summary>
        /// <param name="pagination"></param>
        /// <param name="queryJson"></param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSorterReport(Pagination pagination, string queryJson)
        {
            var data = ordersumreportibll.GetSorterReport(queryJson);
            List<SorterReportModel> returndatas = new List<SorterReportModel>();//返回的数据
            if (data != null && data.Count() > 0)
            {
                SorterReportModel sum = new SorterReportModel();
                sum.FJYName = "合计";
                //接单数
                double? JDNum = data.Sum(r => r.JDNum);
                sum.JDNum = Math.Round(JDNum.Value, 2);
                //正常行李数
                double? XLNum = data.Sum(r => r.XLNum);
                sum.XLNum = Math.Round(XLNum.Value, 2);
                //异常行李数
                double? YCXLNum = data.Sum(r => r.YCXLNum);
                sum.YCXLNum = Math.Round(YCXLNum.Value, 2);

                returndatas.AddRange(data);
                returndatas.Add(sum);
            }
            return Success(returndatas);
        }

    }
}
