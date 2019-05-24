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
}
