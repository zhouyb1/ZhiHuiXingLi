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
    }
}
