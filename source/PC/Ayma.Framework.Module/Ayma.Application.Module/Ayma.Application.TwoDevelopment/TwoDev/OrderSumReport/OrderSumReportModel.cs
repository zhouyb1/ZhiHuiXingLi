using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.OrderSumReport
{
    public class OrderSumReportModel
    {
        //订单数
        public string OrderNum { get; set; }

        //行李数
        public string ConsignmentNum { get; set; }
        
        //收入金额
        public string Amount { get; set; }
        
        //客户数
        public string ClientNum { get; set; }

        //ATA至签收平均时间
        public string ATAzqs { get; set; }

        //ATA至快递平均时间
        public string ATAzkd { get; set; }

        //快递至签收平均时间
        public string Kdzqs { get; set; }
    }

    public class FinanceReportModel
    {
        //订单号
        public string OrderNum { get; set; }

        //行李数
        public int ConsignmentNum { get; set; }
        
        //收费金额
        public double? ChargeMoney { get; set; }
        
        //第三方费用
        public double? ThirdMoney { get; set; }

        //毛利润
        public double? GrossProfit { get; set; }

        //日期
        public string OrderDate { get; set; }
    }

    public class SorterReportModel
    {
        //分拣员姓名
        public string FJYName { get; set; }

        //接单数量
        public double? JDNum { get; set; }
        
        //行李数量
        public double? XLNum { get; set; }

        //异常行李数
        public double? YCXLNum { get; set; }
        
        //被投诉数量
        public double? TSNum { get; set; }

        //ATA到已分拣平均时间
        public string YFJTime { get; set; }
    }
}
