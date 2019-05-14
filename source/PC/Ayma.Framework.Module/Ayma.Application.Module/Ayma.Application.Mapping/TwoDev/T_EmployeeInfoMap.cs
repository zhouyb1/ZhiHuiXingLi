using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-13 16:02
    /// 描 述：分拣员信息管理
    /// </summary>
    public partial class T_EmployeeInfoMap : EntityTypeConfiguration<T_EmployeeInfoEntity>
    {
        public T_EmployeeInfoMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_EMPLOYEEINFO");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

