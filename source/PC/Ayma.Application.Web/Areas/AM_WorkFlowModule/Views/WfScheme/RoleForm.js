﻿/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：角色添加	
 */
var flag = request('flag');

var acceptClick;
var auditorName = '';
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#auditorId').select({
                url: top.$.rootUrl + '/AM_OrganizationModule/Role/GetList',
                text: 'F_FullName',
                value: 'F_RoleId',
                select: function (item) {
                    auditorName = item.F_FullName;
                },
                maxHeight: 150,
                allowSearch:true
            });
            $('#condition').select({// 限制条件1.同一个部门2.同一个公司
                data: [{ id: '1', text: '同一个部门' }, { id: '2', text: '同一个公司' }]
            });
            if (flag == 1) {
                $('#condition').parent().remove();
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var formData = $('#form').GetFormData();
        formData.auditorName = auditorName;
        formData.type = '2';//审核者类型1.岗位2.角色3.用户
        callBack(formData);
        return true;
    };
    page.init();
}