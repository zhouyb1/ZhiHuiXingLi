using Ayma.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：Ayma
    /// 日 期：2017-06-21 16:30
    /// 描 述：数据权限
    /// </summary>
    public class DataAuthorizeConditionMap : EntityTypeConfiguration<DataAuthorizeConditionEntity>
    {
        public DataAuthorizeConditionMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_DATACONDITION");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

