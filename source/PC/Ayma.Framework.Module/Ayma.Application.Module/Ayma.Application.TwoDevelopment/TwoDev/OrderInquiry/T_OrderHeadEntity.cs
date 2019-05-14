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
    public partial class T_OrderHeadEntity 
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
        /// 航站楼 T1\T2
        /// </summary>
        [Column("F_AIRFIELDFLOOR")]
        public string F_AirfieldFloor { get; set; }
        /// <summary>
        /// 航空公司
        /// </summary>
        [Column("F_FLIGHTCOMPANY")]
        public string F_FlightCompany { get; set; }
        /// <summary>
        /// 航班号
        /// </summary>
        [Column("F_FLIGHTNUMBER")]
        public string F_FlightNumber { get; set; }
        /// <summary>
        /// 订单日期
        /// </summary>
        [Column("F_ORDERDATE")]
        public DateTime? F_OrderDate { get; set; }
        /// <summary>
        /// 订单号 系统生成
        /// </summary>
        [Column("F_ORDERNO")]
        public string F_OrderNo { get; set; }
        /// <summary>
        /// 客户姓名
        /// </summary>
        [Column("F_CUSTOMERNAME")]
        public string F_CustomerName { get; set; }
        /// <summary>
        /// 联系电话
        /// </summary>
        [Column("F_CUSTOMERPHONE")]
        public string F_CustomerPhone { get; set; }
        /// <summary>
        /// 客户地址
        /// </summary>
        [Column("F_CUSTOMERADDRESS")]
        public string F_CustomerAddress { get; set; }
        /// <summary>
        /// 客户备注
        /// </summary>
        [Column("F_CUSTOMERREMARKS")]
        public string F_CustomerRemarks { get; set; }
        /// <summary>
        /// 订单创建类型  微信下单、客服下单
        /// </summary>
        [Column("F_CREATESTYPE")]
        public string F_CreateStype { get; set; }
        /// <summary>
        /// 订单状态 0:待款、1：付款完成、-1：订单已取消、-2：已退款
2：航班已到达、3：开始分拣、4：分拣完成、5、出港完成
41:分拣异常、51:出港异常
        /// </summary>
        [Column("F_STATE")]
        public string F_State { get; set; }
        /// <summary>
        /// 订单类型 港外配送、港内配送
        /// </summary>
        [Column("F_STYPE")]
        public string F_Stype { get; set; }
        /// <summary>
        /// 订单创建日期 默认当前时间
        /// </summary>
        [Column("F_CREATETIME")]
        public DateTime? F_CreateTime { get; set; }
        /// <summary>
        /// 订单创建人
        /// </summary>
        [Column("F_CREATEUSERNAME")]
        public string F_CreateUserName { get; set; }
        /// <summary>
        /// 微信OpenId
        /// </summary>
        [Column("F_OPENID")]
        public string F_OpenId { get; set; }
        /// <summary>
        /// 普通、加急
        /// </summary>
        [Column("F_ISURGENT")]
        public string F_IsUrgent { get; set; }
        #endregion

        #region 扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public void Create()
        {
            this.F_Id = Guid.NewGuid().ToString();
            UserInfo userInfo = LoginUserInfo.Get();
            this.F_CreateUserName = userInfo.realName;
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

