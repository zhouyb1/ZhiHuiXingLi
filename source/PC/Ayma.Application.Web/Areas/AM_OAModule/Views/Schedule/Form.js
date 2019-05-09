/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.11.11
 * 描 述：日程管理
 */
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            //开始时间
            $('#F_StartTime').select({
                maxHeight: 150
            });
            //结束时间
            $('#F_EndTime').select({
                maxHeight: 150
            });
        },
        initData: function () {
            $("#F_StartDate").val(request('startDate'));
            $("#F_StartTime").selectSet(request('startTime'));
        }
    };
    acceptClick = function () {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData("");
        $.SaveForm(top.$.rootUrl + '/AM_OAModule/Schedule/SaveForm?keyValue=', postData, function (res) {
            ayma.frameTab.currentIframe().location.reload();
        });
    }
    page.init();
}


