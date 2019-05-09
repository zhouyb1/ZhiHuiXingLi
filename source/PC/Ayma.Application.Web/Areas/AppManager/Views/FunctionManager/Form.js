/*
 * 创建人：前端开发组
 * 日 期：2018.03.16
 * 描 述：功能模块	
 */
var keyValue = request('keyValue');
var type = request('type');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    var lrcomponts = [];

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        /*绑定事件和初始化控件*/
        bind: function () {
            // 列表显示
            $('#listTitle').select({
                type: 'multiple'
            });
            $('#listContent1').select({ maxHeight: 160 });
            $('#listContent2').select({ maxHeight: 160 });
            $('#listContent3').select({ maxHeight: 160 });


            // 选择图标
            $('#selectIcon').on('click', function () {
                ayma.layerForm({
                    id: 'iconForm',
                    title: '选择图标',
                    url: top.$.rootUrl + '/Utility/AppIcon',
                    height: 700,
                    width: 1000,
                    btn: null,
                    maxmin: true,
                    end: function () {
                        if (top._aymaSelectIcon != '') {
                            $('#F_Icon').val(top._aymaSelectIcon);
                        }
                    }
                });
            });
            // 分类
            $('#F_Type').DataItemSelect({ code: 'function' });
            $('#F_Type').selectSet(type);
            // 选在表单
            $('#F_FormId').select({
                text: 'F_Name',
                value: 'F_Id',
                url: top.$.rootUrl + '/AM_FormModule/Custmerform/GetSchemeInfoList',
                maxHeight: 180,
                allowSearch: true,
                select: function (item) {
                    if (item) {
                        lrcomponts = [];
                        $.SetForm(top.$.rootUrl + '/AM_FormModule/Custmerform/GetFormData?keyValue=' + item.F_Id, function (data) {
                            var scheme = JSON.parse(data.schemeEntity.F_Scheme);
                            for (var i = 0, l = scheme.data.length; i < l; i++) {
                                var componts = scheme.data[i].componts;
                                for (var j = 0, jl = componts.length; j < jl; j++) {
                                    var compont = componts[j];
                                    if (compont.type == 'girdtable') {
                                    }
                                    else {
                                        var point = { text: compont.title, id: compont.id };
                                        lrcomponts.push(point);
                                    }
                                }
                            }

                            $('#listTitle').selectRefresh({
                                data: lrcomponts
                            });
                            $('#listContent1').selectRefresh({
                                data: lrcomponts
                            });
                            $('#listContent2').selectRefresh({
                                data: lrcomponts
                            });
                            $('#listContent3').selectRefresh({
                                data: lrcomponts
                            });
                        });
                    } else {
                        lrcomponts = [];
                        $('#listTitle').selectRefresh({
                            data: lrcomponts
                        });
                        $('#listContent1').selectRefresh({
                            data: lrcomponts
                        });
                        $('#listContent2').selectRefresh({
                            data: lrcomponts
                        });
                        $('#listContent3').selectRefresh({
                            data: lrcomponts
                        });
                    }
                }
            });
            $('#am_preview').on('click', function () {
                var formId = $('#F_FormId').selectGet();
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


        },
        /*初始化数据*/
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/AppManager/FunctionManager/GetForm?keyValue=' + keyValue, function (data) {//
                    $('#form').SetFormData(data.entity);
                    var scheme = JSON.parse(data.schemeEntity.F_Scheme);
                    $('#listTitle').selectSet(scheme.title);
                    $('#listContent1').selectSet(scheme.content[0]);
                    $('#listContent2').selectSet(scheme.content[1]);
                    $('#listContent3').selectSet(scheme.content[2]);
                });
            }
        }
    };


    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var formData = $('#form').GetFormData(keyValue);

        var entity = {
            F_Name: formData.F_Name,
            F_Icon: formData.F_Icon,
            F_Type: formData.F_Type,
            F_SortCode: formData.F_SortCode,
            F_FormId: formData.F_FormId,
            F_SchemeId: formData.F_SchemeId,
        };


        var scheme = {
            title: formData.listTitle,
            content:['','','']
        };
        scheme.content[0] = formData.listContent1;
        scheme.content[1] = formData.listContent2;
        scheme.content[2] = formData.listContent3;

        var schemeEntity = {
            F_Scheme: JSON.stringify(scheme)
        }


        // 提交数据
        var postData = {
            strEntity: JSON.stringify(entity),
            strSchemeEntity: JSON.stringify(schemeEntity),
        };


        $.SaveForm(top.$.rootUrl + '/AppManager/FunctionManager/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };


    page.init();
}