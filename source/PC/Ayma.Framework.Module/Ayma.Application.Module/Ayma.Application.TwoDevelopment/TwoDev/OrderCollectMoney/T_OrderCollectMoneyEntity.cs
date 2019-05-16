using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Ayma.Application.TwoDevelopment.TwoDev

{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-16 10:59
    /// 描 述：收款表
    /// </summary>
    public partial class T_OrderCollectMoneyEntity 
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        /// <returns></returns>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 订单号
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERNO")]
        public string F_OrderNo { get; set; }
        /// <summary>
        /// 收款方式,微信线上收款、现金、银行卡、优惠卷
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYTYPE")]
        public string F_PayType { get; set; }
        /// <summary>
        /// 收款金额
        /// </summary>
        /// <returns></returns>
        [Column("F_AMOUNT")]
        public decimal? F_Amount { get; set; }
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
    }
}

