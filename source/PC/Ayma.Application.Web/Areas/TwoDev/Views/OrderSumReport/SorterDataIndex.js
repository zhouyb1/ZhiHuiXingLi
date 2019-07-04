/* * 创建人：超级管理员
 * 描  述：分拣员工作数据报表
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
            }, 150, 400);
        },

        // 初始化列表
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderSumReport/GetSorterReport',
                headData: [
                    { label: "分拣员姓名", name: "FJYName", width: 120, align: "center" },
                    { label: "接单数量", name: "JDNum", width: 100, align: "center" },
                    { label: "行李数量", name: "XLNum", width: 100, align: "center" },
                    { label: "异常行李数", name: "YCXLNum", width: 100, align: "center" },
                    { label: "被投诉数", name: "", width: 160, align: "center" },
                    {
                        label: "ATA到已分拣平均时间", name: "YFJTime", width: 160, align: "center",
                        formatter: function (cellvalue, options, rowObject) {
                            var h = parseInt(cellvalue / 60);
                            var m = cellvalue % 60;
                            return cellvalue = h + "时" + m + "分";
                        }
                    }
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
