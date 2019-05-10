using Ayma.Application.OA;
using Ayma.Application.OA.Schedule;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.04.17
    /// 描 述：新闻公告
    /// </summary>
    public class ScheduleMap : EntityTypeConfiguration<ScheduleEntity>
    {
        public ScheduleMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_OA_SCHEDULE");
            //主键
            this.HasKey(t => t.F_ScheduleId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
