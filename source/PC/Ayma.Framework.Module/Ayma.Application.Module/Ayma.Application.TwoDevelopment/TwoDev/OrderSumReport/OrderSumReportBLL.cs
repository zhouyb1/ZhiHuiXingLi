using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ayma.Util;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.OrderSumReport
{
    public partial class OrderSumReportBLL:OrderSumReportIBLL
    {
        public OrderSumReportService ordersumreportservice = new OrderSumReportService();

        //业务综合数据报表
        public IEnumerable<OrderSumReportModel> GetSumReport(string queryJson)
        {
            try
            {
                return ordersumreportservice.GetSumReport(queryJson);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
    }
}
