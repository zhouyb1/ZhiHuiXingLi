using Ayma.Application.Form;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.04.01
    /// 描 述：表单模板信息
    /// </summary>
    public class FormSchemeInfoMap : EntityTypeConfiguration<FormSchemeInfoEntity>
    {
        public FormSchemeInfoMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_FORM_SCHEMEINFO");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
