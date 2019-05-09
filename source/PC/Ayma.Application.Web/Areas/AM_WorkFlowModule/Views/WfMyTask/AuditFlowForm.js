/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：审核流程	
 */
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var processId = ayma.frameTab.currentIframe().processId;
    var taskId = ayma.frameTab.currentIframe().taskId;
    var formData = ayma.frameTab.currentIframe().allFormDatas;
    var shcemeCode = ayma.frameTab.currentIframe().shcemeCode;


    var page = {
        init: function () {
            page.initData();

            /// 获取下一个节点的审核人信息数据
            ayma.workflowapi.auditer({
                isNew: (!!shcemeCode) ? true : false,
                schemeCode: shcemeCode,
                processId: processId,
                taskId: taskId,
                formData: JSON.stringify(formData),
                callback: function (res) {
                    var $form = $('#description').parent();
                    $.each(res, function (_i, _item) {
                        if (_item.all || _item.list.length == 0) {
                            $form.before('<div class="col-xs-12 am-form-item"><div class="am-form-item-title" >' + _item.name + '</div><div id="' + _item.nodeId + '" class="nodeId"></div></div >');
                            $('#' + _item.nodeId).UserSelect(0);
                        }
                        else if (_item.list.length > 1) {
                            $form.before('<div class="col-xs-12 am-form-item"><div class="am-form-item-title" >' + _item.name + '</div><div id="' + _item.nodeId + '" class="nodeId" ></div></div >');
                            $('#' + _item.nodeId).select({
                                data: _item.list,
                                id: 'id',
                                text: 'name'
                            });
                        }
                    });
                }
            });

            // 如果驳回隐藏掉下一个节点审核人员
            // 权限设置
            $('[name="verifyType"]').on('click', function () {
                var $this = $(this);
                var value = $this.val();
                if (value == '1') {
                    $('.nodeId').parent().show();
                }
                else {
                    $('.nodeId').parent().hide();
                }
            });
        },
        initData: function () {
            //$('#form').SetFormData(currentLine);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var formData = $('#form').GetFormData();

        // 获取审核人员
        var auditers = {};
        $('#form').find('.nodeId').each(function () {
            var $this = $(this);
            var id = $this.attr('id');
            var type = $this.attr('type');
            if (!!formData[id]) {
                var point = {
                    userId: formData[id],
                };
                if (type == 'select') {
                    point.userName = $this.find('.am-select-placeholder').text();
                }
                else {
                    point.userName = $this.find('span').text();
                }
                auditers[id] = point;
            }
        });


        callBack(formData);
        return true;
    };
    page.init();
}