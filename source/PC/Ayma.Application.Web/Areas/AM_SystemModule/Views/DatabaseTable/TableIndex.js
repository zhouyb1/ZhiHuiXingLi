/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：自定义查询
 */
var tableName = request('tableName');
var databaseLinkId = request('databaseLinkId');

var bootstrap = function ($, ayma) {
    "use strict";
   
    var fieldData;

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            //获取字段数据
            ayma.httpAsync('GET', top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetFieldList', { databaseLinkId: databaseLinkId, tableName: tableName }, function (data) {
                fieldData = data;
                $('#field').selectRefresh({
                    data: fieldData
                });
                var headData = [];

                for (var i = 0, l = data.length; i < l; i++) {
                    var item = data[i];
                    var point = { label: item.f_remark, name: item.f_column.toLowerCase(), width: 150, align: "left" };
                    headData.push(point);
                }
                console.log(headData);

                $('#girdtable').jfGrid({
                    url: top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetTableDataList',
                    headData: headData,
                    isPage: true
                });
                page.search();
            });

            // 功能选择
            $('#field').select({
                title: 'f_column',
                text: 'f_remark',
                value:'f_column',
                maxHeight: 300,
                allowSearch: true
            });

            $('#logic').select({
                maxHeight: 300
            });

            // 查询
            $('#btn_Search').on('click', function () {
                page.search();
            });
        },
        search: function () {
            var param = {};
            param.databaseLinkId = databaseLinkId;
            param.tableName = tableName;

            param.field = $('#field').selectGet();
            param.logic = $('#logic').selectGet();

            param.keyword = $('#keyword').val();

            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };

    page.init();
}


