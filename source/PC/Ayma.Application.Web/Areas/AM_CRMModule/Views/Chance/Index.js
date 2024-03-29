﻿/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.11.12
 * 描 述：商机管理	
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
                    id: 'form',
                    title: '新增商机',
                    url: top.$.rootUrl + '/AM_CRMModule/Chance/Form',
                    width: 1000,
                    height: 620,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                var keyValue = $('#girdtable').jfGridValue('F_ChanceId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑商机',
                        url: top.$.rootUrl + '/AM_CRMModule/Chance/Form',
                        width: 1000,
                        height: 620,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_ChanceId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_CRMModule/Chance/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/AM_CRMModule/Chance/GetPageList',
                headData: [
                    { label: '商机编号', name: 'F_EnCode', width: 100, align: 'left' },
                    { label: '商机名称', name: 'F_FullName', width: 200, align: 'left' },
                    { label: '商机来源', name: 'F_SourceId', width: 100, align: 'left' },
                    { label: '商机阶段', name: 'F_StageId', width: 100, align: 'left' },
                    { label: '公司名称', name: 'F_CompanyName', width: 100, align: 'left', sort: true },
                    { label: '公司性质', name: 'F_CompanyNatureId', width: 100, align: 'left' },
                    {
                        label: "预计成交时间", name: "F_DealDate", width: 140, align: "left",
                        formatter: function (cellvalue) {
                            return ayma.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    },
                    {
                        label: "成功率", name: "F_SuccessRate", width: 80, align: "left",
                        formatter: function (cellvalue) {
                            return cellvalue == null ? '0' : (cellvalue+'%');
                        }
                    }
                ],
                mainId: 'F_ChanceId',
                reloadSelected: true,
                isPage: true,
                sidx: 'F_CreateDate'
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


