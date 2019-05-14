using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Application.WebApi;
using Ayma.Cache.Base;
using Ayma.Cache.Factory;
using Ayma.Cache.Redis;
using Senparc.Weixin.WxOpen.Containers;
using Senparc.Weixin.WxOpen.Helpers;


namespace Ayma.Application.WebApi
{
    public class SessionContainer
    {
        public static ICache redisCache = CacheFactory.CaChe();
        /// <summary>
        /// 扩展获取Session
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static SessionBag GetSession(string key)
        {
            //获取
            var sessionBag = redisCache.Read<SessionBag>(key);
            if (sessionBag==null)
            {
                return null;
            }
            if (sessionBag.ExpireTime < DateTime.Now)
            {
                //缓存过期
                redisCache.Remove(key);
                return null;
            }
            sessionBag.ExpireTime = DateTime.Now.AddDays(2);//滚动过期时间
            redisCache.Write(key, sessionBag);
            return sessionBag;
        }

        /// <summary>
        /// 扩展生成3rd_sessioin
        /// </summary>
        /// <param name="key"></param>
        /// <param name="openId"></param>
        /// <param name="sessionKey"></param>
        /// <param name="unionId"></param>
        /// <returns></returns>
        public static SessionBag UpdateSession(string key, string openId, string sessionKey, string unionId)
        {
            key = key ?? SessionHelper.GetNewThirdSessionName();
            SessionBag bag = new SessionBag()
            {
                Key = key,
                SessionKey = sessionKey,
                UnionId = unionId,
                OpenId = openId,
                ExpireTime = Tools.GetExpireTime()
            };
            redisCache.Write(key, bag, Tools.GetExpireTime());
            return bag;
        }
    }
}