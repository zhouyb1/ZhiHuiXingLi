using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi
{
    public class OrderDetailModelApi
    {
        public OrderHeadModelApi Head { get; set; }
        public List<OrderDetailsModelApi> OrderDetails { get; set; }
    }
    public class OrderHeadModelApi
    {
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
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string F_OrderNo { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string F_State { get; set; }

        /// <summary>
        /// 起飞地址
        /// </summary>
        public string AddressBegin { get; set; }
        /// <summary>
        /// 到达地址
        /// </summary>
        public string AddressEnd { get; set; }
        /// <summary>
        /// 是否加急
        /// </summary>
        public string F_IsUrgent { get; set; }
    }

    public class OrderDetailsModelApi
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
        /// 数量
        /// </summary>
        public int F_Qty { get; set; }

        /// <summary>
        /// 价格
        /// </summary>
        public decimal F_Price { get; set; }

        /// <summary>
        /// 快递单号
        /// </summary>
        public string F_ExpressNO { get; set; }
    }
}
