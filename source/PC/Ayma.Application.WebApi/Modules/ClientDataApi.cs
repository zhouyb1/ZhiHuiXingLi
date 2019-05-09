﻿using Ayma.Application.AppMagager;
using Ayma.Application.WorkFlow;
using Nancy;

namespace Ayma.Application.WebApi.Modules
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.03.22
    /// 描 述：客户端数据
    /// </summary>
    public class ClientDataApi: BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public ClientDataApi()
            : base("/ayma/adms/clinet")
        {
            Get["/module"] = GetModule;// 获取数据字典详细列表
        }

        private FunctionIBLL functionIBLL = new FunctionBLL();
        private WfSchemeIBLL wfSchemeIBLL = new WfSchemeBLL();
        
        /// <summary>
        /// 获取客户端数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response GetModule(dynamic _)
        {
            var custmerform = functionIBLL.GetList();
            var wfSchemeList = wfSchemeIBLL.GetAppCustmerSchemeInfoList(userInfo);

            var jsonData = new
            {
                custmerform = custmerform,
                wflist = wfSchemeList
            };
            return Success(jsonData);
        }


    }
}