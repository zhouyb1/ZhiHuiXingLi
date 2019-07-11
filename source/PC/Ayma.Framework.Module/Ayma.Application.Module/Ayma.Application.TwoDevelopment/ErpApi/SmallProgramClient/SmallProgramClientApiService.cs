using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
using Ayma.Application.TwoDevelopment.TwoDev;
using Ayma.DataBase.Repository;
using Ayma.Util;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient
{
    public partial class SmallProgramClientApiService : RepositoryFactory
    {

        private AirportMessageService airportService = new AirportMessageService();
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
        /// 根据机场Id获取航站楼
        /// </summary>
        /// <param name="F_AirfieldId"></param>
        /// <returns></returns>
        public IEnumerable<T_AirfieldFloor> GetFlightFloorById(string F_AirfieldId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT F_Id,F_AirfieParentId,F_AirfieldName,F_ExpressCompanyName FROM dbo.T_AirfieldFloor WHERE F_AirfieParentId=@F_AirfieldId");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_AirfieldId", F_AirfieldId);
                return this.BaseRepository().FindList<T_AirfieldFloor>(strSql.ToString(), dp);
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
        /// 根据航班号模糊查询航班信息
        /// </summary>
        /// <param name="FlightNumber"></param>
        /// <returns></returns>
        public IEnumerable<GetFlightMessage> GetFlightMessage(string F_AirfieldId, string FlightNumber)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT F_AirfieldId,F_FlightNumber,F_AirfieldFloorBegin,AddressBegin,F_AirfieldBegin,F_AirfieldFloor,AddressEnd,F_AirfieldEnd,F_FlightCompany
                                FROM T_FlightNoInfo WHERE F_AirfieldId=@F_AirfieldId AND F_FlightNumber LIKE '%'+@FlightNumber+'%'");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_AirfieldId", F_AirfieldId);
                dp.Add("@FlightNumber", FlightNumber);
                return this.BaseRepository().FindList<GetFlightMessage>(strSql.ToString(), dp);
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
        /// 根据openId获取订单列表  按订单日期(F_OrderDate) 倒序
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public IEnumerable<OrderModelApi> GetOrderList(string openId, string status)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT    h.F_OrderNo ,
                                        (case when F_State='41' then '3' when F_State='51'then '4' else F_State end)   F_State ,
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
                if (!string.IsNullOrEmpty(status))
                {
                    strSql.Append(" And F_State=@F_State");
                }
                strSql.Append("  GROUP BY  h.F_OrderNo , F_State ,F_FlightNumber , F_OrderDate order by F_OrderDate desc ");                    
                var dp = new DynamicParameters(new { });
                dp.Add("@OpenId",openId);
                if (!string.IsNullOrEmpty(status))
                {
                    dp.Add("@F_State", status);
                }
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

        /// <summary>
        /// 根据openId获取旅客常用地址
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public IEnumerable<T_AddressModelApi> GetAddressById(string openId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT F_Id,F_Address,F_OpenId,F_Name,F_Phone FROM dbo.T_Address WHERE F_OpenId=@F_OpenId");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_OpenId", openId);
                return this.BaseRepository().FindList<T_AddressModelApi>(strSql.ToString(), dp);
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
        /// 根据订单状态查询订单列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        #region
        //public IEnumerable<OrderModelApi> GetOrderListByStatus(string openId, string status)
//        {
//            try
//            {
//                var strSql = new StringBuilder();
//                strSql.Append(@"SELECT    h.F_OrderNo ,
//                                        F_State ,
//                                        F_FlightNumber ,
//                                        F_OrderDate ,
//                                        ( SELECT    SUM(F_Qty)
//                                            FROM      dbo.T_OrderBody
//                                            WHERE     dbo.T_OrderBody.F_OrderNo = h.F_OrderNo
//                                        ) qty
//                                FROM      dbo.T_OrderHead h
//                                        LEFT JOIN dbo.T_OrderBody b ON b.F_OrderNo = h.F_OrderNo
//                                        WHERE 1=1");
//                strSql.Append(" And F_OpenId=@OpenId");
//                strSql.Append(" And F_State=@F_State");
//                strSql.Append(" GROUP BY  h.F_OrderNo , F_State ,F_FlightNumber , F_OrderDate");
//                var dp = new DynamicParameters(new { });
//                dp.Add("@OpenId", openId);
//                dp.Add("@F_State", status);
//                return this.BaseRepository().FindList<OrderModelApi>(strSql.ToString(), dp);
//            }
//            catch (Exception ex)
//            {
//                if (ex is ExceptionEx)
//                {
//                    throw;
//                }
//                else
//                {
//                    throw ExceptionEx.ThrowServiceException(ex);
//                }
//            }
        //        }
        #endregion
        /// <summary>
        /// 根据订单号获取订单头
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<OrderHeadModelApi> GetOrderHeadByNo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT F_CustomerName,F_CustomerPhone,F_CustomerAddress,h.F_FlightNumber,F_OrderNo,F_State,AddressBegin,AddressEnd,F_IsUrgent
                            FROM dbo.T_OrderHead h
                            LEFT JOIN T_FlightNoInfo f ON f.F_FlightNumber = h.F_FlightNumber WHERE F_OrderNo=@OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                return this.BaseRepository().FindList<OrderHeadModelApi>(strSql.ToString(), dp);
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
        /// 根据订单号获取订单详细
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<OrderDetailsModelApi> GetOrderBodyByNo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT  a.F_OrderNo ,
                                        a.F_ConsignmentNumber ,
                                        F_Qty ,
                                        F_Price ,
                                        b.F_ExpressCompanyId,
                                        b.F_ExpressNO
                                FROM    T_OrderBody a
                                        LEFT JOIN dbo.T_OrderPayMoney b ON b.F_ConsignmentNumber = a.F_ConsignmentNumber  WHERE 1=1");
                strSql.Append(" AND a.F_OrderNo=@OrderNo");
                strSql.Append(" ORDER BY a.F_ConsignmentNumber");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                return this.BaseRepository().FindList<OrderDetailsModelApi>(strSql.ToString(), dp);
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
        public IEnumerable<ClientOrderLogisticsInfo> GetClientOrderLogisticsInfo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT  DISTINCT b.F_OrderNo        
                                FROM    dbo.T_OrderLogisticsInfo a
                                LEFT JOIN dbo.T_OrderBody b ON b.F_ConsignmentNumber=a.F_OrderNo
                                WHERE   b.F_OrderNo=@OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                var list = this.BaseRepository().FindList<ClientOrderLogisticsInfo>(strSql.ToString(), dp).ToList();
                list.ForEach(c => c.CliLogisticsInfo = GetLogisticsInfo(c.F_OrderNo).ToList());
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

        public IEnumerable<ClientLogisticsInfo> GetLogisticsInfo(string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT DISTINCT
                                        b.F_OrderNo ,
                                        F_StateDescribe ,
                                        F_LogState ,
                                        F_StateDateTime ,
                                        F_StateOperator
                                FROM    dbo.T_OrderLogisticsInfo a
                                        LEFT JOIN dbo.T_OrderBody b ON b.F_ConsignmentNumber = a.F_OrderNo
                                WHERE   F_LogState NOT IN ( '41', '51' )
                                        AND b.F_OrderNo =@OrderNo ");
                var dp = new DynamicParameters(new { });
                dp.Add("@OrderNo", OrderNo);
                return this.BaseRepository().FindList<ClientLogisticsInfo>(strSql.ToString(), dp);
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
        /// 根据机场Id获取运费计算规则
        /// </summary>
        /// <param name="F_AirfieldId"></param>
        /// <returns></returns>
        public DataTable GetFeeRule(string F_AirfieldId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT * FROM T_CustomerPayInfo  WHERE F_AirfieldId=@F_AirfieldId");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_AirfieldId", F_AirfieldId);
                return this.BaseRepository().FindTable(strSql.ToString(), dp);
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
        /// 提交订单
        /// </summary>
        /// <param name="SubmitOrderModelApi"></param>
        /// <param name="OrderNo"></param>
        /// <param name="errText"></param>
        public void SubmitOrder(BillMakeBaseModelAPi SubmitOrderModelApi, string OrderNo, out string errText)
        {
            //追加事务
            var db = this.BaseRepository().BeginTrans();
            try
            {
                //订单表头
                var strSql = new StringBuilder();
                strSql.Append(
                    @"INSERT INTO dbo.T_OrderHead ( F_Id ,F_AirfieldId ,F_AirfieldName ,F_AirfieldFloor ,F_FlightCompany , F_FlightNumber ,F_OrderDate , F_OrderNo ,
                              F_CustomerName ,F_CustomerPhone , F_CustomerAddress ,F_CustomerRemarks ,F_CreateStype ,F_State ,F_Stype ,F_CreateTime ,F_CreateUserName ,
                              F_StartStation,F_Longitude,F_Latitude,F_OpenId ,F_IsUrgent,F_FareName,F_FarePhone)
                              VALUES(@F_Id,@F_AirfieldId,@F_AirfieldName,@F_AirfieldFloor,@F_FlightCompany,@F_FlightNumber,@F_OrderDate,@F_OrderNo,@F_CustomerName,
                              @F_CustomerPhone,@F_CustomerAddress,@F_CustomerRemarks,@F_CreateStype,@F_State,@F_Stype,@F_CreateTime,@F_CreateUserName,@F_StartStation,
                              @F_Longitude,@F_Latitude,@F_OpenId,@F_IsUrgent,@F_FareName,@F_FarePhone)");
                var dp = new DynamicParameters(new {});
                dp.Add("@F_Id", Guid.NewGuid().ToString());
                dp.Add("@F_AirfieldId", SubmitOrderModelApi.Head.F_AirfieldId);
                dp.Add("@F_AirfieldName", SubmitOrderModelApi.Head.F_AirfieldName);
                dp.Add("@F_AirfieldFloor", SubmitOrderModelApi.Head.F_AirfieldFloor);
                dp.Add("@F_FlightCompany", SubmitOrderModelApi.Head.F_FlightCompany);
                dp.Add("@F_FlightNumber", SubmitOrderModelApi.Head.F_FlightNumber);
                dp.Add("@F_OrderDate", DateTime.Now);
                dp.Add("@F_OrderNo", OrderNo);
                dp.Add("@F_CustomerName", SubmitOrderModelApi.Head.F_CustomerName);
                dp.Add("@F_CustomerPhone", SubmitOrderModelApi.Head.F_CustomerPhone);
                dp.Add("@F_CustomerAddress", SubmitOrderModelApi.Head.F_CustomerAddress);
                dp.Add("@F_CustomerRemarks", SubmitOrderModelApi.Head.F_CustomerRemarks);
                dp.Add("@F_CreateStype", SubmitOrderModelApi.Head.F_CreateStype);
                dp.Add("@F_State", OrderStatus.待付款);
                dp.Add("@F_Stype", SubmitOrderModelApi.Head.F_Stype);
                dp.Add("@F_CreateTime", DateTime.Now);
                dp.Add("@F_CreateUserName", "system");
                //新增 2019年5月17日18:51:57
                dp.Add("@F_StartStation", SubmitOrderModelApi.Head.F_StartStation);//起点站
                dp.Add("@F_Longitude", SubmitOrderModelApi.Head.F_Longitude);//经度(寄件地址)
                dp.Add("@F_Latitude", SubmitOrderModelApi.Head.F_Latitude);//纬度(寄件地址)
                //
                dp.Add("@F_OpenId", SubmitOrderModelApi.Head.F_OpenId);
                dp.Add("@F_IsUrgent", SubmitOrderModelApi.Head.F_IsUrgent);
                dp.Add("@F_FareName", SubmitOrderModelApi.Head.F_FareName);
                dp.Add("@F_FarePhone", SubmitOrderModelApi.Head.F_FarePhone);
                db.ExecuteBySql(strSql.ToString(), dp);

                //保存地址到地址表
                var InsAddress = new StringBuilder();
                InsAddress.Append(@"IF NOT EXISTS (select F_Name from T_Address where F_Address=@F_Address and F_OpenId=@F_OpenId and F_Name=@F_Name and F_Phone=@F_Phone)
                Begin
	                INSERT INTO dbo.T_Address ( F_Id, F_Address, F_OpenId,F_Name,F_Phone ) VALUES (@F_Id, @F_Address, @F_OpenId,@F_Name,@F_Phone)
                END");
                var ad = new DynamicParameters(new { });
                ad.Add("@F_Id", Guid.NewGuid().ToString());
                ad.Add("@F_Address", SubmitOrderModelApi.Head.F_CustomerAddress);
                ad.Add("@F_OpenId", SubmitOrderModelApi.Head.F_OpenId);
                ad.Add("@F_Name", SubmitOrderModelApi.Head.F_CustomerName);
                ad.Add("@F_Phone", SubmitOrderModelApi.Head.F_CustomerPhone);
                db.ExecuteBySql(InsAddress.ToString(), ad);

                //两点之间的距离计算(计算机场与寄件地址的距离)规则
                //var endStation = airportService.GetT_AirfieldInfoEntity(SubmitOrderModelApi.Head.F_AirfieldId);
                //var distance = CommonHelper.GetDistance(endStation.F_Longitude.ToDouble(),
                //    endStation.F_Latitude.ToDouble(),
                //    SubmitOrderModelApi.Head.F_Longitude.ToDouble(), SubmitOrderModelApi.Head.F_Latitude.ToDouble());


                //订单内容
                foreach (var item in SubmitOrderModelApi.OrderDetails)
                {
                    var strInsert = new StringBuilder();
                    strInsert.Append(
                        @"INSERT INTO dbo.T_OrderBody ( F_Id ,F_OrderNo , F_ConsignmentNumber ,F_Weight ,F_Distance ,F_Price ,F_Qty,FB_State,F_IsDel )
                                    VALUES ( @F_Id ,@F_OrderNo , @F_ConsignmentNumber ,@F_Weight ,@F_Distance ,@F_Price ,@F_Qty ,@FB_State,@F_IsDel)
                                    ");
                    var para = new DynamicParameters(new {});
                    para.Add("@F_Id", Guid.NewGuid().ToString());
                    para.Add("@F_OrderNo", OrderNo);
                    para.Add("@F_ConsignmentNumber", item.F_ConsignmentNumber);
                    para.Add("@F_Weight", item.F_Weight);
                    para.Add("@F_Distance", item.F_Distance);
                    para.Add("@F_Price", item.F_Price);
                    para.Add("@F_Qty", item.F_Qty);
                    para.Add("@FB_State", OrderStatus.待付款);
                    para.Add("@F_IsDel", 0);
                    db.ExecuteBySql(strInsert.ToString(), para);
                }
                db.Commit();
                errText = "订单提交成功!";
            }
            catch (Exception ex)
            {
                db.Rollback();//回滚事务
                errText = "订单提交失败!";
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
        /// 支付后改变订单状态
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="status"></param>
        public void ModifyOrderStatus(string orderNo, OrderStatus status)
        {
            var db = this.BaseRepository().BeginTrans();
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"UPDATE dbo.T_OrderHead SET F_State =@F_State WHERE F_OrderNo =@F_OrderNo;");
                strSql.Append(" UPDATE dbo.T_OrderBody SET FB_State=@F_State WHERE F_OrderNo =@F_OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("F_State", ((int)status).ToString());
                dp.Add("F_OrderNo", orderNo);
                db.ExecuteBySql(strSql.ToString(), dp);
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
        /// 订单收款记录
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="Amount"></param>
        public void OrderCollectMoney(string orderNo, string Amount)
        {
            try
            {
                var InSql = new StringBuilder();
                InSql.Append(@"INSERT INTO dbo.T_OrderCollectMoney ( 
                                        F_Id ,
                                        F_OrderNo ,
                                        F_PayType ,
                                        F_Amount )
                                VALUES (
                                        @F_Id ,
                                        @F_OrderNo ,
                                        @F_PayType ,
                                        @F_Amount
                                        )");
                var param = new DynamicParameters(new { });
                param.Add("@F_Id", Guid.NewGuid().ToString());
                param.Add("@F_OrderNo", orderNo);
                param.Add("@F_PayType", "微信支付");
                param.Add("@F_Amount", Convert.ToDecimal(Amount)/100);
                this.BaseRepository().ExecuteBySql(InSql.ToString(), param);
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
        /// 获取订单头实体
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public T_OrderHeadEntity GetOrderHeadEntity(string OrderNo)
        {
            try
            {
                return this.BaseRepository().FindEntity<T_OrderHeadEntity>(c => c.F_OrderNo == OrderNo);
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
        /// 获取订单详细实体
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public IEnumerable<T_OrderBodyEntity> GetOrderBodyEntity(string OrderNo)
        {
            try
            {
                return this.BaseRepository().FindList<T_OrderBodyEntity>(c => c.F_OrderNo == OrderNo);
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
        /// 修改订单状态
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <param name="status"></param>
        /// <param name="errText"></param>
        public void ClientUpdateOrder(string OrderNo, string status, out string errText)
        {
            var db = this.BaseRepository().BeginTrans();
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"UPDATE dbo.T_OrderHead SET F_State =@F_State WHERE F_OrderNo =@F_OrderNo;");
                if (status == "5")
                {
                    strSql.Append(" UPDATE dbo.T_OrderBody SET FB_State=@F_State WHERE F_OrderNo =@F_OrderNo AND FB_State NOT IN('41','51')");
                }
                var dp = new DynamicParameters(new { });
                dp.Add("@F_State", status);
                dp.Add("@F_OrderNo", OrderNo);
                db.ExecuteBySql(strSql.ToString(), dp);

                //插入操作时间节点
                var bodyEntity = this.BaseRepository().FindList<T_OrderBodyEntity>(c => c.F_OrderNo == OrderNo);
                foreach (var item in bodyEntity)
                {
                    var StateDescribe = "";
                    switch (status)
                    {
                        case "-1":
                            StateDescribe = "取消订单";
                            break;
                        case "-3":
                            StateDescribe = "申请退款";
                            break;
                        case "5":
                            StateDescribe = "订单已完成";
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
                    param.Add("@F_OrderNo", item.F_ConsignmentNumber);
                    param.Add("@F_StateDescribe", StateDescribe);
                    param.Add("@F_LogState", status);
                    param.Add("@F_StateDateTime", DateTime.Now.ToString());
                    param.Add("@F_StateOperator", "");
                    param.Add("@F_SorterCode", "");
                    param.Add("@F_CustomerOpen", "1");
                    this.BaseRepository().ExecuteBySql(InSql.ToString(), param);
                }
                db.Commit();
                errText = "修改成功!";
            }
            catch (Exception ex)
            {
                errText = "修改失败!";
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
        /// 地址管理
        /// </summary>
        /// <param name="F_Id"></param>
        /// <param name="errText"></param>
        public void AddressToDo(string F_Id, out string errText)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"DELETE FROM dbo.T_Address WHERE F_Id=@F_Id");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_Id", F_Id);
                this.BaseRepository().ExecuteBySql(strSql.ToString(), dp);
                errText = "删除成功!";
            }
            catch (Exception ex)
            {
                errText = "删除失败!";
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
        /// 更新订单详细的运费和距离
        /// </summary>
        /// <param name="bodyEntity"></param>
        public void UpdateOrderDetail(decimal F_Price, decimal F_Distance, string F_ConsignmentNumber)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"UPDATE  T_OrderBody
                                SET     F_Price = @F_Price ,
                                        F_Distance = @F_Distance
                                WHERE   F_ConsignmentNumber = @F_ConsignmentNumber");
                var dp = new DynamicParameters(new { });
                dp.Add("@F_Price", F_Price);
                dp.Add("@F_Distance", F_Distance);
                dp.Add("@F_ConsignmentNumber", F_ConsignmentNumber);
                this.BaseRepository().ExecuteBySql(strSql.ToString(), dp);
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
        /// 改变订单类型   加急/普通
        /// </summary>
        /// <param name="IsUrgent"></param>
        /// <param name="OrderNo"></param>
        public void UpdateOrderType(string IsUrgent, string OrderNo)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"UPDATE  dbo.T_OrderHead
                                SET     F_IsUrgent =@IsUrgent
                                WHERE   F_OrderNo = @OrderNo");
                var dp = new DynamicParameters(new { });
                dp.Add("@IsUrgent", IsUrgent);
                dp.Add("@OrderNo", OrderNo);
                this.BaseRepository().ExecuteBySql(strSql.ToString(), dp);
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
