﻿using Ayma.Application.Form;
using Nancy;
using System;
using System.Collections.Generic;

namespace Ayma.Application.WebApi.Modules
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.01.03
    /// 描 述：自定义表单处理接口
    /// </summary>
    public class FormApi: BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public FormApi()
            : base("/ayma/adms/form")
        {
            Get["/scheme"] = GetScheme;
            Get["/data"] = GetData;

            Post["/save"] = Save;
        }
        private FormSchemeIBLL formSchemeIBLL = new FormSchemeBLL();

        /// <summary>
        /// 获取表单模板数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response GetScheme(dynamic _)
        {
            List<SchemeReq> req = this.GetReqData<List<SchemeReq>>();// 获取模板请求数据
            Dictionary<string,FormSchemeEntity> schemeList = new Dictionary<string,FormSchemeEntity>();
            foreach (var item in req) {
                FormSchemeInfoEntity schemeInfoEntity = formSchemeIBLL.GetSchemeInfoEntity(item.id);
                FormSchemeEntity schemeEntity = formSchemeIBLL.GetSchemeEntity(schemeInfoEntity.F_SchemeId);
                string ver = ((DateTime)schemeEntity.F_CreateDate).ToString("yyyyMMddhhmmss");
                if (ver != item.ver) {
                    schemeList.Add(item.id, schemeEntity);
                }
            }
            return Success(schemeList);
        }
        /// <summary>
        /// 获取自定义表单数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetData(dynamic _)
        {
            List<FormParam> req = this.GetReqData<List<FormParam>>();// 获取模板请求数据
            Dictionary<string, object> dic = new Dictionary<string, object>();
            foreach (var item in req)
            {
                if (string.IsNullOrEmpty(item.processIdName))
                {
                    var data = formSchemeIBLL.GetInstanceForm(item.schemeInfoId, item.keyValue);
                    dic.Add(item.schemeInfoId, data);
                }
                else
                {
                    var data = formSchemeIBLL.GetInstanceForm(item.schemeInfoId, item.processIdName, item.keyValue);//
                    dic.Add(item.schemeInfoId, data);
                }
            }
            return Success(dic);

        }


        /// <summary>
        ///  保存表单数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response Save(dynamic _)
        {
            List<FormParam> req = this.GetReqData<List<FormParam>>();// 获取模板请求数据
            foreach (var item in req)
            {
                formSchemeIBLL.SaveInstanceForm(item.schemeInfoId, item.processIdName, item.keyValue, item.formData);
            }
            return Success("保存成功");
        }



        #region 请求参数
        private class SchemeReq {
            /// <summary>
            /// 表单请求Id
            /// </summary>
            public string id { get; set; }
            /// <summary>
            /// 当前自定义表单版本号
            /// </summary>
            public string ver { get; set; }
        }

        /// <summary>
        /// 自定义表单提交参数
        /// </summary>
        private class FormParam
        {
            /// <summary>
            /// 流程模板id
            /// </summary>
            public string schemeInfoId { get; set; }
            /// <summary>
            /// 关联字段名称
            /// </summary>
            public string processIdName { get; set; }
            /// <summary>
            /// 数据主键值
            /// </summary>
            public string keyValue { get; set; }
            /// <summary>
            /// 表单数据
            /// </summary>
            public string formData { get; set; }
        }

        #endregion
    }

   


   
}