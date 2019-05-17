using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ayma.DataBase.Repository;

namespace Ayma.Application.TwoDevelopment.TwoDev.AddressManager
{
    public class T_AddressService:RepositoryFactory
    {
        /// <summary>
        /// 获取地址列表
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public IEnumerable<T_Addressentity> GetList(string openId)
        {
            return this.BaseRepository().FindList<T_Addressentity>(c=>c.F_OpenId==openId);
        }
    }
}
