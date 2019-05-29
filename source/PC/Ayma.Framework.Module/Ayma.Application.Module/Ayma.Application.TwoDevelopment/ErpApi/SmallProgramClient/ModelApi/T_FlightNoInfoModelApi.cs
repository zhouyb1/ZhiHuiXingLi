using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi
{
    public class T_FlightNoInfoModelApi
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
        /// 起飞地址
        /// </summary>
        public string AddressBegin { get; set; }
        /// <summary>
        /// 到达地址
        /// </summary>
        public string AddressEnd { get; set; }
        /// <summary>
        /// 起飞时间
        /// </summary>
        public DateTime DateTimeBegin { get; set; }
        /// <summary>
        /// 到达时间
        /// </summary>
        public DateTime DateTimeEnd { get; set; }
    }

    public class GetFlightMessage
    {
        /// <summary>
        /// 机场Id
        /// </summary>
        public string F_AirfieldId { get; set; }
        /// <summary>
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string AddressBegin { get; set; }

        public string F_AirfieldBegin { get; set; }

        /// <summary>
        /// 起飞机场航站楼
        /// </summary>
        public string F_AirfieldFloorBegin { get; set; }

        public string AddressEnd { get; set; }

        public string F_AirfieldEnd { get; set; }

        public string F_AirfieldFloor { get; set; }

        public string F_FlightCompany { get; set; }
    }
}
