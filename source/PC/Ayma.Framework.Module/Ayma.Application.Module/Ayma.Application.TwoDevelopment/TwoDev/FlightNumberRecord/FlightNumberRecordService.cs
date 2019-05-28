using Dapper;
using Ayma.DataBase.Repository;
using Ayma.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Ayma.Application.TwoDevelopment.ErpDev;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-13 14:01
    /// 描 述：航班号记录
    /// </summary>
    public partial class FlightNumberRecordService : RepositoryFactory
    {
        #region 获取数据


        public IEnumerable<T_AirfieldInfoEntity> GetList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"t.*");
                strSql.Append("  FROM T_AirfieldInfo t ");
                return this.BaseRepository().FindList<T_AirfieldInfoEntity>(strSql.ToString());
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
        public IEnumerable<T_FlightNoInfoEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_AirfieldId,
                t.F_AirfieldName,
                t.F_ConveyorNumber,
                t.F_AirfieldFloorBegin,
                t.F_AirfieldFloor,
                t.F_FlightCompany,
                t.F_FlightNumber,
                t.AddressBegin,
                t.AddressEnd,
                t.F_AirfieldBegin,
                t.F_AirfieldEnd,
                t.DateTimeBegin,
                t.DateTimeEnd,
                t.DateTimeEndReality
                ");
                strSql.Append("  FROM T_FlightNoInfo t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["F_AirfieldName"].IsEmpty())
                {
                    dp.Add("F_AirfieldName", "%" + queryParam["F_AirfieldName"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_AirfieldName Like @F_AirfieldName ");
                }
                if (!queryParam["F_AirfieldFloor"].IsEmpty())
                {
                    dp.Add("F_AirfieldFloor", "%" + queryParam["F_AirfieldFloor"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_AirfieldFloor Like @F_AirfieldFloor ");
                }
                if (!queryParam["F_FlightCompany"].IsEmpty())
                {
                    dp.Add("F_FlightCompany", "%" + queryParam["F_FlightCompany"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_FlightCompany Like @F_FlightCompany ");
                }
                if (!queryParam["F_FlightNumber"].IsEmpty())
                {
                    dp.Add("F_FlightNumber", "%" + queryParam["F_FlightNumber"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_FlightNumber Like @F_FlightNumber ");
                }
                return this.BaseRepository().FindList<T_FlightNoInfoEntity>(strSql.ToString(),dp, pagination);
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
        /// 获取T_FlightNoInfo表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public T_FlightNoInfoEntity GetT_FlightNoInfoEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<T_FlightNoInfoEntity>(keyValue);
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
            try
            {
                this.BaseRepository().Delete<T_FlightNoInfoEntity>(t=>t.F_Id == keyValue);
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
        public void SaveEntity(string keyValue, T_FlightNoInfoEntity entity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    entity.Modify(keyValue);
                    this.BaseRepository().Update(entity);
                }
                else
                {
                    entity.Create();
                    this.BaseRepository().Insert(entity);
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

        #endregion

    }
}
