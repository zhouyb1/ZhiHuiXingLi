using Ayma.Util;
using System.Collections.Generic;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-07-22 11:11
    /// 描 述：微信申请退款
    /// </summary>
    public interface OrderRefundIBLL
    {
        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        IEnumerable<T_OrderRefundEntity> GetPageList(Pagination pagination, string queryJson);
        /// <summary>
        /// 获取T_OrderRefund表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        T_OrderRefundEntity GetT_OrderRefundEntity(string keyValue);
        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        void DeleteEntity(string keyValue);
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        void SaveEntity(string keyValue, T_OrderRefundEntity entity);
        #endregion

    }
}
