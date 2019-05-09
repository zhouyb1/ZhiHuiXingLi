/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：人员选择	
 */
var acceptClick;
var dfopid = request('dfopid');
var userName = '';
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#userId').select({
                value: 'F_UserId',
                text: 'F_RealName',
                title: 'F_RealName',
                // 展开最大高度
                maxHeight: 110,
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {
                    userName = item.F_RealName;
                }
            });
            $('#department').DepartmentSelect({
                maxHeight: 150
            }).on('change', function () {
                var value = $(this).selectGet();
                $('#userId').selectRefresh({
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
        var postitem = { value: formData.userId, text: userName };
        callBack(postitem, dfopid);
        return true;
    };
    page.init();
}