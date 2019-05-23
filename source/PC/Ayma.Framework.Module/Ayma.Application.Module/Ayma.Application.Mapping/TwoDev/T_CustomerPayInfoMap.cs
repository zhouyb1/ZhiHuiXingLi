using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-23 09:32
    /// 描 述：运费设置
    /// </summary>
    public partial class T_CustomerPayInfoMap : EntityTypeConfiguration<T_CustomerPayInfoEntity>
    {
        public T_CustomerPayInfoMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_CUSTOMERPAYINFO");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

