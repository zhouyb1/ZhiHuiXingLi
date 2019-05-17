using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi;
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
        /// 查询行李号是否存在
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<T_OrderBodyEntity> GetConsignmentNumber(string ConsignmentNumber);

        /// <summary>
        /// 分拣员登录
        /// </summary>
        /// <param name="Code"></param>
        /// <param name="PassWord"></param>
        /// <returns></returns>
        T_EmployeeInfoEntity SorterLogin(string Code, string PassWord, out string errText);

        /// <summary>
        /// 保存快递信息
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        /// <param name="errText"></param>
        void ExpressInformation(string OrderNo, string ConsignmentNumber, string ExpressCompanyId, string ExpressNO, string PayType, string Amount, out string errText);

        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        /// <param name="errText"></param>
        void UpdateOrderStatus(string OrderNo,string ConsignmentNumber, string status, string Operator, out string errText);

        /// <summary>
        /// 根据订单状态获取订单列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        IEnumerable<OrderListModelApi> GetOrderListByStatus(string status);

        /// <summary>
        /// 根据行李号获取订单详情
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<SerOrderDetail> SerGetOrderDetailByNo(string ConsignmentNumber);

        /// <summary>
        /// 根据航班号获取航班列表
        /// </summary>
        /// <param name="ConsignmentNumber"></param>
        /// <returns></returns>
        IEnumerable<GetFlightListByFNo> SerGetFlightList(string FlightNumber);
        /// <summary>
        /// 根据航班号获取订单记录
        /// </summary>
        /// <param name="ConsignmentNumber"></param>
        /// <returns></returns>
        IEnumerable<GetFlightListByDate> ReasonNoMessage(string FlightNumber, string OrderDate);
    }
}
