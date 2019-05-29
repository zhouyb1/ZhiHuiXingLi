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
        /// <summary>
        /// 业务综合数据报表
        /// </summary>
        /// <param name="queryJson">参数</param>
        /// <returns></returns>
        public IEnumerable<OrderSumReportModel> GetSumReport(string queryJson)
        {
            try
            {
                #region 查询语句
                string sqlIn = @"
SELECT 
					COUNT(distinct a.F_OrderNo) OrderNum,
					COUNT(distinct b.F_ConsignmentNumber) ConsignmentNum ,
					SUM(b.F_Price) Amount,
					COUNT(distinct a.F_OpenId) ClientNum,
					(select SUM(DATEDIFF(mi,c1.DateTimeEndReality,t.F_StateDateTime)) from T_OrderHead t1  
	left join T_FlightNoInfo c1 on c1.F_FlightNumber=t1.F_FlightNumber and c1.F_AirfieldId=t1.F_AirfieldId
	left join T_OrderBody c2 on t1.F_OrderNo=c2.F_OrderNo
	left join T_OrderLogisticsInfo t  on t.F_OrderNo=c2.F_ConsignmentNumber
	 where  t.F_LogState ='5')/COUNT(distinct a.F_OrderNo) ATAzqs,
	
	(select SUM(DATEDIFF(mi,c1.DateTimeEndReality,t.F_StateDateTime)) from T_OrderHead t1  
	left join T_FlightNoInfo c1 on c1.F_FlightNumber=t1.F_FlightNumber and c1.F_AirfieldId=t1.F_AirfieldId
	left join T_OrderBody c2 on t1.F_OrderNo=c2.F_OrderNo
	left join T_OrderLogisticsInfo t  on t.F_OrderNo=c2.F_ConsignmentNumber
	 where  t.F_LogState ='4')/COUNT(distinct a.F_OrderNo) ATAzkd,
	DATEDIFF(mi,
	(select t.F_StateDateTime from T_OrderLogisticsInfo t 
	where t.F_OrderNo=t.F_OrderNo And F_StateDescribe ='4'),
	(select t.F_StateDateTime from T_OrderLogisticsInfo t
	where t.F_OrderNo=t.F_OrderNo And F_StateDescribe ='5'))/COUNT(distinct a.F_OrderNo) Kdzqs	
	
					FROM T_OrderHead a 
							left join T_OrderBody b on a.F_OrderNo=b.F_OrderNo 
							left join T_FlightNoInfo c on a.F_AirfieldId=c.F_AirfieldId And a.F_FlightNumber=c.F_FlightNumber
							--left join T_OrderLogisticsInfo t on t.F_OrderNo=a.F_OrderNo
							left join T_OrderLogisticsInfo d on a.F_OrderNo=d.F_OrderNo And b.F_OrderNo=d.F_OrderNo

					WHERE 
					1=1 
        ";
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

        /// <summary>
        /// 财务数据报表
        /// </summary>
        /// <param name="queryJson">参数</param>
        /// <returns></returns>
        public IEnumerable<FinanceReportModel> GetFinanceReport(string queryJson)
        {
            try
            {
                #region 查询语句
                string sqlIn = @"
                    SELECT 
					a.F_OrderNo OrderNum,
					COUNT(distinct b.F_ConsignmentNumber) ConsignmentNum,
					SUM(b.F_Price) ChargeMoney,
					SUM(p.F_Amount) ThirdMoney,
					SUM(b.F_Price-p.F_Amount) GrossProfit,
					a.F_CreateTime OrderDate
					FROM T_OrderHead a 
							left join T_OrderBody b on a.F_OrderNo=b.F_OrderNo 
							left join T_FlightNoInfo c on a.F_AirfieldId=c.F_AirfieldId And a.F_FlightNumber=c.F_FlightNumber
							left join T_OrderLogisticsInfo d on a.F_OrderNo=d.F_OrderNo And b.F_OrderNo=d.F_OrderNo
							left join T_OrderPayMoney p on a.F_OrderNo=p.F_OrderNo

					WHERE 
					1=1 
                    Group by a.F_OrderNo,a.F_CreateTime
        ";
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
                    strParm.Append(" AND a.F_FlightCompany LIKE '%@F_FlightCompany%' ");
                }
                #endregion
                var rows = this.BaseRepository().FindList<FinanceReportModel>(string.Format(sqlIn, strParm.ToString()), dp).ToList();
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

        public IEnumerable<SorterReportModel> GetSorterReport(string queryJson)
        {
            try
            {
                #region 查询语句
                string sqlIn = @"
                            select 
								distinct e.F_Name FJYName,
								COUNT(a.F_OrderNo) JDNum,
								COUNT(case when f.F_LogState!=41 then 51 end) XLNum,
								COUNT(case when f.F_LogState =41 then 51 end) YCXLNum,
								(select SUM(DATEDIFF(mi,c1.DateTimeEndReality,t.F_StateDateTime)) from T_OrderHead t1  
								left join T_FlightNoInfo c1 on c1.F_FlightNumber=t1.F_FlightNumber and c1.F_AirfieldId=t1.F_AirfieldId
								left join T_OrderBody c2 on t1.F_OrderNo=c2.F_OrderNo
								left join T_OrderLogisticsInfo t  on t.F_OrderNo=c2.F_ConsignmentNumber
								 where  t.F_LogState ='3')/COUNT(distinct a.F_OrderNo) YFJTime
							from T_EmployeeInfo e 
							left join T_OrderLogisticsInfo f on e.F_Code=f.F_SorterCode
							left join T_OrderBody b on b.F_ConsignmentNumber=f.F_OrderNo
							left join T_OrderHead a on b.F_OrderNo=a.F_OrderNo
                            WHERE 1=1 
							GROUP BY e.F_Name
        ";
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
                #endregion
                var rows = this.BaseRepository().FindList<SorterReportModel>(string.Format(sqlIn, strParm.ToString()), dp).ToList();
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
