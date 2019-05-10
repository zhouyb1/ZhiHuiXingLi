using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-07-11 11:30
    /// 描 述：商机管理
    /// </summary>
    public class CrmChanceMap : EntityTypeConfiguration<CrmChanceEntity>
    {
        public CrmChanceMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_CRM_CHANCE");
            //主键
            this.HasKey(t => t.F_ChanceId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

