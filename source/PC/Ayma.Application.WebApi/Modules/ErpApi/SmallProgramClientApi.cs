using System.Net;
using Ayma.Application.TwoDevelopment.ErpDev;
using Ayma.Application.TwoDevelopment.TwoDev;
using Ayma.Util;
using Ayma.Util.Payment;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;
using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient;
using Senparc.CO2NET.HttpUtility;
using Senparc.Weixin.TenPay;
using Senparc.Weixin.TenPay.V3;
using Senparc.Weixin.WxOpen;
using Senparc.Weixin.WxOpen.AdvancedAPIs.Sns;
using Senparc.Weixin;
using Config = Ayma.Util.Config;
using Senparc.CO2NET.Helpers;
using Ayma.Application.Base.SystemModule;
using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;

namespace Ayma.Application.WebApi.Modules.ErpApi
{
    /// <summary>
    /// 客户小程序调用
    /// </summary>
    public class SmallProgramClientApi
        : PdaBaseApi
    {
        private static string openId = string.Empty;
        private static string cellPhone = string.Empty;
        private OrderInquiryIBLL order = new OrderInquiryBLL();
        public SmallProgramClientApi()
            : base("/pdaapi")
            //注册接口
        {
            Post["/SubmitBillSaleOut"] = SubmitBillSaleOut; //提交车班补货单
            Get["/GetAirPort"] = GetAirPort; //获取机场
            Get["/GetFlightNoInfo"] = GetFlightNoInfo; //获取航班列表
            Get["/GetOrderList"] = GetOrderList; //获取航班列表
            Get["/GetOrderDetailByNo"] = GetOrderDetailByNo;//获取订详情
            Get["/SubmitOrder"] = SubmitOrder; //提交订单
            //Get["/GetOrderListByStatus"] = GetOrderListByStatus;//根据订单状态查询订单列表
            Post["/OnLogin"] = OnLogin;
            Post["/SaveUserInfo"] = SaveUserInfo;
            Post["/Register"] = Register;
            Post["/CancelOrder"] = CancelOrder;

        }
        private SmallProgramClientApiBLL billClientApiBLL = new SmallProgramClientApiBLL();
        private WeChatMemberIBLL customerIbll = new WeChatMemberBLL();
        /// <summary>
        /// 获取机场列表
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetAirPort(dynamic _)
        {
            var data = billClientApiBLL.GetAirPort();
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        /// <summary>
        /// 根据机场Id获取航班号
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetFlightNoInfo(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["F_AirfieldId"] == null)
            {
                return Fail("F_AirfieldId不能为空!");
            }
            string F_AirfieldId = req["F_AirfieldId"].ToString(); //机场ID 
            var data = billClientApiBLL.GetFlightNoInfo(F_AirfieldId);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        /// <summary>
        /// 根据openId获取订单列表
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetOrderList(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            if (req["openId"].IsEmpty())
            {
                return Fail("缺少参数openId!"); 
            }
            string openId = req["openId"].ToString(); //openId
            string status = req["status"].ToString(); //订单状态
            var data = billClientApiBLL.GetOrderList(openId, status);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }
        /// <summary>
        /// 根据订单状态查询订单列表
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        #region
        //public Response GetOrderListByStatus(dynamic _)
        //{
        //    var req = this.GetReqData().ToJObject(); //获取模板请求数据
        //    if (req["openId"].IsEmpty())
        //    {
        //        return Fail("openId不能为空!");
        //    }
        //    if (req["status"].IsEmpty())
        //    {
        //        return Fail("订单状态不能为空!");
        //    }
        //    string status = req["status"].ToString(); //订单状态
        //    var data = billClientApiBLL.GetOrderListByStatus(openId, status);
        //    if (data.Count() > 0)
        //    {
        //        return Success(data);
        //    }
        //    else
        //    {
        //        return Fail("没有数据!");
        //    }
        //}
        #endregion

        /// <summary>
        /// 根据订单号获取订单详情
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetOrderDetailByNo(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            if (req["OrderNo"].IsEmpty())
            {
                return Fail("缺少参数OrderNo!");
            }
            string OrderNo = req["OrderNo"].ToString(); //订单号
            var orderhead = billClientApiBLL.GetOrderHeadByNo(OrderNo);
            var orderbody = billClientApiBLL.GetOrderBodyByNo(OrderNo);
            if (orderhead.Count() > 0 && orderbody.Count() > 0)
            {
                var data = new { orderhead = orderhead, orderbody = orderbody };
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        

        //提交订单
        public Response SubmitOrder(dynamic _)
        {
            BillMakeBaseModelAPi SubmitOrderModelApi;
            try
            {
                SubmitOrderModelApi = this.GetReqData().ToObject<BillMakeBaseModelAPi>();
                if (SubmitOrderModelApi.Head.F_OpenId.IsEmpty())
                {
                    return Fail("订单头不能为空！");
                }
                if (SubmitOrderModelApi.OrderDetails.Count == 0)
                {
                    return Fail("订单内容不能为空！");
                }
            }
            catch (System.Exception)
            {
                return Fail("数据格式错误");
            }

            //生成订单号
            var orderNo = new CodeRuleBLL().GetBillCode("10001", "System");
            new CodeRuleBLL().UseRuleSeed("10001", "System");
            string errText = "";
            billClientApiBLL.SubmitOrder(SubmitOrderModelApi, orderNo, out errText);
            return Success(errText);
        }

        /// <summary>
        /// 提交车班补货单
        /// </summary>
        /// <returns></returns>
        public Response SubmitBillSaleOut(dynamic _)
        {
            int errCode = 0;
            string errText = "";
            if (errCode == 100)
            {
                return Success(errText);
            }
            else
            {
                return Fail(errText);
            }
        }

        /// <summary>
        /// 获取手机号
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response SaveUserInfo(dynamic _)
        {
            var sessionId = this.GetReqData().ToJObject()["sessionId"].ToString();
            var encrytedData = this.GetReqData().ToJObject()["encrytedData"].ToString();
            var iv = this.GetReqData().ToJObject()["iv"].ToString();
            var phoneData = EncryptHelper.DecryptPhoneNumber(sessionId, encrytedData, iv); //解密手机号码

            //根据openid 获取用户信息
            var customer = customerIbll.GetT_CustomerInfoEntity(openId);
            customer.F_Phone = phoneData.phoneNumber;
            customerIbll.SaveEntity(openId, customer);
            return Success("保存成功");
        }

        /// <summary>
        /// 登录授权
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response OnLogin(dynamic _)
        {
            try
            {
                var code = this.GetReqData().ToJObject()["code"].ToString(); //获取code 
                if (string.IsNullOrEmpty(code))
                {
                    return Fail("未获取到用户凭证");
                }
                //以code换取session_key
                var jsonResult = SnsApi.JsCode2Json(Config.GetValue("AppId"), Config.GetValue("AppSecret"), code);
                if (jsonResult.errcode == ReturnCode.请求成功)
                {
                    var unionId = "";
                    openId = jsonResult.openid;
                    //获取openid+session_key生成3rd_session
                    var sessionBag = SessionContainer.UpdateSession(null, openId, jsonResult.session_key,
                        unionId);
                    return Success(new { sessionId = sessionBag.Key, sessionKey = sessionBag.SessionKey, openId = openId });
                }
                return Fail(jsonResult.errmsg);
            }
            catch (Exception ex)
            {
                return Fail(ex.Message);
            }
        }

        /// <summary>
        /// 注册用户信息
        /// </summary>
        /// <returns></returns>
        public Response Register(dynamic _)
        {
            try
            {
                //var sessionId = this.GetReqData().ToJObject()["sessionId"].ToString();
                //var encrytedData = this.GetReqData().ToJObject()["encrytedData"].ToString();
                //var iv = this.GetReqData().ToJObject()["iv"].ToString();
                //var customerData = EncryptHelper.DecodeUserInfoBySessionId(sessionId, encrytedData, iv);//解密用户信息
                //var phoneData = EncryptHelper.DecryptPhoneNumber(sessionId, encrytedData, iv);//解密手机号码
                var customerData = this.GetReqData().ToJObject()["customerInfo"].ToObject<CustomerInfo>();
                var customer = customerIbll.GetT_CustomerInfoEntity(openId);
                if (customer != null)
                {
                    return Success("已经注册", new {isRegister = true});
                }
                T_CustomerInfoEntity entity = new T_CustomerInfoEntity
                {
                    F_Openid = openId,
                    F_City = customerData.F_City,
                    F_Sex = customerData.F_Sex == "1" ? "男" : "女",
                    F_Country = customerData.F_Country,
                    F_Name = customerData.F_Name,
                    F_Province = customerData.F_Province
                };
                //入用户信息
                customerIbll.SaveEntity("", entity);
                return Success("注册成功");
            }
            catch (Exception ex)
            {
                return Fail(ex.Message);
            }
        }
        /// <summary>
        /// 微信支付
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response WxPay(dynamic _)
        {
            //接收订单号
            var orderNo = this.GetReqData().ToJObject()["orderNo"].ToString();
            var openId = this.GetReqData().ToJObject()["openId"].ToString();
            //订单合理性校正
            var ordeEntity = order.GetT_OrderHeadEntity(orderNo);
            if (ordeEntity == null)
            {
                return Fail("订单不存在");
            }
            WXConfig wx = new WXConfig();
            TenPayV3UnifiedorderRequestData xmlDataInfo = new TenPayV3UnifiedorderRequestData(wx.AppId, wx.MchId, "智慧行李",
    orderNo, 2, Net.Ip, wx.NotifyUrl, TenPayV3Type.JSAPI, openId, Config.GetValue("key"), TenPayV3Util.GetNoncestr());

            //接收微信服务器传来的数据并进行二次加密
            var result = TenPayV3.Unifiedorder(xmlDataInfo);
            if (result.result_code == "SUCCESS" && result.return_code == "SUCCESS")
            {
                Logger.Info("订单：" + order + "预支付申请成功");
                //返回给小程序
                WxPayData jsApiParam = new WxPayData();
                var prepay_id = string.Format("prepay_id={0}", result.prepay_id);
                var timeStamp = TenPayV3Util.GetTimestamp();
                jsApiParam.SetValue("timeStamp", timeStamp);
                jsApiParam.SetValue("nonceStr", result.nonce_str);
                jsApiParam.SetValue("package", prepay_id);
                jsApiParam.SetValue("signType", "MD5");
                jsApiParam.SetValue("paySign", TenPayV3.GetJsPaySign(result.appid, timeStamp, result.nonce_str, prepay_id, Config.GetValue("key")));
                return Success("请求成功", jsApiParam.ToJson());
            }
            return Fail("JSAPI下单失败");
        }

        /// <summary>
        /// 小程序微信支付
        /// </summary>
        /// <returns></returns>
        public Response NotifyUrl(dynamic _)
        {
            try
            {
                var resHandler = new Senparc.Weixin.TenPay.V3.ResponseHandler(null);
                //获取微信服务器返回的所有数据
                Logger.Info("异步通知返回xml数据：" + "\r\n" + resHandler.ParseXML());
                if (string.IsNullOrWhiteSpace(resHandler.GetParameter("transaction_id")))
                {
                    var res = new WxPayData();
                    res.SetValue("return_code", "FAIL");
                    res.SetValue("return_msg", "支付结果中微信订单号不存在");
                    return Content(res.ToXml());
                }
                var transaction_id = resHandler.GetParameter("transaction_id");
                var return_code = resHandler.GetParameter("return_code");
                var return_msg = resHandler.GetParameter("return_msg");
                var orderNo = resHandler.GetParameter("out_trade_no");
                var total_fee = resHandler.GetParameter("total_fee");
                var err_code = resHandler.GetParameter("err_code"); //错误代码
                var err_code_des = resHandler.GetParameter("err_code_des"); //错误代码描述
                var paySuccess = false;

                resHandler.SetKey(Config.GetValue("key"));
                //验证请求是否从微信发过来（安全）
                if (resHandler.IsTenpaySign() && return_code.ToUpper() == "SUCCESS")
                {
                    Logger.Info("微信支付回调：1.订单号：" + orderNo + "2.微信支付订单号：" + transaction_id + "3.金额：" + total_fee);
                    //正确的订单处理 改变订单状态
                    var orderData = order.GetT_OrderHeadEntity(orderNo);
                    orderData.F_State = "2";
                    order.UpdateOrder(orderNo, OrderStatus.已付款);
                    paySuccess = true;
                }
                else
                {
                    //错误的订单处理
                    Logger.Error("支付回调失败：1.订单号：" + orderNo + " 错误代码：" + err_code + " 错误描述" + err_code_des);
                }
                if (paySuccess)
                {
                    var res = new WxPayData();
                    res.SetValue("return_code", return_code);
                    res.SetValue("return_msg", return_msg);
                    return Content(res.ToXml());
                }
                else
                {
                    var res = new WxPayData();
                    res.SetValue("return_code", "FAIL");
                    res.SetValue("return_msg", "异步回调失败");
                    return Content(res.ToXml());
                }
            }
            catch (Exception ex)
            {
                Logger.Error("微信支付回调异常：" + ex.Message);
                throw;
            }
        }

        /// <summary>
        /// 取消订单（退款）
        /// </summary>
        /// <returns></returns>
        public Response CancelOrder(dynamic _)
        {
            var msg = "";
            var orderNo = this.GetReqData().ToJObject()["orderNo"].ToString();
            if (orderNo.IsEmpty())
            {
                return Fail("订单号为空");
            }
            var entity = order.GetT_OrderHeadEntity(orderNo);
            var tmpStatus = new[] { "-1", "-2" };//-1 已取消，-2 已退款

            if (entity.F_State.ToInt() >= 3)
            {
                return  Fail("订单正在处理中，不能取消！");
            }
            if (tmpStatus.Contains(entity.F_State))
            {
                return  Fail("订单已完成，请勿重复操作！");
            }
            var nonceStr = TenPayV3Util.GetNoncestr();
            //发起退款申请
            TenPayV3RefundRequestData data = new TenPayV3RefundRequestData(Config.GetValue("AppId"),
                Config.GetValue("MchId"), Config.GetValue("Key"), null, nonceStr, "traind", orderNo, orderNo, 23, 23,Config.GetValue("MchId") ,"REFUND_SOURCE_RECHARGE_FUNDS");
            //获取服务器证书目录
            var cert = HttpContext.Current.Server.MapPath("/");
            var result = TenPayV3.Refund(data, cert, Config.GetValue("Mchid"));

            Logger.Info("订单"+orderNo+ "微信退款返回xml"+ result.ResultXml);  //记录日志
            if (result.result_code.ToUpper()=="SUCCESSS")
            {
                Logger.Info("退款记录：1.订单"+orderNo+"；2.退款金额"+result.refund_fee);
                //修改订单状态为已退款
                order.UpdateOrder(orderNo,OrderStatus.已退款);
                return Success("订单退款成功！");
            }
            return Fail(result.err_code_des);
        }
    }

    public class CustomerInfo
    {
        public string F_Openid { get; set; }
        public string F_City { get; set; }
        public string F_Sex { get; set; }
        public string F_Country { get; set; }
        public string F_Name {get;set;}
        public string F_Phone { get; set; }
        public string F_Province { get; set; }
    }
}