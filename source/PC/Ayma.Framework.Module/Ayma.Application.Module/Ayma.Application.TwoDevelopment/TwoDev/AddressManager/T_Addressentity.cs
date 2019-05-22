using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.AddressManager
{
    public class T_Addressentity
    {
        /// <summary>
        /// 标示
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        [Column("F_ADDRESS")]
        public string F_Address { get; set; }
       /// <summary>
       /// 微信OpenId
       /// </summary>
        [Column("F_OPENID")]
        public string F_OpenId { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        [Column("F_NAME")]
        public string F_Name { get; set; }
        /// <summary>
        /// 电话
        /// </summary>
        [Column("F_PHONE")]
        public string F_Phone { get; set; }
    }
    
}
