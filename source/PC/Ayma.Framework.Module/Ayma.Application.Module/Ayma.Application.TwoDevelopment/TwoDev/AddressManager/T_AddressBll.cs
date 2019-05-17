using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.AddressManager
{
    public class T_AddressBll:T_AddressIBll
    {
        private T_AddressService service = new T_AddressService();
        public IEnumerable<T_Addressentity> GetList(string openId)
        {
           return service.GetList(openId);
        }
    }
}
