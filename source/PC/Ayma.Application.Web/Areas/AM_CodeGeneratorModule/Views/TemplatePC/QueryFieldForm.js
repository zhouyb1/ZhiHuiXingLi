/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：查询条件字段添加	
 */
var id = request('id');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var allcomponts = top.layer_CustmerCodeIndex.allcomponts;
    var queryData = top.layer_CustmerCodeIndex.queryData;

    var fieldName = '';
    var compontId = '';

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 选择字段
            $('#fieldId').select({
                value: 'fieldId',
                text: 'fieldName',
                data: allcomponts,
                allowSearch: true,
                maxHeight: 140,
                select: function (item) {
                    fieldName = item.fieldName;
                    compontId = item.id;
                }
            });
            // 所在行所占比
            $('#portion').select({
                data: [
                    {
                        id: '1', text: '1'
                    },
                    {
                        id: '2', text: '1/2'
                    },
                    {
                        id: '3', text: '1/3'
                    },
                    {
                        id: '4', text: '1/4'
                    },
                    {
                        id: '6', text: '1/6'
                    }
                ],
                placeholder: false,
                value: 'id',
                text: 'text'
            }).selectSet('1');
        },
        initData: function () {
            if (!!id) {
                for (var i = 0, l = queryData.length; i < l; i++) {
                    if (queryData[i].id == id) {
                        $('#form').SetFormData(queryData[i]);
                        break;
                    }
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').Validform()) {
            return false;
        }
        var postData = $('#form').GetFormData();
        postData.id = id || ayma.newGuid();
        postData.compontId = compontId;
        postData.fieldName = fieldName;
        callBack(postData);
        return true;
    };
    page.init();
}