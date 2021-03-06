﻿/* * 创建人：超级管理员
 * 日  期：2019-05-14 10:25
 * 描  述：订单查询
 */
var refreshGirdData;
var bootstrap = function ($, ayma) {
    "use strict";
    var startTime;
    var endTime;
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 时间搜索框
            $('#datesearch').amdate({
                dfdata: [
                    { name: '今天', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00') }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近7天', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00', 'd', -6) }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近1个月', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00', 'm', -1) }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近3个月', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00', 'm', -3) }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } }
                ],
                // 月
                mShow: false,
                premShow: false,
                // 季度
                jShow: false,
                prejShow: false,
                // 年
                ysShow: false,
                yxShow: false,
                preyShow: false,
                yShow: false,
                // 默认
                dfvalue: '1',
                selectfn: function (begin, end) {
                    startTime = begin;
                    endTime = end;
                    page.search();
                }
            });
            $('#multiple_condition_query').MultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 250, 400);
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 订单编辑
            $("#am_edit").on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '订单编辑',
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/UpdateForm?keyValue=' + keyValue +'',
                        width: 800,
                        height: 500,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            })
            // 查看详情
            $('#am_detail').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                var OrderNo = $('#girdtable').jfGridValue('F_OrderNo');
                var state = $('#girdtable').jfGridValue('F_State');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'Form',
                        title: '订单详情',
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/Form?keyValue=' + keyValue + '&state=' + state + '&OrderNo=' + OrderNo,
                        width: 1000,
                        height: 950,
                        maxmin: true,
                        btn: null,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            //退款
            $('#am_refund').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_OrderNo');
                var url = "https://mp.zhonghuijinxin.com:8011/pdaapi/CancelOrder";
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认给订单：' + keyValue + ' 退款？', function (res) {
                        if (res) {
                            top.layer.close(top.layer.index);  //执行关闭当前询问窗口
                            //ayma.layerClose('', top.layer.index);
                            var para = JSON.stringify({
                                "orderNo": keyValue
                            });
                            $.ajax({
                                type: 'POST',
                                url: url,
                                dataType: 'json',
                                data: {
                                    "data": para
                                },
                                success: function (result) {
                                    if (result.code == 200) {
                                        ayma.alert.success(result.info);
                                        refreshGirdData();
                                    }
                                    else {
                                        ayma.alert.error(result.info);
                                    }
                                }
                            });
                        }
                    });
                }
            });
            // 查看收付款项
            $('#am_putpay').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '订单收付退款记录',
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/PutpayMoney?keyValue=' + keyValue + '',
                        width: 900,
                        height: 610,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 查看物流信息
            $('#am_logdetail').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                var orderno = $("#girdtable").jfGridValue('F_OrderNo');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '物流信息详情',
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/LogisticsForm?keyValue=' + keyValue + '&orderno=' + orderno + '',
                        width: 900,
                        height: 600,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
        },
        // 初始化列表
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetPageList',
                headData: [
                    { label: "订单号", name: "F_OrderNo", width: 160, align: "center",sort:true },
                    {
                        label: "订单状态", name: "F_State", width: 100, align: "center",
                        formatter: function (cellvalue, options, rowObject) {
                            var colorcss = "";
                            if (cellvalue == -1) {
                                colorcss = "label label-warning";
                                cellvalue = "已取消";
                            } else if (cellvalue == -3) {
                                colorcss = "label label-warning";
                                cellvalue = "退款中";
                            }
                            else if (cellvalue == -2) {
                                colorcss = "label label-warning";
                                cellvalue = "已退款";
                            }
                           else if (cellvalue == 0) {
                                colorcss = "label label-success";
                                cellvalue = "待付款";
                            }
                            else if (cellvalue == 1) {
                                colorcss = "label label-success";
                                cellvalue = "未分拣";
                            }
                            else if (cellvalue == 2) {
                                colorcss = "label label-success";
                                cellvalue = "分拣中";
                            }
                            else if (cellvalue == 3) {
                                colorcss = "label label-success";
                                cellvalue = "分拣完成";
                            }
                            else if (cellvalue == 4) {
                                colorcss = "label label-success";
                                cellvalue = "运输中";
                            }
                            else if (cellvalue == 5) {
                                colorcss = "label label-success";
                                cellvalue = "已完成";
                            }
                            else if (cellvalue == 41) {
                                colorcss = "label label-danger";
                                cellvalue = "分拣异常";
                            }
                            else if (cellvalue == 51) {
                                colorcss = "label label-danger";
                                cellvalue = "出港异常";
                            }
                            return "<span class='" + colorcss + "'>" + cellvalue + "</span>";
                        }
                    },
                    { label: "机场名称", name: "F_AirfieldName", width: 160, align: "center" },
                    { label: "航站楼", name: "F_AirfieldFloor", width: 100, align: "center" },
                    { label: "航空公司", name: "F_FlightCompany", width: 100, align: "center" },
                    { label: "航班号", name: "F_FlightNumber", width: 100, align: "center" },
                    { label: "订单日期", name: "F_OrderDate", width: 160, align: "center" },
                    { label: "客户姓名", name: "F_CustomerName", width: 100, align: "center" },
                    { label: "联系电话", name: "F_CustomerPhone", width: 100, align: "center" },
                    { label: "客户地址", name: "F_CustomerAddress", width: 220, align: "left" },
                    { label: "客户备注", name: "F_CustomerRemarks", width: 160, align: "center" },
                    { label: "订单创建类型", name: "F_CreateStype", width: 100, align: "center" },
                    { label: "订单类型", name: "F_Stype", width: 100, align: "center" },
                    { label: "订单创建日期", name: "F_CreateTime", width: 160, align: "center" },
                    //{ label: "订单创建人", name: "F_CreateUserName", width: 100, align: "center" },
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                sidx: 'F_OrderNo',
                isPage: true
            });
        },
        search: function (param) {
            param = param || {};
            param.StartTime = startTime;
            param.EndTime = endTime;
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
