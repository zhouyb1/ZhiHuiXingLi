/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：表单模板记录
 */
var keyValue = request('keyValue');

var refreshGirdData; // 更新数据
var bootstrap = function ($, ayma) {
    "use strict";

    var nowschemeId = ayma.frameTab.currentIframe().nowschemeId;

    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 预览表单
            $('#am_preview').on('click', function () {
                var schemeId = $('#girdtable').jfGridValue('F_Id');


                if (ayma.checkrow(schemeId)) {
                    ayma.layerForm({
                        id: 'custmerForm_PreviewForm',
                        title: '预览当前表单',
                        url: top.$.rootUrl + '/AM_FormModule/Custmerform/PreviewForm?schemeInfoId=' + keyValue,
                        width: 800,
                        height: 600,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            // 更新到此版本
            $('#am_update').on('click', function () {
                var schemeId = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(schemeId)) {
                    if (schemeId != nowschemeId) {
                        ayma.layerConfirm('是否要更新到该版本！', function (res) {
                            if (res) {
                                ayma.postForm(top.$.rootUrl + '/AM_FormModule/Custmerform/UpdateScheme', { schemeInfoId: keyValue, schemeId: schemeId }, function () {
                                    nowschemeId = schemeId;
                                    ayma.frameTab.currentIframe().nowschemeId = schemeId;
                                    ayma.frameTab.currentIframe().refreshGirdData();
                                    refreshGirdData();

                                });
                            }
                        });
                    }
                    else {
                        ayma.alert.warning('已经是当前版本了!');
                    }
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/AM_FormModule/Custmerform/GetSchemePageList',
                headData: [
                    { label: "创建人", name: "F_CreateUserName", width: 160, align: "left" },
                    {
                        label: "创建时间", name: "F_CreateDate", width: 160, align: "left",
                        formatter: function (cellvalue) {
                            return ayma.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
                        }
                    },
                    {
                        label: "状态", name: "F_Type", width: 80, align: "center",
                        formatter: function (cellvalue, row) {
                            if (row.F_Type == 1) {
                                return '<span class=\"label label-success\" style=\"cursor: pointer;\">正式</span>';
                            }
                            else {
                                return '<span class=\"label label-info\" style=\"cursor: pointer;\">草稿</span>';
                            }
                        }
                    },
                    {
                        label: "", name: "F_Id", width: 80, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == nowschemeId) {
                                return '<span class=\"label label-danger\" style=\"cursor: pointer;\">当前版本</span>';
                            }
                        }
                    }
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isPage: true,
                sidx: 'F_CreateDate',
                sord: 'DESC'
            });
            page.search();
        },
        search: function (param) {
            $('#girdtable').jfGridSet('reload', { param: { schemeInfoId: keyValue } });
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }

    page.init();
}