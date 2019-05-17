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
        [Column("F_ID")]
        public string F_Id { get; set; }
        [Column("F_ADDRESS")]
        public string F_Address { get; set; }
        [Column("F_OPENID")]
        public string F_OpenId { get; set; }
    }
    
}
