using Ayma.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping.AM_System.Database
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-12-19 12:03
    /// 描 述：常用字段类
    /// </summary>
    public class DbFieldMap : EntityTypeConfiguration<DbFieldEntity>
    {
        public DbFieldMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_DBFIELD");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
