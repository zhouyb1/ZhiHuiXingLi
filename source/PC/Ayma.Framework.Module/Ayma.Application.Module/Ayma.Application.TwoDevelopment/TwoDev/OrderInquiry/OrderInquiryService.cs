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
    /// 描 述：订单查询
    /// </summary>
    public partial class OrderInquiryService : RepositoryFactory
    {
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
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_AirfieldName,
                t.F_AirfieldFloor,
                t.F_FlightCompany,
                t.F_FlightNumber,
                t.F_OrderDate,
                t.F_OrderNo,
                t.F_CustomerName,
                t.F_CustomerPhone,
                t.F_CustomerAddress,
                t.F_CustomerRemarks,
                t.F_CreateStype,
                t.F_State,
                t.F_Stype,
                t.F_CreateTime,
                t.F_CreateUserName
                ");
                strSql.Append("  FROM T_OrderHead t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["StartTime"].IsEmpty() && !queryParam["EndTime"].IsEmpty())
                {
                    dp.Add("startTime", queryParam["StartTime"].ToDate(), DbType.DateTime);
                    dp.Add("endTime", queryParam["EndTime"].ToDate(), DbType.DateTime);
                    strSql.Append(" AND ( t.F_CreateTime >= @startTime AND t.F_CreateTime <= @endTime ) ");
                }
                return this.BaseRepository("LocalHost").FindList<T_OrderHeadEntity>(strSql.ToString(),dp, pagination);
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

        /// <summary>
        /// 获取T_OrderHead表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public T_OrderHeadEntity GetT_OrderHeadEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository("LocalHost").FindEntity<T_OrderHeadEntity>(keyValue);
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

        /// <summary>
        /// 获取T_OrderBody表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public T_OrderBodyEntity GetT_OrderBodyEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository("LocalHost").FindEntity<T_OrderBodyEntity>(t=>t.F_OrderNo == keyValue);
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

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public void DeleteEntity(string keyValue)
        {
            var db = this.BaseRepository("LocalHost").BeginTrans();
            try
            {
                var t_OrderHeadEntity = GetT_OrderHeadEntity(keyValue); 
                db.Delete<T_OrderHeadEntity>(t=>t.F_Id == keyValue);
                db.Delete<T_OrderBodyEntity>(t=>t.F_OrderNo == t_OrderHeadEntity.F_OrderNo);
                db.Commit();
            }
            catch (Exception ex)
            {
                db.Rollback();
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

        /// <summary>
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public void SaveEntity(string keyValue, T_OrderHeadEntity entity,T_OrderBodyEntity t_OrderBodyEntity)
        {
            var db = this.BaseRepository("LocalHost").BeginTrans();
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    var t_OrderHeadEntityTmp = GetT_OrderHeadEntity(keyValue); 
                    entity.Modify(keyValue);
                    db.Update(entity);
                    db.Delete<T_OrderBodyEntity>(t=>t.F_OrderNo == t_OrderHeadEntityTmp.F_OrderNo);
                    t_OrderBodyEntity.Create();
                    t_OrderBodyEntity.F_OrderNo = t_OrderHeadEntityTmp.F_OrderNo;
                    db.Insert(t_OrderBodyEntity);
                }
                else
                {
                    entity.Create();
                    db.Insert(entity);
                    t_OrderBodyEntity.Create();
                    t_OrderBodyEntity.F_OrderNo = entity.F_OrderNo;
                    db.Insert(t_OrderBodyEntity);
                }
                db.Commit();
            }
            catch (Exception ex)
            {
                db.Rollback();
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
