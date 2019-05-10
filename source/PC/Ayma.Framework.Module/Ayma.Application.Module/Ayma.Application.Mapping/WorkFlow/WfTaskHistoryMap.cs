using Ayma.Application.WorkFlow;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.04.17
    /// 描 述：任务实例处理记录
    /// </summary>
    public class WfTaskHistoryMap : EntityTypeConfiguration<WfTaskHistoryEntity>
    {
        public WfTaskHistoryMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_WF_TASKHISTORY");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
