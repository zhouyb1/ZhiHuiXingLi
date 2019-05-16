var keyValue = request('keyValue');
var state = request('state');
//var CurrentCompanyId = $("#CurrentCompanyId").val();
var refreshGirdData;

var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            $('.am-form-wrap').mCustomScrollbar({ theme: "minimal-dark" });
            page.bind();
            page.initData();
        },
        bind: function () {
            if (state == 41)
            {
                $("#am_sortingg").show();
            } else if (state == 51)
            {
                $("#am_leaveportt").show();
            }

            //订单分拣操作
            $('#am_sorting').on('click', function () {
                debugger;
                //var keyValue = $('#girdtable').jfGridValue('F_Id');
                //if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认订单分拣完成！', function (res) {
                        if (res) {
                            ayma.postForm(top.$.rootUrl + '/TwoDev/OrderInquiry/PostSorting', { keyValue: keyValue }, function () {
                                //操作分拣完成后隐藏该操作按钮
                                $('#am_sortingg').hide();
                                //重载页面
                                refreshGirdData();
                            });
                        }
                    });
                //}
            });

            //订单出港操作
            $('#am_leaveport').on('click', function () {
                //var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认订单出港完成！', function (res) {
                        if (res) {
                            ayma.postForm(top.$.rootUrl + '/TwoDev/OrderInquiry/PostLeavePort', { keyValue: keyValue }, function () {
                                //操作出港完成后隐藏该操作按钮
                                $('#am_leaveportt').hide();
                                //重载页面
                                refreshGirdData();
                            });
                        }
                    });
                }
            });


            $('#T_OrderBody').jfGrid({
                headData:
                    [
                        { label: '订单号', name: 'F_OrderNo', width: 160, align: 'left', editType: 'label', hidden: true },
                        { label: '托运单号', name: 'F_ConsignmentNumber', width: 100, align: 'left', editType: 'label' },
                        { label: '重量', name: 'F_Weight', width: 160, align: 'left', editType: 'label' },
                        { label: '配送距离', name: 'F_Distance', width: 160, align: 'left', editType: 'label' },
                        { label: '价格', name: 'F_Price', width: 100, align: 'left', editType: 'label' },
                        { label: '数量', name: 'F_Qty', width: 100, align: 'left', editType: 'label' },
                        {
                            label: '订单状态', name: 'F_State', width: 100, align: 'left', editType: 'label',
                            formatter: function (cellvalue, options, rowObject) {
                                var colorcss = "";
                                if (cellvalue == 1) {
                                    colorcss = "label label-warning";
                                    cellvalue = "未分拣";
                                }
                                else if (cellvalue == 2) {
                                    colorcss = "label label-warning";
                                    cellvalue = "分拣中";
                                }
                                else if (cellvalue == 3) {
                                    colorcss = "label label-warning";
                                    cellvalue = "运输中";
                                }
                                else if (cellvalue == 4) {
                                    colorcss = "label label-success";
                                    cellvalue = "已完成";
                                }
                                else if (cellvalue == 5) {
                                    colorcss = "label label-danger";
                                    cellvalue = "异常";
                                }
                                return "<span class='" + colorcss + "'>" + cellvalue + "</span>";
                            }
                        }
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

    refreshGirdData = function () {
        page.search();
    };
    page.init();
    
}
