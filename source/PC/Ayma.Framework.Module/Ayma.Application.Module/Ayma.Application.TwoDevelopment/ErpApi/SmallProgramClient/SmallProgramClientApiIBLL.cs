using Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient
{
    public interface SmallProgramClientApiIBLL
    {
        /// <summary>
        /// 获取机场列表
        /// </summary>
        /// <returns></returns>
        IEnumerable<T_AirfieldInfoModelApi> GetAirPort();

        /// <summary>
        /// 根据机场获取航班信息
        /// </summary>
        /// <returns></returns>
        IEnumerable<T_FlightNoInfoModelApi> GetFlightNoInfo(string F_AirfieldId);

        /// <summary>
        /// 根据openId获取订单列表
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        IEnumerable<OrderModelApi> GetOrderList(string openId);
    }
}
