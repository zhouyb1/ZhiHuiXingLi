﻿namespace Ayma.Application.WorkFlow
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.08.03
    /// 描 述：工作流关联表单
    /// </summary>
    public class WfForm
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// 自定义表单主键
        /// </summary>
        public string formId { get; set; }
        /// <summary>
        /// 表单名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 表单地址
        /// </summary>
        public string url { get; set; }
        /// <summary>
        /// 自定义表单关联的字段
        /// </summary>
        public string field { get; set; }
    }
}
