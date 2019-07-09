var keyValue = request('keyValue');
var OrderNoId = request('orderno');

var refreshGirdData;
var $subgridTable;//子列表
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            $('.am-form-wrap').mCustomScrollbar({ theme: "minimal-dark" });
            page.initGird();
            page.bind();
            
        },
        bind: function () {
            $("#F_EnCode").val(OrderNoId);
        },
        // 初始化列表
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetLogisticsFormData?keyValue=' + OrderNoId + '',
                headData: [
                        { label: '航班托运单号', name: 'F_ConsignmentNumber', width: 160, align: 'center' }
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isSubGrid: true,
                subGridRowExpanded: function (subgridId, row) {
                    var F_ConsignmentNumber = row.F_ConsignmentNumber;
                    var subgridTableId = subgridId + "_t";
                    $("#" + subgridId).html("<div class=\"am-layout-body\" id=\"" + subgridTableId + "\"></div>");
                    $subgridTable = $("#" + subgridTableId);
                    $subgridTable.jfGrid({
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetLogisticsInfo?keyValue=' + F_ConsignmentNumber,
                        headData: [
                        { label: '状态描述', name: 'F_StateDescribe', width: 100, align: 'center' },
                        { label: '操作时间', name: 'F_StateDateTime', width: 160, align: 'center' },
                        { label: '操作人', name: 'F_StateOperator', width: 160, align: 'center' },
                        {
                            label: '对客户开放', name: 'F_CustomerOpen', width: 100, align: 'center',
                            formatter: function (cellvalue, options, rowObject) {
                                var colorcss = "";
                                if (cellvalue == 0) {
                                    colorcss = "label label-danger";
                                    cellvalue = "不开放";
                                } else if (cellvalue == 1) {
                                    colorcss = "label label-success";
                                    cellvalue = "开放";
                                }
                                return "<span class='" + colorcss + "'>" + cellvalue + "</span>";
                            }
                        }
                        ],
                        reloadSelected: true
                    }).jfGridSet("reload");
                }
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
