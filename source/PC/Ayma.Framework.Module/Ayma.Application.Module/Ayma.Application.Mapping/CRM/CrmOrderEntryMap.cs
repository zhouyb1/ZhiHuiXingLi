using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// �� ������������Ա
    /// �� �ڣ�2017-07-10 17:59
    /// �� ������������
    /// </summary>
    public class AM_CRM_OrderEntryMap : EntityTypeConfiguration<CrmOrderProductEntity>
    {
        public AM_CRM_OrderEntryMap()
        {
            #region ������
            //��
            this.ToTable("AM_CRM_ORDERPRODUCT");
            //����
            this.HasKey(t => t.F_OrderEntryId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}

