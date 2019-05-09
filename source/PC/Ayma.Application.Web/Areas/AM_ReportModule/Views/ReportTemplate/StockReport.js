var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 刷新
            $('#am-replace').on('click', function () {
                location.reload();
            });
            //打印
            $('#am-print').on('click', function () {
                $("#girdtable").jqprintTable({ title: '商品收发明细表' });
            });
            //导出
            $('#am-export').on('click', function () {
                ayma.download({
                    method: "POST",
                    url: '/Utility/ExportExcel',
                    param: {
                        fileName: "商品收发明细表",
                        columnJson: JSON.stringify($('#girdtable').jfGridGet('settingInfo').headData),
                        dataJson: JSON.stringify($('#girdtable').jfGridGet('settingInfo').rowdatas)
                    }
                });
            });
        },
        initGird: function () {
            $("#girdtable").height($(window).height() - 170);
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/AM_ReportModule/ReportTemplate/GetStockReportList',
                headData: [
                    { name: "invNo", label: "商品编号", width: 80, align: "left" },
                    { name: "invName", label: "商品名称", width: 150, align: "left" },
                    { name: "date", label: "单据日期", width: 80, align: "center" },
                    { name: "billNo", label: "单据单号", width: 100, align: "center" },
                    { name: "billType", label: "业务类别", width: 80, align: "center" },
                    { name: "buName", label: "往来单位", width: 100 },
                    { name: "location", label: "仓库", width: 80 },
                    {
                        label: "入库", name: "入库", width: 80, align: 'center',
                        children: [
                            {
                                name: "inqty", label: "入库数量", width: 80, align: "right", statistics: true,
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                            {
                                name: "inunitCost", label: "单位成本", width: 80, align: "right",
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                            {
                                name: "incost", label: "成本", width: 80, align: "right", formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                            {
                                name: "allcost", label: "入库总价", width: 80, align: "right", formatter: function (cellvalue,row) {
                                    return ayma.toDecimal(row.inqty) * ayma.toDecimal(row.inunitCost);
                                }
                            },
                        ]
                    },
                    {
                        label: "出库", name: "出库", width: 80, align: 'center',
                        children: [
                            {
                                name: "outqty", label: "出库数量", width: 80, align: "right", statistics: true,
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                            {
                                name: "outunitCost", label: "单位成本", width: 80, align: "right",
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                            {
                                name: "outcost", label: "成本", width: 80, align: "right",
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                              {
                                  name: "alloutcost", label: "出库总价", width: 80, align: "right", formatter: function (cellvalue, row) {
                                      return ayma.toDecimal(row.outqty) * ayma.toDecimal(row.outunitCost);
                                  }
                              },
                        ]
                    },
                    {
                        label: "结存", name: "结存", width: 80, align: 'center',
                        children: [
                            {
                                name: "totalqty", label: "结存数量", width: 80, align: "right",
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                            {
                                name: "totalunitCost", label: "单位成本", width: 80, align: "right",
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            },
                            {
                                name: "totalcost", label: "成本", width: 80, align: "right",
                                formatter: function (cellvalue) {
                                    return ayma.toDecimal(cellvalue);
                                }
                            }
                        ]
                    }
                ],
                isStatistics: true,
                isMultiselect: true,
                reloadSelected: true,
                footerrow: true,
                mainId: 'billNo'
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };
    page.init();
}


