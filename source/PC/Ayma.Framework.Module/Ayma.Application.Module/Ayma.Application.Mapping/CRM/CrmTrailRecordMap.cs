using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-07-11 11:20
    /// 描 述：跟进记录
    /// </summary>
    public class CrmTrailRecordMap : EntityTypeConfiguration<CrmTrailRecordEntity>
    {
        public CrmTrailRecordMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_CRM_TRAILRECORD");
            //主键
            this.HasKey(t => t.F_TrailId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

