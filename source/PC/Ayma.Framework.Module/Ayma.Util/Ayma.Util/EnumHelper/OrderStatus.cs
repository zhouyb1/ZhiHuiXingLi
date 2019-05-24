using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Util
{
    public enum  OrderStatus
    {
        已取消 = -1,
        已退款 = -2,
        待付款=0,
        未分拣=1,
        分拣中= 2,
        分拣完成=3,
        运输中=4,
        已完成=5,
        分拣异常=41,
        出港异常=51
    }
}
