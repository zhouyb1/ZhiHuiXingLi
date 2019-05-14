﻿using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi;
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
        public IEnumerable<T_OrderHeadEntity> GetOrder(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindList<T_OrderHeadEntity>(c => c.F_OrderNo == keyValue);
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
        /// <param name="Operator"></param>
        /// <param name="errText"></param>
        public void UpdateOrderStatus(string OrderNo, string status, string Operator, out string errText)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"UPDATE T_OrderHead SET F_State=@Status WHERE F_OrderNo=@OrderNo");
                 var dp = new DynamicParameters(new { });
                     dp.Add("@OrderNo", OrderNo);
                     dp.Add("@Status", status);
                     this.BaseRepository().ExecuteBySql(strSql.ToString(), dp);
                 var StateDescribe="";
                 switch (status){
                     case "2":
                         StateDescribe="航班已到达";
                         break;
                     case "3":
                         StateDescribe="开始分拣";
                         break;
                     case"4":
                         StateDescribe="分拣完成";
                         break;
                     case "5":
                         StateDescribe="出港完成";
                         break;
                     case "41":
                         StateDescribe="分拣异常";
                         break;
                     case "51":
                         StateDescribe="出港异常";
                         break;
                }
                 var InSql = new StringBuilder();
                     InSql.Append(@"INSERT  INTO dbo.T_OrderLogisticsInfo
                                            ( F_Id ,
                                                F_OrderNo ,
                                                F_StateDescribe ,
                                                F_StateDateTime ,
                                                F_StateOperator ,
                                                F_CustomerOpen  
                                            )
                                    VALUES  ( @F_Id,
                                                @F_OrderNo,
                                                @F_StateDescribe ,
                                                @F_StateDateTime,
                                                @F_StateOperator ,
                                                @F_CustomerOpen
                                            )");
                var param = new DynamicParameters(new { });
                     param.Add("@F_Id",Guid.NewGuid().ToString () );
                     param.Add("@F_OrderNo", OrderNo);
                     param.Add("@F_StateDescribe", StateDescribe);
                     param.Add("@F_StateDateTime", DateTime.Now.ToString());
                     param.Add("@F_StateOperator", Operator);
                     param.Add("@F_CustomerOpen", "1");
                     this.BaseRepository().ExecuteBySql(InSql.ToString(), param);
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
    }
}
