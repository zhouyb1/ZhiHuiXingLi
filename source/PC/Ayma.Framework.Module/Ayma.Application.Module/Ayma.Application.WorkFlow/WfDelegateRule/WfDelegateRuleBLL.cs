﻿using Ayma.Util;
using System;
using System.Collections.Generic;

namespace Ayma.Application.WorkFlow
{
    /// <summary>
    /// 创建人：Ayma
    /// 日 期：2017.04.17
    /// 描 述：工作流委托规则
    /// </summary>
    public class WfDelegateRuleBLL : WfDelegateRuleIBLL
    {
        private WfDelegateRuleService wfDelegateRuleService = new WfDelegateRuleService();

        #region 获取数据
        /// <summary>
        /// 获取分页列表
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键字(被委托人)</param>
        /// <param name="userInfo">用户信息</param>
        /// <returns></returns>
        public IEnumerable<WfDelegateRuleEntity> GetPageList(Pagination pagination, string keyword, UserInfo userInfo)
        {
            try
            {
                return wfDelegateRuleService.GetPageList(pagination, keyword, userInfo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 根据委托人获取委托记录
        /// </summary>
        /// <returns></returns>
        public IEnumerable<WfDelegateRuleEntity> GetList(UserInfo userInfo)
        {
            try
            {
                return wfDelegateRuleService.GetList(userInfo);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取关联的模板数据
        /// </summary>
        /// <returns></returns>
        public IEnumerable<WfDelegateRuleRelationEntity> GetRelationList(string keyValue)
        {
            try
            {
                return wfDelegateRuleService.GetRelationList(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        #endregion

        #region 提交数据
        /// <summary>
        /// 删除实体
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                wfDelegateRuleService.DeleteEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 保存实体
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="wfDelegateRuleEntity">实体数据</param>
        /// <param name="schemeInfoList">关联模板主键</param>
        public void SaveEntity(string keyValue, WfDelegateRuleEntity wfDelegateRuleEntity, string[] schemeInfoList)
        {
            try
            {
                wfDelegateRuleService.SaveEntity(keyValue, wfDelegateRuleEntity, schemeInfoList);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 更新委托规则状态信息
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="state"></param>
        public void UpdateState(string keyValue, int state)
        {
            try
            {
                wfDelegateRuleService.UpdateState(keyValue, state);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        #endregion
    }
}
