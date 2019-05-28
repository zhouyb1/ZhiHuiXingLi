using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi
{
    public class SerOrderDetailModelApi
    {
        /// <summary>
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string F_State { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string F_OrderNo { get; set; }

        /// <summary>
        /// 下单时间
        /// </summary>
        public DateTime F_OrderDate { get; set; }

        /// <summary>
        /// 客户姓名
        /// </summary>
        public string F_CustomerName { get; set; }

        /// <summary>
        /// 航站楼
        /// </summary>
        public string F_AirfieldFloor { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        public int F_Qty { get; set; }

        /// <summary>
        /// 联系电话
        /// </summary>
        public string F_CustomerPhone { get; set; }

        /// <summary>
        /// 收货地址
        /// </summary>
        public string F_CustomerAddress { get; set; }

        /// <summary>
        /// 是否加急
        /// </summary>
        public string F_IsUrgent { get; set; }

        /// <summary>
        /// 是否港内
        /// </summary>
        public string F_Stype { get; set; }

        public List<ConsignmentNumber> CNumberList { get; set; }
        public List<ExpressNo> ExpressNoList { get; set; }
    }



    public class ConsignmentNumberList
    {
        public string F_OrderNo { get; set; }

        public string F_ConsignmentNumber { get; set; }

        public string FB_State { get; set; }
    }

        public class ExpressNo
    {
        /// <summary>
        /// 行李号
        /// </summary>
        public string F_ConsignmentNumber { get; set; }
        /// <summary>
        /// 快递单号
        /// </summary>
        public string F_ExpressNO { get; set; }
        /// <summary>
        /// 快递公司
        /// </summary>
        public string F_ExpressCompanyId { get; set; }

        /// <summary>
        /// 费用
        /// </summary>
        public decimal? F_Amount { get; set; }

    }
}
