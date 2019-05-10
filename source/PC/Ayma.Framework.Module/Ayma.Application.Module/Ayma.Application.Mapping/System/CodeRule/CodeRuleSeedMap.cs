using Ayma.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2015.12.21 16:19
    /// 描 述：编号规则种子
    /// </summary>
    public class CodeRuleSeedMap : EntityTypeConfiguration<CodeRuleSeedEntity>
    {
        public CodeRuleSeedMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_CODERULESEED");//Base_CodeRuleSeed
            //主键
            this.HasKey(t => t.F_RuleSeedId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
