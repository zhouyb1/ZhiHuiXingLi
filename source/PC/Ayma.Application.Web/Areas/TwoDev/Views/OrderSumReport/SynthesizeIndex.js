/* * 创建人：超级管理员
 * 描  述：业务综合数据报表
 */
var refreshGirdData;
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

            $('#multiple_condition_query').MultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 190, 400);
        },

        // 初始化列表
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderSumReport/GetSumReport',
                headData: [
                    { label: "订单数", name: "OrderNum", width: 100, align: "left" },
                    { label: "行李件数", name: "ConsignmentNum", width: 100, align: "left" },
                    { label: "收入金额(元)", name: "Amount", width: 100, align: "left" },
                    { label: "客户数", name: "ClientNum", width: 100, align: "left" },
                    { label: "ATA到签收平均时间(min)", name: "ATAzqs", width: 160, align: "left"},
                    { label: "ATA到快递平均时间(min)", name: "ATAzkd", width: 160, align: "left" },
                    { label: "快递到签收平均时间(min)", name: "Kdzqs", width: 160, align: "left" }
                ],
                mainId: 'F_Id',
                reloadSelected: true,
            });
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
