/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：请假单-用于工作流系统表单
 */
var keyValue = "";

// 设置权限
var setAuthorize;
// 设置表单数据
var setFormData;
// 验证数据是否填写完整
var validForm;
// 保存数据
var save;

var bootstrap = function ($, ayma) {
    "use strict";
    var isUpdate = false;
    // 设置权限
    setAuthorize = function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            var field = data[i];
            if (field.isLook != 1) {// 如果没有查看权限就直接移除
                $('#' + field.fieldId).parent().remove();
            }
            else {
                if (field.isEdit != 1) {
                    $('#' + field.fieldId).attr('disabled', 'disabled');
                    if ($('#' + field.fieldId).hasClass('Uploader-wrap')) {
                        $('#' + field.fieldId).css({ 'padding-right': '58px' });
                        $('#' + field.fieldId).find('.btn-success').remove();
                    }
                }
            }
        }
    };
    // 设置表单数据
    setFormData = function (processId) {
        if (!!processId) {
            $.SetForm(top.$.rootUrl + '/AM_WorkFlowModule/WfSystemDemo/DemoLeaveGetFormData?processId=' + processId, function (data) {//
                if (!!data) {
                    isUpdate = true;
                    $('#form').SetFormData(data);
                }
            });
        }
    };
    // 验证数据是否填写完整
    validForm = function () {
        if (!$('#form').Validform()) {
            return false;
        }
        return true;
    };
    // 保存调用函数
    save = function (processId, callBack, i) {
        var postData = $('#form').GetFormData(keyValue);
        if (isUpdate) {
            keyValue = processId;
        }
        else {
            postData.F_Id = processId;
        }
        $.SaveForm(top.$.rootUrl + '/AM_WorkFlowModule/WfSystemDemo/DemoLeaveSaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack(res, postData, i);
            }
        });
    };
    // 获取表单数据
    keyValue = request('keyValue') || '';
    if (!!keyValue) {
        setFormData(keyValue);
    }
}