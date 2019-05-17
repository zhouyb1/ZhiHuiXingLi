using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.AddressManager
{
    public interface T_AddressIBll
    {
        /// <summary>
        /// 获取地址列表
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
       IEnumerable<T_Addressentity> GetList(string openId);
    }
}
