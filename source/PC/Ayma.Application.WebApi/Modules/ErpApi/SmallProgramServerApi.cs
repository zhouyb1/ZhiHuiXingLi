﻿using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
        }
        private SmallProgramServerApiIBLL billServerApiBLL = new SmallProgramServerApiBLL();
        /// <summary>
        /// 提交车班补货单
        /// </summary>
        /// <returns></returns>
        public Response SubmitUpdateOrderState(dynamic _)
        {
            int errCode = 0;//成功状态  100  成功
            string errText = "";//提示信息
            string F_AirfieldId = ""; //机场ID 
            string F_OrderNo = ""; //订单号
            string F_State_Old = ""; //原状态值
            string F_State_New = ""; //新状态值
            string Operator = ""; //操作人
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