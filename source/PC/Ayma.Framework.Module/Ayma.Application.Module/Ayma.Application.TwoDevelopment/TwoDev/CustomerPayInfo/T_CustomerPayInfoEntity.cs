using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-23 09:32
    /// 描 述：运费设置
    /// </summary>
    public partial class T_CustomerPayInfoEntity 
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 机场Id
        /// </summary>
        [Column("F_AIRFIELDID")]
        public string F_AirfieldId { get; set; }
        /// <summary>
        /// 机场名称
        /// </summary>
        [Column("F_AIRFIELDNAME")]
        public string F_AirfieldName { get; set; }
        /// <summary>
        /// 单件费用
        /// </summary>
        [Column("F_NUMBERPICE")]
        public decimal? F_NumberPice { get; set; }
        /// <summary>
        /// 基础公里数
        /// </summary>
        [Column("F_DISTANCEBASEQTY")]
        public decimal? F_DistanceBaseQty { get; set; }
        /// <summary>
        /// 每公里加价
        /// </summary>
        [Column("F_DISTANCEPRICE")]
        public decimal? F_DistancePrice { get; set; }
        /// <summary>
        /// 折扣1
        /// </summary>
        [Column("F_DISCOUNT1")]
        public decimal? F_Discount1 { get; set; }
        /// <summary>
        /// 折扣2
        /// </summary>
        [Column("F_DISCOUNT2")]
        public decimal? F_Discount2 { get; set; }
        /// <summary>
        /// 折扣3
        /// </summary>
        [Column("F_DISCOUNT3")]
        public decimal? F_Discount3 { get; set; }
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

