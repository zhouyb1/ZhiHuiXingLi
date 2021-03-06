﻿/* * 创建人：超级管理员
 * 日  期：2019-05-13 14:01
 * 描  述：航班号记录
 */
var acceptClick;
var keyValue = request('keyValue');
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = ayma.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
$('.am-form-wrap').mCustomScrollbar({theme: "minimal-dark"}); 
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_AirfieldId').select({
                type: 'default',
                value: 'F_Id',
                text: 'F_AirfieldName',
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/TwoDev/FlightNumberRecord/GetList',
            });
            
            
        },
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/TwoDev/FlightNumberRecord/GetFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                        }
                        else {
                            $('[data-table="' + id + '"]').SetFormData(data[id]);
                            //起飞时间
                            $('#DateTimeBegin').val(ayma.formatDate("2000-01-01 " + data[id].DateTimeBegin, "hh:mm"));
                            //预计到达时间
                            $('#DateTimeEnd').val(ayma.formatDate("2000-01-01 " + data[id].DateTimeEnd, "hh:mm"));
                            //实际到达时间
                            $("#DateTimeEndReality").val(ayma.formatDate(data[id].DateTimeEndReality, "yyyy-MM-dd hh:mm"))
                        }
                    }
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('body').Validform()) {
            return false;
        }
        $("#F_AirfieldName").val($("#F_AirfieldId").selectGetText());
        var postData = {
            strEntity: JSON.stringify($('body').GetFormData())
        };
    
        $.SaveForm(top.$.rootUrl + '/TwoDev/FlightNumberRecord/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}
