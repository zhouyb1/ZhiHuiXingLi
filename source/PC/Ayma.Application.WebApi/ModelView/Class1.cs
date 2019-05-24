using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ayma.Application.WebApi
{

    public class OrderModel
    {
        /// <summary>
        /// 客户下单创建时间“yyyy-MM-dd
        /// </summary>
        public string custOrderCreateTime { get; set; }

        /// <summary>
        /// 客户编码（由承诺达提供）
        /// </summary>
        public string customerCode { get; set; }

        /// <summary>
        /// 客户秘钥（由承诺达提供）
        /// </summary>
        public string customerSecretKey { get; set; }

        /// <summary>
        /// 商品信息
        /// </summary>
        public string goodsName { get; set; }

        /// <summary>
        /// 商品总价值（小数点后两位）
        /// </summary>
        public int goodsTotalFee { get; set; }

        /// <summary>
        /// 商品类型（附件）
        /// </summary>
        public string goodsType { get; set; }

        /// <summary>
        /// ISV 平台编码（由承诺达提供）
        /// </summary>
        public string orderChannelCode { get; set; }

        /// <summary>
        /// 物流号（建议使用平台编码+流水号）
        /// </summary>
        public string orderLogisticsCode { get; set; }

        /// <summary>
        /// 收件人详细地址
        /// </summary>
        public string recipientAddress { get; set; }

        /// <summary>
        /// 收件人区县 Name（国标）
        /// </summary>
        public string recipientAreaName { get; set; }

        /// <summary>
        /// 收件人城市 Name（国标） 
        /// </summary>
        public string recipientCityName { get; set; }

        /// <summary>
        /// 收件人手机
        /// </summary>
        public string recipientMobile { get; set; }

        /// <summary>
        /// 收件人
        /// </summary>
        public string recipientName { get; set; }

        /// <summary>
        /// 收件人座机号码
        /// </summary>
        public string recipientPhone { get; set; }

        /// <summary>
        /// 收件人省份
        /// </summary>
        public string recipientProvName { get; set; }

        /// <summary>
        /// 收件人乡镇code
        /// </summary>
        public string recipientTownCode { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string remark { get; set; }

        /// <summary>
        /// 发件人详细地址
        /// </summary>
        public string senderAddress { get; set; }

        /// <summary>
        /// 发件人区县
        /// </summary>
        public string senderAreaName { get; set; }

        /// <summary>
        /// 发件人城市
        /// </summary>
        public string senderCityName { get; set; }

        /// <summary>
        /// 发件人手机号码
        /// </summary>
        public string senderMobile { get; set; }

        /// <summary>
        /// 发件人姓名
        /// </summary>
        public string senderName { get; set; }

        /// <summary>
        /// 发件人座机
        /// </summary>
        public string senderPhone { get; set; }

        /// <summary>
        /// 发件人身份
        /// </summary>
        public string senderProvName { get; set; }

        /// <summary>
        /// 发件人乡镇
        /// </summary>
        public string senderTownName { get; set; }

        /// <summary>
        /// 重量(1位小数)
        /// </summary>
        public int weight { get; set; }
    }
}