/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：自定义表格字段设置	
 */
var dbId = request('dbId');
var tableName = request('tableName');

var keyValue = request('keyValue'); // 设置列的ID项
var parentId = request('parentId'); // 设置列的ID项


var acceptClick;
var selectFieldData = null;
var bootstrap = function ($, ayma) {
    "use strict";

    var dataSourceField = [];
    var dataSourceId = '';
    var itemCode = '';
    var colDatas = top.layer_custmerForm_editgrid_index.colDatas;


    function setGridData(data)
    {
        data = data || [
            { label: '项目名', name: 'F_ItemName', value: '', width: '100', align: 'left', hide: '0', sort: 1 },
            { label: '项目值', name: 'F_ItemValue', value: '', width: '100', align: 'left', hide: '0', sort: 2 }
        ];
        data = data.sort(function (a, b) {
            return parseInt(a.hide) - parseInt(b.hide);
        });
        data = data.sort(function (a, b) {
            return parseInt(a.sort) - parseInt(b.sort);
        });
        $('#girdtable').jfGridSet('refreshdata', { rowdatas: data });
    }

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 上级
            $('#parentId').select({
                data: colDatas,
                text: 'name',
                value: 'id'
            }).selectSet(parentId);
            // 绑定字段
            $('#field').select({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true,
                select: function (item) {
                }
            });
            ayma.httpAsync('GET', top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetFieldList', { databaseLinkId: dbId, tableName: tableName }, function (data) {
                $('#field').selectRefresh({
                    data: data
                });
            });
            // 编辑类型
            $('#type').select({
                placeholder: false,
                data: [{ id: 'input', text: 'input' }, { id: 'label', text: 'label' }, { id: 'select', text: 'select' }, { id: 'guid', text: 'GUID' }],
                select: function (item) {
                    $('.data-edit-select').hide();
                    if (item.id == "select") {
                        $('.data-edit-select').show();
                    }
                }
            }).selectSet('input');
            // 对齐方式
            $('#align').select({ placeholder: false }).selectSet('left');

            $('#girdtable').jfGrid({
                headData: [
                    { label: "字段名", name: "label", width: 120, align: "left" },
                    { label: "字段ID", name: "name", width: 120, align: "left" },
                    { label: "填充栏位", name: "value", width: 120, align: "left" },
                    { label: "宽度", name: "width", width: 70, align: "center" },
                    { label: "对齐方式", name: "align", width: 60, align: "center" },
                    {
                        label: "是否隐藏", name: "hide", width: 60, align: "center",
                        formatter: function (cellvalue, row) {
                            if (cellvalue == 1) {
                                return '<span class=\"label label-default \" style=\"cursor: pointer;\">是</span>';
                            } else if (cellvalue == 0) {
                                return '<span class=\"label label-success \" style=\"cursor: pointer;\">否</span>';
                            }
                        }
                    }// 1 隐藏 0 显示
                ]
            });

            // 数据字典选项
            $('#dataItemId').select({
                allowSearch: true,
                maxHeight: 150,
                url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetClassifyTree',
                type: 'tree',
                select: function (item) {
                    dataSourceId = '';
                    itemCode = '';
                    if (!!item) {
                        itemCode = item.value;
                        dataSourceId = item.id;
                    }
                }
            });
            // 数据源
            $('#dataSourceId').select({
                value: 'F_Code',
                text: 'F_Name',
                allowSearch: true,
                maxHeight: 150,
                url: top.$.rootUrl + '/AM_SystemModule/DataSource/GetList',
                select: function (item) {
                    dataSourceField = [];
                    dataSourceId = '';
                    if (!!item) {
                        dataSourceId = item.F_Code;
                        ayma.httpAsync('GET', top.$.rootUrl + '/AM_SystemModule/DataSource/GetDataColName', { code: item.F_Code }, function (data) {
                            for (var i = 0, l = data.length; i < l; i++) {
                                if (data[i] != 'rownum') {
                                    var point = { label: '', name: data[i], value: '', width: '100', align: 'left', hide: '1', sort: i };
                                    dataSourceField.push(point);
                                }
                            }
                            setGridData(dataSourceField);
                        });
                    }
                }
            });


            // 数据来源
            $('#dataSource').select({
                data: [{ id: '0', text: '数据字典' }, { id: '1', text: '数据源' }],
                value: 'id',
                text: 'text',
                placeholder: false,
                select: function (item) {
                    if (item.id == '0') {
                        $('#dataSourceId').hide();
                        $('#dataItemId').show();
                        // 如果是数据字典的话
                        setGridData();
                    }
                    else {
                        $('#dataItemId').hide();
                        $('#dataSourceId').show();
                        setGridData(dataSourceField);
                    }
                }
            }).selectSet('0');
            
            $('#am_edit_datasource').on('click', function () {
                selectFieldData = $('#girdtable').jfGridGet('rowdata');
                var _name = $('#girdtable').jfGridValue('name');
                if (ayma.checkrow(_name)) {
                    ayma.layerForm({
                        id: 'SetSelectFieldForm',
                        title: '设置选择字段',
                        url: top.$.rootUrl + '/AM_FormModule/Custmerform/SetSelectFieldForm?dbId=' + dbId + '&tableName=' + tableName,
                        width: 450,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(function (data) {
                                var rowdatas = $('#girdtable').jfGridGet('rowdatas');
                                for (var i = 0, l = rowdatas.length; i < l; i++) {
                                    if (rowdatas[i].name == data.name) {
                                        rowdatas[i] = data;
                                    }
                                }
                                setGridData(rowdatas);
                            });
                        }
                    });
                }

            });


           
        },
        initData: function () {
            if (!!keyValue) {
                for (var i = 0, l = colDatas.length; i < l; i++) {
                    var item = colDatas[i];
                    if (item.id == keyValue) {
                        item.dataItemId = item.dataSourceId;
                        $('#form').SetFormData(item);
                        if (item.type == 'select') {
                            $('#girdtable').jfGridSet('refreshdata', { rowdatas: item.selectData });
                        }
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
        var formData = $('#form').GetFormData();

        var resdata = {};
        resdata.id = keyValue || ayma.newGuid();
        resdata.name = formData.name;
        resdata.field = formData.field;
        resdata.width = formData.width;
        resdata.sort = formData.sort;
        resdata.type = formData.type;
        resdata.align = formData.align;
        resdata.parentId = formData.parentId;
        switch (formData.type) {
            case 'select':
                resdata.dataSource = formData.dataSource;
                resdata.dataSourceId = dataSourceId;
                resdata.dataItemCode = itemCode;
                
                resdata.dataSourceWidth = formData.dataSourceWidth;
                resdata.dataSourceHeight = formData.dataSourceHeight;
                resdata.selectData = $('#girdtable').jfGridGet('rowdatas');
                break;
            case 'fixedInfo':
                resdata.fixedInfoType = formData.fixedInfoType;
                resdata.fixedInfoHide = formData.fixedInfoHide;
                break;
        }
        callBack(resdata);
        return true;
    };
    page.init();
}