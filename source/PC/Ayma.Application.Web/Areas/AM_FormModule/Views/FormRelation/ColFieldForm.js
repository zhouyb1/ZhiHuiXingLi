/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：列表字段添加	
 */
var id = request('id');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var formscheme = top.layer_Form.formscheme;
    var formFields = top.layer_Form.formFields;
    var colData = top.layer_Form.colData;


    var fieldName = '';
    var compontId = '';

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 选择字段
            if (formFields.length == 0) {
                for (var i = 0, l = formscheme.data.length; i < l; i++) {
                    var componts = formscheme.data[i].componts;
                    for (var j = 0, jl = componts.length; j < jl; j++) {
                        var item = componts[j];
                        if (item.type != "girdtable") {
                            formFields.push(item);
                        }
                    }
                }
            }
            $('#fieldId').select({
                text: 'title',
                value: 'field',
                data: formFields,
                allowSearch: true,
                maxHeight: 140,
                select: function (item) {
                    fieldName = item.title;
                    compontId = item.id;
                }
            });
            // 所在行所占比
            $('#align').select().selectSet('left');
        },
        initData: function () {
            if (!!id) {
                for (var i = 0, l = colData.length; i < l; i++) {
                    if (colData[i].id == id) {
                        $('#form').SetFormData(colData[i]);
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
        var postData = $('#form').GetFormData();
        postData.id = id || ayma.newGuid();
        postData.fieldName = fieldName;
        postData.compontId = compontId;
        callBack(postData);
        return true;
    };
    page.init();
}