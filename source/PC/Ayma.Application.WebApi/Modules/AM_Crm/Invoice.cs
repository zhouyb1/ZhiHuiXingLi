using Ayma.Application.CRM;
using Ayma.Util;
using Nancy;

namespace Ayma.Application.WebApi
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.03.22
    /// 描 述：开票信息
    /// </summary>
    public class Invoice: BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public Invoice()
            : base("/ayma/adms/crm/invoice")
        {
            Get["/list"] = GetList;// 获取开票信息列表

            Post["save"] = Save;
        }
        private CrmInvoiceIBLL crmInvoiceIBLL = new CrmInvoiceBLL();

        /// <summary>
        /// 获取客户端数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response GetList(dynamic _)
        {
            QueryModel parameter = this.GetReqData<QueryModel>();

            var list = crmInvoiceIBLL.GetPageList(parameter.pagination, parameter.queryJson);
            var jsonData = new
            {
                rows = list,
                total = parameter.pagination.total,
                page = parameter.pagination.page,
                records = parameter.pagination.records,
            };
            return Success(jsonData);
        }



        /// <summary>
        /// 获取客户端数据
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response Save(dynamic _)
        {
            PostModel parameter = this.GetReqData<PostModel>();
            crmInvoiceIBLL.SaveEntity(parameter.keyValue, parameter.entity);
            return Success("保存成功");
        }

        /// <summary>
        /// 查询条件对象
        /// </summary>
        private class QueryModel
        {
            public Pagination pagination { get; set; }
            public string queryJson { get; set; }
        }

        /// <summary>
        /// 提交数据
        /// </summary>
        private class PostModel {
            public string keyValue { get; set; }
            public CrmInvoiceEntity entity { get; set; }
        }

    }
}