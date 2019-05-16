using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-16 10:59
    /// 描 述：收款表
    /// </summary>
    public partial class T_OrderCollectMoneyMap : EntityTypeConfiguration<T_OrderCollectMoneyEntity>
    {
        public T_OrderCollectMoneyMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_ORDERCOLLECTMONEY");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

