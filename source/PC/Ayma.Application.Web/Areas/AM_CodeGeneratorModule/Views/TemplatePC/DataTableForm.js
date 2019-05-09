/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：表单设计数据表添加	
 */
var dbId = request('dbId');

var dbAllTable = top.layer_CustmerCodeIndex.dbAllTable;
var dbTable = top.layer_CustmerCodeIndex.dbTable;
var selectedTable = top.layer_CustmerCodeIndex.selectedTable;
var mapField = top.layer_CustmerCodeIndex.mapField;


var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    var pk = '';

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
                data: dbAllTable,
                value: 'name',
                text: 'name',
                title: 'tdescription',
                maxHeight: 200,
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        var fieldData = mapField[dbId + item.name];
                        if (!!fieldData) {
                            $('#field').selectRefresh({
                                data: fieldData
                            });
                        }
                        else {
                            ayma.httpAsync('GET', top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetFieldList', { databaseLinkId: dbId, tableName: item.name }, function (data) {
                                mapField[dbId + item.name] = data;
                                $('#field').selectRefresh({
                                    data: data
                                });
                            });
                        }
                        pk = item.pk;
                    }
                    else {
                        $('#field').selectRefresh({
                            url: '',
                            data: []
                        });
                        pk = '';
                    }
                    
                }
            });
            $('#relationName').select({
                data: dbTable,
                value: 'name',
                text: 'name',
                maxHeight: 160,
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        var fieldData = mapField[dbId + item.name];
                        if (!!fieldData) {
                            $('#relationField').selectRefresh({
                                data: fieldData
                            });
                        }
                    }
                    else {
                        $('#relationField').selectRefresh({
                            url:'',
                            data:[]
                        });
                    }
                }
            });
        },
        initData: function () {
            if (!!selectedTable) {
                $('#form').SetFormData(selectedTable);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }

        var data = $('#form').GetFormData();
        if (data.name == data.relationName) {
            ayma.alert.error('关联表不能是自己本身！');
            return false;
        }
        data.pk = pk;
        if (!!callBack) {
            callBack(data);
        }
        return true;
    };
    page.init();
}