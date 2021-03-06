﻿using System.Collections.Generic;

namespace Ayma.Application.WorkFlow
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.04.17
    /// 描 述：工作流模板模型
    /// </summary>
    public class WfSchemeModel
    {
        #region 原始属性
        /// <summary>
        /// 节点数据
        /// </summary>
        public List<WfNodeInfo> nodes { get; set; }
        /// <summary>
        /// 线条数据
        /// </summary>
        public List<WfLineInfo> lines { get; set; }
        #endregion
    }
}
