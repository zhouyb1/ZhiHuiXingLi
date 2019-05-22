using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:25
    /// 描 述：订单查询
    /// </summary>
    public partial class T_OrderBodyEntity 
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 订单号
        /// </summary>
        [Column("F_ORDERNO")]
        public string F_OrderNo { get; set; }
        /// <summary>
        /// 托运单号
        /// </summary>
        [Column("F_CONSIGNMENTNUMBER")]
        public string F_ConsignmentNumber { get; set; }
        /// <summary>
        /// 重量 KG，默认1 
        /// </summary>
        [Column("F_WEIGHT")]
        public decimal? F_Weight { get; set; }
        /// <summary>
        /// 配送距离 KM
        /// </summary>
        [Column("F_DISTANCE")]
        public decimal? F_Distance { get; set; }
        /// <summary>
        /// 价格 元
        /// </summary>
        [Column("F_PRICE")]
        public decimal? F_Price { get; set; }
        /// <summary>
        /// 数量 默认1件
        /// </summary>
        [Column("F_QTY")]
        public int? F_Qty { get; set; }
        /// <summary>
        /// 订单状态
        /// </summary>
        [Column("FB_STATE")]
        public string FB_State { get; set; }
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

    public partial class T_GetBodyNameEntity
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 订单号
        /// </summary>
        [Column("F_ORDERNO")]
        public string F_OrderNo { get; set; }
        /// <summary>
        /// 托运单号
        /// </summary>
        [Column("F_CONSIGNMENTNUMBER")]
        public string F_ConsignmentNumber { get; set; }
        /// <summary>
        /// 重量 KG，默认1 
        /// </summary>
        [Column("F_WEIGHT")]
        public decimal? F_Weight { get; set; }
        /// <summary>
        /// 配送距离 KM
        /// </summary>
        [Column("F_DISTANCE")]
        public decimal? F_Distance { get; set; }
        /// <summary>
        /// 价格 元
        /// </summary>
        [Column("F_PRICE")]
        public decimal? F_Price { get; set; }
        /// <summary>
        /// 数量 默认1件
        /// </summary>
        [Column("F_QTY")]
        public int? F_Qty { get; set; }
        /// <summary>
        /// 订单状态
        /// </summary>
        [Column("FB_STATE")]
        public string FB_State { get; set; }
        /// <summary>
        /// 分拣员
        /// </summary>
        [Column("F_NAME")]
        public string F_Name { get; set; }
        /// <summary>
        /// 分拣员电话
        /// </summary>
        [Column("F_PHONE")]
        public string F_Phone { get; set; }
        #endregion
    }
}

