/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：清空日志管理	
 */
var categoryId = request('categoryId');
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    var page = {
        init: function () {
            $('#keepTime').select({maxHeight:75,placeholder:false}).selectSet(7);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData();
        postData['categoryId'] = categoryId;
        $.SaveForm(top.$.rootUrl + '/AM_SystemModule/Log/SaveRemoveLog', postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}