using Ayma.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.OrderSumReport
{
    public interface OrderSumReportIBLL
    {
        //业务综合数据报表
        IEnumerable<OrderSumReportModel> GetSumReport(string queryJson);
    }
}
