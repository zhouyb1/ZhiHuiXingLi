using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
using Ayma.DataBase.Repository;
using Ayma.Util;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient
{
    public partial class SmallProgramClientApiService : RepositoryFactory
    {
        /// <summary>
        /// 获取机场列表
        /// </summary>
        /// <returns></returns>
        public IEnumerable<T_AirfieldInfoModelApi> GetAirPort()
        {
            try
           {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT cast(F_Id as varchar(50)) F_Id,F_AirfieldName,F__OrderBy FROM T_AirfieldInfo");
                return this.BaseRepository().FindList<T_AirfieldInfoModelApi>(strSql.ToString());
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
        ///  /// <summary>
        /// 根据机场获取航班号信息
        /// </summary>
        /// <returns></returns>
        /// </summary>
        /// <param name="F_AirfieldId"></param>
        /// <returns></returns>
        public IEnumerable<T_FlightNoInfoModelApi> GetFlightNoInfo(string F_AirfieldId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT cast(F_AirfieldId as varchar(50)) F_AirfieldId,F_AirfieldName,F_AirfieldFloor,F_FlightCompany,F_FlightNumber,AddressBegin,AddressEnd,
                                DateTimeBegin,DateTimeEnd FROM dbo.T_FlightNoInfo WHERE F_AirfieldId=@F_AirfieldId");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_AirfieldId", F_AirfieldId);
                return this.BaseRepository().FindList<T_FlightNoInfoModelApi>(strSql.ToString(), dp);
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
        /// 根据openId获取订单列表
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public IEnumerable<OrderModelApi> GetOrderList(string openId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT    h.F_OrderNo ,
                                        F_State ,
                                        F_FlightNumber ,
                                        F_OrderDate ,
                                        ( SELECT    SUM(F_Qty)
                                            FROM      dbo.T_OrderBody
                                            WHERE     dbo.T_OrderBody.F_OrderNo = h.F_OrderNo
                                        ) qty
                                FROM      dbo.T_OrderHead h
                                        LEFT JOIN dbo.T_OrderBody b ON b.F_OrderNo = h.F_OrderNo
                                        WHERE 1=1");
                strSql.Append(" And F_OpenId=@OpenId");
                strSql.Append("  GROUP BY  h.F_OrderNo , F_State ,F_FlightNumber , F_OrderDate");                    
                var dp = new DynamicParameters(new { });
                dp.Add("@OpenId",openId);
                return this.BaseRepository().FindList<OrderModelApi>(strSql.ToString(), dp);
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

    }
}
