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


namespace Senparc.Weixin.WxOpen
{
    public class SessionContainer
    {
        public static ICache redisCache = CacheFactory.CaChe();
        /// <summary>
        /// 扩展获取Session
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static SessionBag GetSession(string sessionId)
        {
            //获取
            var sessionBag = redisCache.Read<SessionBag>(sessionId);
            if (sessionBag==null)
            {
                return null;
            }
            if (sessionBag.ExpireTime < DateTime.Now)
            {
                //缓存过期
                redisCache.Remove(sessionId);
                return null;
            }
            sessionBag.ExpireTime = DateTime.Now.AddDays(2);//滚动过期时间
            redisCache.Write(sessionId, sessionBag);
            return sessionBag;
        }

        /// <summary>
        /// 扩展生成3rd_sessioin
        /// </summary>
        /// <param name="sessionId==openid"></param>
        /// <param name="sessionKey"></param>
        /// <param name="unionId"></param>
        /// <returns></returns>
        public static SessionBag UpdateSession( string sessionId, string sessionKey, string unionId)
        {
            SessionBag bag = new SessionBag()
            {
                Key = sessionId,
                SessionKey = sessionKey,
                UnionId = unionId,
                OpenId = sessionId,
                ExpireTime = Tools.GetExpireTime()
            };
            redisCache.Write(sessionId, bag, Tools.GetExpireTime());
            return bag;
        }
    }
}