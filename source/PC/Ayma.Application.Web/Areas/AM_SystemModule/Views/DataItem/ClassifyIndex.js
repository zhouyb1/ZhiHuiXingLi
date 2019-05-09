/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：数据字典管理	
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
                page.search({keyword: keyword });
            });
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                var f_ItemId = $('#girdtable').jfGridValue('F_ItemId');
                selectedRow = null;
                ayma.layerForm({
                    id: 'ClassifyForm',
                    title: '添加分类',
                    url: top.$.rootUrl + '/AM_SystemModule/DataItem/ClassifyForm?parentId=' + f_ItemId,
                    width: 500,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                var keyValue = $('#girdtable').jfGridValue('F_ItemId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'ClassifyForm',
                        title: '编辑分类',
                        url: top.$.rootUrl + '/AM_SystemModule/DataItem/ClassifyForm',
                        width: 500,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_ItemId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_SystemModule/DataItem/DeleteClassifyForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetClassifyList',
                headData: [
                    { label: '名称', name: 'F_ItemName', width: 200, align: 'left' },
                    { label: '编号', name: 'F_ItemCode', width: 200, align: 'left' },
                    { label: '排序', name: 'F_SortCode', width: 50, align: 'center' },
                    {
                        label: "树型", name: "F_IsTree",width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                        }
                    },
                    {
                        label: "有效", name: "F_EnabledMark",width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                        }
                    },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],
                isTree: true,
                mainId: 'F_ItemId',
                parentId: 'F_ParentId',
                reloadSelected:true
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


