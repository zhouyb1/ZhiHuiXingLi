/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：单据编号规则	
 */
var acceptClick;
var currentColRow = top.layer_InterfaceForm.currentColRow;
var bootstrap = function ($, ayma) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#fieldType').DataItemSelect({ code: 'FieldType',maxHeight:100 });
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
        if (!!callBack) { callBack(data); }
        return true;
    };
    page.init();
}