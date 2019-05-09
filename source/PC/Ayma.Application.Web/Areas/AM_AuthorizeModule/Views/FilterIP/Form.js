/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：IP设置管理	
 */
var objectId = request('objectId');
var objectType = request('objectType');
var visitType = request('visitType');
var keyValue = request('keyValue');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    //验证IP地址
    function compareIP(ipBegin, ipEnd) {
        var temp1 = ipBegin.split(".");
        var temp2 = ipEnd.split(".");
        if ((temp1[0] + temp1[1] + temp1[2]) == (temp2[0] + temp2[1] + temp2[2])) {
            if (temp2[3] >= temp1[3]) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return -1;//不在同一个网段内
        }
    }

    var page = {
        init: function () {
            page.initData();
        },
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/AM_AuthorizeModule/FilterIP/GetFormData?keyValue=' + keyValue, function (data) {
                    $('#form').SetFormData(data || {});
                    $("#F_StartIP").val(data.F_IPLimit.split(',')[0]);
                    $("#F_EndIP").val(data.F_IPLimit.split(',')[1]);
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var data = $('#form').GetFormData(keyValue);
        
        if (compareIP(data.F_StartIP, data.F_EndIP) == -1) {
            ayma.alert.error('IP不在同一个网段内');
            return false;
        }
        if (compareIP(data.F_StartIP, data.F_EndIP) == 0) {
            ayma.alert.error('结束IP不能大于开始IP');
            return false;
        }
        var postData = {
            'F_IPLimit': data.F_StartIP + "," + data.F_EndIP,
            'F_VisitType': visitType,
            'F_ObjectId': objectId,
            'F_ObjectType': objectType
        };
        $.SaveForm(top.$.rootUrl + '/AM_AuthorizeModule/FilterIP/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}