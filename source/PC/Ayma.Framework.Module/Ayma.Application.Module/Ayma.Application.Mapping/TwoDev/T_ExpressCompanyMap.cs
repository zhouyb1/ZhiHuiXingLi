using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-13 10:00
    /// 描 述：快递公司信息管理
    /// </summary>
    public partial class T_ExpressCompanyMap : EntityTypeConfiguration<T_ExpressCompanyEntity>
    {
        public T_ExpressCompanyMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_EXPRESSCOMPANY");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

