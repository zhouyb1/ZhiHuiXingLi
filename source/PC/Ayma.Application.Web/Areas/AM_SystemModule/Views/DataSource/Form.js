/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：数据源管理	
 */
var keyValue = "";
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = ayma.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_DbId').DbSelect();
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_Id;
                ayma.httpAsync('GET', top.$.rootUrl + '/AM_SystemModule/DataSource/GetEntityByCode', { keyValue: selectedRow.F_Code }, function (data) {
                    $('#form').SetFormData(data);
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData(keyValue);
        $.SaveForm(top.$.rootUrl + '/AM_SystemModule/DataSource/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}