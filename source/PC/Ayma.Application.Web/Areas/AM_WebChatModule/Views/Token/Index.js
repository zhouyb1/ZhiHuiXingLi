/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：微信企业号设置	
 */
var bootstrap = function ($, ayma) {
    "use strict";

    var page = {
        init: function () {
            $('#btn_RevisePassword').on('click', function () {
                if (!$('#form').Validform()) {
                    return false;
                }
                var postData = $('#form').GetFormData();
                $.SaveForm(top.$.rootUrl + '/AM_WebChatModule/Token/SaveForm', postData, null, true);
            });
        }
    };
    page.init();
}