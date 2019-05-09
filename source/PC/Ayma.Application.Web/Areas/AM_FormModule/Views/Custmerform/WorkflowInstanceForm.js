/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：自定义表单-用于工作流
 */
var id = request('id');
var keyValue = "";

var processIdName = "";
var isUpdate = false;

// 保存数据
var save;
// 设置权限
var setAuthorize;
// 设置表单数据
var setFormData;
// 验证数据是否填写完整
var validForm;
// 获取表单数据
var getFormData;


var bootstrap = function ($, ayma) {
    "use strict";
    var formModule;
    var girdCompontMap;

    var page = {
        init: function () {
            if (!!id) {
                $.SetForm(top.$.rootUrl + '/AM_FormModule/Custmerform/GetFormData?keyValue=' + id, function (data) {//
                    formModule = JSON.parse(data.schemeEntity.F_Scheme);
                    
                });
            }
        },
        setFormData: function (data) {
            if (!!formModule && !!girdCompontMap) {
                $.each(data, function (id, item) {
                    if (!!girdCompontMap[id]) {
                        var fieldMap = {};
                        $.each(girdCompontMap[id].fieldsData, function (id, girdFiled) {
                            if (!!girdFiled.field) {
                                fieldMap[girdFiled.field.toLowerCase()] = girdFiled.field;
                            }
                        });
                        var rowDatas = [];
                        for (var i = 0, l = item.length; i < l; i++) {
                            var _point = {};
                            for (var _field in item[i]) {
                                _point[fieldMap[_field]] = item[i][_field];
                            }
                            rowDatas.push(_point);
                        }
                        if (rowDatas.length > 0) {
                            isUpdate = true;
                        }
                        $('#' + girdCompontMap[id].id).jfGridSet('refreshdata', { rowdatas: rowDatas });
                    }
                    else {
                        if (!!item[0]) {
                            isUpdate = true;
                            $('body').SetCustmerformData(item[0], id);
                        }
                    }
                    
                });
            }
            else {
                setTimeout(function () {
                    page.setFormData(data);
                }, 100);
            }
        }
    };
    page.init();

    // 保存调用函数
    save = function (processId, callBack, i) {
        if (isUpdate) {
            keyValue = processId;
        }
        var formData = $('body').GetCustmerformData(keyValue);

        if (!!processIdName) {
            formData[processIdName] = processId;
        }
        var postData =
            {
                formData: JSON.stringify(formData)
            };
        $.SaveForm(top.$.rootUrl + '/AM_FormModule/Custmerform/SaveInstanceForm?keyValue=' + keyValue + "&schemeInfoId=" + id + '&processIdName=' + processIdName, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack(res, formData, i);
            }
        });
    };
    // 设置权限
    setAuthorize = function (data) {
        if (!!formModule) {
            var girdMap = {};
            var _flag = false;
            for (var i = 0, l = data.length; i < l; i++) {
                var field = data[i];
                var _ids = field.fieldId.split('|');
                if (_ids.length > 1) {
                    if (field.isLook != 1 || field.isEdit != 1) {
                        girdMap[_ids[0]] = girdMap[_ids[0]] || {};
                        girdMap[_ids[0]][_ids[1]] = field;
                        _flag = true;
                    }
                }
            }
            if (_flag) {
                $.each(formModule.data, function (_i, _item) {
                    $.each(_item.componts, function (_j, _jitem) {
                        if (_jitem.type == 'girdtable' && !!girdMap[_jitem.id]) {
                            var _gird = girdMap[_jitem.id];
                            var _fieldsData = [];
                            $.each(_jitem.fieldsData, function (_m, _mitem) {
                                if (!_gird[_mitem.id] || _gird[_mitem.id].isLook == 1) {
                                    _fieldsData.push(_mitem);
                                    if (!!_gird[_mitem.id] && _gird[_mitem.id].isEdit != 1) {
                                        _mitem._isEdit = 1;
                                    }
                                }
                            });
                            _jitem.fieldsData = _fieldsData;
                        }
                    });
                });
            }

            girdCompontMap = $('body').CustmerFormRender(formModule.data);
            for (var i = 0, l = data.length; i < l; i++) {
                var field = data[i];
                var _ids = field.fieldId.split('|');
                if (_ids.length == 1) {
                    if (field.isLook != 1) {// 如果没有查看权限就直接移除
                        $('#' + _ids[0]).parent().remove();
                    }
                    else {
                        if (field.isEdit != 1) {
                            $('#' + _ids[0]).attr('disabled', 'disabled');
                            if ($('#' + _ids[0]).hasClass('Uploader-wrap')) {
                                $('#' + _ids[0]).css({ 'padding-right': '58px' });
                                $('#' + _ids[0]).find('.btn-success').remove();
                            }
                        }
                    }
                }
            }
        }
        else {
            setTimeout(function () {
                setAuthorize(data);
            }, 100);
        }
    };

    // 设置表单数据
    setFormData = function (processId) {
        if (!!processId) {
            $.SetForm(top.$.rootUrl + '/AM_FormModule/Custmerform/GetInstanceForm?schemeInfoId=' + id + '&keyValue=' + processId + '&processIdName=' + processIdName, function (data) {//
                page.setFormData(data);
            });
        }
    };

    // 验证数据是否填写完整
    validForm = function () {
        if (!$.ValidCustmerform()) {
            return false;
        }
        return true;
    };

    // 获取表单数据
    getFormData = function () {
        return $('body').GetCustmerformData(keyValue);
    }
}