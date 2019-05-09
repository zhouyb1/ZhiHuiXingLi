/* * 
 * 
 * 创建人：超级管理员
 * 日  期：2017-12-12 11:52
 * 描  述：消息策略
 */

var refreshGirdData;
var acceptClick;

var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow;

    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyword: keyword });
            });
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/AM_SystemModule/DbField/GetList',
                headData: [
                    { label: '列名', name: 'F_Name', width: 160, align: "left" },
                    { label: '描述', name: 'F_Remark', width: 160, align: "left" },
                    {
                        label: '数据类型', name: 'F_DataType', width: 80, align: "center",
                        formatterAsync: function (callback, value, row) {
                            ayma.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'DbFieldType',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    { label: '字段长度', name: 'F_Length', width: 80, align: "center" },
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isMultiselect: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();


    acceptClick = function (callBack) {
        var selectedRow = $('#girdtable').jfGridGet('rowdata');
        callBack(selectedRow);
        return true;
    };
}
