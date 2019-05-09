﻿using Ayma.Application.Base.SystemModule;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ayma.Application.WebApi.Modules
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.01.04
    /// 描 述：编码规则
    /// </summary>
    public class CodeRuleApi: BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public CodeRuleApi()
            : base("/ayma/adms/coderule")
        {
            Get["/code"] = GetEnCode;// 获取数据字典详细列表
        }
        private CodeRuleIBLL codeRuleIBLL = new CodeRuleBLL();

        /// <summary>
        /// 获取数据字典详细列表
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response GetEnCode(dynamic _)
        {
            string req = this.GetReqData();// 获取模板请求数据
            var data = codeRuleIBLL.GetBillCode(req);
            return SuccessString(data);
        }
    }
}