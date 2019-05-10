using Ayma.Application.Organization;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.04
    /// 描 述：部门管理
    /// </summary>
    public class DepartmentMap : EntityTypeConfiguration<DepartmentEntity>
    {
        public DepartmentMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_DEPARTMENT");//Base_Department
            //主键
            this.HasKey(t => t.F_DepartmentId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
