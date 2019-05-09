/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：表单字段设置	
 */
var id = request('id');

var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    // 获取父弹层的数据
    var dbTable = top.layer_CustmerCodeIndex.dbTable;
    var databaseLinkId = top.layer_CustmerCodeIndex.databaseLinkId;
    var componts = top.layer_CustmerCodeIndex.componts;
    var mapField = top.layer_CustmerCodeIndex.mapField;

    // 数据字典编号
    var dataItemCode = '';

    var verifyDatalist = [
       { id: "NotNull", text: "不能为空！" },
       { id: "Num", text: "必须为数字！" },
       { id: "NumOrNull", text: "数字或空！" },
       { id: "Email", text: "必须为E-mail格式！" },
       { id: "EmailOrNull", text: "E-mail格式或空！" },
       { id: "EnglishStr", text: "必须为字符串！" },
       { id: "EnglishStrOrNull", text: "字符串或空！" },
       { id: "Phone", text: "必须电话格式！" },
       { id: "PhoneOrNull", text: "电话格式或者空！" },
       { id: "Fax", text: "必须为传真格式！" },
       { id: "Mobile", text: "必须为手机格式！" },
       { id: "MobileOrNull", text: "手机格式或者空！" },
       { id: "MobileOrPhone", text: "电话格式或手机格式！" },
       { id: "MobileOrPhoneOrNull", text: "电话格式或手机格式或空！" },
       { id: "Uri", text: "必须为网址格式！" },
       { id: "UriOrNull", text: "网址格式或空！" }
    ];

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 数据字段选择
            $('#fieldId').select({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        $('#fieldName').val(item.f_remark);
                    }
                    else {
                        $('#fieldName').val('');
                    }
                }
            });

            // 数据表选择
            $('#tableName').select({
                data: dbTable,
                value: 'name',
                text: 'name',
                maxHeight: 160,
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        var fieldData = mapField[databaseLinkId + item.name];
                        $('#fieldId').selectRefresh({
                            data: fieldData
                        });
                    }
                    else {
                        $('#fieldId').selectRefresh({
                            url: '',
                            data: []
                        });
                    }
                }
            });

            // 字段验证
            $('#validator').select({
                data: verifyDatalist,
                maxHeight: 240,
                allowSearch: true
            });
            // 所占比例
            $('#proportion').select({placeholder:false}).selectSet('1');


            // 数据来源设置
            $('#dataItemCode').select({
                allowSearch: true,
                maxHeight: 100,
                url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetClassifyTree',
                type: 'tree',
                select: function (item) {
                    if (!!item) {
                        dataItemCode = item.value;
                    }
                    else {
                        dataItemCode = '';
                    }
                }
            });

            $('#dataSourceId').formselect({
                placeholder: '请选择数据源项',
                layerUrl: top.$.rootUrl + '/AM_SystemModule/DataSource/SelectForm',
                layerUrlH: 500,
                layerUrlW: 800,
                dataUrl: top.$.rootUrl + '/AM_SystemModule/DataSource/GetNameByCode'
            });


            $('#dataSource').select({
                data: [{ id: '0', text: '数据字典' }, { id: '1', text: '数据源' }],
                value: 'id',
                text: 'text',
                placeholder: false,
                select: function (item) {
                    if (item.id == '0') {
                        $('#dataSourceId').parent().hide();
                        $('#dataItemCode').parent().show();
                    }
                    else {
                        $('#dataItemCode').parent().hide();
                        $('#dataSourceId').parent().show();
                    }
                }
            }).selectSet('0');

            // 字段类型
            $('#type').select({
                placeholder: false,
                select: function (item) {
                    if (item.id == 'select' || item.id == 'radio' || item.id == 'checkbox') {
                        $('#dataSource').parent().show();
                        $('#dataItemCode').parent().show();
                        $('#dataSourceId').parent().show();

                        $('#dataSource').selectSet('0');
                    }
                    else {
                        $('#dataSource').parent().hide();
                        $('#dataItemCode').parent().hide();
                        $('#dataSourceId').parent().hide();
                    }
                }
            }).selectSet('text');
        },
        initData: function () {
            if (!!id) {
                for (var i = 0, l = componts.length; i < l; i++) {
                    if (componts[i].id == id) {
                        if (componts[i].dataSource == '0') {
                            $('#dataItemCode').selectSet(componts[i].dataSourceId);
                        }
                        $('#form').SetFormData(componts[i]);
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
        postData.id = id;
        if (postData.dataSource == '0') {
            postData.dataSourceId = postData.dataItemCode;
            postData.dataItemCode = dataItemCode;
        }
        callBack(postData);
        return true;
    };
    page.init();
}