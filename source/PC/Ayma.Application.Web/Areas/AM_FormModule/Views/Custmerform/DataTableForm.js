/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：表单设计数据表添加	
 */
var dbId = request('dbId');

var selectedRow = top.layer_Form.selectedRow;
var dbTable = top.layer_Form.dbTable;


var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#field').select({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true
            });
            $('#relationField').select({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                maxHeight: 130,
                allowSearch: true
            });
            $('#name').select({
                url: top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetList',
                param: { databaseLinkId: dbId },
                value: 'name',
                text: 'name',
                title: 'tdescription',
                maxHeight: 200,
                allowSearch: true,
                select: function (item) {
                    $('#field').selectRefresh({
                        url: top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetFieldList',
                        param: { databaseLinkId: dbId, tableName: item.name }
                    });
                }
            });
            $('#relationName').select({
                data: dbTable,
                param: { databaseLinkId: dbId },
                value: 'name',
                text: 'name',
                maxHeight: 160,
                allowSearch: true,
                select: function (item) {
                    $('#relationField').selectRefresh({
                        url: top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetFieldList',
                        param: { databaseLinkId: dbId, tableName: item.name }
                    });
                }
            });
        },
        initData: function () {
            if (!!selectedRow) {
                $('#form').SetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }

        var data = $('#form').GetFormData();
        if (data.name == data.relationName)
        {
            ayma.alert.error('关联表不能是自己本身！');
            return false;
        }
        if (!!callBack) {
            callBack(data);
        }
        return true;
    };
    page.init();
}