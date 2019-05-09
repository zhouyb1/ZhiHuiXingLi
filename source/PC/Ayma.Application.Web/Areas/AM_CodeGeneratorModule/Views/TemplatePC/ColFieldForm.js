/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：列表字段添加	
 */
var compontId = request('compontId');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var colData = top.layer_CustmerCodeIndex.colData;
    var currentItem;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 所在行所占比
            $('#align').select({
                placeholder:false
            }).selectSet('left');
        },
        initData: function () {
            if (!!compontId) {
                for (var i = 0, l = colData.length; i < l; i++) {
                    if (colData[i].compontId == compontId) {
                        currentItem = colData[i];
                        $('#form').SetFormData(currentItem);
                        break;
                    }
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var formData = $('#form').GetFormData();
        currentItem.align = formData.align;
        currentItem.width = formData.width;
        currentItem.sort = formData.sort;
        callBack(currentItem);
        return true;
    };
    page.init();
}