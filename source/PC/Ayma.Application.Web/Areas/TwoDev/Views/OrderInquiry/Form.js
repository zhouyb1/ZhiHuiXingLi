var keyValue = request('keyValue');
var state = request('state');
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
            //根据状态值判断是否显示分拣/出港操作按钮
            //if (state == 41)
            //{
            //    $("#am_sortingg").show();
            //} else if (state == 51)
            //{
            //    $("#am_leaveportt").show();
            //} else if (state == -3)
            //{
            //    $("#am_affirmrefundd").show();
            //}

            // 行李编辑
            $("#am_edit").on("click", function () {
                var ConsignmentNumber = $('#girdtable').jfGridValue('F_ConsignmentNumber');
                var Fid = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(ConsignmentNumber)) {
                    ayma.layerForm({
                        id: 'Form',
                        title: '行李信息编辑',
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/UpdateLuggageForm?keyValue=' + Fid + '&ConsignmentNumber=' + ConsignmentNumber,
                        width: 500,
                        height: 300,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });

            //订单分拣操作
            $('#am_sorting').on('click', function () {
                if (ayma.checkrow(keyValue)) {
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
                }
            });

            //订单出港操作
            $('#am_leaveport').on('click', function () {
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

            //确认退款操作
            $('#am_affirmrefund').on('click', function () {
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认退款！', function (res) {
                        if (res) {
                            ayma.postForm(top.$.rootUrl + '/TwoDev/OrderInquiry/PostAffirmRefund', { keyValue: keyValue }, function () {
                                //操作出港完成后隐藏该操作按钮
                                $('#am_affirmrefundd').hide();
                                //重载页面
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            //详情表单
            $('#girdtable').jfGrid({
                headData:
                    [
                        { label: '订单号', name: 'F_OrderNo', width: 130, align: 'left' },//,  hidden: true
                        { label: '行李号', name: 'F_ConsignmentNumber', width: 160, align: 'left' },
                        { label: '重量(kg)', name: 'F_Weight', width: 90, align: 'left' },
                        { label: '配送距离(km)', name: 'F_Distance', width: 90, align: 'left' },
                        { label: '价格(元)', name: 'F_Price', width: 120, align: 'left' },
                        { label: '数量', name: 'F_Qty', width: 80, align: 'left'},
                        {
                            label: '订单状态', name: 'FB_State', width: 88, align: 'left',
                            formatter: function (cellvalue, options, rowObject) {
                                var colorcss = "";
                                if (cellvalue == 1) {
                                    colorcss = "label label-success";
                                    cellvalue = "未分拣";
                                }
                                else if (cellvalue == 2) {
                                    colorcss = "label label-success";
                                    cellvalue = "分拣中";
                                }
                                else if (cellvalue == 3) {
                                    colorcss = "label label-success";
                                    cellvalue = "分拣完成";
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
                        { label: '分拣员', name: 'FB_Name', width: 120, align: 'left' },
                        { label: '联系电话', name: 'FB_Phone', width: 120, align: 'left' }
                    ],
                isEidt: true,
                footerrow: true,
                height: 420,
                isStatistics: true
                //isMultiselect: true
            });
        },
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/TwoDev/OrderInquiry/GetFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                            $('#girdtable').jfGridSet('refreshdata', { rowdatas: data[id] });
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
            param.F_OrderNo = keyValue;
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
       }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
