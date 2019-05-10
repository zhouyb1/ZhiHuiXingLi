using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 11:20
    /// �� ����������¼
    /// </summary>
    public class CrmTrailRecordMap : EntityTypeConfiguration<CrmTrailRecordEntity>
    {
        public CrmTrailRecordMap()
        {
            #region ������
            //��
            this.ToTable("AM_CRM_TRAILRECORD");
            //����
            this.HasKey(t => t.F_TrailId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}

