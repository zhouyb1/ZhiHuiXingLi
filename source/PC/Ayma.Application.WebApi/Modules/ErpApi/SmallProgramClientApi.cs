using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;
using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient;
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
        public SmallProgramClientApi()
            : base("/pdaapi")
            //注册接口
        {
            Post["/SubmitBillSaleOut"] = SubmitBillSaleOut; //提交车班补货单
            Get["/GetAirPort"] = GetAirPort; //获取机场
            Get["/GetFlightNoInfo"] = GetFlightNoInfo; //获取航班列表
            Get["/GetOrderList"] = GetOrderList; //获取航班列表
            Post["/OnLogin"] = OnLogin;
        }
        private SmallProgramClientApiBLL billClientApiBLL = new SmallProgramClientApiBLL();
        private static string openId = string.Empty;
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
                    openId = jsonResult.openid;
                    var unionId = "";
                    //获取openid+session_key生成3rd_session
                    var sessionBag = Senparc.Weixin.WxOpen.SessionContainer.UpdateSession(jsonResult.openid, jsonResult.session_key, unionId);
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
    }
}