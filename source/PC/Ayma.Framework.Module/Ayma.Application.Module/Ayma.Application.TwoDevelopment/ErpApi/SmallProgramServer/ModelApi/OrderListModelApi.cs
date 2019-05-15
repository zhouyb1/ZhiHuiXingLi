﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi
{
    public class OrderListModelApi
    {
        /// <summary>
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
        /// 托运单号
        /// </summary>
        public string F_ConsignmentNumber { get; set; }
    }
}