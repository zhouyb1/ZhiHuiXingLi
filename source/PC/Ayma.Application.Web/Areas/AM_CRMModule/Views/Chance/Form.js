/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：公司管理	
 */

var acceptClick;
var keyValue = '';
var bootstrap = function ($, ayma) {
    "use strict";
    var selectedRow = ayma.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 商机类别
            $('#F_ChanceTypeId').DataItemSelect({ code: 'Client_ChanceSort', maxHeight: 230 });
            // 商机来源
            $('#F_SourceId').DataItemSelect({ code: 'Client_ChanceSource', maxHeight: 230 });
            // 商机阶段
            $('#F_StageId').DataItemSelect({ code: 'Client_ChancePhase', maxHeight: 230 });
            //跟进人员
            $('#F_TraceUserId').formselect({
                layerUrl: top.$.rootUrl + '/AM_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/AM_OrganizationModule/User/GetListByUserIds'
            });
            //公司行业
            $('#F_CompanyNatureId').DataItemSelect({ code: 'Client_Trade', maxHeight: 230 });


        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_ChanceId;
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
        $.SaveForm(top.$.rootUrl + '/AM_CRMModule/Chance/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}