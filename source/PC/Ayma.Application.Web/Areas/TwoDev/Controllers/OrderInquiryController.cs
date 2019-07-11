using Ayma.Util;
using Ayma.Application.TwoDevelopment.TwoDev;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Data;
//using Senparc.Weixin.TenPay.V3;
using Ayma.Util.Payment;

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
        /// 订单修改页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult UpdateForm()
        { 
            return View();
        }
        /// <summary>
        /// 行李信息修改页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult UpdateLuggageForm()
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
        /// 获取所有航班号记录
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetList(string queryJson)
        {
            var data = orderInquiryIBLL.GetList(queryJson);
            return Success(data);
        }
        
        /// <summary>
        /// 根据OpenId获取订单列表
        /// </summary>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageListOrder(string OpenId, string startTime, string endTime)
        {
            var data = orderInquiryIBLL.GetPageListOrder(OpenId, startTime, endTime);
            return Success(data);
        }
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
            var T_OrderBodyData = orderInquiryIBLL.GetT_OrderBodyEntity(T_OrderHeadData.F_OrderNo);
            var jsonData = new {
                T_OrderHeadData = T_OrderHeadData,
                T_OrderBodyData = T_OrderBodyData,
            };
            return Success(jsonData);
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetBodyData(string keyValue)
        {
            var T_OrderBodyData = orderInquiryIBLL.GetT_OrderDetailsEntity(keyValue);
            var jsonData = new
            {
                T_OrderBodyData = T_OrderBodyData
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

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetOrderPayMoneyConNum(string orderNo, string ExpressNO)
        {
            var data = orderInquiryIBLL.GetOrderPayMoneyConNum(orderNo, ExpressNO);
            return Success(data);
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
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetLogisticsInfo(string keyValue)
        {
            var data = orderlogisticsIBLL.GetLogisticsInfo(keyValue);
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
        /// 修改订单
        /// </summary>
        /// <param name="keyValue"></param>
        /// <param name="strEntity"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveHeadForm(string keyValue, string strEntity)
        {
            T_OrderHeadEntity entity = strEntity.ToObject<T_OrderHeadEntity>();
            orderInquiryIBLL.SaveHeadEntity(keyValue, entity);
            return Success("保存成功！");
        }
        /// <summary>
        /// 修改行李
        /// </summary>
        /// <param name="keyValue"></param>
        /// <param name="strEntity"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveBodyForm(string keyValue, string strEntity)
        {
            T_OrderBodyEntity entity = strEntity.ToObject<T_OrderBodyEntity>();
            orderInquiryIBLL.SaveBodyEntity(keyValue, entity);
            return Success("保存成功！");
        }

        /// <summary>
        /// 删除订单明细
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        public ActionResult DeleteData(string keyValue)
        {
            orderInquiryIBLL.DeleteData(keyValue);
            return Success("删除成功！");
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
        /// <summary>
        /// 修改申请退款后-》确认退款状态
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        public ActionResult PostAffirmRefund(string keyValue)
        {
            orderInquiryIBLL.UpdateAffirmRefund(keyValue);
            return Success("退款成功！");
        }

        #region 退款
        //用户退款
        /* public ActionResult CancelOrder()
        {
            var msg = "";
            var orderNo = this.GetReqData().ToJObject()["orderNo"].ToString();
            if (orderNo.IsEmpty())
            {
                return Fail("订单号为空");
            }

            var entity = orderInquiryIBLL.GetT_OrderHeadEntity(orderNo);
            var tmpStatus = new[] { "-1", "-2" };//-1 已取消，-2 已退款
            if (entity == null)
            {
                return Fail("订单不存在！");
            }
            if (entity.F_State.ToInt() >= 3)
            {
                return Fail("订单正在处理中，不能取消！");
            }
            if (tmpStatus.Contains(entity.F_State))
            {
                return Fail("订单已完成，请勿重复操作！");
            }
            var nonceStr = TenPayV3Util.GetNoncestr();
            //发起退款申请
            WXConfig config = new WXConfig();
            //获取订单总金额
            var orderAmount = orderInquiryIBLL.GetT_OrderBodyEntity(orderNo).Sum(c => c.F_Price * c.F_Qty);
            TenPayV3RefundRequestData data = new TenPayV3RefundRequestData(config.AppId,
                config.MchId, config.Key, null, nonceStr, null, orderNo, orderNo, orderAmount.ToInt(), orderAmount.ToInt(), config.MchId, "REFUND_SOURCE_RECHARGE_FUNDS");
            //获取服务器证书目录
            var certPath = @"D:\Ayma_File\HTTPS证书\1533655241_20190517_cert";
            var result = TenPayV3.Refund(data, certPath, Config.GetValue("Mchid"));

            Logger.Info("订单" + orderNo + "微信退款返回xml" + result.ResultXml);  //记录日志
            if (result.result_code.ToUpper() == "SUCCESSS")
            {
                Logger.Info("退款记录：1.订单" + orderNo + "；2.退款金额" + result.refund_fee);
                //修改订单状态为已退款
                orderInquiryIBLL.UpdateOrder(orderNo, OrderStatus.已退款);
                return Success("订单退款成功！");
            }
            return Fail(result.err_code_des);
        }*/
        
        #endregion
        #endregion

    }
}
