namespace Ayma.Application.Organization
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2018.03.27
    /// 描 述：人员数据模型
    /// </summary>
    public class UserModel
    {
        /// <summary>
        /// 公司主键
        /// </summary>
        public string companyId { get; set; }
        /// <summary>
        /// 部门主键
        /// </summary>
        public string departmentId { get; set; }
        /// <summary>
        /// 员工名称
        /// </summary>
        public string name{ get; set; }
    }
}
