﻿using Ayma.Util;
using System.Collections.Generic;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：订单查询
    /// </summary>
    public interface OrderInquiryIBLL
    {
        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        IEnumerable<T_OrderHeadEntity> GetPageList(Pagination pagination, string queryJson);
        /// <summary>
        /// 获取T_OrderHead表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        T_OrderHeadEntity GetT_OrderHeadEntity(string keyValue);
        /// <summary>
        /// 获取T_OrderBody表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        IEnumerable<T_OrderBodyEntity> GetT_OrderBodyEntity(string keyValue);
        /// <summary>
        /// 获取收款表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        IEnumerable<T_OrderCollectMoneyEntity> GetT_OrderCollectMoneyEntity(string keyValue);
        /// <summary>
        /// 获取付款表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        IEnumerable<T_OrderPayMoneyEntity> GetT_OrderPayMoneyEntity(string keyValue);
        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        void DeleteEntity(string keyValue);
        /// <summary>
        /// 修改分拣状态
        /// </summary>
        /// <param name="keyValue"></param>
        void UpdateSorting(string keyValue);

        /// <summary>
        /// 修改出港状态
        /// </summary>
        /// <param name="keyValue"></param>
        void UpdateLeaveport(string keyValue);
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        void SaveEntity(string keyValue, T_OrderHeadEntity entity,T_OrderBodyEntity t_OrderBodyEntity);

        /// <summary>
        /// 更新订单状态(取消订单、完成订单)
        /// </summary>
        /// <returns></returns>
        void UpdateOrder(string orderNo, OrderStatus status);

        #endregion

    }
}
