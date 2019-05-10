using Ayma.Application.OA;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.04.17
    /// 描 述：新闻公告
    /// </summary>
    public class NewsMap : EntityTypeConfiguration<NewsEntity>
    {
        public NewsMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_OA_NEWS");
            //主键
            this.HasKey(t => t.F_NewsId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
