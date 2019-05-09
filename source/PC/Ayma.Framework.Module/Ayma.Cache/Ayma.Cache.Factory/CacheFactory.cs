using Ayma.Cache.Base;
using Ayma.Cache.Redis;

namespace Ayma.Cache.Factory
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.06
    /// 描 述：定义缓存工厂类
    /// </summary>
    public class CacheFactory
    {
        public static ICache CaChe()
        {
            return new CacheByRedis();
        }
    }
}
