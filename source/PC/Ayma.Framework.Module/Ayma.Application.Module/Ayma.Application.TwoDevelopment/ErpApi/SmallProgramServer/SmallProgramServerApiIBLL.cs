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
        void ExpressInformations(string OrderNo, List<string> ConNumber, string ExpressCompanyId, string ExpressNO, string PayType, string Amount, out string errText);

        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        /// <param name="errText"></param> 
        void UpdateOrderStatus(string OrderNo,List<string> ConsignmentNumber, string status, string Operator, out string errText);

        /// <summary>
        /// 批量修改订单状态（未分拣-分拣中）
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        /// <param name="errText"></param> 
        void UpdateBatchOrderStatus(List<string> OrderList, List<string> ConNumberList, string status, string Operator, out string errText);

        /// <summary>
        /// 根据订单状态获取订单列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        IEnumerable<OrderList> GetOrderListByStatus(string status);

        /// <summary>
        /// 根据手机号获取订单列表
        /// </summary>
        /// <param name="Phone"></param>
        /// <returns></returns>
        IEnumerable<OrderList> GetOrderListByPhone(string Phone);

        /// <summary>
        /// 根据航班号获取行李号列表
        /// </summary>
        /// <param name="FlightNumber"></param>
        /// <returns></returns>
        IEnumerable<ConsignmentNumberList> GetConNumberListByFNo(string FlightNumber, string OrderDate);

        /// <summary>
        /// 根据订单号获取行李号
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<ConsignmentNumber> GetConsignmentNumberByNo(string OrderNo);

        /// <summary>
        /// 获取所有快递公司记录
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        IEnumerable<T_ExpressCompanyEntity> GetExpressCompany();

        /// <summary>
        /// 根据行李号,订单号,电话号码获取订单详细
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        IEnumerable<SerOrderDetailModelApi> SerGetOrderDetailByNo(string ConsignmentNumber, string OrderNo, string CustPhone);

        /// <summary>
        /// 根据航班号获取航班列表
        /// </summary>
        /// <param name="ConsignmentNumber"></param>
        /// <returns></returns>
        IEnumerable<GetFlightListByFNo> SerGetFlightList(string FlightNumber);

        /// <summary>
        /// 根据订单号获取时间节点
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        IEnumerable<OrderLogisticsInfo> GetOrderLogisticsInfo(string OrderNo);
        /// <summary>
        /// 根据航班号或航班号+日期查询订单查询订单列表
        /// </summary>
        /// <param name="ConsignmentNumber"></param>
        /// <returns></returns>
        IEnumerable<GetFlightListByDate> ReasonNoMessage(string FlightNumber, string OrderDate);

        /// <summary>
        /// 修改航班分拣口,机位信息
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        void ModifyFlightInfo(string AirfieldId, string FlightNumber, string ConveyorNumber, string Placement, string Operator, out string errText);
    }
}
