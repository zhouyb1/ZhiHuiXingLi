using Ayma.Application.AppMagager;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.03.16
    /// 描 述：工作流模板
    /// </summary>
    public class FunctionMap : EntityTypeConfiguration<FunctionEntity>
    {
        public FunctionMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_APP_FUNCTION");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
