using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-23 18:24
    /// 描 述：航站楼
    /// </summary>
    public partial class T_AirfieldFloorMap : EntityTypeConfiguration<T_AirfieldFloorEntity>
    {
        public T_AirfieldFloorMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_AIRFIELDFLOOR");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

