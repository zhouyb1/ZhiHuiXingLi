using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:47
    /// �� ������Ʊ��Ϣ
    /// </summary>
    public class CrmInvoiceMap : EntityTypeConfiguration<CrmInvoiceEntity>
    {
        public CrmInvoiceMap()
        {
            #region ������
            //��
            this.ToTable("AM_CRM_INVOICE");
            //����
            this.HasKey(t => t.F_InvoiceId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}

