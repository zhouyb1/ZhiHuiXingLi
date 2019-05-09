/*
 * 
 * 
 * 创建人：前端 开发组
 * 日 期：2017.03.16
 * 描 述：弹层选择控件
 */
(function ($, ayma) {
    "use strict";

    $.formselect = {
        init: function ($self) {
            var dfop = $self[0]._formselect.dfop;
            $self.addClass('am-formselect');
            $self.attr('type', 'formselect');
            var $input = $('<span>' + dfop.placeholder + '</span><i class="fa ' + dfop.icon + '"></i><div class="clear-btn" >清空</div>');
            $self.on('click', $.formselect.click);
            $self.html($input);
        },
        click: function (e) {
            var $self = $(this);
            var dfop = $self[0]._formselect.dfop;
            var et = e.target || e.srcElement;
            var $et = $(et);
            if ($et.hasClass('clear-btn')) {
                dfop._itemValue = { value: "", text: dfop.placeholder };
                $self.removeClass('selected');
                $self.find('span').text(dfop._itemValue.text);
                if (!!dfop.select) {
                    dfop.select(dfop._itemValue);
                }
            }
            else {
                var value = dfop._itemValue ? dfop._itemValue.value : "";
                var _url = dfop.layerUrl;

                if (_url.indexOf('?') != -1) {
                    _url += '&dfopid=' + dfop.id;
                }
                else {
                    _url += '?dfopid=' + dfop.id;
                }
                _url += '&selectValue=' + value;
                _url += '&selectText=' + encodeURI(encodeURI($self.find('span').text()));
                ayma.layerForm({
                    id: dfop.id,
                    title: dfop.placeholder,
                    url: _url,
                    width: dfop.layerUrlW,
                    height: dfop.layerUrlH,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick($.formselect.callback);
                    }
                });
            }
        },
        callback: function (item, id, obj) {
            var $self = $('#' + id);
            var dfop = $self[0]._formselect.dfop;
            top['am_selectform_' + id] = { _obj: obj };
            dfop._itemValue = dfop._itemValue || {};
            if (dfop._itemValue.value != item.value) {
                if (!!dfop.select) {
                    dfop.select(item);
                }
                $self.trigger('change');
            }

            if (item.value == "") {
                item.text = dfop.placeholder;
            }
            else {
                $self.addClass('selected');
            }
            $self.find('span').text(item.text);
            dfop._itemValue = item;
            
        }
    };
    $.fn.formselect = function (op) {
        var dfop = {
            placeholder: "请选择",
            icon: 'fa-plus',

            layerUrl: false, // 弹层地址
            layerParam: false,
            layerUrlW: 600,
            layerUrlH: 400,
            dataUrl: null,  // 获取数据地址

            select: false,  // 选择事件

        };

        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        if (!!$self[0]._formselect) {
            return $self;
        }

        $self[0]._formselect = { dfop: dfop };

        $.formselect.init($self);
        return $self;
    };
    $.fn.formselectRefresh = function (op) {
        var $self = $(this);
        var dfop = $self[0]._formselect.dfop;
        $.extend(dfop, op || {});
        dfop._itemValue = null;
        $self.find('span').text(dfop.placeholder);
    };
    $.fn.formselectGet = function () {
        var $self = $(this);
        var dfop = $self[0]._formselect.dfop;
        return dfop._itemValue ? dfop._itemValue.value : "";
    };
    $.fn.formselectSet = function (value) {
        var $self = $(this);
        var dfop = $self[0]._formselect.dfop;
        if (value == '') {
            dfop._itemValue = { value: '', text: '' };
            $self.removeClass('selected');
            $self.find('span').text(dfop.placeholder);
            return false;
        }
        dfop._itemValue = { value: value };
        ayma.httpAsync('GET', dfop.dataUrl, { keyValue: value }, function (data) {
            if (!!data && data !="") {
                dfop._itemValue.text = data;
                $self.addClass('selected');
                $self.find('span').text(data);
            }
        });
    };

    // 弹层列表选择
    $.GirdSelect = {
        init: function ($self) {
            var dfop = $self[0]._GirdSelect.dfop;
            $self.addClass('am-formselect');
            $self.attr('type', 'GirdSelect');
            var $input = $('<span>' + dfop.placeholder + '</span><i class="fa ' + dfop.icon + '"></i><div class="clear-btn" >清空</div>');
            $self.on('click', $.GirdSelect.click);
            $self.html($input);

            // 异步加载数据
            ayma.httpAsync('GET', dfop.url, dfop.param, function (data) {
                dfop._loaded = true;
                dfop._data = data || [];
            });

            top.GirdSelect = top.GirdSelect || {};
            top.GirdSelect[dfop.id] = dfop;
        },
        click: function (e) {
            var $self = $(this);
            var dfop = $self[0]._GirdSelect.dfop;
            var et = e.target || e.srcElement;
            var $et = $(et);
            if ($et.hasClass('clear-btn')) {
                dfop._itemValue = { value: "", text: dfop.placeholder };
                $self.removeClass('selected');
                $self.find('span').text(dfop._itemValue.text);
                if (!!dfop.select) {
                    dfop.select(dfop._itemValue);
                }
            }
            else {
                var value = dfop._itemValue ? dfop._itemValue.value : "";
                ayma.layerForm({
                    id: dfop.id,
                    title: dfop.placeholder,
                    url: top.$.rootUrl + '/Utility/GirdSelectIndex?dfopid=' + dfop.id,
                    width: dfop.width,
                    height: dfop.height,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick($.GirdSelect.callback);
                    }
                });
            }
        },
        callback: function (item, id) {
            var $self = $('#' + id);
            var dfop = $self[0]._GirdSelect.dfop;
            dfop._itemValue = dfop._itemValue || {};
            if (dfop._itemValue[dfop.value] != item[dfop.value]) {
                if (!!dfop.select) {
                    dfop.select(item);
                }
                $self.trigger('change');
            }

            if (!item) {
                item.text = dfop.placeholder;
            }
            else {
                $self.addClass('selected');
            }
            $self.find('span').text(item[dfop.text]);
            dfop._itemValue = item;
        }
    }

    $.fn.GirdSelect = function (op) {
        var dfop = {
            placeholder: "请选择",
            icon: 'fa-plus',
            url: '',
            selectWord: '',
            headData: [],
            value: '',
            text: '',
            width: 600,
            height: 400,
            select: false,     // 选择事件
            param: {},
            _loaded: false
        };

        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        if (!!$self[0]._GirdSelect) {
            return $self;
        }
        $self[0]._GirdSelect = { dfop: dfop };

        $.GirdSelect.init($self);
        return $self;
    }
    $.fn.GirdSelectGet = function () {
        var $this = $(this);
        var dfop = $this[0]._GirdSelect.dfop;
        dfop._itemValue = dfop._itemValue || {};
        var res = dfop._itemValue[dfop.value] || "";
        return res;
    }
    $.fn.GirdSelectSet = function (value) {
        var $this = $(this);
        var dfop = $this[0]._GirdSelect.dfop;
        function set(_value) {
            if (dfop._loaded) {
                $.each(dfop._data, function (id, item) {
                    if (item[dfop.value] == _value) {
                        if (!!dfop.select) {
                            dfop.select(item);
                        }
                        $this.trigger('change');

                        $this.addClass('selected');
                        $this.find('span').text(item[dfop.text]);
                        dfop._itemValue = item;
                        return false;
                    }
                });
            }
            else {
                setTimeout(function () {
                    set(_value);
                }, 100);
            }
        }
        set(value);
    }



})(window.jQuery, top.ayma);
