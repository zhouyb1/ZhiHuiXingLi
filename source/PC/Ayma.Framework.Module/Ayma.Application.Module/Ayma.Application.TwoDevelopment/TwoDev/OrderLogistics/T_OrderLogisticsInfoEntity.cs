using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Ayma.Application.TwoDevelopment.TwoDev

{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:37
    /// 描 述：订单物流信息
    /// </summary>
    public partial class T_OrderLogisticsInfoEntity 
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
        /// 状态描述
        /// </summary>
        /// <returns></returns>
        [Column("F_STATEDESCRIBE")]
        public string F_StateDescribe { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        /// <returns></returns>
        [Column("F_LOGSTATE")]
        public string F_LogState { get; set; }
        /// <summary>
        /// 操作时间
        /// </summary>
        /// <returns></returns>
        [Column("F_STATEDATETIME")]
        public DateTime? F_StateDateTime { get; set; }
        /// <summary>
        /// 操作人
        /// </summary>
        /// <returns></returns>
        [Column("F_STATEOPERATOR")]
        public string F_StateOperator { get; set; }
        /// <summary>
        /// 对客户开放  1、开放；0、不开放
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTOMEROPEN")]
        public string F_CustomerOpen { get; set; }
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

