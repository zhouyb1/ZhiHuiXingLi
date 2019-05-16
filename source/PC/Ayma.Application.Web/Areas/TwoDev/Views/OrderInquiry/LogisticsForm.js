var keyValue = request('keyValue');
var OrderNoId = request('orderno');

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
            $("#F_EnCode").val(OrderNoId);
        },
        // 初始化列表
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/TwoDev/OrderInquiry/GetLogisticsFormData?keyValue=' + OrderNoId + '',
                headData: [
                        { label: '订单号', name: 'F_OrderNo', width: 160, align: 'left'},
                        { label: '状态描述', name: 'F_StateDescribe', width: 100, align: 'left'},
                        { label: '操作时间', name: 'F_StateDateTime', width: 160, align: 'left' },
                        { label: '操作人', name: 'F_StateOperator', width: 160, align: 'left' },
                        {
                            label: '对客户开放', name: 'F_CustomerOpen', width: 100, align: 'left',
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
