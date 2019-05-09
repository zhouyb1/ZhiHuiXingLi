/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：表单权限添加	
 */
var id = request('id');
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#compareType').select({//比较类型1.等于2.不等于3.大于4.大于等于5.小于6.小于等于7.包含8.不包含9.包含于10.不包含于
                maxHeight:95,
                placeholder: false,
                data: [{ id: '1', text: '等于' }, { id: '2', text: '不等于' }, { id: '3', text: '大于' }, { id: '4', text: '大于等于' }, { id: '5', text: '小于' }, { id: '6', text: '小于等于' }, { id: '7', text: '包含' }, { id: '8', text: '不包含' }, { id: '9', text: '包含于' }, { id: '10', text: '不包含于' }]
            }).selectSet('1');

            $('#am_fieldSelect').on('click', function () {
                ayma.layerForm({
                    id: 'FieldSelectForm',
                    title: '字段选择',
                    url: top.$.rootUrl + '/AM_WorkFlowModule/WfScheme/FieldSelectForm',
                    width: 500,
                    height: 300,
                    callBack: function (id) {
                        return top[id].acceptClick(function (data) {
                            $('#fieldName').val(data.fieldName);
                            $('#fieldId').val(data.FieldId);
                        });
                    }
                });
            });
        },
        initData: function () {
            if (!!id) {
                var conditions = top.layer_NodeForm.conditions;
                for (var i = 0, l = conditions.length; i < l; i++) {
                    if (conditions[i].id == id) {
                        $('#form').SetFormData(conditions[i]);
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
        formData.id = id;
        callBack(formData);
        return true;
    };
    page.init();
}