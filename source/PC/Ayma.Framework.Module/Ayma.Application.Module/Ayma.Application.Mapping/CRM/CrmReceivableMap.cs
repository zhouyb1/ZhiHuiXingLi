using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:48
    /// �� ����Ӧ���˿�
    /// </summary>
    public class AM_CRM_ReceivableMap : EntityTypeConfiguration<CrmReceivableEntity>
    {
        public AM_CRM_ReceivableMap()
        {
            #region ������
            //��
            this.ToTable("AM_CRM_RECEIVABLE");
            //����
            this.HasKey(t => t.F_ReceivableId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}

