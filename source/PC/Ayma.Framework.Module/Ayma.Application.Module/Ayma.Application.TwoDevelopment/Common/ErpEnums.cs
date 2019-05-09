using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpDev
{
    /// <summary>
    /// 所有枚举类型
    /// </summary>
    public class ErpEnums
    {
        /// <summary>
        /// 单据类型
        /// </summary>
        public enum BillTypeEnum
        {
            /// <summary>
            /// 商品
            /// </summary>
            Goods=1,
            /// <summary>
            /// 备品
            /// </summary>
            Spare=2,
            /// <summary>
            /// 全部
            /// </summary>
            All=3
        }
    }
}
