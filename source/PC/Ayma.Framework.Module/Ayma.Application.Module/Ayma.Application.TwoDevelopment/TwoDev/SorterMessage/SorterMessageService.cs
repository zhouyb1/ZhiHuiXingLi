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
    /// 日 期：2019-05-13 16:02
    /// 描 述：分拣员信息管理
    /// </summary>
    public partial class SorterMessageService : RepositoryFactory
    {
        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<T_EmployeeInfoEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Openid,
                t.F_Nickname,
                t.F_Sex,
                t.F_Language,
                t.F_City,
                t.F_Province,
                t.F_Country,
                t.F_Headimgurl,
                t.F_Phone,
                t.F_CreateTime,
                t.F_IdCard,
                t.F_Name,
                t.F_Code,
                t.F_PassWord,
                t.F_Grade,
                t.F_Fraction
                ");
                strSql.Append("  FROM T_EmployeeInfo t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["F_Name"].IsEmpty())
                {
                    dp.Add("F_Name", "%" + queryParam["F_Name"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_Name Like @F_Name ");
                }
                if (!queryParam["F_Phone"].IsEmpty())
                {
                    dp.Add("F_Phone", "%" + queryParam["F_Phone"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.F_Phone Like @F_Phone ");
                }
                return this.BaseRepository().FindList<T_EmployeeInfoEntity>(strSql.ToString(),dp, pagination);
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
        /// 获取T_EmployeeInfo表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public T_EmployeeInfoEntity GetT_EmployeeInfoEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<T_EmployeeInfoEntity>(keyValue);
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
                this.BaseRepository().Delete<T_EmployeeInfoEntity>(t=>t.F_Id == keyValue);
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
        public void SaveEntity(string keyValue, T_EmployeeInfoEntity entity)
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
