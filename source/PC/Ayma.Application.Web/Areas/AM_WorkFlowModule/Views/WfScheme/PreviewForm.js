/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.05
 * 描 述：工作流模板预览	
 */
var schemeId = request('schemeId');

var currentNode;
var currentLine;
var bootstrap = function ($, ayma) {
    "use strict";

    var page = {
        init: function () {
            // 设计页面初始化
            $('#flow').workflow({
                isPreview:true,
                openNode: function (node) {
                    currentNode = node;
                    if (node.type != 'endround') {
                        ayma.layerForm({
                            id: 'NodeForm',
                            title: '节点信息设置【' + node.name + '】',
                            url: top.$.rootUrl + '/AM_WorkFlowModule/WfScheme/NodeForm?layerId=layer_PreviewForm&isPreview=1',
                            width: 700,
                            height: 500,
                            btn: null
                        });
                    }
                }
            });
            
            if (!!schemeId) {
                $.SetForm(top.$.rootUrl + '/AM_WorkFlowModule/WfScheme/GetScheme?schemeId=' + schemeId, function (res) {
                    var shceme = JSON.parse(res.F_Scheme);
                    $('#flow').workflowSet('set', { data: shceme });
                });
            }
        }
    };

    page.init();
}