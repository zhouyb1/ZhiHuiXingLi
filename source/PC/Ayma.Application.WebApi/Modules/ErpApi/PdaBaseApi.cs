using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using Ayma.Application.Base.SystemModule;
using Ayma.Loger;
using Ayma.Util;
using Ayma.Util.Operat;
using Nancy;
using Nancy.ModelBinding;
using Ayma.Util.Security;

namespace Ayma.Application.WebApi.Modules.ErpApi
{
    public class PdaBaseApi : NancyModule
    {
        #region 构造函数
        public PdaBaseApi()
            : base()
        {
            Before += BeforeRequest;
            OnError += OnErroe;
        }
        public PdaBaseApi(string baseUrl)
            : base(baseUrl)
        {
            Before += BeforeRequest;
            OnError += OnErroe;
        }
        #endregion


        #region 获取请求数据
        /// <summary>
        /// 获取请求数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetReqData<T>() where T : class
        {
            try
            {
                ReqParameter<string> req = this.Bind<ReqParameter<string>>();
                return req.data.ToObject<T>();
            }
            catch (Exception)
            {
                throw;
            }

        }
        /// <summary>
        /// 获取请求数据
        /// </summary>
        /// <returns></returns>
        public string GetReqData()
        {
            try
            {
                ReqParameter<string> req = this.Bind<ReqParameter<string>>();
                return req.data;
            }
            catch (Exception)
            {
                throw;
            }

        }
        /// <summary>
        /// 获取请求数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetReq<T>() where T : class
        {
            try
            {
                T req = this.Bind<T>();
                return req;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion


        #region 权限验证
        public string sign;
        public string version; //版本号


        /// <summary>
        /// 前置拦截器
        /// </summary>
        /// <param name="ctx"></param>
        /// <returns></returns>
        private Response BeforeRequest(NancyContext ctx)
        {
            try
            {
                string path = ctx.ResolvedRoute.Description.Path;
                //验证登录状态
                ReqParameter<string> req = this.Bind<ReqParameter<string>>();
                this.sign = req.sign;
                this.version = req.version;
                if (string.IsNullOrEmpty(this.sign))
                {
                    return this.Fail("sign不能为空");
                }
                if (string.IsNullOrEmpty(this.version))
                {
                    return this.Fail("version不能为空");
                }
                //配置data 参数可以为空
                string[] ReqPath = new[]
                {
                    "/pdaapi/GetAirPort",
                    "/pdaapi/getemployeelist",
 
                };
                if (!ReqPath.Contains(path.ToLower()))
                {
                    if (string.IsNullOrEmpty(req.data))
                    {
                        return this.Fail("data不能为空");
                    }
                }

                //配置不参与sign
                string[] ReqSign = new[]
                {
                    "/pdaapi/saledatadetailupload"
                };

                if (ReqSign.Contains(path.ToLower()))
                {
                    return null;
                }

                var pdakey = Config.GetValue("pdakey");//pda签名key
                var serverSign = "";
                var data = req.data;

                //请求参数data为空时，不参与签名
                if (data == null)
                {
                    serverSign = "&version=" + version + "&key=" + pdakey;// 签名模式，version+&key=pdakey
                }
                else
                {
                    serverSign = "data=" + data + "&version=" + version + "&key=" + pdakey;// 签名模式，data+version+&key=pdakey
                }
                string md5 = Md5Helper.Encrypt(serverSign, 32).ToUpper();
                if (md5 != req.sign.ToUpper())
                {
                    return this.Fail("sign签名错误");
                }
                this.WriteLog(ctx, req);//记录日志
            }
            catch (Exception)
            {

                throw;
            }
            return null;
        }
        #endregion



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
        /// <param name="ctx">连接上下信息</param>
        /// <param name="ex">异常信息</param>
        /// <returns></returns>
        private Response OnErroe(NancyContext ctx, Exception ex)
        {
            try
            {
                this.WriteLog(ctx, ex);
            }
            catch (Exception)
            {
            }
            string msg = "异常信息：" + ex.Message;
            return Response.AsText(new ResParameter { code = ResponseCode.exception, info = msg }.ToJson()).WithContentType("application/json").WithStatusCode(HttpStatusCode.OK);
        }


        /// <summary>
        /// 写入日志（log4net）
        /// </summary>
        /// <param name="context">提供使用</param>
        private void WriteLog(NancyContext context, Exception ex)
        {
            if (context == null)
                return;
            string path = context.ResolvedRoute.Description.Path;
            Exception Error = ex;
            LogMessage logMessage = new LogMessage();
            logMessage.OperationTime = DateTime.Now;
            logMessage.Url = path;
            logMessage.Class = "pdawebapi";
            logMessage.Ip = Net.Ip;
            logMessage.Host = Net.Host;
            logMessage.Browser = Net.Browser;

            logMessage.UserName = "pda";

            if (Error.InnerException == null)
            {
                logMessage.ExceptionInfo = Error.Message;
            }
            else
            {
                logMessage.ExceptionInfo = Error.InnerException.Message;
            }
            logMessage.ExceptionSource = Error.Source;
            logMessage.ExceptionRemark = Error.StackTrace;
            string strMessage = new LogFormat().ExceptionFormat(logMessage);
            Logger.Error(strMessage);

            LogEntity logEntity = new LogEntity();
            logEntity.F_CategoryId = 4;
            logEntity.F_OperateTypeId = ((int)OperationType.Exception).ToString();
            logEntity.F_OperateType = EnumAttribute.GetDescription(OperationType.Exception);
            logEntity.F_OperateAccount = logMessage.UserName;
            logEntity.F_OperateUserId = "pda";

            logEntity.F_ExecuteResult = -1;
            logEntity.F_ExecuteResultJson = strMessage;
            logEntity.WriteLog();
        }


        /// <summary>
        /// 添加接口访问记录
        /// </summary>
        /// <param name="context"></param>
        /// <param name="req"></param>
        private void WriteLog(NancyContext context,ReqParameter<string>req )
        {
            if (context == null)
                return;

            string path = context.ResolvedRoute.Description.Path;
            LogMessage logMessage = new LogMessage();
            logMessage.OperationTime = DateTime.Now;
            logMessage.Url = path;
            logMessage.Class = req.data;
            logMessage.Ip = Net.Ip;
            logMessage.Host = Net.Host;
            logMessage.Browser = Net.Browser;
            logMessage.UserName = "";
            logMessage.Content = req.ToJson();
            string strMessage = new LogFormat().InfoFormat(logMessage);
            Logger.Info(strMessage);

            LogEntity logEntity = new LogEntity();
            logEntity.F_CategoryId = 4;
            logEntity.F_OperateTypeId = ((int)OperationType.Exception).ToString();
            logEntity.F_OperateType = EnumAttribute.GetDescription(OperationType.Exception);
            logEntity.F_OperateAccount = logMessage.UserName;
            logEntity.F_OperateUserId = "pda";

            logEntity.F_ExecuteResult = -1;
            logEntity.F_ExecuteResultJson = strMessage;
            logEntity.WriteLog();
        }

        #region 响应接口
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public Response Success(string info)
        {
            ResParameter res = new ResParameter { code = ResponseCode.success, info = info, data = new object { } };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Response Success(object data)
        {
            //var secretData = DESHelper.Encrypt(data.ToJson());
            var secretData = data.ToJson();
            ResParameter res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = secretData };
            return Response.AsText(res.ToString()).WithContentType("application/json");
        }
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public Response Success<T>(T data) where T : class
        {
            //var secretData = DESHelper.Encrypt(data.ToJson());
            var secretData = data.ToJson();
            ResParameter res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = secretData };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Response SuccessString(string data)
        {
            //var secretData = DESHelper.Encrypt(data);
            var secretData = data.ToJson();
            ResParameter res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = secretData };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }

        public Response Success(string info, object data)
        {
            ResParameter res = new ResParameter { code = ResponseCode.success, info = info, data = data };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        /// <summary>
        /// 接口响应失败
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public Response Fail(string info)
        {
            ResParameter res = new ResParameter { code = ResponseCode.fail, info = info, data = new object { } };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        #endregion
    }
}