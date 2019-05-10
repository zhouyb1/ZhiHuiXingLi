using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-07-11 14:48
    /// 描 述：应收账款
    /// </summary>
    public class AM_CRM_ReceivableMap : EntityTypeConfiguration<CrmReceivableEntity>
    {
        public AM_CRM_ReceivableMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_CRM_RECEIVABLE");
            //主键
            this.HasKey(t => t.F_ReceivableId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

