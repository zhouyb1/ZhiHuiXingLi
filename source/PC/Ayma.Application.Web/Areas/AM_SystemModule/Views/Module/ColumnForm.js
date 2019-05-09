/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：功能视图模块	
 */
var currentColRow = top.layer_form.currentColRow;
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    var page = {
        init: function () {
            page.initData();
        },
        initData: function () {
            if (!!currentColRow) {
                $('#form').SetFormData(currentColRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var data = $('#form').GetFormData();
        data.F_ParentId = '0';
        if (!!callBack) {
            callBack(data);
        }
        return true;
    };
    page.init();
}