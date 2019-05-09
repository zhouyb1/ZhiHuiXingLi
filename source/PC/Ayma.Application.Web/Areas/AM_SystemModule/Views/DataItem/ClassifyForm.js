/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.05
 * 描 述：分类管理	
 */
var parentId = request('parentId');
var selectedRow = top.layer_ClassifyIndex.selectedRow;

var keyValue = '';
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 上级
            $('#F_ParentId').select({
                url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetClassifyTree',
                type: 'tree',
                allowSearch: true,
                maxHeight:225
            }).selectSet(parentId);
            /*检测重复项*/
            $('#F_ItemName').on('blur', function () {
                $.ExistField(keyValue, 'F_ItemName', top.$.rootUrl + '/AM_SystemModule/DataItem/ExistItemName');
            });
            $('#F_ItemCode').on('blur', function () {
                $.ExistField(keyValue, 'F_ItemCode', top.$.rootUrl + '/AM_SystemModule/DataItem/ExistItemCode');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_ItemId || '';
                $('#form').SetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData(keyValue);
        if (postData["F_ParentId"] == '' || postData["F_ParentId"] == '&nbsp;') {
            postData["F_ParentId"] = '0';
        }
        else if (postData["F_ParentId"] == keyValue) {
            ayma.alert.error('上级不能是自己本身');
            return false;
        }
        $.SaveForm(top.$.rootUrl + '/AM_SystemModule/DataItem/SaveClassifyForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };

    page.init();
}