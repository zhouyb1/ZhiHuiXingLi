/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：表格选择项字段选择	
 */
var dbId = request('dbId');
var tableName = request('tableName');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var selectFieldData = top.layer_SetFieldForm.selectFieldData;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 绑定字段
            $('#value').select({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true,
                maxHeight:160
            });
            ayma.httpAsync('GET', top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetFieldList', { databaseLinkId: dbId, tableName: tableName }, function (data) {
                $('#value').selectRefresh({
                    data: data
                });
            });
            // 对齐方式
            $('#align').select({ placeholder: false }).selectSet('left');
            // 是否隐藏
            $('#hide').select({ placeholder: false }).selectSet('0');
        },
        initData: function () {
            if (!!selectFieldData)
            {
                $('#form').SetFormData(selectFieldData);
            }
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