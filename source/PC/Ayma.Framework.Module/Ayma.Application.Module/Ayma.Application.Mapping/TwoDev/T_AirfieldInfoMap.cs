using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-13 09:49
    /// 描 述：机场信息管理
    /// </summary>
    public partial class T_AirfieldInfoMap : EntityTypeConfiguration<T_AirfieldInfoEntity>
    {
        public T_AirfieldInfoMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_AIRFIELDINFO");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

