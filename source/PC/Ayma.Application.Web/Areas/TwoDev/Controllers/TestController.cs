using Ayma.Util;
using Ayma.Application.TwoDevelopment.ErpDev;
using System.Web.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;

namespace Ayma.Application.Web.Areas.ErpDev.Controllers
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-04-03 10:13
    /// 描 述：仓库调整
    /// </summary>
    public partial class TestController : MvcControllerBase
    {

        public string Test()
        {
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            BillMakeTempModelApi head = new BillMakeTempModelApi();

            head.F_AirfieldId="943C717C-9ED7-46ED-B3A2-0744740377B6";
            head.F_AirfieldName = "首都机场";
            head.F_AirfieldFloor = "T1";
            head.F_FlightCompany = "南方航空";
            head.F_FlightNumber = "SC6095";
            head.F_OrderDate = DateTime.Now;
            head.F_OrderNo = "";
            head.F_CustomerName = "张三";
            head.F_CustomerPhone = "1234567891";
            head.F_CustomerAddress = "广州市天河区";
            head.F_CustomerRemarks = "";
            head.F_CreateStype = "微信下单";
            head.F_State = "待付款";
            head.F_Stype = "港内配送";
            head.F_CreateTime = DateTime.Now;
            head.F_CreateUserName = "张三";
            head.F_OpenId = "12324535";
            head.F_IsUrgent = "普通";
            param.Add("head", head);
            //param.Add("F_AirfieldId", "943C717C-9ED7-46ED-B3A2-0744740377B6");
            //param.Add("F_AirfieldName", "首都机场");
            //param.Add("F_AirfieldFloor", "T1");
            //param.Add("F_FlightCompany", "南方航空");
            //param.Add("F_FlightNumber", "SC6095");
            //param.Add("F_OrderDate", "2019-05-15 13:00:00");
            //param.Add("F_OrderNo", "");
            //param.Add("F_CustomerName", "张三");
            //param.Add("F_CustomerPhone", "1234567891");
            //param.Add("F_CustomerAddress", "广州市天河区");
            //param.Add("F_CustomerRemarks", "");
            //param.Add("F_State", "待付款");
            //param.Add("F_Stype", "港内配送");
            //param.Add("F_CreateTime", "2019-05-15 13:00:00");
            //param.Add("F_CreateUserName", "张三");
            //param.Add("F_OpenId", "12324535");
            //param.Add("F_IsUrgent", "普通");

            IList<BillMakeTempBModelApi> OrderDetails = new List<BillMakeTempBModelApi>();
            BillMakeTempBModelApi product = new BillMakeTempBModelApi();
            product.F_OrderNo = "";
            product.F_ConsignmentNumber = "1399539001";
            product.F_Weight = 20;
            product.F_Distance =100;
            product.F_Price = 10;
            product.F_Qty = 1;
            OrderDetails.Add(product);

            BillMakeTempBModelApi product2 = new BillMakeTempBModelApi();
            product2.F_OrderNo = "";
            product2.F_ConsignmentNumber = "1399539002";
            product2.F_Weight = 10;
            product2.F_Distance = 100;
            product2.F_Price = 10;
            product2.F_Qty = 1;
            OrderDetails.Add(product2);
            param.Add("OrderDetails", OrderDetails);
            string json = SerializeObject(param);
            return "";
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

        public class BillMakeTempBModelApi
        {
            /// <summary>
            /// 订单号
            /// </summary>
            public string F_OrderNo { get; set; }

            /// <summary>
            /// 托运单号
            /// </summary>
            public string F_ConsignmentNumber { get; set; }

            /// <summary>
            /// 重量
            /// </summary>
            public decimal? F_Weight { get; set; }

            /// <summary>
            /// 配送距离
            /// </summary>
            public decimal? F_Distance { get; set; }

            /// <summary>
            /// 价格
            /// </summary>
            public decimal? F_Price { get; set; }

            /// <summary>
            /// 数量
            /// </summary>
            public int F_Qty { get; set; }
        }

        public class BillMakeTempModelApi
        {
            /// <summary>
            /// 机场Id
            /// </summary>
            public string F_AirfieldId { get; set; }

            /// <summary>
            /// 机场名称
            /// </summary>
            public string F_AirfieldName { get; set; }

            /// <summary>
            /// 航站楼
            /// </summary>
            public string F_AirfieldFloor { get; set; }

            /// <summary>
            /// 航空公司
            /// </summary>
            public string F_FlightCompany { get; set; }

            /// <summary>
            /// 航班号
            /// </summary>
            public string F_FlightNumber { get; set; }

            /// <summary>
            /// 订单日期
            /// </summary>
            public DateTime F_OrderDate { get; set; }

            /// <summary>
            /// 订单号
            /// </summary>
            public string F_OrderNo { get; set; }

            /// <summary>
            /// 客户姓名
            /// </summary>
            public string F_CustomerName { get; set; }

            /// <summary>
            /// 联系电话
            /// </summary>
            public string F_CustomerPhone { get; set; }

            /// <summary>
            /// 客户地址
            /// </summary>
            public string F_CustomerAddress { get; set; }

            /// <summary>
            /// 客户备注
            /// </summary>
            public string F_CustomerRemarks { get; set; }

            /// <summary>
            /// 订单创建类型
            /// </summary>
            public string F_CreateStype { get; set; }

            /// <summary>
            /// 订单状态
            /// </summary>
            public string F_State { get; set; }

            /// <summary>
            /// 订单类型
            /// </summary>
            public string F_Stype { get; set; }

            /// <summary>
            /// 订单创建日期
            /// </summary>
            public DateTime F_CreateTime { get; set; }

            /// <summary>
            /// 订单创建人
            /// </summary>
            public string F_CreateUserName { get; set; }

            /// <summary>
            /// 微信OpenId
            /// </summary>
            public string F_OpenId { get; set; }

            /// <summary>
            /// 普通、加急
            /// </summary>
            public string F_IsUrgent { get; set; }
        }

    }
}
