using Ayma.Util;
using System.Collections.Generic;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：订单查询
    /// </summary>
    public interface OrderLogisticsIBLL
    {
        #region 获取数据

        /// <summary>
        /// 获取T_OrderBody表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        T_OrderLogisticsInfoEntity GetT_OrderLogisticsInfoEntity(string keyValue);

        #endregion

    }
}
