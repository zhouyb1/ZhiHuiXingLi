using Ayma.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.04
    /// 描 述：自定义查询
    /// </summary>
    public class CustmerQueryMap : EntityTypeConfiguration<CustmerQueryEntity>
    {
        /// <summary>
        /// 系统日志映射
        /// </summary>
        public CustmerQueryMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_CUSTMERQUERY");
            //主键
            this.HasKey(t => t.F_CustmerQueryId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
