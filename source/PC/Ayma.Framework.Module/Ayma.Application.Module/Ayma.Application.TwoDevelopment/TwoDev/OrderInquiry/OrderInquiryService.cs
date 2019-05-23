using System.CodeDom;
using System.Linq;
using System.Security.Permissions;
using Dapper;
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
        /// 获取所有航班号记录
        /// </summary>
        /// <returns></returns>
        public IEnumerable<T_FlightNoInfoEntity> GetList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"t.*");
                strSql.Append("  FROM T_FlightNoInfo t ");
                return this.BaseRepository().FindList<T_FlightNoInfoEntity>(strSql.ToString());
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
                if (!queryParam["F_OrderNo"].IsEmpty())
                {
                    dp.Add("F_OrderNo", "%" + queryParam["F_OrderNo"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_OrderNo Like @F_OrderNo ");
                }
                if (!queryParam["F_CustomerName"].IsEmpty())
                {
                    dp.Add("F_CustomerName", "%" + queryParam["F_CustomerName"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_CustomerName Like @F_CustomerName ");
                }
                if (!queryParam["F_CustomerPhone"].IsEmpty())
                {
                    dp.Add("F_CustomerPhone", "%" + queryParam["F_CustomerPhone"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_CustomerPhone Like @F_CustomerPhone ");
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
                return this.BaseRepository("BaseDb").FindEntity<T_OrderHeadEntity>(c=>c.F_Id==keyValue|| c.F_OrderNo==keyValue);
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
        public IEnumerable<T_GetBodyNameEntity> GetT_OrderBodyEntity(string keyValue)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT
                    A.F_Id,
                    A.F_OrderNo,
                    A.F_ConsignmentNumber,
                    A.F_Weight,
                    A.F_Distance,
                    A.F_Price,
                    A.F_Qty,
                    A.FB_State,
                    A.FB_Name,
                    A.FB_Phone
                    FROM    T_OrderBody A
                    WHERE   1 = 1");
                strSql.Append(" And A.F_OrderNo='" + keyValue + "'");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                //return this.BaseRepository().FindTable(strSql.ToString(), dp);
                return this.BaseRepository().FindList<T_GetBodyNameEntity>(strSql.ToString(), dp);
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
        /// 获取收款表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public IEnumerable<T_OrderCollectMoneyEntity> GetT_OrderCollectMoneyEntity(string keyValue)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT
                    F_Id,
                     F_OrderNo,
                     F_PayType,
                     F_Amount
                    FROM    T_OrderCollectMoney
                    WHERE   1 = 1");
                strSql.Append(" And F_OrderNo='" + keyValue + "'");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<T_OrderCollectMoneyEntity>(strSql.ToString(), dp);
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
        /// 获取付款表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public IEnumerable<T_OrderPayMoneyEntity> GetT_OrderPayMoneyEntity(string keyValue)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT
                     F_Id,
                     F_OrderNo,
                     F_ConsignmentNumber,
                     F_ExpressCompanyId,
                     F_ExpressNO,
                     F_PayType,
                     F_Amount
                    FROM    T_OrderPayMoney
                    WHERE   1 = 1");
                strSql.Append(" And F_OrderNo='" + keyValue + "'");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<T_OrderPayMoneyEntity>(strSql.ToString(), dp);
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
        /// 根据订单号获取订单 edit by Yabo,Zhou
        /// </summary>
        /// <param name="orderNo"></param>
        /// <returns></returns>
        public OrderModel GetOrderInfoByNo(string orderNo)
        {
            try
            {
                var sql = @"SELECT 
                           F_AirfieldName
                          ,F_FlightNumber
                          ,F_OrderNo
                          ,F_CustomerName
                          ,F_CustomerPhone
                          ,F_CustomerAddress
                          ,F_State
                          ,F_StartStation
     FROM T_OrderHead where F_OrderNo =@F_OrderNo";
                var dp = new DynamicParameters(new {});
                dp.Add("F_OrderNo", orderNo);
                var order= this.BaseRepository().FindEntity<OrderModel>(sql, dp);
                order.Details = GetOrderDetails(orderNo).ToList();
                return order;
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

        public IEnumerable<Details> GetOrderDetails(string orderNo)
        {
            try
            {
                return this.BaseRepository()
                       .FindList<T_OrderBodyEntity>(c => c.F_OrderNo == orderNo)
                       .Select(c => new Details { ConsignmentNumber = c.F_ConsignmentNumber });
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
        /// 修改分拣
        /// </summary>
        /// <param name="keyValye"></param>
        public void UpdateSorting(string keyValue)
        {
            try
            {
                var db = this.BaseRepository().BeginTrans();
                try
                {
                    var dp = new DynamicParameters(new { });
                    dp.Add("F_Id", keyValue);
                    db.ExecuteBySql("UPDATE T_OrderHead SET F_State='4' WHERE F_Id=@F_Id", dp);
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
        /// 修改出港
        /// </summary>
        /// <param name="keyValye"></param>
        public void UpdateLeaveport(string keyValue)
        {
            try
            {
                var db = this.BaseRepository().BeginTrans();
                try
                {
                    var dp = new DynamicParameters(new { });
                    dp.Add("F_Id", keyValue);
                    db.ExecuteBySql("UPDATE T_OrderHead SET F_State='5' WHERE F_Id=@F_Id", dp);
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
        /// 确认退款
        /// </summary>
        /// <param name="keyValye"></param>
        public void UpdateAffirmRefund(string keyValue)
        {
            try
            {
                var db = this.BaseRepository().BeginTrans();
                try
                {
                    var dp = new DynamicParameters(new { });
                    dp.Add("F_Id", keyValue);
                    db.ExecuteBySql("UPDATE T_OrderHead SET F_State='-2' WHERE F_Id=@F_Id", dp);
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
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public void SaveEntity(string keyValue, T_OrderHeadEntity entity,T_OrderBodyEntity t_OrderBodyEntity)
        {
            var db = this.BaseRepository("BaseDb").BeginTrans();
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

        /// <summary>
        /// 修改订单实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public void SaveHeadEntity(string keyValue, T_OrderHeadEntity entity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    entity.Modify(keyValue);
                    this.BaseRepository().Update(entity);
                }
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
        /// 修改行李实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public void SaveBodyEntity(string keyValue, T_OrderBodyEntity entity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    entity.Modify(keyValue);
                    this.BaseRepository().Update(entity);
                }
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
        /// 更新订单状态(取消订单、完成订单)
        /// </summary>
        /// <returns></returns>
        public void UpdateOrder(string orderNo, OrderStatus status)
        {
            var db = this.BaseRepository().BeginTrans();
            try
            {
                var sql = "UPDATE dbo.T_OrderHead SET F_State =@F_State WHERE F_OrderNo =@F_OrderNo ";
                var dp = new DynamicParameters(new { });
                dp.Add("F_State", ((int)status).ToString());
                dp.Add("F_OrderNo", orderNo);
                db.ExecuteBySql(sql, dp);
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
