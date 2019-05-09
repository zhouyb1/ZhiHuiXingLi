/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：查询条件字段添加	
 */
var id = request('id');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var formscheme = top.layer_Form.formscheme;
    var formFields = top.layer_Form.formFields;
    var queryData = top.layer_Form.queryData;


    var fieldName = '';

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
            var formFields2 = [];
            $.each(formFields, function (id, item) {
                if (item.type != 'label' && item.type != 'datetime' && item.type != 'upload' && item.type != 'currentInfo') {
                    formFields2.push(item);
                }
            });


            $('#fieldId').select({
                text: 'title',
                data: formFields2,
                allowSearch: true,
                maxHeight: 140,
                select: function (item) {
                    fieldName = item.title;
                }
            });
            // 所在行所占比
            $('#portion').select({
                data: [
                    {
                        id: '1', text: '1'
                    },
                    {
                        id: '2', text: '1/2'
                    },
                    {
                        id: '3', text: '1/3'
                    },
                    {
                        id: '4', text: '1/4'
                    },
                    {
                        id: '6', text: '1/6'
                    }
                ],
                placeholder: false,
                value: 'id',
                text: 'text'
            }).selectSet('1');
        },
        initData: function () {
            if (!!id) {
                for (var i = 0, l = queryData.length; i < l; i++) {
                    if (queryData[i].id == id) {
                        $('#form').SetFormData(queryData[i]);
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
        callBack(postData);
        return true;
    };
    page.init();
}