var OpenId = request('OpenId');
var startTime = request('startTime');
var endTime = request('endTime');
var refreshGirdData;

var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            $('.am-form-wrap').mCustomScrollbar({ theme: "minimal-dark" });
            page.initGird();
            page.bind();

        },
        bind: function () {
        },
        // 初始化列表
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetPageListOrder?OpenId=' + OpenId + '&startTime=' + startTime + '&endTime=' + endTime,
                headData: [
                   { label: "订单号", name: "F_OrderNo", width: 160, align: "center" },
                   {
                       label: "订单状态", name: "F_State", width: 80, align: "center",
                       formatter: function (cellvalue, options, rowObject) {
                           var colorcss = "";
                           if (cellvalue == 0) {
                               colorcss = "label label-success";
                               cellvalue = "待付款";
                           }
                           else if (cellvalue == 1) {
                               colorcss = "label label-success";
                               cellvalue = "已付款";
                           }
                           else if (cellvalue == -1) {
                               colorcss = "label label-warning";
                               cellvalue = "已取消";
                           } else if (cellvalue == -3) {
                               colorcss = "label label-warning";
                               cellvalue = "申请退款";
                           }
                           else if (cellvalue == -2) {
                               colorcss = "label label-warning";
                               cellvalue = "已退款";
                           }
                           else if (cellvalue == 2) {
                               colorcss = "label label-success";
                               cellvalue = "未分拣";
                           }
                           else if (cellvalue == 3) {
                               colorcss = "label label-success";
                               cellvalue = "分拣中";
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
                   { label: "机场名称", name: "F_AirfieldName", width: 100, align: "center" },
                   { label: "航站楼", name: "F_AirfieldFloor", width: 80, align: "center" },
                   { label: "航空公司", name: "F_FlightCompany", width: 100, align: "center" },
                   { label: "航班号", name: "F_FlightNumber", width: 80, align: "center" },
                   { label: "订单日期", name: "F_OrderDate", width: 160, align: "center" },
                   { label: "客户姓名", name: "F_CustomerName", width: 100, align: "center" },
                   { label: "联系电话", name: "F_CustomerPhone", width: 100, align: "center" },
                   { label: "客户地址", name: "F_CustomerAddress", width: 220, align: "left" },
                   { label: "客户备注", name: "F_CustomerRemarks", width: 160, align: "center" },
                   //{ label: "订单创建类型", name: "F_CreateStype", width: 100, align: "center" },
                   { label: "订单类型", name: "F_Stype", width: 100, align: "center" },
                   { label: "订单创建日期", name: "F_CreateTime", width: 160, align: "center" },
                   //{ label: "订单创建人", name: "F_CreateUserName", width: 160, align: "center" },
                ],
                mainId: 'F_Id',
                reloadSelected: true,
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
