/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.16
 * 描 述：表单处理方法
 */
(function ($, ayma) {
    "use strict";

    /*获取和设置表单数据*/
    $.fn.GetFormData = function (keyValue) {// 获取表单数据
        var resdata = {};
        $(this).find('input,select,textarea,.am-select,.am-formselect,.Uploader-wrap,.am-radio,.am-checkbox').each(function (r) {
            var id = $(this).attr('id');
            if (!!id) {
                var type = $(this).attr('type');
                switch (type) {
                    case "radio":
                        if ($("#" + id).is(":checked")) {
                            var _name = $("#" + id).attr('name');
                            resdata[_name] = $("#" + id).val();
                        }
                        break;
                    case "checkbox":
                        if ($("#" + id).is(":checked")) {
                            resdata[id] = 1;
                        } else {
                            resdata[id] = 0;
                        }
                        break;
                    case "select":
                        resdata[id] = $(this).selectGet();
                        break;
                    case "formselect":
                        resdata[id] = $(this).formselectGet();
                        break;
                    case "GirdSelect":
                        resdata[id] = $(this).GirdSelectGet();
                        break;
                    case "am-Uploader":
                        resdata[id] = $(this).UploaderGet();
                        break;
                    case "am-radio":
                        resdata[id] = $(this).find('input:checked').val();
                        break;
                    default:
                        var value = $("#" + id).val();
                        resdata[id] = $.trim(value);
                        break;
                }
                resdata[id] += '';
                if (resdata[id] == '') {
                    resdata[id] = '&nbsp;';
                }
                if (resdata[id] == '&nbsp;' && !keyValue) {
                    resdata[id] = '';
                }
            }
        });
        return resdata;
    };

    $.fn.SetFormData = function (data) {// 设置表单数据
        for (var id in data) {
            var value = data[id];
            var $obj = $('#' + id);
            if ($obj.length == 0 && value != null) {
                $obj = $('[name="' + id + '"][value="' + value + '"]');
                if ($obj.length > 0) {
                    if (!$obj.is(":checked")) {
                        $obj.trigger('click');
                    }
                }
            }
            else {
                var type = $obj.attr('type');
                if ($obj.hasClass("am-input-wdatepicker")) {
                    type = "datepicker";
                }
                switch (type) {
                    case "checkbox":
                        var isck = 0;
                        if ($obj.is(":checked")) {
                            isck = 1;
                        } else {
                            isck = 0;
                        }
                        if (isck != parseInt(value)) {
                            $obj.trigger('click');
                        }
                        break;
                    case "select":
                        $obj.selectSet(value);
                        break;
                    case "formselect":
                        $obj.formselectSet(value);
                        break;
                    case "GirdSelect":
                        $obj.GirdSelectSet(value);
                        break;
                    case "datepicker":
                        $obj.val(ayma.formatDate(value, 'yyyy-MM-dd'));
                        break;
                    case "am-Uploader":
                        $obj.UploaderSet(value);
                        break;
                    case "am-radio":
                        if (!$obj.find('input[value="' + value + '"]').is(":checked")) {
                            $obj.find('input[value="' + value + '"]').trigger('click');
                        }
                        break;
                    default:
                        $obj.val(value);
                        break;
                }
            }
        }
    };

    /*表单数据操作*/
    $.SetForm = function (url, callback) {
        ayma.loading(true, '正在获取数据');
        ayma.httpAsyncGet(url, function (res) {
            ayma.loading(false);
            if (res.code == ayma.httpCode.success) {
                callback(res.data);
            }
            else {
                ayma.layerClose(window.name);
                ayma.alert.error('表单数据获取失败,请重新获取！');
                ayma.httpErrorLog(res.info);
            }
        });
    };

    $.AjaxForm = function (url, callback) {
        ayma.loading(true, '正在获取数据');
        ayma.httpAsyncGet(url, function (res) {
            ayma.loading(false);
            if (res.code == ayma.httpCode.success) {
                callback(res.data);
            }
            else {
                ayma.alert.error('表单数据获取失败,请重新获取！');
                ayma.httpErrorLog(res.info);
            }
        });
    };


    $.SaveForm = function (url, param, callback, isNotClosed) {
        param['__RequestVerificationToken'] = $.amToken;
        ayma.loading(true, '正在保存数据');
        ayma.httpAsyncPost(url, param, function (res) {
            ayma.loading(false);
            if (res.code == ayma.httpCode.success) {
                if (!!callback) {
                    callback(res);
                }
                ayma.alert.success(res.info);
                if (!isNotClosed) {
                    ayma.layerClose(window.name);
                }
            }
            else {
                ayma.alert.error(res.info);
                ayma.httpErrorLog(res.info);
            }
        });
    };

    $.PostForm = function (url, param) {
        param['__RequestVerificationToken'] = $.amToken;
        ayma.loading(true, '正在提交数据');
        ayma.httpAsyncPost(url, param, function (res) {
            ayma.loading(false);
            if (res.code == ayma.httpCode.success) {
                ayma.alert.success(res.info);
            }
            else {
                ayma.alert.error(res.info);
                ayma.httpErrorLog(res.info);
            }
        });
    };


    //用于获得数据
    $.GetForm = function (url, param, callback) {
        //param['__RequestVerificationToken'] = $.amToken;
        ayma.loading(true, '正在获取数据');
        ayma.httpAsyncPost(url, param, function (res) {
            ayma.loading(false);
            if (res.code == ayma.httpCode.success) {
                if (!!callback) {
                    callback(res);
                }
            }
            else {
                ayma.alert.error(res.info);
                ayma.httpErrorLog(res.info);
            }
        });
    };

    /*tab页切换*/
    $.fn.FormTab = function () {
        var $this = $(this);
        $this.parent().css({ 'padding-top': '44px' });
        $this.mCustomScrollbar({
            axis: "x",
            theme: "minimal-dark"
        });
        $this.delegate('li', 'click', { $ul: $this }, function (e) {
            var $li = $(this);
            if (!$li.hasClass('active')) {
                var $parent = $li.parent();
                var $content = e.data.$ul.next();

                var id = $li.find('a').attr('data-value');
                $parent.find('li.active').removeClass('active');
                $li.addClass('active');
                $content.find('.tab-pane.active').removeClass('active');
                $content.find('#' + id).addClass('active');
            }
        });
    }

    $.fn.FormTabEx = function (callback) {
        var $this = $(this);
        $this.delegate('li', 'click', { $ul: $this }, function (e) {
            var $li = $(this);
            if (!$li.hasClass('active')) {
                var $parent = $li.parent();
                var $content = e.data.$ul.next();

                var id = $li.find('a').attr('data-value');
                $parent.find('li.active').removeClass('active');
                $li.addClass('active');
                $content.find('.tab-pane.active').removeClass('active');
                $content.find('#' + id).addClass('active');

                if (!!callback) {
                    callback(id);
                }
            }
        });
    }
    
    /*检测字段是否重复*/
    $.ExistField = function (keyValue, controlId, url, param) {
        var $control = $("#" + controlId);
        if (!$control.val()) {
            return false;
        }
        var data = {
            keyValue: keyValue
        };
        data[controlId] = $control.val();
        $.extend(data, param);
        ayma.httpAsync('GET', url, data, function (data) {
            if (data == false) {
                $.ValidformMessage($control, '已存在,请重新输入');
            }
        });
    };

    /*固定下拉框的一些封装：数据字典，组织机构，省市区级联*/
    // 数据字典下拉框
    $.fn.DataItemSelect = function (op) {
        // op:code 码,parentId 父级id,maxHeight 200,allowSearch， childId 级联下级框id
        var dfop = {
            // 展开最大高度
            maxHeight: 200,
            // 是否允许搜索
            allowSearch: false,
            // 访问数据接口地址
            //url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetDetailListByParentId',
            // 访问数据接口参数
            param: { itemCode: '', parentId: '0' },
            // 级联下级框
        }
        op = op || {};
        if (!op.code) {
            return false;
        }
        dfop.param.itemCode = op.code;
        dfop.param.parentId = op.parentId || '0';
        dfop.maxHeight = op.maxHeight || 200;
        dfop.allowSearch = op.allowSearch;

        var list = [];

        if (!!op.childId) {
            var list2 = [];
            $('#' + op.childId).select({
                // 展开最大高度
                maxHeight: dfop.maxHeight,
                // 是否允许搜索
                allowSearch: dfop.allowSearch,
            });
            dfop.select = function (item) {
                if (!item) {
                    $('#' + op.childId).selectRefresh({
                        data: []
                    });
                }
                else {
                    list2 = [];
                    ayma.clientdata.getAllAsync('dataItem', {
                        code: dfop.param.itemCode,
                        callback: function (dataes) {
                            $.each(dataes, function (_index, _item) {
                                if (_item.parentId == item.k) {
                                    list2.push({ id: _item.text, text: _item.value, title: _item.text, k: _index });
                                }
                            });
                            $('#' + op.childId).selectRefresh({
                                data: list2
                            });
                        }
                    });
                }
            };
        }
        var $select = $(this).select(dfop);
        ayma.clientdata.getAllAsync('dataItem', {
            code: dfop.param.itemCode,
            callback: function (dataes) {
                
                $.each(dataes, function (_index, _item) {
                    if (_item.parentId == dfop.param.parentId) {
                        list.push({ id: _item.value, text: _item.text, title: _item.text, k: _index });
                    }
                });
                $select.selectRefresh({
                    data: list
                });
            }
        });
        return $select;
    };

    // 数据源下拉框
    $.fn.DataSourceSelect = function (op) {
        op = op || {};
        var dfop = {
            // 展开最大高度
            maxHeight: op.maxHeight,
            // 是否允许搜索
            allowSearch: true,
            select: op.select,
        }
        if (!op.code) {
            return false;
        }
        var $select = $(this).select(dfop);

        ayma.clientdata.getAllAsync('sourceData', {
            code: op.code,
            callback: function (dataes) {
                $select.selectRefresh({
                    value: op.value,
                    text: op.text,
                    title: op.text,
                    data: dataes
                });
            }
        });
        return $select;
    }

    // 公司信息下拉框
    $.fn.CompanySelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            type: 'tree',
            // 展开最大高度
            maxHeight: 200,
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/AM_OrganizationModule/Company/GetTree',
            // 访问数据接口参数
            param: { parentId: '0' },
        };
        op = op || {};
        dfop.param.parentId = op.parentId || '0';
        dfop.maxHeight = op.maxHeight || 200;

        if (!!op.isLocal) {
            dfop.url = '';
        }
        var $select = $(this).select(dfop);
        if (!!op.isLocal) {
            ayma.clientdata.getAllAsync('company', {
                callback: function (dataes) {
                    var mapdata = {};
                    var resdata = [];
                    $.each(dataes, function (_index, _item) {
                        mapdata[_item.parentId] = mapdata[_item.parentId] || [];
                        _item.id = _index;
                        mapdata[_item.parentId].push(_item);
                    });
                    _fn(resdata, dfop.param.parentId);
                    function _fn(_data, vparentId) {
                        var pdata = mapdata[vparentId] || [];
                        for (var j = 0, l = pdata.length; j < l; j++) {
                            var _item = pdata[j];
                            var _point = {
                                id: _item.id,
                                text: _item.name,
                                value: _item.id,
                                showcheck: false,
                                checkstate: false,
                                hasChildren: false,
                                isexpand: false,
                                complete: true,
                                ChildNodes: []
                            };
                            if (_fn(_point.ChildNodes, _item.id)) {
                                _point.hasChildren = true;
                                _point.isexpand = true;
                            }
                            _data.push(_point);
                        }
                        return _data.length > 0;
                    }
                    $select.selectRefresh({
                        data: resdata
                    });
                }
            });
        }
        return $select;

    };

    // 部门信息下拉框
    $.fn.DepartmentSelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            type: 'tree',
            // 展开最大高度
            maxHeight: 200,
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/AM_OrganizationModule/Department/GetTree',
            // 访问数据接口参数
            param: { companyId: '', parentId: '0' },
        }
        op = op || {};
        dfop.param.companyId = op.companyId;
        dfop.param.parentId = op.parentId;
        dfop.maxHeight = op.maxHeight || 200;

        return $(this).select(dfop);;
    };

    // 人员下拉框
    $.fn.UserSelect = function (type) {//0单选1多选
        if (type == 0) {
            $(this).formselect({
                layerUrl: top.$.rootUrl + '/AM_OrganizationModule/User/SelectOnlyForm',
                layerUrlW: 400,
                layerUrlH: 300,
                dataUrl: top.$.rootUrl + '/AM_OrganizationModule/User/GetListByUserIds'
            });
        }
        else {
            $(this).formselect({
                layerUrl: top.$.rootUrl + '/AM_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/AM_OrganizationModule/User/GetListByUserIds'
            });
        }
    }

    // 省市区级联
    $.fn.AreaSelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            // 字段
            value: "F_AreaCode",
            text: "F_AreaName",
            title: "F_AreaName",
            // 展开最大高度
            maxHeight: 200,
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/AM_SystemModule/Area/Getlist',
            // 访问数据接口参数
            param: { parentId: ''},
        }
        op = op || {};
        if (!!op.parentId) {
            dfop.param.parentId = op.parentId;
        }
        dfop.maxHeight = op.maxHeight || 200;
        var _obj = [], i = 0;
        var $this = $(this);
        $(this).find('div').each(function () {
            var $div = $('<div></div>');
            var $obj = $(this);
            dfop.placeholder = $obj.attr('placeholder');
            $div.addClass($obj.attr('class'));
            $obj.removeAttr('class');
            $obj.removeAttr('placeholder');
            $div.append($obj);
            $this.append($div);
            if (i == 0) {
                $obj.select(dfop);
            }
            else {
                dfop.url = "";
                dfop.parentId = "";
                $obj.select(dfop);
                _obj[i - 1].on('change', function () {
                    var _value = $(this).selectGet();
                    if (_value == "") {
                        $obj.selectRefresh({
                            url: '',
                            param: { parentId: _value },
                            data:[]
                        });
                    }
                    else {
                        $obj.selectRefresh({
                            url: top.$.rootUrl + '/AM_SystemModule/Area/Getlist',
                            param: { parentId: _value },
                        });
                    }
                  
                });
            }
            i++;
            _obj.push($obj);
        });
    };

    // 数据库选择
    $.fn.DbSelect = function (op) {
        // op:maxHeight 200,
        var dfop = {
            type: 'tree',
            // 展开最大高度
            maxHeight: 200,
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/AM_SystemModule/DatabaseLink/GetTreeList'
        }
        op = op || {};
        dfop.maxHeight = op.maxHeight || 200;

        return $(this).select(dfop);
    }

    // 动态获取和设置radio，checkbox
    $.fn.RadioCheckbox = function (op) {
        var dfop = {
            type: 'radio',        // checkbox
            dataType: 'dataItem', // 默认是数据字典 dataSource（数据源）
            code: '',
            text: 'F_ItemName',
            value: 'F_ItemValue'
        };
        $.extend(dfop, op || {});
        var $this = $(this);
        $this.addClass(dfop.type);
        $this.addClass('am-' + dfop.type);
        $this.attr('type', 'am-' + dfop.type);
        var thisId = $this.attr('id');

       
        if (dfop.dataType == 'dataItem') {
            ayma.clientdata.getAllAsync('dataItem', {
                code: dfop.param.itemCode,
                callback: function (dataes) {
                    $.each(dataes, function (id, item) {
                        var $point = $('<label><input name="' + thisId + '" value="' + item.value + '"' + + ' type="' + dfop.type + '">' + item.text + '</label>');
                        $this.append($point);
                    });
                    $this.find('input').eq(0).trigger('click');
                }
            });
        }
        else {
            ayma.clientdata.getAllAsync('sourceData', {
                code: vlist[0],
                callback: function (dataes) {
                    $.each(dataes, function (id, item) {
                        var $point = $('<label><input name="' + thisId + '" value="' + item[dfop.value] + '"' + '" type="' + dfop.type + '">' + item[dfop.text] + '</label>');
                        $this.append($point);
                    });
                    $this.find('input').eq(0).trigger('click');
                }
            });
        }
    }

    // 多条件查询框
    $.fn.MultipleQuery = function (search,height ,width ) {
        var $this = $(this);
        var contentHtml = $this.html();
        $this.addClass('am-query-wrap');
        

        var _html = '';
        _html += '<div class="am-query-btn"><i class="fa fa-search"></i>&nbsp;多条件查询</div>';
        _html += '<div class="am-query-content">';
        //_html += '<div class="am-query-formcontent">';
        _html += contentHtml;
        //_html += '</div>';
        _html += '<div class="am-query-arrow"><div class="am-query-inside"></div></div>';
        _html += '<div class="am-query-content-bottom">';
        _html += '<a id="am_btn_queryReset" class="btn btn-default">&nbsp;重&nbsp;&nbsp;置</a>';
        _html += '<a id="am_btn_querySearch" class="btn btn-primary">&nbsp;查&nbsp;&nbsp;询</a>';
        _html += '</div>';
        _html += '</div>';
        $this.html(_html);
        $this.find('.am-query-formcontent').show();

        $this.find('.am-query-content').css({ 'width': width || 400, 'height': height || 300 });

        $this.find('.am-query-btn').on('click', function () {
            var $content = $this.find('.am-query-content');
            if ($content.hasClass('active')) {
                $content.removeClass('active');
            }
            else {
                $content.addClass('active');
            }
        });

        $this.find('#am_btn_querySearch').on('click', function () {
            var $content = $this.find('.am-query-content');
            var query = $content.GetFormData();
            $content.removeClass('active');
            search(query);
        });

        $this.find('#am_btn_queryReset').on('click', function () {
            var $content = $this.find('.am-query-content');
            var query = $content.GetFormData();
            for (var id in query) {
                query[id] = "";
            }
            $content.SetFormData(query);
        });

        $(document).click(function (e) {
            var et = e.target || e.srcElement;
            var $et = $(et);
            if (!$et.hasClass('am-query-wrap') && $et.parents('.am-query-wrap').length <= 0) {

                $('.am-query-content').removeClass('active');
            }
        });
    }

})(jQuery, top.ayma);
