/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：流程加签	
 */
var acceptClick;
var auditorName = '';
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            $('#auditorId').select({
                value: 'F_UserId',
                text: 'F_RealName',
                title: 'F_RealName',
                // 展开最大高度
                maxHeight: 190,
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {
                    auditorName = item.F_RealName;
                }
            });
            $('#department').DepartmentSelect({
                maxHeight: 220
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



        callBack(formData);
        return true;
    };
    page.init();
}