using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-07-22 11:11
    /// 描 述：微信申请退款
    /// </summary>
    public partial class T_OrderRefundMap : EntityTypeConfiguration<T_OrderRefundEntity>
    {
        public T_OrderRefundMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_ORDERREFUND");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

