﻿/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：功能模块	
 */
var refreshGirdData; // 更新数据
var bootstrap = function ($, ayma) {
    "use strict";
    var moduleId = '0';
    var page = {
        init: function () {
            page.inittree();
            page.initGird();
            page.bindEvent();
        },
        bindEvent: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ parentId: moduleId, keyword: keyword });
            });
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                ayma.layerForm({
                    id: 'form',
                    title: '添加功能',
                    url: top.$.rootUrl + '/AM_SystemModule/Module/Form?moduleId=' + moduleId,
                    height: 430,
                    width: 700,
                    btn: null
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_ModuleId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑功能',
                        url: top.$.rootUrl + '/AM_SystemModule/Module/Form?type=0&keyValue=' + keyValue,
                        height: 430,
                        width: 700,
                        btn: null
                    });
                }
            });
            // 复制
            $('#am_copy').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_ModuleId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '复制功能',
                        url: top.$.rootUrl + '/AM_SystemModule/Module/Form?type=1&keyValue=' + keyValue,
                        height: 430,
                        width: 700,
                        btn: null
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_ModuleId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_SystemModule/Module/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        inittree: function () {
            $('#module_tree').amtree({
                url: top.$.rootUrl + '/AM_SystemModule/Module/GetModuleTree',
                nodeClick: page.treeNodeClick
            });
        },
        treeNodeClick: function (item) {
            moduleId = item.id;
            $('#titleinfo').text(item.text);
            page.search({ parentId: moduleId });
        },
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/AM_SystemModule/Module/GetModuleListByParentId',
                headData: [
                    { label: "编号", name: "F_EnCode", width: 150, align: "left" },
                    { label: "名称", name: "F_FullName", width: 150, align: "left" },
                    { label: "地址", name: "F_UrlAddress", width: 350, align: "left" },
                    { label: "目标", name: "F_Target", width: 60, align: "center" },
                    {
                        label: "菜单", name: "F_IsMenu", width: 50, align: "center",
                        formatter: function (cellvalue, rowObject) {
                            return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                        }
                    },
                    {
                        label: "展开", name: "F_AllowExpand", width: 50, align: "center",
                        formatter: function (cellvalue, rowObject) {
                            return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                        }
                    },
                    //{
                    //    label: "公共", name: "F_IsPublic", width: 50, align: "center",
                    //    formatter: function (cellvalue, rowObject) {
                    //        return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                    //    }
                    //},
                    {
                        label: "有效", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue, rowObject) {
                            return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                        }
                    },
                    { label: "描述", name: "F_Description", width: 200, align: "left" }
                ]
            });

            page.search({ parentId: moduleId });
        },
        search: function (param) {
            $('#girdtable').jfGridSet('reload', { param: param || {} });
        }
    };
    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search({ parentId: moduleId });
        //$('#module_tree').amtreeSet('refresh');
    }

    page.init();
}