﻿using Dapper;
using Ayma.DataBase.Repository;
using Ayma.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：物流查询
    /// </summary>
    public partial class OrderLogisticsService : RepositoryFactory
    {
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
                return this.BaseRepository("LocalHost").FindEntity<T_OrderLogisticsInfoEntity>(t => t.F_OrderNo == keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        public IEnumerable<T_OrderBodyEntity> GetT_OrderLogisticsInfo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT    F_ConsignmentNumber
                                  FROM      dbo.T_OrderBody
                                  WHERE     F_OrderNo =@OrderNo
                    ");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                //return this.BaseRepository().FindTable(strSql.ToString(), dp);
                return this.BaseRepository().FindList<T_OrderBodyEntity>(strSql.ToString(), dp);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }

        public IEnumerable<T_OrderLogisticsInfoEntity> GetLogisticsInfo(string F_ConsignmentNumber)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT
                                F_Id,
                                F_OrderNo,
                                F_StateDescribe,
                                F_StateDateTime,
                                F_StateOperator,
                                F_CustomerOpen
                                FROM dbo.T_OrderLogisticsInfo
                                WHERE F_OrderNo=@F_ConsignmentNumber
                    ");
                strSql.Append(" ORDER BY F_StateDateTime DESC");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("@F_ConsignmentNumber", F_ConsignmentNumber);
                //return this.BaseRepository().FindTable(strSql.ToString(), dp);
                return this.BaseRepository().FindList<T_OrderLogisticsInfoEntity>(strSql.ToString(), dp);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }


        #endregion
    }
}
