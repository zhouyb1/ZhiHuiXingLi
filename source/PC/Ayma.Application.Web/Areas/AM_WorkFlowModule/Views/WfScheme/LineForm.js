/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：流程线条设置	
 */
var layerId = request('layerId');
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var currentLine = top[layerId].currentLine;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#wftype').select({// 1.是 2.否 6.是否 --3.超时 4.超时或是 5超时或否 预留
                placeholder: false,
                data: [{ id: '1', text: '是' }, { id: '2', text: '否' }, { id: '6', text: '正常流转' }]
            }).selectSet('1');
        },
        initData: function () {
            $('#form').SetFormData(currentLine);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var formData = $('#form').GetFormData();
        currentLine.name = formData.name;
        currentLine.wftype = formData.wftype;

        callBack();
        return true;
    };
    page.init();
}