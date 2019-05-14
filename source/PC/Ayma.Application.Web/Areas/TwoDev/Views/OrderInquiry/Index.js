/* * 创建人：超级管理员
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
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                ayma.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/TwoDev/OrderInquiry/Form',
                    width: 600,
                    height: 400,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/Form?keyValue=' + keyValue,
                        width: 600,
                        height: 400,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/TwoDev/OrderInquiry/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
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
                    { label: "机场名称", name: "F_AirfieldName", width: 160, align: "left"},
                    { label: "航站楼", name: "F_AirfieldFloor", width: 160, align: "left"},
                    { label: "航空公司", name: "F_FlightCompany", width: 160, align: "left"},
                    { label: "航班号", name: "F_FlightNumber", width: 160, align: "left"},
                    { label: "订单日期", name: "F_OrderDate", width: 160, align: "left"},
                    { label: "订单号", name: "F_OrderNo", width: 160, align: "left"},
                    { label: "客户姓名", name: "F_CustomerName", width: 160, align: "left"},
                    { label: "联系电话", name: "F_CustomerPhone", width: 160, align: "left"},
                    { label: "客户地址", name: "F_CustomerAddress", width: 160, align: "left"},
                    { label: "客户备注", name: "F_CustomerRemarks", width: 160, align: "left"},
                    { label: "订单创建类型", name: "F_CreateStype", width: 160, align: "left"},
                    { label: "订单状态", name: "F_State", width: 160, align: "left"},
                    { label: "订单类型", name: "F_Stype", width: 160, align: "left"},
                    { label: "订单创建日期", name: "F_CreateTime", width: 160, align: "left"},
                    { label: "订单创建人", name: "F_CreateUserName", width: 160, align: "left"},
                ],
                mainId:'F_Id',
                reloadSelected: true,
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
