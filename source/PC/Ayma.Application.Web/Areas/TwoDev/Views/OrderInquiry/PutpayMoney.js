/* * 创建人：超级管理员
 * 日  期：2018-08-16 20:02
 * 描  述：收付款
 */
var refreshGirdData;
var $subgridTable;//子列表
var keyValue = request('keyValue');

var bootstrap = function ($, ayma) {
    "use strict";
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
        },
        // 初始化列表
        initGird: function () {
            //收款
            $('#girdtable_formal').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetOrderCollectMoney?keyValue=' + keyValue + '',
                headData: [
                    //{ label: "ID", name: "F_Id", width: 160, align: "left", sort: true },
                    { label: "订单号", name: "F_OrderNo", width: 160, align: "center", sort: true },
                    { label: "收款方式", name: "F_PayType", width: 160, align: "center", sort: true },
                    { label: "收款金额(元)", name: "F_Amount", width: 100, align: "center", sort: true }
                ],
                mainId: 'F_Id',
                reloadSelected: true
                //isPage: true
            });
            //付款
            $('#girdtable_temp').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetOrderPayMoney?keyValue=' + keyValue + '',
                headData: [
                    { label: "订单号", name: "F_OrderNo", width: 160, align: "center", sort: true },
                    { label: "快递公司", name: "F_ExpressCompanyId", width: 100, align: "center", sort: true },
                    { label: "快递单号", name: "F_ExpressNO", width: 100, align: "center", sort: true },
                    { label: "付款方式", name: "F_PayType", width: 160, align: "center", sort: true },
                    { label: "付款金额(元)", name: "F_Amount", width: 80, align: "center", sort: true }
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isSubGrid: true,
                subGridHeight:200,
                subGridRowExpanded: function (subgridId, row) {
                    var orderNo = row.F_OrderNo;
                    var ExpressNO = row.F_ExpressNO;
                    var subgridTableId = subgridId + "_t";
                    $("#" + subgridId).html("<div class=\"am-layout-body\" id=\"" + subgridTableId + "\"></div>");
                    $subgridTable = $("#" + subgridTableId);
                    $subgridTable.jfGrid({
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetOrderPayMoneyConNum?orderNo=' + orderNo + '&ExpressNO=' + ExpressNO,
                        headData: [
                           { label: "航班托运单号", name: "F_ConsignmentNumber", width: 160, align: "center" },
                        ],
                        reloadSelected: true,
                    }).jfGridSet("reload");
                }
            });
            //退款
            $('#girdtable_refund').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetOrderRefundMoney?keyValue=' + keyValue + '',
                headData: [
                    //{ label: "ID", name: "F_Id", width: 160, align: "left", sort: true,hidden:true },
                    { label: "订单号", name: "F_OrderNo", width: 160, align: "center", sort: true },
                    { label: "微信订单号", name:"F_TransactionId",width:250,align:"center"},
                    { label: "微信退款单号", name: "F_RefundId", width: 250, align: "center", sort: true },
                    { label: "退款金额(元)", name: "F_Amount", width: 100, align: "center", sort: true }
                ],
                mainId: 'F_Id',
                reloadSelected: true
            });
        },
        search: function (param) {
            param = param || {};
            $('#girdtable_formal').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
            $('#girdtable_temp').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
            $('#girdtable_refund').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }

    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
    page.search();
}
