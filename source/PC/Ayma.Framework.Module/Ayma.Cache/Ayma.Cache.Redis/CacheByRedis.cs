using Ayma.Cache.Base;
using System;
using System.Collections.Generic;
using Ayma.Util;

namespace Ayma.Cache.Redis
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.06
    /// 描 述：定义缓存接口
    /// </summary>
    public class CacheByRedis : ICache
    {
        #region Key-Value
        /// <summary>
        /// 读取缓存
        /// </summary>
        /// <param name="cacheKey">键</param>
        /// <returns></returns>
        public T Read<T>(string cacheKey, long dbId = 0) where T : class
        {
            cacheKey = cacheKey + Config.GetValue("RedisKey");
            return RedisCache.Get<T>(cacheKey, dbId);
        }
        /// <summary>
        /// 写入缓存
        /// </summary>
        /// <param name="value">对象数据</param>
        /// <param name="cacheKey">键</param>
        public void Write<T>(string cacheKey, T value, long dbId = 0) where T : class
        {
            cacheKey = cacheKey + Config.GetValue("RedisKey");
            RedisCache.Set(cacheKey, value, dbId);
        }
        /// <summary>
        /// 写入缓存
        /// </summary>
        /// <param name="value">对象数据</param>
        /// <param name="cacheKey">键</param>
        /// <param name="expireTime">到期时间</param>
        public void Write<T>(string cacheKey, T value, DateTime expireTime, long dbId = 0) where T : class
        {
            cacheKey = cacheKey + Config.GetValue("RedisKey");
            RedisCache.Set(cacheKey, value, expireTime, dbId);
        }
        /// <summary>
        /// 写入缓存
        /// </summary>
        /// <param name="value">对象数据</param>
        /// <param name="cacheKey">键</param>
        /// <param name="TimeSpan">缓存时间</param>
        public void Write<T>(string cacheKey, T value, TimeSpan timeSpan, long dbId = 0) where T : class
        {
            cacheKey = cacheKey + Config.GetValue("RedisKey");
            RedisCache.Set(cacheKey, value, timeSpan, dbId);
        }
        /// <summary>
        /// 移除指定数据缓存
        /// </summary>
        /// <param name="cacheKey">键</param>
        public void Remove(string cacheKey, long dbId = 0)
        {
            cacheKey = cacheKey + Config.GetValue("RedisKey");
            RedisCache.Remove(cacheKey, dbId);
        }
        /// <summary>
        /// 移除全部缓存
        /// </summary>
        public void RemoveAll(long dbId = 0)
        {
            RedisCache.RemoveAll(Config.GetValue("RedisKey"), dbId);
        }
        /// <summary>
        /// 移除全部缓存
        /// </summary>
        public void RemoveAll(string likeKey, long dbId = 0)
        {
            RedisCache.RemoveAll(likeKey, dbId);
        }
        #endregion
    }
}
