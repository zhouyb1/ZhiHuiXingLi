/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：行政区域	
 */
var refreshGird; // 更新表格
var selectedRow;
var bootstrap = function ($, ayma) {
    "use strict";
    var parentId = "0";
    var page = {
        init: function () {
            page.initTree();
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
                selectedRow = null;
                ayma.layerForm({
                    id: 'form',
                    title: '添加区域',
                    url: top.$.rootUrl + '/AM_SystemModule/Area/Form?parentId=' + parentId,
                    height: 310,
                    width: 500,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGird);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_AreaId');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑区域',
                        url: top.$.rootUrl + '/AM_SystemModule/Area/Form?parentId=' + parentId,
                        height: 310,
                        width: 500,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGird);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_AreaId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_SystemModule/Area/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGird();
                            });
                        }
                    });
                }
            });
        },
        initTree: function () {
            $('#am_left_tree').amtree({
                url: top.$.rootUrl + '/AM_SystemModule/Area/GetTree',
                nodeClick: function (item) {
                    parentId = item.id;
                    page.search();
                    $('#titleinfo').text(item.text);
                }
            });
        },
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/AM_SystemModule/Area/GetList',
                headData: [
                    { label: "编号", name: "F_AreaCode", width: 100, align: "left" },
                    { label: "名称", name: "F_AreaName", width: 300, align: "left" },
                    { label: "简拼", name: "F_SimpleSpelling", width: 100, align: "left" },
                    { label: "级别", name: "F_Layer", width: 50, align: "center" },
                    {
                        label: "有效", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue, options, rowObject) {
                            return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                        }
                    },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],
                mainId: 'F_AreaId',
                reloadSelected: true
            });

            page.search();
        },
        search: function (param) {
            param = param || {};
            param.parentId = parentId;
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };
    // 保存数据后回调刷新
    refreshGird = function () {
        page.search();
    }

    page.init();
}