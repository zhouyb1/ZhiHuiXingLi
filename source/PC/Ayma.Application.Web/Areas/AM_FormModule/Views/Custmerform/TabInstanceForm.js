﻿/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：自定义表单
 */
var id = request('id');
var keyValue = request('keyValue');
var acceptClick;

var bootstrap = function ($, ayma) {
    "use strict";
    var formModule;
    var girdCompontMap;

    var page = {
        init: function () {
            if (!!id) {
                $.SetForm(top.$.rootUrl + '/AM_FormModule/Custmerform/GetFormData?keyValue=' + id, function (data) {//
                    formModule = JSON.parse(data.schemeEntity.F_Scheme);
                    girdCompontMap = $('body').CustmerFormRender(formModule.data);
                    page.bind();
                });
            }
            page.initData();

        },
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/AM_FormModule/Custmerform/GetInstanceForm?schemeInfoId=' + id + '&keyValue=' + keyValue, function (data) {//
                    page.setFormData(data);
                });
            }
        },
        setFormData: function (data) {
            if (!!formModule) {
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
                        $('#' + girdCompontMap[id].id).jfGridSet('refreshdata', { rowdatas: rowDatas });
                    }
                    else {
                        $('body').SetCustmerformData(item[0],id);
                    }
                });
            }
            else {
                setTimeout(function () {
                    page.setFormData(data);
                }, 100);
            }
        },
        bind: function () {
            // 保存数据
            $('#savaAndAdd').on('click', function () {
                acceptClick(0);
            });
            $('#save').on('click', function () {
                acceptClick(1);
            });
        }
    };
    page.init();

    // 保存数据
    acceptClick = function (type) {// 0保存并新增 1保存
        if (!$.ValidCustmerform()) {
            return false;
        }
        var formData = $('body').GetCustmerformData(keyValue);
        var postData =
        {
            formData: JSON.stringify(formData)
        };
        $.SaveForm(top.$.rootUrl + '/AM_FormModule/Custmerform/SaveInstanceForm?keyValue=' + keyValue + "&schemeInfoId=" + id, postData, function (res) {
            if (res.code == 200) {
                ayma.frameTab.parentIframe().refreshGirdData();
                if (type == 0) {
                    window.location.href = top.$.rootUrl + '/AM_FormModule/Custmerform/TabInstanceForm?id=' + id;
                }
                else {
                    ayma.frameTab.close(ayma.frameTab.iframeId);
                }
            }
        });
    };
}