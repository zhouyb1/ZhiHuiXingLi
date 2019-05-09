/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：公司管理	
 */

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
            // 客户级别
            $('#F_CustLevelId').DataItemSelect({ code: 'Client_Level', maxHeight: 230 });
            // 客户类别
            $('#F_CustTypeId').DataItemSelect({ code: 'Client_Sort', maxHeight: 230 });
            // 客户程度
            $('#F_CustDegreeId').DataItemSelect({ code: 'Client_Degree', maxHeight: 230 });
            //跟进人员
            $('#F_TraceUserId').formselect({
                layerUrl: top.$.rootUrl + '/AM_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/AM_OrganizationModule/User/GetListByUserIds'
            });
            //公司行业
            $('#F_CustIndustryId').DataItemSelect({ code: 'Client_Trade', maxHeight: 230 });


        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_CustomerId;
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
        postData["F_TraceUserName"] = $("#TraceUserId").attr('data-text');
        $.SaveForm(top.$.rootUrl + '/AM_CRMModule/Customer/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}