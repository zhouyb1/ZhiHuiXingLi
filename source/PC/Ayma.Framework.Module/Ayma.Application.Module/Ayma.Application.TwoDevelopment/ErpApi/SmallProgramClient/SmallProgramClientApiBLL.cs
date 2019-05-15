using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
using Ayma.Util;
using System;
using System.Collections.Generic;
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

    }
}
