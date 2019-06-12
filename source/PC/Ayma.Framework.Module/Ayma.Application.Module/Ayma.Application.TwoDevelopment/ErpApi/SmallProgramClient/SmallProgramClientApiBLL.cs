using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
using Ayma.Application.TwoDevelopment.TwoDev;
using Ayma.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient
{
    public partial class SmallProgramClientApiBLL : SmallProgramClientApiIBLL
    {
        private SmallProgramClientApiService billClientApiService = new SmallProgramClientApiService();

        /// <summary>
        /// 获取机场列表
        /// </summary>
        /// <returns></returns>
        public IEnumerable<T_AirfieldInfoModelApi> GetAirPort()
        {
            try
            {
                return billClientApiService.GetAirPort();
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据机场Id获取航班信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<T_FlightNoInfoModelApi> GetFlightNoInfo(string F_AirfieldId)
        {
            try
            {
                return billClientApiService.GetFlightNoInfo(F_AirfieldId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据航班号模糊查询航班信息
        /// </summary>
        /// <param name="FlightNumber"></param>
        /// <returns></returns>
        public IEnumerable<GetFlightMessage> GetFlightMessage(string F_AirfieldId, string FlightNumber)
        {
            try
            {
                return billClientApiService.GetFlightMessage(F_AirfieldId, FlightNumber);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据openId获取订单列表
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public IEnumerable<OrderModelApi> GetOrderList(string openId, string status)
        {
            try
            {
                return billClientApiService.GetOrderList(openId, status);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据openId获取旅客常用地址
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public IEnumerable<T_AddressModelApi> GetAddressById(string openId)
        {
            try
            {
                return billClientApiService.GetAddressById(openId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据机场Id获取运费计算规则
        /// </summary>
        /// <param name="F_AirfieldId"></param>
        /// <returns></returns>
        public DataTable GetFeeRule(string F_AirfieldId)
        {
            try
            {
                return billClientApiService.GetFeeRule(F_AirfieldId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据订单状态查询订单列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        #region
        //public IEnumerable<OrderModelApi> GetOrderListByStatus(string openId, string status)
        //{
        //    try
        //    {
        //        return billClientApiService.GetOrderListByStatus(openId, status);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (ex is ExceptionEx)
        //        {
        //            throw;
        //        }
        //        else
        //        {
        //            throw ExceptionEx.ThrowBusinessException(ex);
        //        }
        //    }
        //}
        #endregion

        /// <summary>
        /// 根据订单号获取订单头
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<OrderHeadModelApi> GetOrderHeadByNo(string OrderNo)
        {
            try
            {
                return billClientApiService.GetOrderHeadByNo(OrderNo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据订单号获取时间节点
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public IEnumerable<ClientOrderLogisticsInfo> GetClientOrderLogisticsInfo(string OrderNo)
        {
            try
            {
                return billClientApiService.GetClientOrderLogisticsInfo(OrderNo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 根据订单号获取订单详细
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<OrderDetailsModelApi> GetOrderBodyByNo(string OrderNo)
        {
            try
            {
                return billClientApiService.GetOrderBodyByNo(OrderNo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        public IEnumerable<T_AirfieldFloor> GetFlightFloorById(string F_AirfieldId)
        {
            try
            {
                return billClientApiService.GetFlightFloorById(F_AirfieldId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 提交订单
        /// </summary>
        /// <param name="SubmitOrderModelApi"></param>
        /// <param name="OrderNo"></param>
        /// <param name="errText"></param>
        public void SubmitOrder(BillMakeBaseModelAPi SubmitOrderModelApi, string OrderNo, out string errText)
        {
            try
            {
                billClientApiService.SubmitOrder(SubmitOrderModelApi, OrderNo, out errText);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取订单头实体
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public T_OrderHeadEntity GetOrderHeadEntity(string OrderNo)
        {
            try
            {
                return billClientApiService.GetOrderHeadEntity(OrderNo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取订单详细实体
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<T_OrderBodyEntity> GetOrderBodyEntity(string OrderNo)
        {
            try
            {
                return billClientApiService.GetOrderBodyEntity(OrderNo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 修改订单状态-旅客申请退款
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="errText"></param>
        public void ClientUpdateOrder(string OrderNo, string status, out string errText)
        {
            try
            {
                billClientApiService.ClientUpdateOrder(OrderNo, status, out errText);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 地址管理
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="errText"></param>
        public void AddressToDo(string F_Id, out string errText)
        {
            try
            {
                billClientApiService.AddressToDo(F_Id, out errText);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 更新订单详细的运费和距离
        /// </summary>
        /// <param name="bodyEntity"></param>
        public void UpdateOrderDetail(decimal F_Price, decimal F_Distance, string F_ConsignmentNumber)
        {
            try
            {
                billClientApiService.UpdateOrderDetail(F_Price, F_Distance, F_ConsignmentNumber);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 改变订单类型   加急/普通
        /// </summary>
        /// <param name="IsUrgent"></param>
        /// <param name="OrderNo"></param>
        public void UpdateOrderType(string IsUrgent, string OrderNo)
        {
            try
            {
                billClientApiService.UpdateOrderType(IsUrgent, OrderNo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 支付后改变订单状态
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="status"></param>
        public void ModifyOrderStatus(string orderNo, OrderStatus status)
        {
            try
            {
                billClientApiService.ModifyOrderStatus(orderNo, status);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

    }
}
