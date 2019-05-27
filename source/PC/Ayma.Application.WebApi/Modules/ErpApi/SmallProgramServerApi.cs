using System.Text;
using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer;
using Ayma.Application.TwoDevelopment.TwoDev;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;
using System.Text.RegularExpressions;
using Senparc.Weixin.WxOpen.AdvancedAPIs.Sns;
using Senparc.Weixin.WxOpen.Entities;
using Newtonsoft.Json;

namespace Ayma.Application.WebApi.Modules.ErpApi
{
    public class SmallProgramServerApi : PdaBaseApi
    {
        /// <summary>
        /// 分拣员小程序调用
        /// </summary>
        public SmallProgramServerApi()
            : base("/pdaapi")
        {
            Post["GetExpressNo"]=GetExpressNo;
            Post["/SubmitUpdateOrderState"] = SubmitUpdateOrderState; //提交车班补货单
            Post["/UpdateOrderStatus"] = UpdateOrderStatus; //修改订单状态
            Post["/UpdateBatchOrderStatus"] = UpdateBatchOrderStatus;//批量修改订单状态（未分拣-分拣中）
            Get["/GetOrderListByStatus"] = GetOrderListByStatus; //根据订单状态获取订单列表
            Get["/SerGetOrderDetailByNo"] = SerGetOrderDetailByNo; //根据订单号获取订单详情
            Get["/SerGetFlightList"] = SerGetFlightList; // 根据航班号获取航班时间列表
            Get["/ExpressInformation"] = ExpressInformation;//分拣完成后填写快递信息
            Get["/ReasonNoMessage"] = ReasonNoMessage;//根据航班号或者时间获取航班信息
            Get["/SorterLogin"] = SorterLogin;//分拣员登录  
            Get["/GetExpressCompany"] = GetExpressCompany;//获取所有快递公司记录
            Get["/SerGetPhone"] = SerGetPhone;//获取手机号码
            Get["/GetConNumberListByFNo"] = GetConNumberListByFNo;//根据航班号获取行李号列表
        }
        private SmallProgramServerApiIBLL billServerApiBLL = new SmallProgramServerApiBLL();
        private OrderInquiryIBLL orderBll = new OrderInquiryBLL();

        private static string expressServer = Config.GetValue("expressServer");
        private static string logisticProviderId = Config.GetValue("logisticProviderId");

        private string targetFomart = "logisticProviderId=" + HttpUtility.UrlEncode(logisticProviderId, Encoding.UTF8) +
                                      "&logisticsInterface={0}&dataDigest={1}";
                   


        /// <summary>
        /// 填写快递公司,单号,费用信息
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response ExpressInformation(dynamic _)
        {
            var req = this.GetReqData().ToJObject();//获取模板请求数据
            if (req["OrderNo"].IsEmpty())
            {
                return Fail("订单号不能为空!");
            }
            if (req["ConsignmentNumber"].IsEmpty())
            {
                return Fail("行李号不能为空!");
            }
            if (req["ExpressCompanyId"].IsEmpty())
            {
                return Fail("快递公司不能为空!");
            }
            if (req["ExpressNO"].IsEmpty())
            {
                return Fail("快递单号不能为空!");
            }
            if (req["Amount"].IsEmpty())
            {
                return Fail("费用不能为空");
            }
            if (!Regex.IsMatch(req["Amount"].ToString(), @"^[0-9]*$"))
            {
                return Fail("费用只能为数字");
            }
            string OrderNo = req["OrderNo"].ToString();  //订单号
            string ConsignmentNumber = req["ConsignmentNumber"].ToString();  //行李号
            string ExpressCompanyId = req["ExpressCompanyId"].ToString();  //快递公司
            string ExpressNO = req["ExpressNO"].ToString(); //快递单号
            string PayType = req["PayType"].ToString(); //收款方式
            string Amount = req["Amount"].ToString(); //快递费用
            string errText = "";
            billServerApiBLL.ExpressInformation(OrderNo, ConsignmentNumber, ExpressCompanyId, ExpressNO, PayType, Amount, out errText);
            return Success(errText);
        }

        /// <summary>
        /// 根据航班号获取行李号列表
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetConNumberListByFNo(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["FlightNumber"].IsEmpty())
            {
                return Fail("航班号不能为空!");
            }
            string FlightNumber = req["FlightNumber"].ToString();  //航班号
            var data = billServerApiBLL.GetConNumberListByFNo(FlightNumber);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response UpdateOrderStatus(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["OrderNo"].IsEmpty())
            {
                return Fail("订单号不能为空!");
            }
            if (req["ConsignmentNumber"].IsEmpty())
            {
                return Fail("行李号不能为空!");
            }
            if (req["status"].IsEmpty())
            {
                return Fail("订单状态不能为空!");
            }
            if (req["Operator"].IsEmpty())
            {
                return Fail("操作员不能为空!");
            }
            var ConsignmentOrder = billServerApiBLL.GetConsignmentNumber(req["ConsignmentNumber"].ToString());
            if (ConsignmentOrder.Count() < 1)
            {
                return Fail("行李号不存在!");
            }
            string OrderNo = req["OrderNo"].ToString();  //订单号
            string ConsignmentNumber = req["ConsignmentNumber"].ToString();  //行李号
            string status = req["status"].ToString();  //订单状态
            string Operator = req["Operator"].ToString(); //操作人
            string errText = "";
            if (status == "4")   //行李号状态为运输中,插入快递公司数据
            {
                if (req["ExpressCompanyId"].IsEmpty())
                {
                    return Fail("快递公司不能为空!");
                }
                if (req["ExpressNO"].IsEmpty())
                {
                    return Fail("快递单号不能为空!");
                }
                if (req["Amount"].IsEmpty())
                {
                    return Fail("运费不能为空");
                }
                if (!Regex.IsMatch(req["Amount"].ToString(), @"^[0-9]*$"))
                {
                    return Fail("运费只能为数字");
                }
                string ExpressCompanyId = req["ExpressCompanyId"].ToString();  //快递公司
                string ExpressNO = req["ExpressNO"].ToString(); //快递单号
                string PayType = req["PayType"].ToString(); //收款方式
                string Amount = req["Amount"].ToString(); //快递费用
                billServerApiBLL.ExpressInformation(OrderNo, ConsignmentNumber, ExpressCompanyId, ExpressNO, PayType, Amount, out errText);
            }
            billServerApiBLL.UpdateOrderStatus(OrderNo, ConsignmentNumber, status, Operator, out errText);
            return Success(errText);
        }

        /// <summary>
        /// 批量修改订单状态（未分拣-分拣中）
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response UpdateBatchOrderStatus(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["status"].IsEmpty())
            {
                return Fail("订单状态不能为空!");
            }
            if (req["Operator"].IsEmpty())
            {
                return Fail("操作员不能为空!");
            }
            List<string> OrderList = new List<string>();
            OrderList = req["OrderNo"].ToString().ToList<string>(); //订单号
            List<string> ConNumberList = new List<string>();
            ConNumberList = req["ConsignmentNumber"].ToString().ToList<string>();//行李号
            string status = req["status"].ToString();  //订单状态  
            string Operator = req["Operator"].ToString();  //操作人
            string errText = "";
            billServerApiBLL.UpdateBatchOrderStatus(OrderList, ConNumberList, status, Operator, out errText);
            return Success(errText);
        }

        /// <summary>
        /// 分拣员登录
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response SorterLogin(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据
            if (req["Code"].IsEmpty())
            {
                return Fail("账户不能为空!");
            }
            if (req["PassWord"].IsEmpty())
            {
                return Fail("密码不能为空!");
            }
            string Code = req["Code"].ToString();  //登录账户
            string PassWord = req["PassWord"].ToString();  //登录密码
            string errText = "";
            var EmployeeEntity = billServerApiBLL.SorterLogin(Code, PassWord, out errText);
            if (EmployeeEntity!=null)
            {
                return Success(errText);
            }
            else {
                return Fail("登录失败!");
            }
        }

       /// <summary>
       /// 根据订单状态获取订单列表
       /// </summary>
        /// <param name="_"></param> 
       /// <returns></returns>
        public Response GetOrderListByStatus(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string status = req["status"].ToString(); //订单状态
            var data = billServerApiBLL.GetOrderListByStatus(status);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        public class ConsignmentNumber
        {
            public string ConsNumber { get; set; }
        }

        /// <summary>
        /// 获取所有快递公司信息
        /// </summary>
        /// <param name="_"></param> 
        /// <returns></returns>
        public Response GetExpressCompany(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            var data = billServerApiBLL.GetExpressCompany();
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        /// <summary>
        /// 根据行李号获取订单详情
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response SerGetOrderDetailByNo(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string ConsignmentNumber = req["ConsignmentNumber"].ToString(); //行李号
            string OrderNo = req["OrderNo"].ToString(); //订单号
            string CustPhone = req["CustPhone"].ToString(); //电话号码
            var data = billServerApiBLL.SerGetOrderDetailByNo(ConsignmentNumber, OrderNo, CustPhone);
            //var orderbody = billServerApiBLL.SerGetOrderBodyByNo(OrderNo);
            if (data.Count() > 0 )
            {
                //var data = new { orderhead = orderhead, orderbody = orderbody };
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

        /// <summary>
        /// 根据航班号获取航班时间列表
        /// </summary>
        /// <param name="OrderNo"></param>
        /// <returns></returns>
        public Response SerGetFlightList(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string FlightNumber = req["FlightNumber"].ToString(); //航班号
            var data = billServerApiBLL.SerGetFlightList(FlightNumber);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else
            {
                return Fail("没有数据!");
            }
        }

       /// <summary>
       /// 根据航班号或航班号+日期查询订单查询订单列表
       /// </summary>
       /// <param name="_"></param>
       /// <returns></returns>
        public Response ReasonNoMessage(dynamic _)
        {
            var req = this.GetReqData().ToJObject(); //获取模板请求数据
            string FlightNumber = req["FlightNumber"].ToString(); //航班号
            string OrderDate = req["OrderDate"].ToString();//日期
            var data = billServerApiBLL.ReasonNoMessage(FlightNumber,OrderDate);
            if (data.Count() > 0)
            {
                return Success(data);
            }
            else 
            {
                return Fail("没有订单记录!");
            }
        }

        /// <summary>
        /// 获取手机号码
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response SerGetPhone(dynamic _)
        {
            //var sessionId = this.GetReqData().ToJObject()["sessionId"].ToString();
            var code = this.GetReqData().ToJObject()["code"].ToString(); //获取code 
            //以code换取session_key
            var jsonResult = SnsApi.JsCode2Json(Config.GetValue("SerAppId"), Config.GetValue("SerAppSecret"), code);
            var encrytedData = this.GetReqData().ToJObject()["encrytedData"].ToString();
            var iv = this.GetReqData().ToJObject()["iv"].ToString();
            var phoneData = EncryptHelper.DecodeEncryptedData(jsonResult.session_key, encrytedData, iv); //解密手机号码
            var result = Newtonsoft.Json.JsonConvert.DeserializeObject<DecodedPhoneNumber>(phoneData);
            return Success("ok", result.phoneNumber);
        }

        public static string SerializeObject(object o)
        {
            //IsoDateTimeConverter timeFormat = new IsoDateTimeConverter();
            //timeFormat.DateTimeFormat = "yyyy-MM-dd HH:mm:ss";
            var settings = new JsonSerializerSettings
            {
                DateFormatString = "yyyy-MM-dd HH:mm:ss",
                NullValueHandling = NullValueHandling.Include
            };
            string json = JsonConvert.SerializeObject(o, Formatting.Indented, settings);
            return json;
        }

        /// <summary>
        /// 提交车班补货单
        /// </summary>
        /// <returns></returns>
        public Response SubmitUpdateOrderState(dynamic _)
        {
            var req = this.GetReqData().ToJObject();// 获取模板请求数据


            if (req["F_AirfieldId"] == null)
            {
                return Fail("F_AirfieldId不能为空!");
            }
            string F_AirfieldId = req["F_AirfieldId"].ToString(); //机场ID 
            string F_OrderNo = "454"; //订单号
            string F_State_Old = "4"; //原状态值
            string F_State_New = "5"; //新状态值
            string Operator = "454"; //操作人

            int errCode = 0;//成功状态  100  成功
            string errText = "";//提示信息
            billServerApiBLL.SubmitUpdateOrderState(F_AirfieldId, F_OrderNo, F_State_Old, F_State_New, Operator, out   errCode, out   errText);
            if (errCode == 100)
            {
                return Success(errText);
            }
            else
            {
                return Fail(errText);
            }


        }

        /// <summary>
        /// 获取承诺达运单号接口
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetExpressNo(dynamic _)
        {
            var orderNo = this.GetReqData().ToJObject()["orderNo"].ToString();
            if (orderNo.IsEmpty())
            {
                return Fail("orderNo为空");
            }
            //查询订单
            var orderEntity = orderBll.GetT_OrderHeadEntity(orderNo);
            //以下为测试数据，请用真实数据替代
            OrderModel model = new OrderModel()
            {
                customerCode = Config.GetValue("customerCode"),
                orderChannelCode = logisticProviderId,
                customerSecretKey = Config.GetValue("customerSecretKey"),
                orderLogisticsCode = orderEntity.F_OrderNo,
                custOrderCreateTime = orderEntity.F_CreateTime.Value.ToString("yyyy-MM-dd hh:mm:ss"),
                goodsType = "G1",
                senderAddress = "华徐公路 3029 弄 28 号",
                senderAreaName = "青浦区",
                senderCityName = "上海市",
                senderMobile = "15800777777",
                senderName= "yang",
                senderPhone = "021-69773588",
                senderProvName = "上海",
                senderTownName = "华新镇",
                weight = 1,
                recipientAddress = "盈港东路 2165 弄 24 号",
                recipientAreaName = "青浦区",
                recipientCityName = "上海市",
                recipientMobile = "1377777777",
                recipientName = "张三",
                recipientPhone = "0379-65630357",
                recipientProvName = "上海",
                recipientTownCode = "徐泾镇"

            };
            string msg;
            var result = GetExpressNos(model,out msg);
            if (result==null)
            {
                return Fail(msg);
            }
            return Success(result.ToJson());
        }


        public Response PushExpressInfo (dynamic _){
            var orderNo = this.GetReqData().ToJObject()["orderNo"].ToString();
            var code=this.GetReqData().ToJObject()["code"].ToString();
            if (orderNo.IsEmpty())
            {
                return Fail("orderNo为空");
            }
            if (code.IsEmpty())
            {
                return Fail("物流状态为空");
            }
            //查询订单
            var orderEntity = orderBll.GetT_OrderHeadEntity(orderNo);
            PushExpressInfo model=new PushExpressInfo (){
                code="05",
                customerCode=Config.GetValue("customerCode"),
                orderChannelCode=Config.GetValue("logisticProviderId"),
                orderLogisticsCode="BCND_TEST123456789",
                takingEmpMobile="15800772008",
                takingEmpName="王二小",
                takingTime=DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                createTime=DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                waybillNo="B90000000001"
            };
            return Success("");
        }

        #region 方法

        public ExpressModel GetExpressNos(OrderModel model,out string msg)
        {
            var dataSign = Md5Helper.MD5Encrypt(model.ToJson(), Config.GetValue("secretKey"));
            string target = string.Format(targetFomart, HttpUtility.UrlEncode(model.ToJson(),Encoding.UTF8), HttpUtility.UrlEncode(dataSign,Encoding.UTF8));
            var result = HttpMethods.Post(expressServer, target);
            var resultObj = result.ToJObject();
            if (resultObj["status"].ToInt()==200)
            {
                msg = resultObj["message"].ToString();
                return resultObj["data"].ToObject<ExpressModel>();
            }
            msg = resultObj["message"].ToString();
            return null;
        }

         public GetExpressInfo GetExpressNos(PushExpressInfo model,out string msg)
        {
            var dataSign = Md5Helper.MD5Encrypt(model.ToJson(), Config.GetValue("secretKey"));
            string target = string.Format(targetFomart, HttpUtility.UrlEncode(model.ToJson(),Encoding.UTF8), HttpUtility.UrlEncode(dataSign,Encoding.UTF8));
            var result = HttpMethods.Post(expressServer, target);
            var resultObj = result.ToJObject();
            if (resultObj["status"].ToInt()==200)
            {
                msg = resultObj["message"].ToString();
                return resultObj["data"].ToObject<GetExpressInfo>();
            }
            msg = resultObj["message"].ToString();
            return null;
        }

        #endregion
    }

   
}