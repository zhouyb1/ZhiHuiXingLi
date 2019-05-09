using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ayma.Application.Base.SystemModule;
using Ayma.Loger;
using Ayma.Util;
using Ayma.Util.Operat;
using Newtonsoft.Json.Linq;

namespace Ayma.Application.Web
{
    /// <summary>
    /// webapi基类
    /// </summary>
    public class BaseApiController : Controller
    {
        /// <summary>
        /// 当前操作用户
        /// </summary>
        public OperatorResult CurrentOper;

        /// <summary>
        /// 上下文
        /// </summary>
        public ActionExecutingContext FilterContext;

        /// <summary>
        /// Json参数
        /// </summary>
        public JObject ParaList;

        /// <summary>
        /// 参数Json字符串
        /// </summary>
        public string StrJson;

        
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            FilterContext = filterContext;

            var request = filterContext.HttpContext.Request;
            var httpMethod = request.HttpMethod.ToUpper();
            if (httpMethod != "POST" && httpMethod != "GET")
            {
                filterContext.Result = Fail("非法的请求方式");
                return;
            }

            //var ignoreUrls = new List<string>()
            //{
            //    "/webapi/user/login","/webapi/payment/wxapipay","/webapi/payment/alipay","/webapi/payment/wxnotify","/webapi/payment/alinotify","/webapi/loginlink/loginfrome"           };
            //if (!ignoreUrls.Contains(request.Path.ToLower()))
            //{
            //    var keys = new List<string>();
            //    var paras = new Dictionary<string, string>();
            //    var token = "";
            //    var sign = "";

            //    if (httpMethod == "POST")
            //    {
            //        ParaList = System.Web.HttpUtility.UrlDecode(request.Form.ToString()).ToJObject();
            //        if (ParaList != null)
            //        {
            //            foreach (var item in ParaList)
            //            {
            //                keys.Add(item.Key);
            //                if (item.Key != "sign" && item.Key != "token")
            //                {
            //                    paras.Add(item.Key, item.Value.ToString());
            //                }
            //            }
            //            token = ParaList["token"].ToString();
            //            sign = ParaList["sign"].ToString();
            //        }
            //        else
            //        {
            //            keys = request.Form.AllKeys.Select(c => c.ToLower()).ToList();
            //            paras =
            //                request.Form.AllKeys.Where(c => c.ToLower() != "sign" && c.ToLower() != "token")
            //                    .ToDictionary(c => c, c => request.Form[c]);
            //            token = request.Form["token"];
            //            sign = request.Form["sign"];
            //        }
            //        StrJson = System.Web.HttpUtility.UrlDecode(request.Form.ToString());
            //        WriteInfoLog(StrJson);

            //    }
            //    else if (httpMethod == "GET")
            //    {
            //        ParaList = System.Web.HttpUtility.UrlDecode(request.QueryString.ToString()).ToJObject();
            //        if (ParaList != null)
            //        {
            //            foreach (var item in ParaList)
            //            {
            //                keys.Add(item.Key);
            //                if (item.Key != "sign" && item.Key != "token")
            //                {
            //                    paras.Add(item.Key, item.Value.ToString());
            //                }
            //            }
            //            token = ParaList["token"].ToString();
            //            sign = ParaList["sign"].ToString();
            //        }
            //        else
            //        {
            //            keys = request.QueryString.AllKeys.Select(c => c.ToLower()).ToList();
            //            paras =
            //                request.QueryString.AllKeys.Where(c => c.ToLower() != "sign" && c.ToLower() != "token")
            //                    .ToDictionary(c => c, c => request.QueryString[c]);
            //            token = request.QueryString["token"];
            //            sign = request.QueryString["sign"];
            //        }
            //        StrJson = System.Web.HttpUtility.UrlDecode(request.QueryString.ToString());
            //        WriteInfoLog(StrJson);
            //    }
            //}
            //else
            //{
            //    StrJson = string.IsNullOrEmpty(request.Form.ToString())
            //        ? request.QueryString.ToString()
            //        : request.Form.ToString();
            //    ParaList = System.Web.HttpUtility.UrlDecode(StrJson).ToJObject();
            //    WriteInfoLog(System.Web.HttpUtility.UrlDecode(StrJson));
            //}
            
        }
      

        #region 异常抓取
        /// <summary>
        /// 日志对象实体
        /// </summary>
        private Log _logger;
        /// <summary>
        /// 日志操作
        /// </summary>
        public Log Logger
        {
            get { return _logger ?? (_logger = LogFactory.GetLogger(this.GetType().ToString())); }
        }

        /// <summary>
        /// 监听接口异常
        /// </summary>
        /// <returns></returns>
        protected override void OnException(ExceptionContext filterContext)
        {
            WriteLog(filterContext, filterContext.Exception);
            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.StatusCode = 200;
            filterContext.Result = Fail(filterContext.Exception.Message);
        }
        /// <summary>
        /// 写入日志（log4net）
        /// </summary>
        /// <param name="context">提供使用</param>
        private void WriteLog(ExceptionContext context, Exception ex)
        {
            if (context == null)
                return;
            //var userInfo = LoginUserInfo.Get();
            var log = LogFactory.GetLogger("webapi");
            Exception error = ex;
            var logMessage = new LogMessage { OperationTime = DateTime.Now };
            if (context.HttpContext.Request.Url != null) logMessage.Url = context.HttpContext.Request.Url.PathAndQuery;
            logMessage.Class = context.Controller.ToString();
            logMessage.Ip = Net.Ip;
            logMessage.Host = Net.Host;
            logMessage.Browser = Net.Browser;
            //if (userInfo != null)
            //{
            //    logMessage.UserName = userInfo.number + "（" + userInfo.cus_name + "）";
            //}

            if (error.InnerException == null)
            {
                logMessage.ExceptionInfo = error.Message;
            }
            else
            {
                logMessage.ExceptionInfo = error.InnerException.Message;
            }
            logMessage.ExceptionSource = error.Source;
            logMessage.ExceptionRemark = error.StackTrace;
            string strMessage = new LogFormat().ExceptionFormat(logMessage);
            log.Error(strMessage);

            var logEntity = new LogEntity
            {
                F_CategoryId = 4,
                F_OperateTypeId = ((int)OperationType.Exception).ToString(),
                F_OperateType = EnumAttribute.GetDescription(OperationType.Exception),
                F_OperateAccount = logMessage.UserName
            };
            //if (userInfo != null)
            //{
            //    logEntity.OperateUserId = userInfo.id;
            //}
            logEntity.F_ExecuteResult = -1;
            logEntity.F_ExecuteResultJson = strMessage;
            logEntity.WriteLog();
        }
        #endregion

        #region 添加访问接口记录
        /// <summary>
        /// 添加访问接口记录
        /// </summary>
        /// <param name="content">记录内容</param>
        public void WriteInfoLog(string content)
        {
            //var userInfo = LoginUserInfo.Get();
            var log = LogFactory.GetLogger("webapi");
            var logMessage = new LogMessage { OperationTime = DateTime.Now };
            if (FilterContext.HttpContext.Request.Url != null)
                logMessage.Url = FilterContext.HttpContext.Request.Url.PathAndQuery;
            logMessage.Class = FilterContext.Controller.ToString();
            logMessage.Ip = Net.Ip;
            logMessage.Host = Net.Host;
            logMessage.Browser = Net.Browser;
            //if (userInfo != null)
            //{
            //    logMessage.UserName = userInfo.number + "（" + userInfo.cus_name + "）";
            //}
            logMessage.Content = content;
            string strMessage = new LogFormat().InfoFormat(logMessage);
            log.Info(strMessage);

            var logEntity = new LogEntity
            {
                F_CategoryId = 2,
                F_OperateTypeId = ((int)OperationType.Visit).ToString(),
                F_OperateType = EnumAttribute.GetDescription(OperationType.Visit),
                F_OperateAccount = logMessage.UserName,
                F_OperateUserId = "",
                F_ExecuteResult = 1,
                F_ExecuteResultJson = strMessage
            };
            logEntity.WriteLog();
        }
        #endregion

        #region 响应接口
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public ActionResult Success(string info)
        {
            var res = new ResParameter { code = ResponseCode.success, info = info, data = new object { } };
            return Content(res.ToJson());
        }
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public ActionResult Success(object data)
        {
            var res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = data };
            return Content(res.ToJson());
        }

        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <param name="info">消息</param>
        /// <param name="data">数据</param>
        /// <returns></returns>
        public ActionResult Success(string info, object data)
        {
            var res = new ResParameter { code = ResponseCode.success, info = info ?? "响应成功", data = data };
            return Content(res.ToJson());
        }

        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public ActionResult Success<T>(T data) where T : class
        {
            var res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = data };

            return Content(res.ToJson());
        }

        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <typeparam name="T">实体</typeparam>
        /// <param name="info">消息</param>
        /// <param name="data">数据</param>
        /// <returns></returns>
        public ActionResult Success<T>(string info, T data) where T : class
        {
            var res = new ResParameter { code = ResponseCode.success, info = info ?? "响应成功", data = data };

            return Content(res.ToJson());
        }
        /// <summary>
        /// 接口响应失败
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public ActionResult Fail(string info)
        {
            var res = new ResParameter { code = ResponseCode.fail, info = info, data = new object { } };
            return Content(res.ToJson());
        }
        #endregion
    }


    
    public static class SignHelper
    {
        /// <summary>
        /// 检查签名
        /// </summary>
        /// <param name="paras"></param>
        /// <param name="sign"></param>
        /// <param name="token"></param>
        /// <param name="sysSign">系统签名</param>
        /// <returns></returns>
        public static bool Check(Dictionary<string, string> paras, string sign, string token,out string sysSign)
        {
            if (string.IsNullOrEmpty(token))
            {
                sysSign = "";
                return false;
            }
            var str = paras.Keys.OrderBy(c => c).Aggregate(string.Empty, (c, k) => c + paras[k]);
            var signResult = Md5Helper.Encrypt(string.Format("{0}{1}", str, token), 32);
            sysSign = str + ":" + signResult;
            return sign.ToLower() == signResult.ToLower();
        }
    }
}