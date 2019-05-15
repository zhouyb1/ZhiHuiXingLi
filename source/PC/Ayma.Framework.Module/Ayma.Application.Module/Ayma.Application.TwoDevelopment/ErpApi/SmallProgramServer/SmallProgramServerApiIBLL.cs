﻿using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi;
using Ayma.Application.TwoDevelopment.TwoDev;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer
{
    public interface SmallProgramServerApiIBLL
    {
        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="F_AirfieldId">机场ID</param>
        /// <param name="F_OrderNo">订单号</param>
        /// <param name="F_State_Old">原状态值</param>
        /// <param name="F_State_New">新状态值</param>
        /// <param name="Operator">操作人</param>
        /// <param name="errCode">成功状态  100  成功</param>
        /// <param name="errText">提示信息</param>
        void SubmitUpdateOrderState(string F_AirfieldId, string F_OrderNo, string F_State_Old, string F_State_New, string Operator, out int errCode, out string errText);

        /// <summary>
        /// 查询订单是否存在
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<T_OrderHeadEntity> GetOrder(string OrderNo);

        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        /// <param name="errText"></param>
        void UpdateOrderStatus(string OrderNo, string status, string Operator, out string errText);

        /// <summary>
        /// 根据订单状态获取订单列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        IEnumerable<OrderListModelApi> GetOrderListByStatus(string status);

        /// <summary>
        /// 根据订单号获取订单头
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<SerOrderHeadModelApi> SerGetOrderHeadByNo(string OrderNo);
        /// <summary>
        /// 根据订单号获取订单详细
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<SerConsignmentNumberModelApi> SerGetOrderBodyByNo(string OrderNo);
    }
}
