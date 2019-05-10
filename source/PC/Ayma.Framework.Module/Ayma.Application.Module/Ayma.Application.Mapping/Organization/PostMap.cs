using Ayma.Application.Organization;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.04
    /// 描 述：岗位管理
    /// </summary>
    public class PostMap : EntityTypeConfiguration<PostEntity>
    {
        public PostMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_POST");
            //主键
            this.HasKey(t => t.F_PostId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
