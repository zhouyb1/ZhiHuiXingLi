using Ayma.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:28
    /// �� ��������֧��
    /// </summary>
    public class CrmExpensesMap : EntityTypeConfiguration<CrmExpensesEntity>
    {
        public CrmExpensesMap()
        {
            #region ������
            //��
            this.ToTable("AM_CRM_EXPENSES");
            //����
            this.HasKey(t => t.F_ExpensesId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}

