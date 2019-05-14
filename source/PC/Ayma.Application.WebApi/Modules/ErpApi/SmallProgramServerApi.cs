using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;

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
        }
        private SmallProgramServerApiIBLL billServerApiBLL = new SmallProgramServerApiBLL();

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
            if (req["status"].IsEmpty())
            {
                return Fail("订单状态不能为空!");
            }
            if (req["Operator"].IsEmpty())
            {
                return Fail("操作员不能为空!");
            }
            var Order=billServerApiBLL.GetOrder(req["OrderNo"].ToString());
            if (Order.Count() < 1)
            {
                return Fail("订单不存在!");
            }
            string OrderNo = req["OrderNo"].ToString();  //订单号
            string status = req["status"].ToString();  //订单状态
            string Operator = req["Operator"].ToString(); //操作人
            string errText = "";
            billServerApiBLL.UpdateOrderStatus(OrderNo, status, Operator, out errText);
            return Success(errText);
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