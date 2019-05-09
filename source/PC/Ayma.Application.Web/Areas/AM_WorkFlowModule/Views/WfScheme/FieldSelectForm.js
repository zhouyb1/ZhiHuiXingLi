/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：表单权限字段导入
 */
var acceptClick;
var fieldName = '';
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#FieldId').select({
                placeholder: '请选择字段',
                maxHeight: 80,
                allowSearch: true,
                select: function (item) {
                    fieldName = item.text;
                }
            });

            $('#FormId').select({
                placeholder: '请选择表单',
                text: 'F_Name',
                value: 'F_Id',
                url: top.$.rootUrl + '/AM_FormModule/Custmerform/GetSchemeInfoList',
                maxHeight: 80,
                allowSearch: true,
                select: function (item) {
                    $.SetForm(top.$.rootUrl + '/AM_FormModule/Custmerform/GetFormData?keyValue=' + item.F_Id, function (data) {
                        var scheme = JSON.parse(data.schemeEntity.F_Scheme);
                        var fields = [];
                        for (var i = 0, l = scheme.data.length; i < l; i++) {
                            var componts = scheme.data[i].componts;
                            for (var j = 0, jl = componts.length; j < jl; j++) {
                                var compont = componts[j];
                                if (!!compont.title && !!compont.field)
                                {
                                    var point = { text: compont.title, id: compont.id };
                                    fields.push(point);
                                }
                            }
                        }
                        $('#FieldId').selectRefresh({ data: fields });
                    });
                }
            });
            $('#am_preview').on('click', function () {
                var formId = $('#FormId').selectGet();
                if (!!formId) {
                    ayma.layerForm({
                        id: 'custmerForm_PreviewForm',
                        title: '预览当前表单',
                        url: top.$.rootUrl + '/AM_FormModule/Custmerform/PreviewForm?schemeInfoId=' + formId,
                        width: 800,
                        height: 600,
                        maxmin: true,
                        btn: null
                    });
                }
                else {
                    ayma.alert.warning('请选择表单！');
                }
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('.am-form-wrap').Validform()) {
            return false;
        }
        var formData = $('.am-form-wrap').GetFormData();
        formData.fieldName = fieldName;
        callBack(formData);
        return true;
    };
    page.init();
}