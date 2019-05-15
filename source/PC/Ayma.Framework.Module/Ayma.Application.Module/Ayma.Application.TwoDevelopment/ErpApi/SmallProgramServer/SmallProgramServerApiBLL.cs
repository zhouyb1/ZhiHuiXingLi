using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi;
using Ayma.Application.TwoDevelopment.TwoDev;
using Ayma.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer
{

    public partial class SmallProgramServerApiBLL : SmallProgramServerApiIBLL
    {
        private SmallProgramServerApiService billServerApiService = new SmallProgramServerApiService();

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
        public void SubmitUpdateOrderState(string F_AirfieldId, string F_OrderNo, string F_State_Old, string F_State_New, string Operator, out int errCode, out string errText)
        {
            try
            {
                billServerApiService.SubmitUpdateOrderState(F_AirfieldId, F_OrderNo, F_State_Old, F_State_New, Operator, out errCode, out errText);
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
        /// 查询订单是否存在
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<T_OrderHeadEntity> GetOrder(string OrderNo)
        {
            try
            {
                return billServerApiService.GetOrder(OrderNo);
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
        /// 修改订单状态
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        public void UpdateOrderStatus(string OrderNo, string status, string Operator, out string errText)
        {
            try
            {
                billServerApiService.UpdateOrderStatus(OrderNo, status, Operator, out errText);
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
        public IEnumerable<OrderListModelApi> GetOrderListByStatus(string status)
        {
            try
            {
                return billServerApiService.GetOrderListByStatus(status);
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
        /// 根据订单号获取订单头
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<SerOrderHeadModelApi> SerGetOrderHeadByNo(string OrderNo)
        {
            try
            {
                return billServerApiService.SerGetOrderHeadByNo(OrderNo);
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
        public IEnumerable<SerConsignmentNumberModelApi> SerGetOrderBodyByNo(string OrderNo)
        {
            try
            {
                return billServerApiService.SerGetOrderBodyByNo(OrderNo);
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
