/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：单据编号	
 */
var acceptClick;
var keyValue = '';
var currentColRow = null;
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = ayma.frameTab.currentIframe().selectedRow;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#am_add_format').on('click', function () {
                currentColRow = null;
                ayma.layerForm({
                    id: 'FormatForm',
                    title: '添加',
                    url: top.$.rootUrl + '/AM_SystemModule/CodeRule/FormatForm',
                    width: 450,
                    height: 310,
                    callBack: function (id) {
                        return top[id].acceptClick(function (data) {
                            $('#girdtable').jfGridSet('addRow', { row: data });
                        });
                    }
                });
            });
            $('#am_edit_format').on('click', function () {
                currentColRow = $('#girdtable').jfGridGet('rowdata');
                var _id = currentColRow ? currentColRow.itemTypeName : '';
                if (ayma.checkrow(_id)) {
                    ayma.layerForm({
                        id: 'FormatForm',
                        title: '修改',
                        url: top.$.rootUrl + '/AM_SystemModule/CodeRule/FormatForm',
                        width: 450,
                        height: 310,
                        callBack: function (id) {
                            return top[id].acceptClick(function (data) {
                                $('#girdtable').jfGridSet('updateRow', { row: data });
                            });
                        }
                    });
                }
                
            });
            $('#am_delete_format').on('click', function () {
                currentColRow = null;
                var row = $('#girdtable').jfGridGet('rowdata');
                var _id = row ? row.itemTypeName : '';
                if (ayma.checkrow(_id)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res, index) {
                        if (res) {
                            $('#girdtable').jfGridSet('removeRow');
                            top.layer.close(index); //再执行关闭  
                        }
                    });
                }
            });

            $('#girdtable').jfGrid({
                headData: [
                    { label: "前缀", name: "itemTypeName", width: 120, align: "left" },
                    { label: "格式", name: "formatStr", width: 120, align: "left" },
                    { label: "步长", name: "stepValue", width: 100, align: "left" },
                    { label: "初始值", name: "initValue", width: 120, align: "left" },
                    { label: "说明", name: "description", width: 180, align: "left" }
                ]
            });

            /*检测重复项*/
            $('#F_EnCode').on('blur', function () {
                $.ExistField(keyValue, 'F_EnCode', top.$.rootUrl + '/AM_SystemModule/CodeRule/ExistEnCode');
            });
            $('#F_FullName').on('blur', function () {
                $.ExistField(keyValue, 'F_FullName', top.$.rootUrl + '/AM_SystemModule/CodeRule/ExistFullName');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_RuleId;
                $('#form').SetFormData(selectedRow);
                var formatdata = JSON.parse(selectedRow.F_RuleFormatJson);
                $('#girdtable').jfGridSet('refreshdata', { rowdatas: formatdata });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData(keyValue);
        var formatdata = $('#girdtable').jfGridGet('rowdatas');
        if (formatdata.length == 0) {
            ayma.alert.error('请设置规则！');
            return false;
        }
        postData.F_RuleFormatJson = JSON.stringify(formatdata);
        $.SaveForm(top.$.rootUrl + '/AM_SystemModule/CodeRule/SaveForm?keyValue=' + keyValue, postData, function (res) {
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}