using log4net;
using System;
namespace Ayma.Loger
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.04
    /// 描 述：redis操作方法
    /// </summary>
    public class LogFactory
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        static LogFactory()
        {
            log4net.Config.XmlConfigurator.Configure();
        }
        /// <summary>
        /// 获取日志操作对象
        /// </summary>
        /// <param name="type">类型</param>
        /// <returns></returns>
        public static Log GetLogger(Type type)
        {
            return new Log(LogManager.GetLogger(type));
        }
        /// <summary>
        /// 获取日志操作对象
        /// </summary>
        /// <param name="str">名字</param>
        /// <returns></returns>
        public static Log GetLogger(string str)
        {
            return new Log(LogManager.GetLogger(str));
        }
    }
}
