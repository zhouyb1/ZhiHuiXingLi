/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：部门管理	
 */
var companyId = request('companyId');


var acceptClick;
var keyValue = '';
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = ayma.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 部门性质
            $('#F_Nature').DataItemSelect({ code: 'DepartmentNature', maxHeight: 230 });
            // 上级部门
            $('#F_ParentId').DepartmentSelect({ companyId: companyId, maxHeight: 160 });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_DepartmentId;
                $('#form').SetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData(keyValue);
        if (postData["F_ParentId"] == '' || postData["F_ParentId"] == '&nbsp;') {
            postData["F_ParentId"] = '0';
        }
        postData["F_CompanyId"] = companyId;
        $.SaveForm(top.$.rootUrl + '/AM_OrganizationModule/Department/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}