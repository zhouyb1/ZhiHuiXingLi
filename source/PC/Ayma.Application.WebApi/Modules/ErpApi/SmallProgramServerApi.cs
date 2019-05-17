using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;
using System.Text.RegularExpressions;

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
            Get["/ReasonNoMessage"] = ReasonNoMessage;//根据航班号获取航班信息
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
            return Success(errText);
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