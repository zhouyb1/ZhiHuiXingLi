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
                #region 查询语句(张)
                //                string sqlIn = @"
                //SELECT 
                //					COUNT(DISTINCT a.F_OrderNo) OrderNum,
                //					COUNT(DISTINCT b.F_ConsignmentNumber) ConsignmentNum ,
                //					SUM(b.F_Price) Amount,
                //					COUNT(DISTINCT a.F_OpenId) ClientNum,
                //					(select SUM(DATEDIFF(mi,c1.DateTimeEndReality,t.F_StateDateTime)) from T_OrderHead t1  
                //	left join T_FlightNoInfo c1 on c1.F_FlightNumber=t1.F_FlightNumber and c1.F_AirfieldId=t1.F_AirfieldId
                //	left join T_OrderBody c2 on t1.F_OrderNo=c2.F_OrderNo
                //	left join T_OrderLogisticsInfo t  on t.F_OrderNo=c2.F_ConsignmentNumber
                //	 where  t.F_LogState ='5')/COUNT(distinct a.F_OrderNo) ATAzqs,
                //	
                //	(select SUM(DATEDIFF(mi,c1.DateTimeEndReality,t.F_StateDateTime)) from T_OrderHead t1  
                //	left join T_FlightNoInfo c1 on c1.F_FlightNumber=t1.F_FlightNumber and c1.F_AirfieldId=t1.F_AirfieldId
                //	left join T_OrderBody c2 on t1.F_OrderNo=c2.F_OrderNo
                //	left join T_OrderLogisticsInfo t  on t.F_OrderNo=c2.F_ConsignmentNumber
                //	 where  t.F_LogState ='4')/COUNT(distinct a.F_OrderNo) ATAzkd,
                //	DATEDIFF(mi,
                //	(select t.F_StateDateTime from T_OrderLogisticsInfo t 
                //	where t.F_OrderNo=t.F_OrderNo And F_StateDescribe ='4'),
                //	(select t.F_StateDateTime from T_OrderLogisticsInfo t
                //	where t.F_OrderNo=t.F_OrderNo And F_StateDescribe ='5'))/COUNT(distinct a.F_OrderNo) Kdzqs	
                //	
                //					FROM T_OrderHead a 
                //							left join T_OrderBody b on a.F_OrderNo=b.F_OrderNo 
                //							left join T_FlightNoInfo c on a.F_AirfieldId=c.F_AirfieldId And a.F_FlightNumber=c.F_FlightNumber
                //							--left join T_OrderLogisticsInfo t on t.F_OrderNo=a.F_OrderNo
                //							left join T_OrderLogisticsInfo d on a.F_OrderNo=d.F_OrderNo And b.F_OrderNo=d.F_OrderNo
                //
                //					WHERE 
                //					1=1 
                //        ";
                //                var strParm = new StringBuilder();
                //                var queryParam = queryJson.ToJObject();
                //                // 虚拟参数
                //                var dp = new DynamicParameters(new { });
                //                if (!queryParam["StartTime"].IsEmpty() && !queryParam["EndTime"].IsEmpty())
                //                {
                //                    dp.Add("startTime", queryParam["StartTime"].ToDate(), DbType.DateTime);
                //                    dp.Add("endTime", queryParam["EndTime"].ToDate(), DbType.DateTime);
                //                    strParm.Append(" AND ( a.F_CreateTime >= @startTime AND a.F_CreateTime <= @endTime ) ");
                //                }
                //                if (!queryParam["F_FlightCompany"].IsEmpty())
                //                {
                //                    dp.Add("F_FlightCompany", queryParam["F_FlightCompany"].ToString(), DbType.String);
                //                    strParm.Append(" AND a.F_FlightCompany = @F_FlightCompany ");
                //                }
                #endregion

                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                var sqlIn = new StringBuilder();
                sqlIn.Append(@"SELECT COUNT(F_OrderNo)OrderNum,ISNULL(SUM(ConsignmentNum),0)ConsignmentNum,ISNULL(SUM(Amount),0) Amount,COUNT(DISTINCT F_OpenId) ClientNum,
                                ISNULL(SUM(kdtime)/(CASE COUNT(F_OrderNo) WHEN 0 THEN 1 ELSE COUNT(F_OrderNo) END),0) ATAzkd,''ATAzqs,'' Kdzqs
                                FROM (
                                SELECT 
                                a.F_OrderNo,
                                COUNT(b.F_ConsignmentNumber) ConsignmentNum,
                                (SELECT SUM(F_Amount) FROM T_OrderCollectMoney WHERE F_OrderNo=a.F_OrderNo) Amount,
                                a.F_OpenId
                                FROM dbo.T_OrderHead a 
                                LEFT JOIN dbo.T_OrderBody b ON b.F_OrderNo = a.F_OrderNo
                                WHERE 1=1 AND F_State IN ('4','5')");
                if (!queryParam["StartTime"].IsEmpty() && !queryParam["EndTime"].IsEmpty())
                {
                    var starttime = queryParam["StartTime"].ToDate().ToString("yyyy-MM-dd") + " 00:00:00";
                    var endtime = queryParam["EndTime"].ToDate().ToString("yyyy-MM-dd") + " 23:59:59";
                    dp.Add("startTime", starttime, DbType.String);
                    dp.Add("endTime", endtime, DbType.String);
                    sqlIn.Append(" AND ( a.F_CreateTime BETWEEN @startTime AND @endTime )");
                }
                if (!queryParam["F_FlightCompany"].IsEmpty())
                {
                    dp.Add("F_FlightCompany", "%" + queryParam["F_FlightCompany"].ToString() + "%", DbType.String);
                    sqlIn.Append(" AND a.F_FlightCompany LIKE @F_FlightCompany ");
                }
                sqlIn.Append(@" GROUP BY a.F_OrderNo,a.F_OpenId) t1
                                FULL JOIN
                                (
                                SELECT DISTINCT a.F_OrderNo OrderNo,
                                DATEDIFF(mi,f.DateTimeEndReality,t.F_StateDateTime) kdtime
                                FROM dbo.T_OrderLogisticsInfo t LEFT JOIN dbo.T_OrderBody b ON b.F_ConsignmentNumber = t.F_OrderNo
                                LEFT JOIN dbo.T_OrderHead a ON a.F_OrderNo = b.F_OrderNo
                                LEFT JOIN dbo.T_FlightNoInfo f ON f.F_FlightNumber = a.F_FlightNumber AND f.F_AirfieldId = a.F_AirfieldId
                                WHERE t.F_LogState='4'");
                if (!queryParam["StartTime"].IsEmpty() && !queryParam["EndTime"].IsEmpty())
                {
                    var starttime = queryParam["StartTime"].ToDate().ToString("yyyy-MM-dd") + " 00:00:00";
                    var endtime = queryParam["EndTime"].ToDate().ToString("yyyy-MM-dd") + " 23:59:59";
                    dp.Add("startTime", starttime, DbType.String);
                    dp.Add("endTime", endtime, DbType.String);
                    sqlIn.Append(" AND ( a.F_CreateTime BETWEEN @startTime AND @endTime )");
                }
                sqlIn.Append(") t2 ON t2.OrderNo = t1.F_OrderNo");
                var rows = this.BaseRepository().FindList<OrderSumReportModel>(sqlIn.ToString(), dp).ToList();
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
                var sqlIn = new StringBuilder();
                sqlIn.Append(@"SELECT OrderNum,ConsignmentNum,ISNULL(ChargeMoney,0)ChargeMoney,ISNULL(ThirdMoney,0)ThirdMoney,
                                (ChargeMoney-ISNULL(ThirdMoney,0))GrossProfit,
                                OrderDate FROM (
                                SELECT 
                                a.F_OrderNo OrderNum,
                                COUNT(DISTINCT b.F_ConsignmentNumber) ConsignmentNum,
                                (SELECT SUM(F_Amount) FROM T_OrderCollectMoney WHERE F_OrderNo=a.F_OrderNo) ChargeMoney,
                                (SELECT SUM(F_SingleAmount) FROM dbo.T_OrderPayMoney WHERE F_OrderNo=a.F_OrderNo)ThirdMoney,
                                a.F_CreateTime OrderDate,a.F_FlightCompany
                                FROM T_OrderHead a 
                                left join T_OrderBody b on a.F_OrderNo=b.F_OrderNo
                                left join T_FlightNoInfo c on a.F_AirfieldId=c.F_AirfieldId And a.F_FlightNumber=c.F_FlightNumber
                                Group by a.F_OrderNo,a.F_CreateTime,a.F_FlightCompany) t WHERE 1=1");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["StartTime"].IsEmpty() && !queryParam["EndTime"].IsEmpty())
                {
                    var starttime = queryParam["StartTime"].ToDate().ToString("yyyy-MM-dd") + " 00:00:00";
                    var endtime = queryParam["EndTime"].ToDate().ToString("yyyy-MM-dd") + " 23:59:59";
                    dp.Add("startTime", starttime, DbType.String);
                    dp.Add("endTime", endtime, DbType.String);
                    sqlIn.Append(" AND (t.OrderDate >= @startTime AND t.OrderDate<= @endTime)");
                }
                if (!queryParam["F_FlightCompany"].IsEmpty())
                {
                    dp.Add("F_FlightCompany", "%" + queryParam["F_FlightCompany"].ToString() + "%", DbType.String);
                    sqlIn.Append(" AND t.F_FlightCompany LIKE @F_FlightCompany ");
                }
                #endregion
                var rows = this.BaseRepository().FindList<FinanceReportModel>(sqlIn.ToString(), dp).ToList();
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

                #region
//                string sqlIn = @"
//                            select 
//								distinct e.F_Name FJYName,
//								COUNT(a.F_OrderNo) JDNum,
//								COUNT(case when f.F_LogState!=41 then 51 end) XLNum,
//								COUNT(case when f.F_LogState =41 then 51 end) YCXLNum,
//								(select SUM(DATEDIFF(mi,c1.DateTimeEndReality,t.F_StateDateTime)) from T_OrderHead t1  
//								left join T_FlightNoInfo c1 on c1.F_FlightNumber=t1.F_FlightNumber and c1.F_AirfieldId=t1.F_AirfieldId
//								left join T_OrderBody c2 on t1.F_OrderNo=c2.F_OrderNo
//								left join T_OrderLogisticsInfo t  on t.F_OrderNo=c2.F_ConsignmentNumber
//								 where  t.F_LogState ='3')/COUNT(distinct a.F_OrderNo) YFJTime
//							from T_EmployeeInfo e 
//							left join T_OrderLogisticsInfo f on e.F_Code=f.F_SorterCode
//							left join T_OrderBody b on b.F_ConsignmentNumber=f.F_OrderNo
//							left join T_OrderHead a on b.F_OrderNo=a.F_OrderNo
//                            WHERE 1=1 and f.F_SorterCode is not null
//							GROUP BY e.F_Name
//        ";
                #endregion
                var sqlIn = new StringBuilder();
                sqlIn.Append(@"SELECT FJYName,JDNum,XLNum,YCXLNum,YFJTime FROM (
                                SELECT (FB_Name) FJYName,COUNT(F_OrderNo)JDNum,SUM(Num)XLNum,SUM(YCNum)YCXLNum
                                FROM (
                                SELECT FB_Name,a.F_OrderNo,
                                (SELECT COUNT(*) FROM dbo.T_OrderBody WHERE F_OrderNo=a.F_OrderNo)Num,
                                (SELECT COUNT(*) FROM dbo.T_OrderBody WHERE F_OrderNo=a.F_OrderNo AND dbo.T_OrderBody.FB_State IN('41','51'))YCNum
                                FROM dbo.T_OrderHead a
                                LEFT JOIN dbo.T_OrderBody b ON a.F_OrderNo = b.F_OrderNo
                                WHERE b.FB_Name IS NOT NULL AND a.F_CreateTime BETWEEN @startTime AND @endTime
                                GROUP BY FB_Name,a.F_OrderNo) t
                                GROUP BY FB_Name )tb1
                                FULL JOIN
                                (
                                SELECT FB_Name,SUM(FJTime)/COUNT(*) YFJTime FROM (
                                SELECT DISTINCT t1.F_OrderNo,c2.FB_Name, (DATEDIFF(mi,c1.DateTimeEndReality,t.F_StateDateTime)) FJTime FROM T_OrderHead t1 
                                LEFT JOIN T_FlightNoInfo c1 ON c1.F_FlightNumber=t1.F_FlightNumber and c1.F_AirfieldId=t1.F_AirfieldId
                                LEFT JOIN T_OrderBody c2 ON t1.F_OrderNo=c2.F_OrderNo
                                LEFT JOIN T_OrderLogisticsInfo t ON t.F_OrderNo=c2.F_ConsignmentNumber AND t.F_StateOperator=c2.FB_Name
                                WHERE t.F_LogState ='3' AND t1.F_CreateTime BETWEEN @startTime AND @endTime )k GROUP BY FB_Name) 
                                tb2 ON tb1.FJYName=tb2.FB_Name");
                var strParm = new StringBuilder();
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
                #endregion
                var rows = this.BaseRepository().FindList<SorterReportModel>(sqlIn.ToString(), dp).ToList();
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
