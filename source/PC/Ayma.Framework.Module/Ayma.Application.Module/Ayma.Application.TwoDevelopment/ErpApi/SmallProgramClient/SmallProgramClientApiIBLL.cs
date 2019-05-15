using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient
{
    public interface SmallProgramClientApiIBLL
    {
        /// <summary>
        /// 获取机场列表
        /// </summary>
        /// <returns></returns>
        IEnumerable<T_AirfieldInfoModelApi> GetAirPort();

        /// <summary>
        /// 根据机场获取航班信息
        /// </summary>
        /// <returns></returns>
        IEnumerable<T_FlightNoInfoModelApi> GetFlightNoInfo(string F_AirfieldId);

        /// <summary>
        /// 根据openId获取订单列表
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        IEnumerable<OrderModelApi> GetOrderList(string openId, string status);
        /// <summary>
        /// 根据订单状态查询订单列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        #region
        //IEnumerable<OrderModelApi> GetOrderListByStatus(string openId, string status);
        #endregion
        /// <summary>
        /// 根据订单号获取订单头
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<OrderHeadModelApi> GetOrderHeadByNo(string OrderNo);
        /// <summary>
        /// 根据订单号获取订单详细
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<OrderDetailsModelApi> GetOrderBodyByNo(string OrderNo);

        /// <summary>
        /// 提交订单
        /// </summary>
        /// <param name="SubmitOrderModelApi"></param>
        /// <param name="OrderNo"></param>
        /// <param name="errText"></param>
        void SubmitOrder(BillMakeBaseModelAPi SubmitOrderModelApi, string OrderNo, out string errText);
        
    }
}
