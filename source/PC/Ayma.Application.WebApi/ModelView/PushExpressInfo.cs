using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ayma.Application.WebApi
{
    public class PushExpressInfo
    {
        /// <summary>
        /// 物流状态 Code
        /// </summary>
        public string code { get; set; }
        /// <summary>
        ///  客户编码
        /// </summary>
        public string customerCode { get; set; }
        /// <summary>
        /// 渠道号
        /// </summary>
        public string orderChannelCode { get; set; }
        /// <summary>
        /// 物流号
        /// </summary>
        public string orderLogisticsCode { get; set; }
        /// <summary>
        ///  取件业务员手机
        /// </summary>
        public string takingEmpMobile { get; set; }
        /// <summary>
        ///  取件业务员
        /// </summary>
        public string takingEmpName { get; set; }
        /// <summary>
        /// 取件时间
        /// </summary>
        public string takingTime { get; set; }
        /// <summary>
        /// 推送时间
        /// </summary>
        public string createTime { get; set; }
        /// <summary>
        /// 运单号
        /// </summary>
        public string waybillNo { get; set; }
    }
}