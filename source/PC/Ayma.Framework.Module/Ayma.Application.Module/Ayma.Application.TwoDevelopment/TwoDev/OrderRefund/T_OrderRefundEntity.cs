using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-07-22 11:11
    /// 描 述：微信申请退款
    /// </summary>
    public partial class T_OrderRefundEntity 
    {
        #region 实体成员
        /// <summary>
        /// F_Id
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// F_OrderNo
        /// </summary>
        [Column("F_ORDERNO")]
        public string F_OrderNo { get; set; }

        /// <summary>
        /// F_TransactionId
        /// </summary>
        [Column("F_TRANSACTIONID")]
        public string F_TransactionId { get; set; }
        /// <summary>
        /// F_RefundId
        /// </summary>
        [Column("F_REFUNDID")]
        public string F_RefundId { get; set; }
        /// <summary>
        /// F_Amount
        /// </summary>
        [Column("F_AMOUNT")]
        public decimal ? F_Amount { get; set; }
        #endregion

        #region 扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public void Create()
        {
            this.F_Id = Guid.NewGuid().ToString();
        }
        /// <summary>
        /// 编辑调用
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_Id = keyValue;
        }
        #endregion
        #region 扩展字段
        #endregion
    }
}

