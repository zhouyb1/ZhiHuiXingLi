/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：数据库管理	
 */
var keyValue = "";
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = ayma.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_DbType').DataItemSelect({ code: 'DbVersion' });

            $('#am_test').on('click', function () {
                var dbType = $('#F_DbType').selectGet();
                if (!dbType) {
                    ayma.alert.error('请选择数据库类型');
                    return false;
                }
                var connection = $('#F_DbConnection').val();
                if (!connection) {
                    ayma.alert.error('请填写数据库连接串');
                    return false;
                }
                $.PostForm(top.$.rootUrl + '/AM_SystemModule/DatabaseLink/TestConnection', { connection: connection, dbType: dbType, keyValue: keyValue });
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_DatabaseLinkId;
                $('#form').SetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData(keyValue);
        $.SaveForm(top.$.rootUrl + '/AM_SystemModule/DatabaseLink/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}