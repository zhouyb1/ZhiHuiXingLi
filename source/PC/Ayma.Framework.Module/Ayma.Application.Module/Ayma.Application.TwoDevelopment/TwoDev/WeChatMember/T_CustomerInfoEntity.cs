using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 09:53
    /// 描 述：微信客户会员基础资料
    /// </summary>
    public partial class T_CustomerInfoEntity 
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 微信OpenId
        /// </summary>
        [Column("F_OPENID")]
        public string F_Openid { get; set; }
        /// <summary>
        /// 微信名称
        /// </summary>
        [Column("F_NICKNAME")]
        public string F_Nickname { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        [Column("F_SEX")]
        public string F_Sex { get; set; }
        /// <summary>
        /// 语言
        /// </summary>
        [Column("F_LANGUAGE")]
        public string F_Language { get; set; }
        /// <summary>
        /// 城市
        /// </summary>
        [Column("F_CITY")]
        public string F_City { get; set; }
        /// <summary>
        /// 省份
        /// </summary>
        [Column("F_PROVINCE")]
        public string F_Province { get; set; }
        /// <summary>
        /// 国家
        /// </summary>
        [Column("F_COUNTRY")]
        public string F_Country { get; set; }
        /// <summary>
        /// 图像地址
        /// </summary>
        [Column("F_HEADIMGURL")]
        public string F_Headimgurl { get; set; }
        /// <summary>
        /// 联系电话
        /// </summary>
        [Column("F_PHONE")]
        public string F_Phone { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        [Column("F_CREATETIME")]
        public DateTime? F_CreateTime { get; set; }
        /// <summary>
        /// 身份证号码
        /// </summary>
        [Column("F_IDCARD")]
        public string F_IdCard { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        [Column("F_NAME")]
        public string F_Name { get; set; }
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

