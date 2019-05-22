using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi
{
    public class T_AirfieldInfoModelApi
    {
        /// <summary>
        /// 机场Id
        /// </summary>
        public string F_Id { get; set; }
        /// <summary>
        /// 机场名称
        /// </summary>
        public string F_AirfieldName { get; set; }
        /// <summary>
        /// 排序号
        /// </summary>
        public string F__OrderBy { get; set; }
    }

    public class T_AddressModelApi
    {
        /// <summary>
        /// Id
        /// </summary>
        public string F_Id { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string F_Address { get; set; }
        /// <summary>
        /// openId
        /// </summary>
        public string F_OpenId { get; set; }

        /// <summary>
        /// 旅客姓名
        /// </summary>
        public string F_Name { get; set; }

        /// <summary>
        /// 旅客电话
        /// </summary>
        public string F_Phone { get; set; }
    }
}
