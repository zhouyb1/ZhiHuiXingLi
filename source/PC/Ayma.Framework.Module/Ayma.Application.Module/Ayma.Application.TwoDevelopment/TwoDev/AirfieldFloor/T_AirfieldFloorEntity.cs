using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Ayma.Application.TwoDevelopment.TwoDev

{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-23 18:24
    /// 描 述：航站楼
    /// </summary>
    public partial class T_AirfieldFloorEntity 
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        /// <returns></returns>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 机场父ID
        /// </summary>
        /// <returns></returns>
        [Column("F_AIRFIEPARENTID")]
        public string F_AirfieParentId { get; set; }
        /// <summary>
        /// 机场名称
        /// </summary>
        /// <returns></returns>
        [Column("F_AIRFIELDNAME")]
        public string F_AirfieldName { get; set; }
        /// <summary>
        /// 航站楼
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPRESSCOMPANYNAME")]
        public string F_ExpressCompanyName { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERBY")]
        public int? F_OrderBy { get; set; }
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

