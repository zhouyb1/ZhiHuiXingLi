using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi;
using Ayma.Application.TwoDevelopment.TwoDev;
using Ayma.DataBase.Repository;
using Ayma.Util;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer
{
    public partial class SmallProgramServerApiService : RepositoryFactory
    {

        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="F_AirfieldId">机场ID</param>
        /// <param name="F_OrderNo">订单号</param>
        /// <param name="F_State_Old">原状态值</param>
        /// <param name="F_State_New">新状态值</param>
        /// <param name="Operator">操作人</param>
        /// <param name="errCode">成功状态  100  成功</param>
        /// <param name="errText">提示信息</param>
        internal void SubmitUpdateOrderState(string F_AirfieldId, string F_OrderNo, string F_State_Old, string F_State_New, string Operator, out int errCode, out string errText)
        {
            errCode = 100;
            errText = "执行成功";
        }

        /// <summary>
        /// 查询订单是否存在
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        public IEnumerable<T_OrderBodyEntity> GetConsignmentNumber(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindList<T_OrderBodyEntity>(c => c.F_ConsignmentNumber == keyValue);
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
        /// 填写快递公司,单号,费用信息
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public void ExpressInformations(string OrderNo, List<string> ConNumber, string ExpressCompanyId, string ExpressNO, string PayType, string Amount, out string errText)
        {
            try
            {
                foreach (var item in ConNumber)
                {
                    var InSql = new StringBuilder();
                    InSql.Append(@"INSERT  INTO dbo.T_OrderPayMoney
                                            ( F_Id ,
                                                F_OrderNo ,
                                                F_ConsignmentNumber ,
                                                F_ExpressCompanyId ,
                                                F_ExpressNO ,
                                                F_PayType,
                                                F_Amount  
                                            )
                                    VALUES  ( @F_Id,
                                                @F_OrderNo,
                                                @F_ConsignmentNumber ,
                                                @F_ExpressCompanyId,
                                                @F_ExpressNO ,
                                                @F_PayType,
                                                @F_Amount
                                            )");
                    var param = new DynamicParameters(new { });
                    param.Add("@F_Id", Guid.NewGuid().ToString());
                    param.Add("@F_OrderNo", OrderNo);
                    param.Add("@F_ConsignmentNumber", item);
                    param.Add("@F_ExpressCompanyId", ExpressCompanyId);
                    param.Add("@F_ExpressNO", ExpressNO);
                    param.Add("@F_PayType", PayType);
                    param.Add("@F_Amount", Amount);
                    this.BaseRepository().ExecuteBySql(InSql.ToString(), param);
                }
                errText = "保存成功!";
            }
            catch (Exception ex)
            {
                errText = "保存失败!";
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
        /// 修改订单状态
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        /// <param name="errText"></param>
        public void UpdateOrderStatus(string OrderNo,List<string> ConsignmentNumber, string status, string Operator, out string errText)
        {
            try
            {
                T_EmployeeInfoEntity entity = this.BaseRepository().FindEntity<T_EmployeeInfoEntity>(c => c.F_Code == Operator);  //获取拣货员信息
                var F_Name = "";
                var F_Phone = "";
                if (entity != null)
                {
                    F_Name = entity.F_Name;           //分拣员姓名
                    F_Phone = entity.F_Phone;        //分拣员电话
                }
                foreach (var item in ConsignmentNumber)
                {
                    var strSql = new StringBuilder();
                    strSql.Append(@"UPDATE T_OrderBody SET FB_State=@Status,FB_Name=@FB_Name,FB_Phone=@FB_Phone WHERE F_ConsignmentNumber=@ConsignmentNumber");
                    var dp = new DynamicParameters(new { });
                    dp.Add("@ConsignmentNumber", item);
                    dp.Add("@Status", status);
                    dp.Add("@FB_Name", F_Name);
                    dp.Add("@FB_Phone", F_Phone);
                    this.BaseRepository().ExecuteBySql(strSql.ToString(), dp);

                    var StateDescribe = "";
                    switch (status)
                    {
                        case "1":
                            StateDescribe = "未分拣";
                            break;
                        case "2":
                            StateDescribe = "分拣中";
                            break;
                        case "3":
                            StateDescribe = "行李分拣完成";
                            break;
                        case "4":
                            StateDescribe = "运输中";
                            break;
                        case "5":
                            StateDescribe = "已完成";
                            break;
                        case "41":
                            StateDescribe = "分拣异常";
                            break;
                        case "51":
                            StateDescribe = "出港异常";
                            break;
                    }
                    var InSql = new StringBuilder();
                    InSql.Append(@"INSERT  INTO dbo.T_OrderLogisticsInfo
                                            ( F_Id ,
                                                F_OrderNo ,
                                                F_StateDescribe ,
                                                F_LogState,
                                                F_StateDateTime ,
                                                F_StateOperator ,
                                                F_SorterCode,
                                                F_CustomerOpen  
                                            )
                                    VALUES  ( @F_Id,
                                                @F_OrderNo,
                                                @F_StateDescribe ,
                                                @F_LogState,
                                                @F_StateDateTime,
                                                @F_StateOperator ,
                                                @F_SorterCode,
                                                @F_CustomerOpen
                                            )");
                    var param = new DynamicParameters(new { });
                    param.Add("@F_Id", Guid.NewGuid().ToString());
                    param.Add("@F_OrderNo", item);
                    param.Add("@F_StateDescribe", StateDescribe);
                    param.Add("@F_LogState", status);
                    param.Add("@F_StateDateTime", DateTime.Now.ToString());
                    param.Add("@F_StateOperator", F_Name);
                    param.Add("@F_SorterCode", Operator);
                    param.Add("@F_CustomerOpen", "1");
                    this.BaseRepository().ExecuteBySql(InSql.ToString(), param);
                }
              
                     var State = "";
                     var strUpdate = new StringBuilder();
                     if (status == "41" || status == "51")
                     {
                         State = status;              //如果行李号有异常，即把订单状态改为异常
           
                         strUpdate.Append(@"UPDATE T_OrderHead SET F_State=@F_State WHERE F_OrderNo=@F_OrderNo");
                         var par = new DynamicParameters(new { });
                         par.Add("@F_State", State);
                         par.Add("@F_OrderNo", OrderNo);
                         this.BaseRepository().ExecuteBySql(strUpdate.ToString(), par);
                     }
                     else
                     {
                         var list = this.BaseRepository().FindList<T_OrderBodyEntity>(c => c.F_OrderNo == OrderNo).OrderByDescending(c => c.FB_State);
                         State = list.Last().FB_State; //获取订单下最后一个行李号的状态
                         if (!list.Any(c => c.FB_State == "41" || c.FB_State == "51"))    //如果不存在异常的行李号,将最后一个行李号的状态作为订单状态
                         {
                             strUpdate.Append(@"UPDATE T_OrderHead SET F_State=@F_State WHERE F_OrderNo=@F_OrderNo");
                             var par = new DynamicParameters(new { });
                             par.Add("@F_State", State);
                             par.Add("@F_OrderNo", OrderNo);
                             this.BaseRepository().ExecuteBySql(strUpdate.ToString(), par);
                         }
                     }
                     errText = "修改成功!";
            }
            catch (Exception ex)
            {
                errText = "修改失败!";
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
        /// 批量修改订单状态（未分拣-分拣中）
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="Operator"></param>
        /// <param name="errText"></param>
        public void UpdateBatchOrderStatus(List<string> OrderList, List<string> ConNumberList, string status, string Operator, out string errText)
        {
            try
            {
                T_EmployeeInfoEntity entity = this.BaseRepository().FindEntity<T_EmployeeInfoEntity>(c => c.F_Code == Operator);  //获取拣货员信息
                var F_Name = "";
                var F_Phone = "";
                if (entity != null)
                {
                    F_Name = entity.F_Name;           //分拣员姓名
                    F_Phone = entity.F_Phone;        //分拣员电话
                }
                foreach (var item in ConNumberList)
                {
                    var strSql = new StringBuilder();
                    strSql.Append(@"UPDATE T_OrderBody SET FB_State=@Status,FB_Name=@FB_Name,FB_Phone=@FB_Phone WHERE F_ConsignmentNumber=@ConsignmentNumber");
                    var dp = new DynamicParameters(new { });
                    dp.Add("@Status", status);
                    dp.Add("@ConsignmentNumber", item);
                    dp.Add("@FB_Name", F_Name);
                    dp.Add("@FB_Phone", F_Phone);
                    this.BaseRepository().ExecuteBySql(strSql.ToString(), dp);

                    var StateDescribe = "";
                    switch (status)
                    {
                        case "3":
                            StateDescribe = "行李分拣完成";
                            break;
                    }

                    var InSql = new StringBuilder();
                    InSql.Append(@"INSERT  INTO dbo.T_OrderLogisticsInfo
                                            ( F_Id ,
                                                F_OrderNo ,
                                                F_StateDescribe ,
                                                F_LogState,
                                                F_StateDateTime ,
                                                F_StateOperator ,
                                                F_SorterCode,
                                                F_CustomerOpen  
                                            )
                                    VALUES  ( @F_Id,
                                                @F_OrderNo,
                                                @F_StateDescribe ,
                                                @F_LogState,
                                                @F_StateDateTime,
                                                @F_StateOperator ,
                                                @F_SorterCode,
                                                @F_CustomerOpen
                                            )");
                    var param = new DynamicParameters(new { });
                    param.Add("@F_Id", Guid.NewGuid().ToString());
                    param.Add("@F_OrderNo", item);
                    param.Add("@F_StateDescribe", StateDescribe);
                    param.Add("@F_LogState", status);
                    param.Add("@F_StateDateTime", DateTime.Now.ToString());
                    param.Add("@F_StateOperator", F_Name);
                    param.Add("@F_SorterCode", Operator);
                    param.Add("@F_CustomerOpen", "1");
                    this.BaseRepository().ExecuteBySql(InSql.ToString(), param);
                }

                foreach (var OrderNo in OrderList)
                {
                    var updateSql = new StringBuilder();
                    updateSql.Append(@"UPDATE T_OrderHead SET F_State=@Status WHERE F_OrderNo=@OrderNo");
                    var dp = new DynamicParameters(new { });
                    dp.Add("@Status", status);
                    dp.Add("@OrderNo", OrderNo);
                    this.BaseRepository().ExecuteBySql(updateSql.ToString(), dp);
                }
                errText = "修改成功!";
            }
            catch (Exception ex)
            {
                errText = "修改失败!";
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
        /// 根据订单状态查询订单列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public IEnumerable<OrderList> GetOrderListByStatus(string status)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT DISTINCT h.F_FlightNumber,h.F_AirfieldFloor,h.F_OrderDate,F_State,h.F_OrderNo,
                                DateTimeEnd,f.F_ConveyorNumber,
                                F_FareName,F_FarePhone
                                FROM dbo.T_OrderHead h 
                                LEFT JOIN dbo.T_FlightNoInfo f ON f.F_AirfieldId = h.F_AirfieldId AND f.F_FlightCompany = h.F_FlightCompany AND f.F_FlightNumber = h.F_FlightNumber
                                WHERE F_State IN ('1','2','3','4','5','41','51') ");
                strSql.Append(" AND h.F_OrderDate BETWEEN @DateBegin AND @DateEnd");
                if (!string.IsNullOrEmpty(status))
                {
                    strSql.Append(" And F_State=@F_State");
                }
                strSql.Append(" ORDER BY h.F_OrderDate DESC");
                var dp = new DynamicParameters(new { });
                dp.Add("@DateBegin", DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00");
                dp.Add("@DateEnd", DateTime.Now.ToString("yyyy-MM-dd") + " 23:59:59");
                if (!string.IsNullOrEmpty(status))
                {
                    dp.Add("@F_State", status);
                }
                var list = this.BaseRepository().FindList<OrderList>(strSql.ToString(), dp).ToList();
                list.ForEach(c => c.CNumberList = GetConsignmentNumberByNo(c.F_OrderNo).ToList());
               return list;
                
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
        /// 根据手机号获取订单列表
        /// </summary>
        /// <param name="Phone"></param>
        /// <returns></returns>
        public IEnumerable<OrderList> GetOrderListByPhone(string Phone)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT DISTINCT h.F_FlightNumber,h.F_AirfieldFloor,h.F_OrderDate,F_State,h.F_OrderNo,
                                DateTimeEnd,f.F_ConveyorNumber,
                                F_FareName,F_FarePhone
                                FROM dbo.T_OrderHead h 
                                LEFT JOIN dbo.T_FlightNoInfo f ON f.F_AirfieldId = h.F_AirfieldId AND f.F_FlightCompany = h.F_FlightCompany AND f.F_FlightNumber = h.F_FlightNumber
                                WHERE F_State IN ('1','2','3','4','5','41','51') And F_CustomerPhone=@Phone");
                strSql.Append(" AND h.F_OrderDate BETWEEN @DateBegin AND @DateEnd");
                strSql.Append(" ORDER BY h.F_OrderDate DESC");
                var dp = new DynamicParameters(new { });
                dp.Add("@Phone", Phone);
                dp.Add("@DateBegin", DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00");
                dp.Add("@DateEnd", DateTime.Now.ToString("yyyy-MM-dd") + " 23:59:59");
                var list = this.BaseRepository().FindList<OrderList>(strSql.ToString(), dp).ToList();
                list.ForEach(c => c.CNumberList = GetConsignmentNumberByNo(c.F_OrderNo).ToList());
                return list;
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
        /// 根据航班号获取行李号列表
        /// </summary>
        /// <param name="FlightNumber"></param>
        /// <returns></returns>
        public IEnumerable<ConsignmentNumberList> GetConNumberListByFNo(string FlightNumber, string OrderDate)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT b.F_OrderNo,F_ConsignmentNumber,FB_State FROM dbo.T_OrderBody b
                                LEFT JOIN dbo.T_OrderHead h ON h.F_OrderNo = b.F_OrderNo
                                WHERE 1=1");
                if (!string.IsNullOrEmpty(FlightNumber))
                {
                    strSql.Append(" AND F_FlightNumber=@FlightNumber");
                }
                if (!string.IsNullOrEmpty(OrderDate))
                {
                    strSql.Append(" AND h.F_OrderDate BETWEEN @DateBegin AND @DateEnd");
                }
                strSql.Append(" ORDER BY h.F_OrderDate DESC");
                var dp = new DynamicParameters(new { });
                dp.Add("@FlightNumber", FlightNumber);
                dp.Add("@DateBegin", OrderDate + " 00:00:00");
                dp.Add("@DateEnd", OrderDate + " 23:59:59");
                return this.BaseRepository().FindList<ConsignmentNumberList>(strSql.ToString(), dp);
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


        public IEnumerable<ConsignmentNumber> GetConsignmentNumberByNo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT F_ConsignmentNumber,FB_State FROM dbo.T_OrderBody WHERE F_OrderNo=@OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                return this.BaseRepository().FindList<ConsignmentNumber>(strSql.ToString(), dp);
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

        public IEnumerable<ExpressNo> GetExpressNumberByNo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT F_ConsignmentNumber,F_ExpressNO,F_ExpressCompanyId,F_Amount FROM dbo.T_OrderPayMoney WHERE F_OrderNo=@OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                return this.BaseRepository().FindList<ExpressNo>(strSql.ToString(), dp);
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

        public IEnumerable<Employee> GetEmployeeInfoByNo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT DISTINCT FB_Name,FB_Phone FROM T_OrderBody WHERE F_OrderNo=@OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                return this.BaseRepository().FindList<Employee>(strSql.ToString(), dp);
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
        /// 获取所有快递公司记录
        /// </summary>
        /// <returns></returns>
        public IEnumerable<T_ExpressCompanyEntity> GetExpressCompany()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"select F_ExpressCompanyName from T_ExpressCompany WHERE 1=1");
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<T_ExpressCompanyEntity>(strSql.ToString(), dp);
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
        /// 根据行李号,订单号,电话号码获取订单详细
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<SerOrderDetailModelApi> SerGetOrderDetailByNo(string ConsignmentNumber, string OrderNo, string CustPhone)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT DISTINCT F_FlightNumber,F_State,h.F_OrderNo,F_OrderDate,F_AirfieldFloor,F_CustomerName,
                                (SELECT sum (F_Qty) FROM T_OrderBody WHERE F_OrderNo=h.F_OrderNo) F_Qty,
                                F_CustomerPhone,F_CustomerAddress,F_Stype,F_IsUrgent
                                FROM dbo.T_OrderHead h
                                LEFT JOIN dbo.T_OrderBody b ON b.F_OrderNo = h.F_OrderNo
                                WHERE 1=1 AND F_OrderDate BETWEEN @DateStart AND @DateEnd");
                 var dp = new DynamicParameters(new { });
                 dp.Add("@DateStart", DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00");
                 dp.Add("@DateEnd", DateTime.Now.ToString("yyyy-MM-dd") + " 23:59:59");
                if (!string.IsNullOrEmpty(ConsignmentNumber))
                {
                    strSql.Append(" AND b.F_ConsignmentNumber=@ConsignmentNumber");
                    dp.Add("@ConsignmentNumber", ConsignmentNumber);
                }
                if (!string.IsNullOrEmpty(OrderNo))
                {
                    strSql.Append(" AND h.F_OrderNo=@F_OrderNo");
                    dp.Add("@F_OrderNo", OrderNo);
                }
                if (!string.IsNullOrEmpty(CustPhone))
                {
                    strSql.Append(" AND h.F_CustomerPhone=@CustPhone");
                    dp.Add("@CustPhone", CustPhone);
                }
                var list = this.BaseRepository().FindList<SerOrderDetailModelApi>(strSql.ToString(), dp).ToList();
                list.ForEach(c => c.CNumberList = GetConsignmentNumberByNo(c.F_OrderNo).ToList());
                list.ForEach(c => c.ExpressNoList = GetExpressNumberByNo(c.F_OrderNo).ToList());
                list.ForEach(c => c.EmployeeInfo = GetEmployeeInfoByNo(c.F_OrderNo).ToList());
                return list;
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
        /// 根据航班号获取航班列表
        /// </summary>
        /// <param name="FlightNumber"></param>
        /// <returns></returns>
        public IEnumerable<GetFlightListByFNo> SerGetFlightList(string FlightNumber)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT  h.F_FlightCompany ,
                                        h.F_FlightNumber ,
                                        f.AddressBegin ,
                                        f.AddressEnd ,
                                        f.DateTimeEnd ,
                                        f.DateTimeEndReality ,
                                        f.F_ConveyorNumber ,
                                        f.F_Placement ,
                                        SUM(F_Qty) TotalQty,
                                        (SELECT COUNT(*) FROM dbo.T_OrderHead WHERE F_FlightNumber=@F_FlightNumber  
                                         AND F_OrderDate BETWEEN @StartTime AND @EndTime
                                         AND F_State NOT IN ('0','-1','-2','-3')) TotalOrder
                                FROM    T_OrderHead h
                                        LEFT JOIN dbo.T_OrderBody b ON b.F_OrderNo = h.F_OrderNo
                                        LEFT JOIN T_FlightNoInfo f ON f.F_FlightNumber = h.F_FlightNumber
                                WHERE   1 = 1 AND h.F_State NOT IN ('0','-1','-2','-3')");
                if (!string.IsNullOrEmpty(FlightNumber))
                {
                    strSql.Append(" AND h.F_FlightNumber=@F_FlightNumber");
                }
                strSql.Append(" AND h.F_OrderDate BETWEEN @StartTime AND @EndTime");
                strSql.Append(" GROUP BY h.F_FlightCompany,h.F_FlightNumber,AddressBegin,AddressEnd,DateTimeEnd,DateTimeEndReality,F_ConveyorNumber,F_Placement ");
                strSql.Append(" ORDER BY DateTimeEnd DESC");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_FlightNumber", FlightNumber);
                dp.Add("@StartTime", DateTime.Now.ToString("yyyy-MM-dd")+" 00:00:00");
                dp.Add("@EndTime", DateTime.Now.ToString("yyyy-MM-dd") + " 23:59:59");
                return this.BaseRepository().FindList<GetFlightListByFNo>(strSql.ToString(), dp);
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
        /// 根据航班号或航班号+日期查询订单查询订单列表
        /// </summary>
        /// <param name="FlightNumber"></param>
        /// <returns></returns>
        public IEnumerable<GetFlightListByDate> ReasonNoMessage(string FlightNumber, string OrderDate)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT DISTINCT
                                A.F_FlightNumber,
                                A.F_AirfieldFloor,
                                A.F_OrderNo,
                                A.F_OrderDate,
                                c.DateTimeEnd,
                                c.F_ConveyorNumber,
                                A.F_State
                                from T_OrderHead A LEFT JOIN T_OrderBody B on
                                A.F_OrderNo=b.F_OrderNo
                                LEFT JOIN T_FlightNoInfo c ON A.F_FlightNumber=c.F_FlightNumber
                                LEFT JOIN dbo.T_AirfieldInfo d ON d.F_Id=A.F_AirfieldId
                                WHERE 1=1");
                if (!string.IsNullOrEmpty(FlightNumber))
                {
                    strSql.Append(" AND A.F_FlightNumber=@F_FlightNumber");
                }
                if (!string.IsNullOrEmpty(OrderDate))
                {
                    strSql.Append(" AND A.F_OrderDate BETWEEN @DateStart AND @DateEnd");
                }
                strSql.Append(" ORDER BY A.F_OrderDate DESC");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_FlightNumber", FlightNumber);
                dp.Add("@DateStart", OrderDate + " 00:00:00");
                dp.Add("@DateEnd", OrderDate + " 23:59:59");
                var list = this.BaseRepository().FindList<GetFlightListByDate>(strSql.ToString(), dp).ToList();
                list.ForEach(c => c.CNumberList = GetConsignmentNumberByNo(c.F_OrderNo).ToList());
                return list;
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
        /// 根据订单号获取时间节点
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public IEnumerable<OrderLogisticsInfo> GetOrderLogisticsInfo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT  DISTINCT a.F_OrderNo        
                                FROM    dbo.T_OrderLogisticsInfo a
                                LEFT JOIN dbo.T_OrderBody b ON b.F_ConsignmentNumber=a.F_OrderNo
                                WHERE   b.F_OrderNo=@OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                var list = this.BaseRepository().FindList<OrderLogisticsInfo>(strSql.ToString(), dp).ToList();
                list.ForEach(c => c.LogisticsInfo = GetLogisticsInfo(c.F_OrderNo).ToList());
                return list;
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

        public IEnumerable<LogisticsInfo> GetLogisticsInfo(string ConNumber)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT  F_StateDescribe ,
                                        F_LogState ,
                                        F_StateDateTime ,
                                        F_StateOperator
                                FROM    T_OrderLogisticsInfo
                                WHERE   F_LogState NOT IN('-1','-3','5') AND F_OrderNo=@ConsignmentNumber");
                var dp = new DynamicParameters(new { });
                dp.Add("@ConsignmentNumber", ConNumber);
                return this.BaseRepository().FindList<LogisticsInfo>(strSql.ToString(), dp);
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
        /// 分拣员登录  EmployeeInfoModelApi
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="PassWord"></param>
        public T_EmployeeInfoEntity SorterLogin(string Code, string PassWord, out string errText)
        {
            try
            {
                errText = "登录成功";
                return this.BaseRepository().FindEntity<T_EmployeeInfoEntity>(c => c.F_Code == Code && c.F_PassWord == PassWord);
            }
            catch (Exception ex)
            {
                errText = "登录失败";
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
