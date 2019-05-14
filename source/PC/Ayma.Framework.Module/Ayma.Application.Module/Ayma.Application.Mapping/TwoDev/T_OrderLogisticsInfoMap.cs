using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-14 10:37
    /// 描 述：订单物流信息
    /// </summary>
    public partial class T_OrderLogisticsInfoMap : EntityTypeConfiguration<T_OrderLogisticsInfoEntity>
    {
        public T_OrderLogisticsInfoMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_ORDERLOGISTICSINFO");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

