/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：自定义表单渲染
 */
(function ($, ayma) {
    "use strict";

    function getFontHtml(verify) {
        var res = "";
        switch (verify) {
            case "NotNull":
            case "Num":
            case "Email":
            case "EnglishStr":
            case "Phone":
            case "Fax":
            case "Mobile":
            case "MobileOrPhone":
            case "Uri":
                res = '<font face="宋体">*</font>';
                break;
        }
        return res;
    }
    function getTdValidatorHtml(verify) {
        var res = "";
        if (verify != "") {
            res = 'isvalid="yes" checkexpession="' + verify + '"';
        }
        return res;

    }

    $.fn.CustmerFormRender = function (data) {
        var $this = $(this);
        var compontsMap = {};


        var girdCompontMap = {};
        var iLen = data.length;
        var $ul;
        var $container;
        if (iLen > 1) {
            var html = '<div class="am-form-tabs" id="am_form_tabs">';
            html += '<ul class="nav nav-tabs"></ul></div>';
            html += '<div class="tab-content am-tab-content" id="am_tab_content">';
            html += '</div>';
            $this.append(html);
            $('#am_form_tabs').FormTab();
            $ul = $('#am_form_tabs ul');
            $container = $('#am_tab_content');
        }
        else {
            $container = $this;
        }
        $this[0].compontsMap = compontsMap;

        for (var i = 0; i < iLen; i++) {
            var $content = $('<div class="am-form-wrap"></div>');
            $container.append($content);
            for (var j = 0, jLen = data[i].componts.length; j < jLen; j++) {
                var compont = data[i].componts[j];
                if (!!compont.table && !!compont.field) {
                    compontsMap[compont.table + compont.field.toLowerCase()] = compont.id;
                }

                var $row = $('<div class="col-xs-' + (12 / parseInt(compont.proportion)) + ' am-form-item" ></div>');
                var $title = $(' <div class="am-form-item-title">' + compont.title + getFontHtml(compont.verify) + '</div>');
                if (compont.title != '') {
                    $row.append($title);
                }
                $content.append($row);
                var $compont = $.FormComponents[compont.type].renderTable(compont, $row);
                if (!!$compont && !!compont.verify && compont.verify != "") {
                    $compont.attr('isvalid', 'yes').attr('checkexpession', compont.verify);
                }
                if (compont.type == 'girdtable') {
                    girdCompontMap[compont.table] = compont;
                }
            }


            if (iLen > 1) {// 如果大于一个选项卡，需要添加选项卡，否则不需要
                $ul.append('<li><a data-value="' + data[i].id + '">' + data[i].text + '</a></li>');
                $content.addClass('tab-pane').attr('id', data[i].id);
                if (i == 0) {
                    $ul.find('li').trigger('click');
                }
            }
        }

        $('.am-form-wrap').mCustomScrollbar({ // 优化滚动条
            theme: "minimal-dark",
            advanced: { autoScrollOnFocus: "textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']" }
        });

        return girdCompontMap;
    };

    // 验证自定义表单数据
    $.ValidCustmerform = function () {
        var validateflag = true;
        var validHelper = ayma.validator;
        $('body').find("[isvalid=yes]").each(function () {
            var $this = $(this);
            if ($this.parent().find('.am-field-error-info').length > 0) {
                validateflag = false;
                return true;
            }

            var checkexpession = $(this).attr("checkexpession");
            var checkfn = validHelper['is' + checkexpession];
            if (!checkexpession || !checkfn) { return false; }
            var errormsg = $(this).attr("errormsg") || "";
            var value;
            var type = $this.attr('type');
            if (type == 'select') {
                value = $this.selectGet();
            }
            else if (type == 'formselect') {
                value = $this.formselectGet();
            }
            else {
                value = $this.val();
            }
            var r = { code: true, msg: '' };
            if (checkexpession == 'LenNum' || checkexpession == 'LenNumOrNull' || checkexpession == 'LenStr' || checkexpession == 'LenStrOrNull') {
                var len = $this.attr("length");
                r = checkfn(value, len);
            } else {
                r = checkfn(value);
            }
            if (!r.code) {
                validateflag = false;
                $.ValidformMessage($this, errormsg + r.msg);
            }
        });
        return validateflag;
    }

    // 获取自定义表单数据
    $.fn.GetCustmerformData = function () {
        var resdata = {};
        $(this).find('input,select,textarea,.am-select,.am-formselect,.Uploader-wrap,.jfgrid-layout').each(function (r) {
            var $self = $(this);
            var id = $self.attr('id') || $self.attr('name');
            if (!!id) {
                var type = $self.attr('type');
                switch (type) {
                    case "checkbox":
                        if ($self.is(":checked")) {
                            if (resdata[id] != undefined && resdata[id] != '') {
                                resdata[id] += ',';
                            }
                            else {
                                resdata[id] = '';
                            }
                            resdata[id] += $self.val();
                        }
                        break;
                    case "radio":
                        if ($self.is(":checked")) {
                            resdata[id] = $self.val();
                        }
                        break;
                    case "select":
                        resdata[id] = $self.selectGet();
                        break;
                    case "formselect":
                        resdata[id] = $self.formselectGet();
                        break;
                    case "am-Uploader":
                        resdata[id] = $self.UploaderGet();
                        break;
                    default:
                        if ($self.hasClass('am-currentInfo')) {
                            resdata[id] = $self[0].lrvalue;
                        }
                        else if ($self.hasClass('jfgrid-layout')) {
                            var _resdata = [];
                            var _resdataTmp = $self.jfGridGet('rowdatas');
                            for (var i = 0, l = _resdataTmp.length; i < l; i++) {
                                _resdata.push(_resdataTmp[i]);
                            }
                            resdata[id] = JSON.stringify(_resdata);
                        }
                        else {
                            var value = $self.val();
                            resdata[id] = $.trim(value);
                        }
                        break;
                }
            }
        });
        return resdata;
    }
    // 设置自定义表单数据
    $.fn.SetCustmerformData = function (data, tablename) {// 设置表单数据
        var compontsMap = $(this)[0].compontsMap;
        for (var field in data) {
            var value = data[field];
            var id = compontsMap[tablename + field];
            var $obj = $('#' + id);
            if (!$obj.length || $obj.length == 0) {
                var vs = (value + "").split(',');
                for (var i = 0, l = vs.length; i < l; i++) {
                    _setvalue(vs[i]);
                }

                function _setvalue(_value) {
                    var $obj = $('input[value="' + _value + '"]');
                    if (!!$obj.length && $obj.length > 0) {
                        if (!$obj.is(":checked")) {
                            $obj.trigger('click');
                        }
                    }
                    else {
                        setTimeout(function () {
                            _setvalue(_value);
                        }, 100);
                    }
                }
            }
            else {
                var type = $obj.attr('type');
                if ($obj.hasClass("am-input-wdatepicker")) {
                    type = "datepicker";
                }
                switch (type) {
                    case "select":
                        $obj.selectSet(value);
                        break;
                    case "formselect":
                        $obj.formselectSet(value);
                        break;
                    case "datepicker":
                        $obj.val(ayma.formatDate(value, 'yyyy-MM-dd'));
                        break;
                    case "am-Uploader":
                        $obj.UploaderSet(value);
                        break;
                    default:
                        if ($obj.hasClass('am-currentInfo-user')) {
                            $obj[0].lrvalue = value;
                            $obj.val('');
                            ayma.clientdata.getAsync('user', {
                                key: value,
                                callback: function (item, op) {
                                    op.obj.val(item.name);
                                },
                                obj: $obj
                            });
                        }
                        else if ($obj.hasClass('am-currentInfo-company')) {
                            $obj[0].lrvalue = value;
                            $obj.val('');
                            ayma.clientdata.getAsync('company', {
                                key: value,
                                callback: function (_data) {
                                    op.obj.val(_data.name);
                                },
                                obj: $obj
                            });
                        }
                        else if ($obj.hasClass('am-currentInfo-department')) {
                            $obj[0].lrvalue = value;
                            $obj.val('');
                            ayma.clientdata.getAsync('department', {
                                key: value,
                                callback: function (item, op) {
                                    op.obj.val(item.name);
                                },
                                obj: $obj
                            });
                        }
                        else if ($obj.hasClass('am-currentInfo-guid')) {
                            $obj[0].lrvalue = value;
                            $obj.val(value);
                        }
                        else {
                            $obj.val(value);
                        }
                        break;
                }
            }
        }
    };

})(jQuery, top.ayma);
