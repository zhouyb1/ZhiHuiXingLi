using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;
using System.Text.RegularExpressions;
using Senparc.Weixin.WxOpen.AdvancedAPIs.Sns;
using Senparc.Weixin.WxOpen.Entities;

namespace Ayma.Application.WebApi.Modules.ErpApi
{
    public class SmallProgramServerApi : PdaBaseApi
    {
        /// <summary>
        /// 分拣员小程序调用
        /// </summary>
        public SmallProgramServerApi()
            : base("/pdaapi")
        {
            Post["/SubmitUpdateOrderState"] = SubmitUpdateOrderState; //提交车班补货单
            Post["/UpdateOrderStatus"] = UpdateOrderStatus; //修改订单状态
            Get["/GetOrderListByStatus"] = GetOrderListByStatus; //根据订单状态获取订单列表
            Get["/SerGetOrderDetailByNo"] = SerGetOrderDetailByNo; //根据订单号获取订单详情
            Get["/SerGetFlightList"] = SerGetFlightList; // 根据航班号获取航班时间列表
            Get["/ExpressInformation"] = ExpressInformation;//分拣完成后填写快递信息
            Get["/ReasonNoMessage"] = ReasonNoMessage;//根据航班号或者时间获取航班信息
            Get["/SorterLogin"] = SorterLogin;//分拣员登录  
            Get["/UpdateBatchOrderStatus"] = UpdateBatchOrderStatus;//批量修改订单状态（未分拣-分拣中）
            Get["/GetExpressCompany"] = GetExpressCompany;//获取所有快递公司记录
            Get["/SerGetPhone"] = SerGetPhone;//获取手机号码
        }
        private SmallProgramServerApiIBLL billServerApiBLL = new SmallProgramServerApiBLL();




        /// <summary>
        /// 填写快递公司,单号,费用信息
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response ExpressInformation(dynamic _)
        {
            var req = this.GetReqData().ToJObject();//获取模板请求数据
            if (req["OrderNo"].IsEmpty())
            {
                return Fail("订单号不能为空!");
            }
            if (req["ConsignmentNumber"].IsEmpty())
            {
                return Fail("行李号不能为空!");
            }
            if (req["ExpressCompanyId"].IsEmpty())
            {
                return Fail("快递公司不能为空!");
            }
            if (req["ExpressNO"].IsEmpty())
            {
                return Fail("快递单号不能为空!");
            }
            if (req["Amount"].IsEmpty())
            {
                return Fail("费用不能为空");
            }
            if (!Regex.IsMatch(req["Amount"].ToString(), @"^[0-9]*$"))
            {
                return Fail("费用只能为数字");
            }
            string OrderNo = req["OrderNo"].ToString();  //订单号
            string ConsignmentNumber = req["ConsignmentNumber"].ToString();  //行李号
            string ExpressCompanyId = req["ExpressCompanyId"].ToString();  //快递公司
            string ExpressNO = req["ExpressNO"].ToString(); //快递单号
            string PayType = req["PayType"].ToString(); //收款方式
            string Amount = req["Amount"].ToString(); //快递费用
            string errText = "";
            billServerApiBLL.ExpressInformation(OrderNo, ConsignmentNumber, ExpressCompanyId, ExpressNO, PayType, Amount, out errText);
            return Success(errText);
        }




        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response UpdateOrderStatus(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["OrderNo"].IsEmpty())
            {
                return Fail("订单号不能为空!");
            }
            if (req["ConsignmentNumber"].IsEmpty())
            {
                return Fail("行李号不能为空!");
            }
            if (req["status"].IsEmpty())
            {
                return Fail("订单状态不能为空!");
            }
            if (req["Operator"].IsEmpty())
            {
                return Fail("操作员不能为空!");
            }
            var ConsignmentOrder = billServerApiBLL.GetConsignmentNumber(req["ConsignmentNumber"].ToString());
            if (ConsignmentOrder.Count() < 1)
            {
                return Fail("行李号不存在!");
            }
            string OrderNo = req["OrderNo"].ToString();  //订单号
            string ConsignmentNumber = req["ConsignmentNumber"].ToString();  //行李号
            string status = req["status"].ToString();  //订单状态
            string Operator = req["Operator"].ToString(); //操作人
            string errText = "";
            billServerApiBLL.UpdateOrderStatus(OrderNo, ConsignmentNumber, status, Operator, out errText);
            if (status == "4")   //行李号状态为运输中,插入快递公司数据
            {
                if (req["ExpressCompanyId"].IsEmpty())
                {
                    return Fail("快递公司不能为空!");
                }
                if (req["ExpressNO"].IsEmpty())
                {
                    return Fail("快递单号不能为空!");
                }
                if (req["Amount"].IsEmpty())
                {
                    return Fail("运费不能为空");
                }
                if (!Regex.IsMatch(req["Amount"].ToString(), @"^[0-9]*$"))
                {
                    return Fail("运费只能为数字");
                }
                string ExpressCompanyId = req["ExpressCompanyId"].ToString();  //快递公司
                string ExpressNO = req["ExpressNO"].ToString(); //快递单号
                string PayType = req["PayType"].ToString(); //收款方式
                string Amount = req["Amount"].ToString(); //快递费用
                billServerApiBLL.ExpressInformation(OrderNo, ConsignmentNumber, ExpressCompanyId, ExpressNO, PayType, Amount, out errText);
            }
            return Success(errText);
        }

        /// <summary>
        /// 批量修改订单状态（未分拣-分拣中）
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response UpdateBatchOrderStatus(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["status"].IsEmpty())
            {
                return Fail("订单状态不能为空!");
            }
            string status = req["status"].ToString();  //订单状态
            
            string errText = "";
            billServerApiBLL.UpdateBatchOrderStatus(status, out errText);
            return Success(errText);
        }

        /// <summary>
        /// 分拣员登录
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response SorterLogin(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["Code"].IsEmpty())
            {
                return Fail("账户不能为空!");
            }
            if (req["PassWord"].IsEmpty())
            {
                return Fail("密码不能为空!");
            }
            string Code = req["Code"].ToString();  //登录账户
            string PassWord = req["PassWord"].ToString();  //登录密码
            string errText = "";
            var EmployeeEntity = billServerApiBLL.SorterLogin(Code, PassWord, out errText);
            if (EmployeeEntity!=null)
            {
                return Success(errText);
            }
            else {
                return Fail("登录失败!");
            }
        }

       /// <summary>
       /// 根据订单状态获取订单列表
       /// </summary>
        /// <param name="_"></param> 
       /// <returns></returns>
        public Response GetOrderListByStatus(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string status = req["status"].ToString(); //订单状态
            var data = billServerApiBLL.GetOrderListByStatus(status);
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
        /// 获取所有快递公司信息
        /// </summary>
        /// <param name="_"></param> 
        /// <returns></returns>
        public Response GetExpressCompany(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            var data = billServerApiBLL.GetExpressCompany();
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
        /// 根据行李号获取订单详情
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response SerGetOrderDetailByNo(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string ConsignmentNumber = req["ConsignmentNumber"].ToString(); //行李号
            var data = billServerApiBLL.SerGetOrderDetailByNo(ConsignmentNumber);
            //var orderbody = billServerApiBLL.SerGetOrderBodyByNo(OrderNo);
            if (data.Count() > 0 )
            {
                //var data = new { orderhead = orderhead, orderbody = orderbody };
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        /// <summary>
        /// 根据航班号获取航班时间列表
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public Response SerGetFlightList(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string FlightNumber = req["FlightNumber"].ToString(); //航班号
            var data = billServerApiBLL.SerGetFlightList(FlightNumber);
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
       /// 根据航班号或航班号+日期查询订单查询订单列表
       /// </summary>
       /// <param name="_"></param>
       /// <returns></returns>
        public Response ReasonNoMessage(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string FlightNumber = req["FlightNumber"].ToString(); //航班号
            string OrderDate = req["OrderDate"].ToString();//日期
            var data = billServerApiBLL.ReasonNoMessage(FlightNumber,OrderDate);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else 
            {
                return Fail("没有订单记录!");
            }
        }

        /// <summary>
        /// 获取手机号码
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response SerGetPhone(dynamic _)
        {
            //var sessionId = this.GetReqData().ToJObject()["sessionId"].ToString();
            var code = this.GetReqData().ToJObject()["code"].ToString(); //获取code 
            //以code换取session_key
            var jsonResult = SnsApi.JsCode2Json(Config.GetValue("SerAppId"), Config.GetValue("SerAppSecret"), code);
            var encrytedData = this.GetReqData().ToJObject()["encrytedData"].ToString();
            var iv = this.GetReqData().ToJObject()["iv"].ToString();
            var phoneData = EncryptHelper.DecodeEncryptedData(jsonResult.session_key, encrytedData, iv); //解密手机号码
            var result = Newtonsoft.Json.JsonConvert.DeserializeObject<DecodedPhoneNumber>(phoneData);
            return Success("ok", result.phoneNumber);
        }

        /// <summary>
        /// 提交车班补货单
        /// </summary>
        /// <returns></returns>
        public Response SubmitUpdateOrderState(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据


            if (req["F_AirfieldId"] == null)
            {
                return Fail("F_AirfieldId不能为空!");
            }
            string F_AirfieldId = req["F_AirfieldId"].ToString(); //机场ID 
            string F_OrderNo = "454"; //订单号
            string F_State_Old = "4"; //原状态值
            string F_State_New = "5"; //新状态值
            string Operator = "454"; //操作人

            int errCode = 0;//成功状态  100  成功
            string errText = "";//提示信息
            billServerApiBLL.SubmitUpdateOrderState(F_AirfieldId, F_OrderNo, F_State_Old, F_State_New, Operator, out   errCode, out   errText);
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