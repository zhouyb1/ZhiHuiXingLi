/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：账号添加	
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
            // 部门
            $('#F_DepartmentId').DepartmentSelect({ companyId: companyId});
            // 性别
            $('#F_Gender').select();
            /*检测重复项*/
            $('#F_Account').on('blur', function () {
                $.ExistField(keyValue, 'F_Account', top.$.rootUrl + '/AM_OrganizationModule/User/ExistAccount');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_UserId;
                selectedRow.F_Password = "******";
                $('#form').SetFormData(selectedRow);
                $('#F_Password').attr('readonly', 'readonly');
                $('#F_Account').attr('readonly', 'readonly');
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
        if (!keyValue) {
            postData.F_Password = $.md5(postData.F_Password);
        }
        $.SaveForm(top.$.rootUrl + '/AM_OrganizationModule/User/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}