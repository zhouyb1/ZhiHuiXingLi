﻿using Ayma.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.08
    /// 描 述：附件管理
    /// </summary>
    public class AnnexesFileMap : EntityTypeConfiguration<AnnexesFileEntity>
    {
        public AnnexesFileMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_ANNEXESFILE");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
