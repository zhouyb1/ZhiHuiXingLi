using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
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
        public IEnumerable<GetFlightMessage> GetFlightMessage(string FlightNumber)
        {
            try
            {
                return billClientApiService.GetFlightMessage(FlightNumber);
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

    }
}
