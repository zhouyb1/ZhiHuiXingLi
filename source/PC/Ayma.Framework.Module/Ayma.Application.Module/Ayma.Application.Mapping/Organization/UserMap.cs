﻿using Ayma.Application.Organization;
using System.Data.Entity.ModelConfiguration;

namespace Ayma.Application.Mapping
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.03.04
    /// 描 述：用户数据库实体映射
    /// </summary>
    public class UserMap : EntityTypeConfiguration<UserEntity>
    {
        /// <summary>
        /// 用户数据库实体映射
        /// </summary>
        public UserMap()
        {
            #region 表、主键
            //表
            this.ToTable("AM_BASE_USER");
            //主键
            this.HasKey(t => t.F_UserId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
