using Ayma.Application.IM;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping.AM_IM
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.04.17
    /// 描 述：即时通讯消息内容
    /// </summary>
    public class IMContentMap : EntityTypeConfiguration<IMContentEntity>
    {
        public IMContentMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_IM_CONTENT");
            //主键
            this.HasKey(t => t.F_ContentId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
