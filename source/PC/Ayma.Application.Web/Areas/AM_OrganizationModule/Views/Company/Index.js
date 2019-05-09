﻿/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：公司管理	
 */
var refreshGirdData; // 更新数据
var selectedRow;
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyword: keyword });
            });
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                selectedRow = null;
                ayma.layerForm({
                    id: 'Form',
                    title: '添加公司',
                    url: top.$.rootUrl + '/AM_OrganizationModule/Company/Form',
                    width: 750,
                    height: 500,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                var keyValue = $('#girdtable').jfGridValue('F_CompanyId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'Form',
                        title: '编辑公司',
                        url: top.$.rootUrl + '/AM_OrganizationModule/Company/Form',
                        width: 750,
                        height: 500,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_CompanyId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_OrganizationModule/Company/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/AM_OrganizationModule/Company/GetList',
                headData: [
                    { label: "公司名称", name: "F_FullName", width: 300, align: "left" },
                    { label: "外文名称", name: "F_EnCode", width: 150, align: "left" },
                    { label: "中文名称", name: "F_ShortName", width: 150, align: "left" },
                    { label: "公司性质", name: "F_Nature", width: 100, align: "left" },
                    {
                        label: "成立时间", name: "F_FoundedTime", width: 100, align: "left",
                        formatter: function (cellvalue) {
                            return ayma.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    },
                    { label: "负责人", name: "F_Manager", width: 100, align: "left"},
                    { label: "经营范围", name: "F_Fax", width: 200, align: "left" },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],
                isTree: true,
                mainId: 'F_CompanyId',
                parentId: 'F_ParentId',
                reloadSelected: true
            });
            page.search();
        },
        search: function (param) {
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }

    page.init();
}


