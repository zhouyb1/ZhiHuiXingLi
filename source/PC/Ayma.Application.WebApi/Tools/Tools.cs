using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Ayma.Application.WebApi
{
    public class Tools
    {
        /// <summary>
        /// 生成一连串订单号
        /// </summary>
        /// <param name="count"></param>
        /// <param name="pre"></param>
        /// <returns></returns>
        public static List<string> createOrderNoList(int count,string pre)
        {
            var OrderNoList = new List<string>();
            var random = new Random().Next(1000, 5000);
            var dateFormat = DateTime.Now.ToString("yyyyMMddHHmmss");
            for (int i = 0; i < count; i++)
            {
                OrderNoList.Add(pre + dateFormat);
                random++;
            }
            return OrderNoList;
        }
        /// <summary>
        /// 获取最新的过期时间
        /// </summary>
        /// <returns></returns>
        public static DateTime GetExpireTime()
        {
            return DateTime.Now.AddDays(2);//有效期2天
        }

        #region Stopwatch计时器
        /// <summary>
        /// 计时器开始
        /// </summary>
        /// <returns></returns>
        public static Stopwatch TimerStart()
        {
            Stopwatch watch = new Stopwatch();
            watch.Reset();
            watch.Start();
            return watch;
        }
        /// <summary>
        /// 计时器结束
        /// </summary>
        /// <param name="watch"></param>
        /// <returns></returns>
        public static string TimerEnd(Stopwatch watch)
        {
            watch.Stop();
            double costtime = watch.ElapsedMilliseconds;
            return costtime.ToString();
        }
        #endregion
    }
}