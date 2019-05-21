using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Ayma.Application.TwoDevelopment.TwoDev

{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-21 17:00
    /// 描 述：客户评价反馈
    /// </summary>
    public partial class T_OpinionFeedbackEntity 
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        /// <returns></returns>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 微信Openid
        /// </summary>
        /// <returns></returns>
        [Column("F_OPENID")]
        public string F_Openid { get; set; }
        /// <summary>
        /// 评价内容
        /// </summary>
        /// <returns></returns>
        [Column("F_CONTENT")]
        public string F_Content { get; set; }
        /// <summary>
        /// 联系方式
        /// </summary>
        /// <returns></returns>
        [Column("F_CONTACTWAY")]
        public string F_ContactWay { get; set; }
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

