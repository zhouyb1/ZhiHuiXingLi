using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi
{
    public class OrderModelApi
    {
        /// <summary>
        /// 订单号
        /// </summary>
        public string F_OrderNo { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string F_State { get; set; }

        /// <summary>
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }

        /// <summary>
        /// 订单日期
        /// </summary>
        public DateTime F_OrderDate { get; set; }

        public int qty { get; set; }
    }
}
