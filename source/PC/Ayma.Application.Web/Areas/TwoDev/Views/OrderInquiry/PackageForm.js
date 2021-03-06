﻿var keyValue = request('keyValue');
var state = request('state');
var OrderNo = request('OrderNo');
var reloadGirdData;

var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            $('.am-form-wrap').mCustomScrollbar({ theme: "minimal-dark" });
            page.bind();
            page.initData();
        },
        bind: function () {
            // 行李编辑
            $("#am_edit").on("click", function () {
                var ConsignmentNumber = $('#girdtable').jfGridValue('F_ConsignmentNumber');
                var Fid = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(ConsignmentNumber)) {
                    ayma.layerForm({
                        id: 'UpdateLuggageForm',
                        title: '行李信息编辑',
                        url: top.$.rootUrl + '/TwoDev/OrderInquiry/UpdateLuggageForm?keyValue='+ Fid + '&ConsignmentNumber=' + ConsignmentNumber,
                        width: 600,
                        height: 400,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(reloadGirdData);
                        }
                    });
                }
            });
            //详情表单
            $('#girdtable').jfGrid({
                headData:
                    [
                        //{ label: '订单号', name: 'F_OrderNo', width: 130, align: 'left' },//,  hidden: true
                        { label: 'Id', name: 'F_Id', width: 100, align: 'center',hidden:'true' },
                        { label: '行李号', name: 'F_ConsignmentNumber', width: 160, align: 'center' },
                        //{ label: '重量(kg)', name: 'F_Weight', width: 100, align: 'center' },
                        { label: '配送距离(km)', name: 'F_Distance', width: 100, align: 'center' },
                        { label: '价格(元)', name: 'F_Price', width: 120, align: 'center' },
                        { label: '数量', name: 'F_Qty', width: 118, align: 'center' },
                        {
                            label: '行李状态', name: 'FB_State', width: 120, align: 'center',
                            formatter: function (cellvalue, options, rowObject) {
                                var colorcss = "";
                                if (cellvalue == 0||cellvalue==1) {
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
                        { label: '分拣员', name: 'FB_Name', width: 140, align: 'center' },
                        { label: '联系电话', name: 'FB_Phone', width: 140, align: 'center' }
                    ],
                isEidt: false,
                //footerrow: true,
                reloadSelected:true,
                height: 250,
                userDataOnFooter: true,
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
            param.keyValue = keyValue;
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    reloadGirdData = function () {
        page.initData();
    };
    page.init();
}