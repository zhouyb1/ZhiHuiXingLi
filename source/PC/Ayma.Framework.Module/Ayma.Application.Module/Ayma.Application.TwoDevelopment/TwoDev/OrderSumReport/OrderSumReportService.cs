using Ayma.DataBase.Repository;
using Ayma.Util;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.OrderSumReport
{
    public partial class OrderSumReportService : RepositoryFactory
    {
        //业务综合数据报表
        public IEnumerable<OrderSumReportModel> GetSumReport(string queryJson)
        {
            try
            {
                #region 查询语句
                string sqlIn = @"
        SELECT
	            MyData.订单数 OrderNum,
	            MyData.行李数 ConsignmentNum,
	            MyData.收入金额 Amount,
	            MyData.客户数 ClientNum,
	            DATEDIFF(mi,MyData.ATA到港时间,(SELECT t.F_StateDateTime from T_OrderLogisticsInfo t
	            where MyData.F_OrderNo=t.F_OrderNo And F_StateDescribe ='已完成'))/MyData.订单数 ATAzqs,
	            DATEDIFF(mi,MyData.ATA到港时间,(SELECT t.F_StateDateTime from T_OrderLogisticsInfo t
	            where MyData.F_OrderNo=t.F_OrderNo And F_StateDescribe ='运输中'))/MyData.订单数 ATAzkd,
	            DATEDIFF(mi,
	            (SELECT t.F_StateDateTime from T_OrderLogisticsInfo t 
	            where MyData.F_OrderNo=t.F_OrderNo And F_StateDescribe ='运输中'),
	            (SELECT t.F_StateDateTime from T_OrderLogisticsInfo t
	            where MyData.F_OrderNo=t.F_OrderNo And F_StateDescribe ='已完成'))/MyData.订单数 Kdzqs
        FROM	(SELECT 
					a.F_OrderNo F_OrderNo,
					COUNT(distinct a.F_OrderNo) 订单数,
					COUNT(distinct b.F_ConsignmentNumber) 行李数 ,
					SUM(b.F_Price) 收入金额,
					COUNT(distinct a.F_OpenId)客户数,
					c.DateTimeEndReality ATA到港时间

					FROM T_OrderHead a 
							left join T_OrderBody b on a.F_OrderNo=b.F_OrderNo 
							left join T_FlightNoInfo c on a.F_AirfieldId=c.F_AirfieldId And a.F_FlightNumber=c.F_FlightNumber
							left join T_OrderLogisticsInfo d on a.F_OrderNo=d.F_OrderNo And b.F_OrderNo=d.F_OrderNo

					WHERE 
							1=1
					GROUP BY  a.F_OrderNo,
							  c.DateTimeEndReality
					)MyData";

                var strParm = new StringBuilder();
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["StartTime"].IsEmpty() && !queryParam["EndTime"].IsEmpty())
                {
                    dp.Add("startTime", queryParam["StartTime"].ToDate(), DbType.DateTime);
                    dp.Add("endTime", queryParam["EndTime"].ToDate(), DbType.DateTime);
                    strParm.Append(" AND ( a.F_CreateTime >= @startTime AND a.F_CreateTime <= @endTime ) ");
                }
                if (!queryParam["F_FlightCompany"].IsEmpty())
                {
                    dp.Add("F_FlightCompany", queryParam["F_FlightCompany"].ToString(), DbType.String);
                    strParm.Append(" AND a.F_FlightCompany = @F_FlightCompany ");
                }
                #endregion
                var rows = this.BaseRepository().FindList<OrderSumReportModel>(string.Format(sqlIn, strParm.ToString()), dp).ToList();
                return rows;
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
