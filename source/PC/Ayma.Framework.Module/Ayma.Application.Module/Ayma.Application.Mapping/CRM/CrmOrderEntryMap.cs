using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-07-10 17:59
    /// 描 述：订单管理
    /// </summary>
    public class AM_CRM_OrderEntryMap : EntityTypeConfiguration<CrmOrderProductEntity>
    {
        public AM_CRM_OrderEntryMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_CRM_ORDERPRODUCT");
            //主键
            this.HasKey(t => t.F_OrderEntryId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

