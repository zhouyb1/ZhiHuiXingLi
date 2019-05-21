using Ayma.Application.TwoDevelopment.TwoDev;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-21 17:00
    /// 描 述：客户评价反馈
    /// </summary>
    public partial class T_OpinionFeedbackMap : EntityTypeConfiguration<T_OpinionFeedbackEntity>
    {
        public T_OpinionFeedbackMap()
        {
            #region 表、主键
            //表
            this.ToTable("T_OPINIONFEEDBACK");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

