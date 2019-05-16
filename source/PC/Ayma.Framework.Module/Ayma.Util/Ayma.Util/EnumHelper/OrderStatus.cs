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
        已付款=1,
        航班已到达=2,
        开始分拣=3,
        分拣完成=4,
        出港完成=5,
        未分拣=6,
        分拣异常=41,
        出港异常=51
    }
}
