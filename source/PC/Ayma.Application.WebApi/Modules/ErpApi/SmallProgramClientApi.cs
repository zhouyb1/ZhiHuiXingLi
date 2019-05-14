using Ayma.Application.TwoDevelopment.ErpDev;
using Ayma.Application.TwoDevelopment.TwoDev;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;
using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient;
using Senparc.Weixin.WxOpen;
using Senparc.Weixin.WxOpen.AdvancedAPIs.Sns;
using Senparc.Weixin;
using Config = Ayma.Util.Config;

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

        public SmallProgramClientApi()
            : base("/pdaapi")
            //注册接口
        {
            Post["/SubmitBillSaleOut"] = SubmitBillSaleOut; //提交车班补货单
            Get["/GetAirPort"] = GetAirPort; //获取机场
            Get["/GetFlightNoInfo"] = GetFlightNoInfo; //获取航班列表
            Get["/GetOrderList"] = GetOrderList; //获取航班列表
            Post["/OnLogin"] = OnLogin;
            Post["/GetPhone"] = GetPhone;
            Post["/Register"] = Register;

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
                return Fail("openId不能为空!");
            }
            string openId = req["openId"].ToString(); //openId
            var data = billClientApiBLL.GetOrderList(openId);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

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
                    var sessionBag = SessionContainer.UpdateSession(null, "", "",
                        unionId);
                    return Success(new { sessionId = sessionBag.Key, sessionKey = sessionBag.SessionKey });
                }
                return Fail(jsonResult.errmsg);
            }
            catch (Exception ex)
            {
                return Fail("参数格式有误");
            }
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
        public Response GetPhone(dynamic _)
        {
            var sessionId = this.GetReqData().ToJObject()["sessionId"].ToString();
            var encrytedData = this.GetReqData().ToJObject()["encrytedData"].ToString();
            var iv = this.GetReqData().ToJObject()["iv"].ToString();
            var phoneData = EncryptHelper.DecryptPhoneNumber(sessionId, encrytedData, iv);//解密手机号码
            return Success(new { phone = cellPhone });
        }
        /// <summary>
        /// 注册用户信息
        /// </summary>
        /// <returns></returns>
        public Response Register(dynamic _)
        {
            var s = openId;
            var sessionId = this.GetReqData().ToJObject()["sessionId"].ToString();
            var encrytedData = this.GetReqData().ToJObject()["encrytedData"].ToString();
            var iv = this.GetReqData().ToJObject()["iv"].ToString();
            try
            {
                var customerData = EncryptHelper.DecodeUserInfoBySessionId(sessionId, encrytedData, iv);//解密用户信息
                var phoneData = EncryptHelper.DecryptPhoneNumber(sessionId, encrytedData, iv);//解密手机号码
                var customer = customerIbll.GetT_CustomerInfoEntity(openId);
                if (customer != null)
                {
                    return Success("已经注册", new {isRegister = true});
                }
                T_CustomerInfoEntity entity = new T_CustomerInfoEntity
                {
                    F_Openid = openId,
                    F_City = customerData.city,
                    F_Sex = customerData.gender == 1 ? "男" : "女",
                    F_Country = customerData.country,
                    F_Name = customerData.nickName,
                    F_Phone = phoneData.phoneNumber,
                    F_Province = customerData.province
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
    }
}