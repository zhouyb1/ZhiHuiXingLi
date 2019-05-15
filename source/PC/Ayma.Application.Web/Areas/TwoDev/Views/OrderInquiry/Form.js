﻿var keyValue = request('keyValue');
//var CurrentCompanyId = $("#CurrentCompanyId").val();

var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            $('.am-form-wrap').mCustomScrollbar({ theme: "minimal-dark" });
            page.bind();
            page.initData();
        },
        bind: function () {

            $('#T_OrderBody').jfGrid({
                headData:
                    [
                        { label: '订单号', name: 'F_OrderNo', width: 160, align: 'left', editType: 'label', hidden: true },
                        { label: '托运单号', name: 'F_ConsignmentNumber', width: 100, align: 'left', editType: 'label' },
                        { label: '重量', name: 'F_Weight', width: 160, align: 'left', editType: 'label' },
                        { label: '配送距离', name: 'F_Distance', width: 160, align: 'left', editType: 'label' },
                        { label: '价格', name: 'F_Price', width: 100, align: 'left', editType: 'label' },
                        { label: '数量', name: 'F_Qty', width: 100, align: 'left', editType: 'label' }
                    ],
                isEidt: true,
                footerrow: true,
                height: 350,
                isStatistics: true,
                isMultiselect: true
            });
        },
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/TwoDev/OrderInquiry/GetFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                            $('#T_OrderBody').jfGridSet('refreshdata', { rowdatas: data[id] });
                        }
                        else {
                            $('[data-table="' + id + '"]').SetFormData(data[id]);
                        }
                    }
                });
            }
        },
        search: function (data) {
            data = data || {};
            $('#T_OrderBody').jfGridSet('refreshdata', { rowdatas: data });
        }
    };
    page.init();
}
