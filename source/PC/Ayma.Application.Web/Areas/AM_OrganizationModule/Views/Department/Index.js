/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：部门管理	
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, ayma) {
    "use strict";
    var companyId = '';
    var page = {
        init: function () {
            page.inittree();
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
                if (!companyId) {
                    ayma.alert.warning('请选择公司！');
                    return false;
                }
                selectedRow = null;
                ayma.layerForm({
                    id: 'form',
                    title: '添加部门',
                    url: top.$.rootUrl + '/AM_OrganizationModule/Department/Form?companyId=' + companyId,
                    width: 700,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_DepartmentId');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑部门',
                        url: top.$.rootUrl + '/AM_OrganizationModule/Department/Form?companyId=' + companyId,
                        width: 700,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_DepartmentId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_OrganizationModule/Department/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        inittree: function () {
            $('#companyTree').amtree({
                url: top.$.rootUrl + '/AM_OrganizationModule/Company/GetTree',
                param: { parentId: '0' },
                nodeClick: page.treeNodeClick
            });
            $('#companyTree').amtreeSet('setValue', '53298b7a-404c-4337-aa7f-80b2a4ca6681');
        },
        treeNodeClick: function (item) {
            companyId = item.id;
            $('#titleinfo').text(item.text);
            page.search();
        },
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/AM_OrganizationModule/Department/GetList',
                headData: [
                        { label: "部门名称", name: "F_FullName", width: 200, align: "left" },
                        { label: "部门编号", name: "F_EnCode", width: 100, align: "left" },
                        { label: "部门简称", name: "F_ShortName", width: 100, align: "left"},
                        { label: "部门性质", name: "F_Nature", width: 100, align: "left" },
                        { label: "负责人", name: "F_Manager", width: 100, align: "left"},
                        { label: "电话号", name: "F_OuterPhone", width: 100, align: "left" },
                        { label: "分机号", name: "F_InnerPhone", width: 60, align: "center" },
                        { label: "备注", name: "F_Description", width: 200, align: "left"}
                ],

                isTree: true,
                mainId: 'F_DepartmentId',
                parentId: 'F_ParentId',
            });
        },
        search: function (param) {
            param = param || {};
            param.companyId = companyId;
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };

    refreshGirdData = function () {
        page.search();
    };

    page.init();
}


