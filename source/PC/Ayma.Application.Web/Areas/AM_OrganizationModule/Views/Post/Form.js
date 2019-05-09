/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：岗位管理	
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
            $('#F_ParentId').formselect({
                placeholder: '请选择上级岗位',
                layerUrl: top.$.rootUrl + '/AM_OrganizationModule/Post/SelectForm',
                layerUrlH: 500,
                dataUrl: top.$.rootUrl + '/AM_OrganizationModule/Post/GetEntityName'
            });
            // 所属部门
            $('#F_DepartmentId').DepartmentSelect({ companyId: companyId, maxHeight: 100 });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_PostId;
                $('#form').SetFormData(selectedRow);
            }
            else {
                $('#F_CompanyId').val(companyId);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData(keyValue);
        if (postData["F_ParentId"] == undefined || postData["F_ParentId"] == '' || postData["F_ParentId"] == '&nbsp;') {
            postData["F_ParentId"] = '0';
        }
        $.SaveForm(top.$.rootUrl + '/AM_OrganizationModule/Post/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}