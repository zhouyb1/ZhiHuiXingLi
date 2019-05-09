﻿using Ayma.Application.Form;
using Ayma.Util;
using Nancy;

namespace Ayma.Application.WebApi.Modules
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.03.22
    /// 描 述：自定义表单功能
    /// </summary>
    public class CustmerFormApi: BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public CustmerFormApi()
            : base("/ayma/adms/custmer")
        {
            Get["/pagelist"] = GetPageList;// 获取数据字典详细列表
        }
        private FormSchemeIBLL formSchemeIBLL = new FormSchemeBLL();

        /// <summary>
        /// 获取自定义表单分页数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response GetPageList(dynamic _)
        {
            QueryModel parameter = this.GetReqData<QueryModel>();
            var data = formSchemeIBLL.GetFormPageList(parameter.formId, parameter.pagination, parameter.queryJson);
            var jsonData = new
            {
                rows = data,
                total = parameter.pagination.total,
                page = parameter.pagination.page,
                records = parameter.pagination.records,
            };
            return Success(jsonData);
        }


        /// <summary>
        /// 查询条件对象
        /// </summary>
        private class QueryModel
        {
            public Pagination pagination { get; set; }

            public string formId { get; set; }

            public string queryJson { get; set; }
        }
    }
}