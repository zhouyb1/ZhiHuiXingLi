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
    /// 日 期：2019-05-14 09:53
    /// 描 述：微信客户会员基础资料
    /// </summary>
    public partial class WeChatMemberService : RepositoryFactory
    {
        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<T_CustomerInfoEntity> GetPageList(Pagination pagination, string queryJson)
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
                (SELECT COUNT(*) FROM T_OrderHead WHERE F_OpenId=t.F_Openid AND F_CreateTime BETWEEN @startTime AND @endTime) OrderSum
                ");
                strSql.Append("  FROM T_CustomerInfo t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["StartTime"].IsEmpty() && !queryParam["EndTime"].IsEmpty())
                {
                    var starttime = queryParam["StartTime"].ToDate().ToString("yyyy-MM-dd") + " 00:00:00";
                    var endtime = queryParam["EndTime"].ToDate().ToString("yyyy-MM-dd") + " 23:59:59";
                    dp.Add("startTime", starttime, DbType.String);
                    dp.Add("endTime", endtime, DbType.String);
                }
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
                return this.BaseRepository("LocalHost").FindList<T_CustomerInfoEntity>(strSql.ToString(),dp, pagination);
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
        /// 获取T_CustomerInfo表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public T_CustomerInfoEntity GetT_CustomerInfoEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<T_CustomerInfoEntity>(c=>c.F_Openid==keyValue||c.F_Id==keyValue);
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
                this.BaseRepository("LocalHost").Delete<T_CustomerInfoEntity>(t=>t.F_Id == keyValue);
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
        public void SaveEntity(string keyValue, T_CustomerInfoEntity entity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    var sql ="update T_CustomerInfo set F_Name =@F_Name,F_IdCard=@F_IdCard,F_Phone=@F_Phone where F_Openid =@F_Openid";
                    var dp = new DynamicParameters(new {});
                    dp.Add("F_Name",entity.F_Name);
                    dp.Add("F_IdCard",entity.F_IdCard);
                    dp.Add("F_Openid",entity.F_Openid);
                    dp.Add("F_Phone",entity.F_Phone);
                    this.BaseRepository().ExecuteBySql(sql, dp);
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
