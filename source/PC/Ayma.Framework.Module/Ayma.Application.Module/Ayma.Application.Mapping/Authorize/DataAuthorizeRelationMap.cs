using Ayma.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace  Ayma.Application.Mapping
{
    /// <summary>
    /// �� ����Ayma
    /// �� �ڣ�2017-06-21 16:30
    /// �� ��������Ȩ��
    /// </summary>
    public class AM_Base_DataAuthorizeRelationMap : EntityTypeConfiguration<DataAuthorizeRelationEntity>
    {
        public AM_Base_DataAuthorizeRelationMap()
        {
            #region ������
            //��
            this.ToTable("AM_BASE_DATARELATION");
            //����
            this.HasKey(t => t.F_Id);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}

