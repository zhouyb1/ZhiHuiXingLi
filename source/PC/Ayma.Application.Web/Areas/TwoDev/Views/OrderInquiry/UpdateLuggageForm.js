/* * 创建人：超级管理员
 * 日  期：2019-05-13 14:01
 * 描  述：行李表编辑
 */
var acceptClick;
var keyValue = request('keyValue');
var ConsignmentNumber = request("ConsignmentNumber");
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = ayma.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            $('.am-form-wrap').mCustomScrollbar({ theme: "minimal-dark" });
            page.bind();
            page.initData();
        },
        bind: function () {
            console.log($("#FB_State").attr("value"));
            $('#FB_State').DataItemSelect({ code: "OrderDetailsState" });
        },
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/TwoDev/OrderInquiry/GetBodyData?keyValue=' + ConsignmentNumber, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                        }
                        else {
                            $('[data-table="' + id + '"]').SetFormData(data[id]);
                        }
                    }
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        debugger;
        if (!$('body').Validform()) {
            return false;
        }
        var postData = {
            strEntity: JSON.stringify($('body').GetFormData())
        };
        $.SaveForm(top.$.rootUrl + '/TwoDev/OrderInquiry/SaveBodyForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack(postData);
            }
        });
    };
    page.init();
}
