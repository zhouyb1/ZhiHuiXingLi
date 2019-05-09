/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：字段导入	
 */
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    // 获取父弹层的数据
    var dbTable = top.layer_CustmerCodeIndex.dbTable;

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 数据表选择
            $('#tableName').select({
                data: dbTable,
                value: 'name',
                text: 'name',
                maxHeight: 150,
                allowSearch: true
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData();
        callBack(postData);
        return true;
    };
    page.init();
}