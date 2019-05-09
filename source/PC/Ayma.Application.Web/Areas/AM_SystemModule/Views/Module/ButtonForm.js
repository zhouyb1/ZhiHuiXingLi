/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.05
 * 描 述：功能按钮模块	
 */
var parentId = request('parentId');

var buttonlist = top.layer_form.buttonlist;
var currentBtnRow = top.layer_form.currentBtnRow;
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
            var buttonTree = $.amtree.treeTotree(buttonlist, 'F_ModuleButtonId', 'F_FullName', 'F_EnCode', false, 'jfGrid_ChildRows');
            $('#F_ParentId').select({
                data: buttonTree,
                type: 'tree'
            }).selectSet(parentId);
        },
        initData: function () {
            if (!!currentBtnRow) {
                $('#form').SetFormData(currentBtnRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var data = $('#form').GetFormData();
        if (data["F_ParentId"] == '' || data["F_ParentId"] == '&nbsp;') {
            data["F_ParentId"] = '0';
        }
        else if (data["F_ParentId"] == data['F_ModuleButtonId']) {
            ayma.alert.error('上一级不能是自己本身');
            return false;
        }
        if (!!callBack) {
            callBack(data);
        }
        return true;
    };

    page.init();
}