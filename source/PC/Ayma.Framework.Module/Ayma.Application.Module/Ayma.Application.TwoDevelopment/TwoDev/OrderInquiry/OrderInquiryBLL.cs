using System.Dynamic;
using System.Linq;
using Ayma.Util;
using System;
using System.Collections.Generic;
using Dapper;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：订单查询
    /// </summary>
    public partial class OrderInquiryBLL : OrderInquiryIBLL
    {
        private OrderInquiryService orderInquiryService = new OrderInquiryService();

        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<T_OrderHeadEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                return orderInquiryService.GetPageList(pagination, queryJson);
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
        /// 获取T_OrderHead表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public T_OrderHeadEntity GetT_OrderHeadEntity(string keyValue)
        {
            try
            {
                return orderInquiryService.GetT_OrderHeadEntity(keyValue);
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
        /// 获取T_OrderBody表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public IEnumerable<T_OrderBodyEntity> GetT_OrderBodyEntity(string keyValue)
        {
            try
            {
                return orderInquiryService.GetT_OrderBodyEntity(keyValue);
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
        /// 获取收款表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public IEnumerable<T_OrderCollectMoneyEntity> GetT_OrderCollectMoneyEntity(string keyValue)
        {
            try
            {
                return orderInquiryService.GetT_OrderCollectMoneyEntity(keyValue);
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
        /// 获取付款表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public IEnumerable<T_OrderPayMoneyEntity> GetT_OrderPayMoneyEntity(string keyValue)
        {
            try
            {
                return orderInquiryService.GetT_OrderPayMoneyEntity(keyValue);
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
        /// 根据订单号获取订单
        /// </summary>
        /// <param name="orderNo"></param>
        /// <returns></returns>
        public OrderModel GetOrderInfoByNo(string orderNo)
        {
            try
            {
                return orderInquiryService.GetOrderInfoByNo(orderNo);
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

        

        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                orderInquiryService.DeleteEntity(keyValue);
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
        /// 修改分拣状态
        /// </summary>
        /// <param name="keyValue"></param>
        public void UpdateSorting(string keyValue)
        {
            try
            {
                orderInquiryService.UpdateSorting(keyValue);
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
        /// 修改出港状态
        /// </summary>
        /// <param name="keyValue"></param>
        public void UpdateLeaveport(string keyValue)
        {
            try
            {
                orderInquiryService.UpdateLeaveport(keyValue);
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
        /// 修改退款状态
        /// </summary>
        /// <param name="keyValue"></param>
        public void UpdateAffirmRefund(string keyValue)
        {
            try
            {
                orderInquiryService.UpdateAffirmRefund(keyValue);
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
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public void SaveEntity(string keyValue, T_OrderHeadEntity entity,T_OrderBodyEntity t_OrderBodyEntity)
        {
            try
            {
                orderInquiryService.SaveEntity(keyValue, entity,t_OrderBodyEntity);
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
        /// 更新订单状态(取消订单、完成订单)
        /// </summary>
        /// <returns></returns>
        public void UpdateOrder(string orderNo, OrderStatus status)
        {
            try
            {
                 orderInquiryService.UpdateOrder(orderNo, status);
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
        #endregion

    }
}
