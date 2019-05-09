/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.11.11
 * 描 述：新闻中心	
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
                ayma.layerForm({
                    id: 'form',
                    title: '发布新闻',
                    url: top.$.rootUrl + '/AM_OAModule/News/Form',
                    width: 1000,
                    height: 650,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                var keyValue = $('#girdtable').jfGridValue('F_NewsId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑新闻',
                        url: top.$.rootUrl + '/AM_OAModule/News/Form',
                        width: 1000,
                        height: 650,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_NewsId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_OAModule/News/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/AM_OAModule/News/GetPageList',
                headData: [
                    { label: '标题', name: 'F_FullHead', width: 500, align: 'left' },
                    { label: '作者', name: 'F_AuthorName', width: 100, align: 'left' },
                    { label: '小编', name: 'F_CompileName', width: 100, align: 'left' },
                    { label: '栏目', name: 'F_Category', width: 100, align: 'left' },
                    {
                        label: "发布时间", name: "F_ReleaseTime", width: 140, align: "left",
                        formatter: function (cellvalue) {
                            return ayma.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    },
                    { label: '阅读次数', name: 'F_PV', width: 80, align: 'center' },
                    {
                        label: "发布状态", name: "F_EnabledMark", width: 80, align: "center",
                        formatter: function (cellvalue, options, rowObject) {
                            if (cellvalue == 1) {
                                return "<span class=\"label label-success\">已发布</span>";
                            } else {
                                return "<span class=\"label label-danger\">未发布</span>";
                            }
                        }
                    }
                ],
                mainId: 'F_NewsId',
                reloadSelected: true,
                isPage: true
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


