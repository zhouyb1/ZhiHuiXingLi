/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：角色添加	
 */
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
                value: 'F_UserId',
                text: 'F_RealName',
                title: 'F_RealName',
                // 展开最大高度
                maxHeight: 110,
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {
                    auditorName = item.F_RealName;
                }
            });
            $('#department').DepartmentSelect({
                maxHeight: 150
            }).on('change', function () {
                var value = $(this).selectGet();
                $('#auditorId').selectRefresh({
                    url: top.$.rootUrl + '/AM_OrganizationModule/User/GetList',
                    param: { departmentId: value }
                });
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var formData = $('#form').GetFormData();
        formData.auditorName = auditorName;
        formData.type = '3';//审核者类型1.岗位2.角色3.用户
        callBack(formData);
        return true;
    };
    page.init();
}