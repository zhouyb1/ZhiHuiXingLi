using Ayma.Application.Excel;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping.AM_Excel
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-09-05 16:07
    /// 描 述：Excel数据导入设置字段
    /// </summary>
    public class ExcelImportFieldMap : EntityTypeConfiguration<ExcelImportFieldEntity>
    {
        public ExcelImportFieldMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_EXCEL_IMPORTFILEDS");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion
 
            #region 配置关系
            #endregion
        }
    }
}
