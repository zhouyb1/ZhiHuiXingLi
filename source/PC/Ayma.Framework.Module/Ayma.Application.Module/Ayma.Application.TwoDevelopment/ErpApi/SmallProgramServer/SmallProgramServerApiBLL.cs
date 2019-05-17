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
        /// 查询行李号是否存在
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<T_OrderBodyEntity> GetConsignmentNumber(string ConsignmentNumber)
        {
            try
            {
                return billServerApiService.GetConsignmentNumber(ConsignmentNumber);
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
        /// 分拣员登录
        /// </summary>
        /// <param name="Code"></param>
        /// <param name="PassWord"></param>
        /// <returns></returns>
        public T_EmployeeInfoEntity SorterLogin(string Code, string PassWord, out string errText)
        {
            try
            {
                return billServerApiService.SorterLogin(Code, PassWord, out errText);
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
        /// 保存快递信息
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        public void ExpressInformation(string OrderNo, string ConsignmentNumber, string ExpressCompanyId, string ExpressNO, string PayType, string Amount, out string errText)
        {
            try
            {
                billServerApiService.ExpressInformation(OrderNo, ConsignmentNumber, ExpressCompanyId, ExpressNO, PayType, Amount, out errText);
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
        public void UpdateOrderStatus(string OrderNo, string ConsignmentNumber, string status, string Operator, out string errText)
        {
            try
            {
                billServerApiService.UpdateOrderStatus(OrderNo,ConsignmentNumber, status, Operator, out errText);
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
        /// 批量修改订单状态（未分拣-分拣中）
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        public void UpdateBatchOrderStatus(string status, out string errText)
        {
            try
            {
                billServerApiService.UpdateBatchOrderStatus(status, out errText);
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
        /// 获取所有快递公司
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public IEnumerable<T_ExpressCompanyEntity> GetExpressCompany()
        {
            try
            {
                return billServerApiService.GetExpressCompany();
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
        /// 根据行李号获取订单详细
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<SerOrderDetail> SerGetOrderDetailByNo(string ConsignmentNumber)
        {
            try
            {
                return billServerApiService.SerGetOrderDetailByNo(ConsignmentNumber);
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
        /// 根据航班号获取航班列表
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<GetFlightListByFNo> SerGetFlightList(string FlightNumber)
        {
            try
            {
                return billServerApiService.SerGetFlightList(FlightNumber);
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
        /// 根据航班号获取订单信息
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<GetFlightListByDate> ReasonNoMessage(string FlightNumber, string OrderDate)
        {
            try
            {
                return billServerApiService.ReasonNoMessage(FlightNumber, OrderDate);
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
