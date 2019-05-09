/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：个人中心-联系方式	
 */
var baseinfo;
var bootstrap = function ($, ayma) {
    "use strict";

    var getBaseinfo = function (callback) {
        baseinfo = ayma.frameTab.currentIframe().baseinfo;
        if (!baseinfo) {
            setTimeout(function () { getBaseinfo(callback) }, 100);
        }
        else {
            callback();
        }
    };

    var page = {
        init: function () {
            getBaseinfo(function () {
                page.bind();
                page.initData();
            });
        },
        bind: function () {
            $('#am_save_btn').on('click', function () {
                var postData = $('#form').GetFormData();
                postData.F_CompanyId = baseinfo.companyId;
                postData.F_Account = baseinfo.account;
                $.SaveForm(top.$.rootUrl + '/AM_OrganizationModule/User/SaveForm?keyValue=' + baseinfo.userId, postData, function (res) { });
            });
        },
        initData: function () {
            $('#F_Mobile').val(baseinfo.mobile);
            $('#F_Telephone').val(baseinfo.telephone);
            $('#F_Email').val(baseinfo.email);
            $('#F_WeChat').val(baseinfo.weChat);
            $('#F_OICQ').val(baseinfo.oICQ);

        }
    };
    page.init();
}