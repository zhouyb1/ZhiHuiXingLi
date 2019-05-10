using Ayma.Application.Report;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-07-12 09:57
    /// 描 述：报表管理
    /// </summary>
    public class ReportTempMap : EntityTypeConfiguration<ReportTempEntity>
    {
        public ReportTempMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_REPORTTEMP");
            //主键
            this.HasKey(t => t.F_TempId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
