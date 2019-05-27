using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
using System;
using System.Collections.Generic;
using System.Data;
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
        /// 根据openId获取旅客常用地址
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        IEnumerable<T_AddressModelApi> GetAddressById(string openId);

        /// <summary>
        /// 根据航班号模糊查询航班信息
        /// </summary>
        /// <param name="FlightNumber"></param>
        /// <returns></returns>
        IEnumerable<GetFlightMessage> GetFlightMessage(string FlightNumber);

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
        /// 根据机场Id获取航站楼
        /// </summary>
        /// <param name="F_AirfieldId"></param>
        /// <returns></returns>
        IEnumerable<T_AirfieldFloor> GetFlightFloorById(string F_AirfieldId);

        /// <summary>
        /// 根据机场Id获取运费计算规则
        /// </summary>
        /// <param name="F_AirfieldId"></param>
        /// <returns></returns>
        DataTable GetFeeRule(string F_AirfieldId);

        /// <summary>
        /// 提交订单
        /// </summary>
        /// <param name="SubmitOrderModelApi"></param>
        /// <param name="OrderNo"></param>
        /// <param name="errText"></param>
        void SubmitOrder(BillMakeBaseModelAPi SubmitOrderModelApi, string OrderNo, out string errText);

        /// <summary>
        /// 修改订单状态-旅客申请退款
        /// </summary>
        /// <param name="SubmitOrderModelApi"></param>
        /// <param name="OrderNo"></param>
        /// <param name="errText"></param>
        void ClientUpdateOrder(string OrderNo, string status, out string errText);

        /// <summary>
        /// 地址管理
        /// </summary>
        /// <param name="F_Id"></param>
        /// <param name="errText"></param>
        void AddressToDo(string F_Id, out string errText);
        
    }
}
