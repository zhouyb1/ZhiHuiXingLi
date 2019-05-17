using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    public class OrderModel
    {
        /// <summary>
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }
        /// <summary>
        /// 客户姓名
        /// </summary>
        public string F_CustomerName { get; set; }
        /// <summary>
        /// 客户手机号
        /// </summary>
        public string F_CustomerPhone { get; set; }
        /// <summary>
        /// 收件地址
        /// </summary>
        public string F_CustomerAddress { get; set; }
        /// <summary>
        /// 订单好
        /// </summary>
        public string F_OrderNo { get; set; }

        public OrderStatus? F_State { get; set; }
        /// <summary>
        /// 终点站
        /// </summary>
        public string F_AirfieldName { get; set; }
        /// <summary>
        /// 始发站
        /// </summary>
        public string F_StartStation { get; set; }
        public List<Details> Details { get; set; }
    }

   

    /// <summary>
    /// 明细
    /// </summary>
    public class Details
    {
        /// <summary>
        /// 托运单号
        /// </summary>
        public string ConsignmentNumber { get; set; }
       
    }
}