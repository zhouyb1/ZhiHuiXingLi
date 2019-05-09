/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.05
 * 描 述：添加明细
 */
var parentId = request('parentId');
var itemCode = request('itemCode');

var keyValue = '';
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = top.selectedDataItemRow;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            /*检测重复项*/
            $('#F_ItemName').on('blur', function () {
                $.ExistField(keyValue, 'F_ItemName', top.$.rootUrl + '/AM_SystemModule/DataItem/ExistDetailItemName', { itemCode: itemCode });
            });
            $('#F_ItemValue').on('blur', function () {
                $.ExistField(keyValue, 'F_ItemValue', top.$.rootUrl + '/AM_SystemModule/DataItem/ExistDetailItemValue', { itemCode: itemCode });
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_ItemDetailId || '';
                $('#form').SetFormData(selectedRow);
            }
            else {
                $('#F_ParentId').val(parentId);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData(keyValue);
        $.SaveForm(top.$.rootUrl + '/AM_SystemModule/DataItem/SaveDetailForm?keyValue=' + keyValue + "&itemCode="+itemCode, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };

    page.init();
}