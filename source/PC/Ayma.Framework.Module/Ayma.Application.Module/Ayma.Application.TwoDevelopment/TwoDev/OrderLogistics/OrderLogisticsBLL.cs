using Ayma.Util;
using System;
using System.Collections.Generic;
using System.Data;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：物流查询
    /// </summary>
    public partial class OrderLogisticsBLL : OrderLogisticsIBLL
    {
        private OrderLogisticsService orderlogisticsService = new OrderLogisticsService();

        #region 获取数据
        /// <summary>
        /// 获取T_OrderLogisticsInfo表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public T_OrderLogisticsInfoEntity GetT_OrderLogisticsInfoEntity(string keyValue)
        {
            try
            {
                return orderlogisticsService.GetT_OrderLogisticsInfoEntity(keyValue);
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

        public IEnumerable<T_OrderLogisticsInfoEntity> GetT_OrderLogisticsInfo(string OrderNo)
       {
           try
           {
               return orderlogisticsService.GetT_OrderLogisticsInfo(OrderNo);
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
        #endregion
}
