using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2017-07-11 14:20
    /// 描 述：现金余额
    /// </summary>
    public class CrmCashBalanceMap : EntityTypeConfiguration<CrmCashBalanceEntity>
    {
        public CrmCashBalanceMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_CRM_CASHBALANCE");
            //主键
            this.HasKey(t => t.F_CashBalanceId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

