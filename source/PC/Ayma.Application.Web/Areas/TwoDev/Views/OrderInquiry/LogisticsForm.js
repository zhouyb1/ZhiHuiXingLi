var keyValue = request('keyValue');
var OrderNoId = request('orderno');

var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            $('.am-form-wrap').mCustomScrollbar({ theme: "minimal-dark" });
            page.bind();
            page.initData();
            
        },
        bind: function () {
            

            $("#F_EnCode").val(OrderNoId);
            

            $('#T_OrderLogisticsInfo').jfGrid({
                headData:
                    [
                        { label: '订单号', name: 'F_OrderNo', width: 160, align: 'left', editType: 'label', hidden: true },
                        { label: '状态描述', name: 'F_StateDescribe', width: 100, align: 'left', editType: 'label' },
                        { label: '操作时间', name: 'F_StateDateTime', width: 160, align: 'left', editType: 'label' },
                        { label: '操作人', name: 'F_StateOperator', width: 160, align: 'left', editType: 'label' },
                        { label: '对客户开放', name: 'F_CustomerOpen', width: 100, align: 'left', editType: 'label' }
                    ],
                isEidt: true,
                footerrow: true,
                height: 350,
                isStatistics: true,
                isMultiselect: true
            });
        },

        initData: function () {
            debugger;
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/TwoDev/OrderInquiry/GetLogisticsFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        debugger;
                        if (!!data[id].length && data[id].length > 0) {
                            $('#T_OrderLogisticsInfo').jfGridSet('refreshdata', { rowdatas: data[id] });
                        }
                        else {
                            $('[data-table="' + id + '"]').SetFormData(data[id]);
                        }
                    }
                });
            }
        },
        search: function (param) {
            param = param || {};

            $('#T_OrderLogisticsInfo').jfGridSet('refreshdata', { rowdatas: param });
        }
    };
    page.init();
}
