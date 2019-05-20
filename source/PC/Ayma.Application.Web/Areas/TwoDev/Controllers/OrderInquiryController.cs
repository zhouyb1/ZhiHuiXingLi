using Ayma.Util;
using Ayma.Application.TwoDevelopment.TwoDev;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Data;

namespace Ayma.Application.Web.Areas.TwoDev.Controllers
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：订单查询
    /// </summary>
    public partial class OrderInquiryController : MvcControllerBase
    {
        private OrderInquiryIBLL orderInquiryIBLL = new OrderInquiryBLL();
        private OrderLogisticsIBLL orderlogisticsIBLL = new OrderLogisticsBLL();

        #region 视图功能

        /// <summary>
        /// 主页面
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
             return View();
        }
        /// <summary>
        /// 订单详情页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Form()
        {
             return View();
        }

        /// <summary>
        /// 物流详情页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult LogisticsForm()
        {
            return View();
        }

        /// <summary>
        /// 收付款页面
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult PutpayMoney()
        {
            return View();
        }
        #endregion

        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string queryJson)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = orderInquiryIBLL.GetPageList(paginationobj, queryJson);
            var jsonData = new
            {
                rows = data,
                total = paginationobj.total,
                page = paginationobj.page,
                records = paginationobj.records
            };
            return Success(jsonData);
        }
        /// <summary>
        /// 获取表单数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var T_OrderHeadData = orderInquiryIBLL.GetT_OrderHeadEntity( keyValue );
            var T_OrderBodyData = orderInquiryIBLL.GetT_OrderBodyEntity( T_OrderHeadData.F_OrderNo );
            var jsonData = new {
                T_OrderHeadData = T_OrderHeadData,
                T_OrderBodyData = T_OrderBodyData,
            };
            return Success(jsonData);
        }

        /// <summary>
        /// 获取收款表数据  GetT_OrderCollectMoneyEntity
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetOrderCollectMoney(string keyValue)
        {
            var T_OrderHeadData = orderInquiryIBLL.GetT_OrderHeadEntity(keyValue);
            var T_OrderCollectMoney = orderInquiryIBLL.GetT_OrderCollectMoneyEntity(T_OrderHeadData.F_OrderNo);
            return Success(T_OrderCollectMoney);
        }

        /// <summary>
        /// 获取付款表数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetOrderPayMoney(string keyValue)
        {
            var T_OrderHeadData = orderInquiryIBLL.GetT_OrderHeadEntity(keyValue);
            var T_OrderCollectMoney = orderInquiryIBLL.GetT_OrderPayMoneyEntity(T_OrderHeadData.F_OrderNo);
            return Success(T_OrderCollectMoney);
        }
        

        /// <summary>
        /// 获取物流表单数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetLogisticsFormData(string keyValue) 
        {
            var data = orderlogisticsIBLL.GetT_OrderLogisticsInfo(keyValue);
            return Success(data);
        }
        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            orderInquiryIBLL.DeleteEntity(keyValue);
            return Success("删除成功！");
        }
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, string strEntity, string strt_OrderBodyEntity)
        {
            T_OrderHeadEntity entity = strEntity.ToObject<T_OrderHeadEntity>();
            T_OrderBodyEntity t_OrderBodyEntity = strt_OrderBodyEntity.ToObject<T_OrderBodyEntity>();
            orderInquiryIBLL.SaveEntity(keyValue,entity,t_OrderBodyEntity);
            return Success("保存成功！");
        }

        /// <summary>
        /// 修改订单分拣异常状态
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        public ActionResult PostSorting(string keyValue)
        {
            orderInquiryIBLL.UpdateSorting(keyValue);
            return Success("分拣成功！");
        }

        /// <summary>
        /// 修改订单出港异常状态
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        public ActionResult PostLeavePort(string keyValue)
        {
            orderInquiryIBLL.UpdateLeaveport(keyValue);
            return Success("出港成功！");
        }
        #endregion

    }
}
