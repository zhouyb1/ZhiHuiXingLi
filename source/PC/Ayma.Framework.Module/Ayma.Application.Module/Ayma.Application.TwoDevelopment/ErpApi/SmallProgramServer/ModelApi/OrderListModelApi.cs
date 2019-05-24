using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi
{
    public class OrderList
    {
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }

        /// <summary>
        /// 航站楼
        /// </summary>
        public string F_AirfieldFloor { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string F_State { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string F_OrderNo { get; set; }


        /// <summary>
        /// 到达时间
        /// </summary>
        public DateTime DateTimeEnd { get; set; }

        /// <summary>
        /// 分拣口
        /// </summary>
        public string F_AirfieldCoding { get; set; }

        /// <summary>
        /// 分拣员
        /// </summary>
        public string FB_Name { get; set; }
        /// <summary>
        /// 分拣员电话
        /// </summary>
        public string FB_Phone { get; set; }
        public List<ConsignmentNumber> CNumberList { get; set; }
    }
    

    public class ConsignmentNumber
    {
        public string F_ConsignmentNumber { get; set; }
    }

}
