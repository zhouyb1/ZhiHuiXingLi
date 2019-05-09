/*
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：aymaSelect（普通，多选，树形数据，gird，搜索，输入框选择器）-渲染数据在点击的时候触发，考虑到在一个表单上有超级多的下拉框的绑定情况（这里需要考虑赋值的特殊性）
 */
(function ($, ayma) {
    "use strict";
    $.select = {
        htmlToData: function ($self) {
            var dfop = $self[0]._select.dfop;
            var $ul = $self.find('ul');
            dfop.data = [];
            $ul.find('li').each(function () {
                var $li = $(this);
                var point = { id: $li.attr('data-value'), text: $li.html() }
                dfop.data.push(point);
            });
            $ul.remove();
            $ul = null;
            dfop = null;
        },
        initRender: function (dfop, $self) {
            var $option = $('<div class="am-select-option" id="ayma_select_option_' + dfop.id + '"></div>');

            var $optionContent = $('<div class="am-select-option-content"></div>');
            var $ul = $('<ul id="ayma_select_option_content' + dfop.id + '"></ul>');
            $optionContent.css('max-height', dfop.maxHeight + 'px');
            $option.hide();
            $optionContent.html($ul);
            $option.prepend($optionContent);
            if (dfop.allowSearch) {
                var $search = $('<div class="am-select-option-search"><input type="text" placeholder="搜索关键字"><span class="input-query" title="查询"><i class="fa fa-search"></i></span></div>');
                $option.append($search);
                $option.css('padding-bottom', '25px');
                $search.on('click', function () { return false; });
                $search.find('input').on("keypress", function (e) {
                    if (event.keyCode == "13") {
                        var $this = $(this);
                        var keyword = $this.val();
                        var $select = $this.parents('.am-select');
                        var dfop = $select[0]._select.dfop;
                        if (dfop.type == "tree" || dfop.type == "treemultiple") {
                            var $optionContent = $this.parent().prev();
                            $optionContent.amtreeSet('search', { keyword: keyword });
                        }
                        else if (dfop.type == "default" || dfop.type == "multiple") {
                            for (var i = 0, l = dfop.data.length; i < l; i++) {
                                var _item = dfop.data[i];
                                if (!keyword || _item[dfop.text].indexOf(keyword) != -1) {
                                    _item._lrhide = false;
                                }
                                else {
                                    _item._lrhide = true;
                                }
                            }
                            $.select.render(dfop);
                        }
                        
                    }
                });
            }
            $self.append($option);
            $self.append('<div class="am-select-placeholder" >==' + dfop.placeholder + '==</div>');
            $self.attr('type', 'select').addClass('am-select');

            if (dfop.type != 'tree') {
                $optionContent.mCustomScrollbar({ // 优化滚动条
                    theme: "minimal-dark"
                });
            }
        },
        render: function (dfop) {
            switch (dfop.type) {
                case 'default':
                    $.select.defaultRender(dfop);
                    break;
                case 'tree':
                case 'treemultiple':
                    $.select.treeRender(dfop);
                    break;
                case 'gird':
                    break;
                case 'multiple':
                    $.select.multipleRender(dfop);
                    break;
                default:
                    break;
            }
            dfop.isrender = true;
            
        },
        defaultRender: function (dfop) {
            var $ul = $('#ayma_select_option_content' + dfop.id);
            $ul.html("");
            if (!!dfop.placeholder) {
                $ul.append('<li data-value="-1" class="am-selectitem-li" >==' + dfop.placeholder + '==</li>');
            }
            for (var i = 0, l = dfop.data.length; i < l; i++) {
                var item = dfop.data[i];
                if (!item._lrhide) {
                    var $li = $('<li data-value="' + i + '" class="am-selectitem-li" >' + item[dfop.text] + '</li>');
                    $ul.append($li);
                }
              
            }
        },
        multipleRender: function (dfop) {
            var $ul = $('#ayma_select_option_content' + dfop.id);
            $ul.html("");
            if (!!dfop.placeholder) {
                $ul.append('<li data-value="-1" class="am-selectitem-li" >==' + dfop.placeholder + '==</li>');
            }
            for (var i = 0, l = dfop.data.length; i < l; i++) {
                var item = dfop.data[i];
                if (!item._lrhide) {
                    if (!!dfop.multipleMapValue && dfop.multipleMapValue[i] != undefined) {
                        var $li = $('<li data-value="' + i + '" class="am-selectitem-li" ><img class="am-select-node-cb" src="/Content/images/aymatree/checkbox_1.png">' + item[dfop.text] + '</li>');
                        $ul.append($li);
                    }
                    else {
                        var $li = $('<li data-value="' + i + '" class="am-selectitem-li" ><img class="am-select-node-cb" src="/Content/images/aymatree/checkbox_0.png">' + item[dfop.text] + '</li>');
                        $ul.append($li);
                    }
                }
            }
        },
        treeRender: function (dfop) {
            var $option = $('#ayma_select_option_' + dfop.id);
            $option.find('.am-select-option-content').remove();
            var $optionContent = $('<div class="am-select-option-content"></div>');
            $option.prepend($optionContent);
            $optionContent.css('max-height', dfop.maxHeight + 'px');
            dfop.data.unshift({
                "id": "-1",
                "text": '==' + dfop.placeholder + '==',
                "value": "-1",
                "icon": "-1",
                "parentnodes": "0",
                "showcheck": false,
                "isexpand": false,
                "complete": true,
                "hasChildren": false,
                "ChildNodes": []
            });
            var treeop = {
                data: dfop.data,
                nodeClick: $.select.treeNodeClick
            };
            if (dfop.type == 'treemultiple') {
                treeop.nodeClick = $.select.treeNodeClick2;
                treeop.nodeCheck = $.select.treeNodeCheck;
            }
            $optionContent.amtree(treeop);
        },
        bindEvent: function ($self) {
            $self.unbind('click');
            $self.on('click', $.select.click);
            $(document).click(function (e) {
                $('.am-select-option').slideUp(150);
                $('.am-select').removeClass('am-select-focus');
            });
        },
        click: function (e) {
            var $this = $(this);
            if ($this.attr('readonly') == 'readonly' || $this.attr('disabled') == 'disabled') {
                return false;
            }
            var dfop = $this[0]._select.dfop;
            if (!dfop.isload) {
                return false;
            }
            if (!dfop.isrender) {
                $.select.render(dfop);
            }

            // 选中下拉框的某一项
            var et = e.target || e.srcElement;
            var $et = $(et);

            var $option = $('#ayma_select_option_' + dfop.id);
            if ($option.is(":hidden")) {
                $('.am-select-option').slideUp(150);
                $('.am-select').removeClass('am-select-focus');


                $this.addClass('am-select-focus');
                var width = dfop.width || $this.parent().width();
                $option.css('width', width).show();
                $option.find('.am-select-option-search').find('input').select();
            } else {
                if (dfop.type != 'multiple') {
                    $option.slideUp(150);
                    $this.removeClass('am-select-focus');
                }
            }

            if (dfop.type != 'multiple') {
                if ($et.hasClass('am-selectitem-li')) {
                    var _index = $et.attr('data-value');
                    if (dfop._index != _index) {
                        var $inputText = $this.find('.am-select-placeholder');

                        if (_index == -1) {
                            $inputText.css('color', '#999');
                            $inputText.html('==' + dfop.placeholder + '==');
                        }
                        else {
                            $inputText.css('color', '#000');
                            $inputText.html(dfop.data[_index][dfop.text]);
                        }

                        $et.addClass('selected');
                        if (dfop._index != undefined && dfop._index != null) {
                            $option.find('.am-selectitem-li[data-value="' + dfop._index + '"]').removeClass('selected');
                        }
                        dfop._index = _index;

                        $this.trigger("change");
                        if (!!dfop.select) {
                            dfop.select(dfop.data[_index]);
                        }
                    }
                }
            }
            else {

                if ($et.hasClass('am-selectitem-li') || $et.hasClass('am-select-node-cb')) {
                    var $inputText = $this.find('.am-select-placeholder');
                    var $cbobj = $et.find('.am-select-node-cb');;
                    var _index = $et.attr('data-value');
                    if ($et.hasClass('am-select-node-cb')) {
                        $cbobj = $et;
                        _index = $et.parent().attr('data-value');
                    }


                    dfop.multipleMapValue = dfop.multipleMapValue || {};
                    dfop.multipleValue = dfop.multipleValue || [];
                    dfop.multipleText = dfop.multipleText || [];

                    if (dfop._index != undefined && dfop._index != null) {
                        $option.find('.am-selectitem-li[data-value="' + dfop._index + '"]').removeClass('selected');
                    }

                    if (_index == -1) {
                        $inputText.css('color', '#999');
                        $inputText.html('==' + dfop.placeholder + '==');
                        dfop.multipleMapValue = {};
                        dfop.multipleValue = [];
                        dfop.multipleText = [];

                        $option.find('.am-select-node-cb[src$="checkbox_1.png"]').attr('src', '/Content/images/aymatree/checkbox_0.png');
                        $option.slideUp(150);
                        $this.removeClass('am-select-focus');
                    }
                    else {
                        var selected = true;
                        if (dfop.multipleMapValue[_index] == undefined) {
                            $inputText.css('color', '#000');
                            dfop.multipleValue.push(dfop.data[_index][dfop.value]);
                            dfop.multipleText.push(dfop.data[_index][dfop.text]);
                            dfop.multipleMapValue[_index] = dfop.multipleText.length - 1;
                            $inputText.html(String(dfop.multipleText));

                            $cbobj.attr('src', '/Content/images/aymatree/checkbox_1.png');
                        }
                        else {


                            dfop.multipleText.splice(dfop.multipleMapValue[_index], 1);
                            dfop.multipleValue.splice(dfop.multipleMapValue[_index], 1);
                            delete dfop.multipleMapValue[_index];

                            if (dfop.multipleText.length == 0) {
                                $inputText.css('color', '#999');
                                $inputText.html('==' + dfop.placeholder + '==');
                            }
                            else {
                                $inputText.html(String(dfop.multipleText));
                            }
                            selected = false;
                            $cbobj.attr('src', '/Content/images/aymatree/checkbox_0.png');
                        }

                        $this.trigger("change");
                        if (!!dfop.select) {
                            dfop.select(dfop.data[_index], selected, $this);
                        }
                    }
                }
            }
            dfop = null;
            e.stopPropagation();
        },
        treeNodeClick:function(item,$item){
            $item.parents('.am-select-option').slideUp(150);
            var $select = $item.parents('.am-select');
            var dfop = $select[0]._select.dfop;
            $select.removeClass('am-select-focus');
            dfop.currtentItem = item;
            var $inputText = $select.find('.am-select-placeholder');
            $inputText.html(dfop.currtentItem.text);
            if (item.value == '-1') {
                $inputText.css('color', '#999');
            }
            else {
                $inputText.css('color', '#000');
            }
            $select.trigger("change");
            if (!!dfop.select) {
                dfop.select(dfop.currtentItem);
            }
        },
        treeNodeClick2: function (item, $item) {
            $tree = $item.parents('.am-select-option-content');
            var $select = $item.parents('.am-select');
            var dfop = $select[0]._select.dfop;
            $select.removeClass('am-select-focus');
            dfop.currtentItems = [];
            if (item.value == '-1') {
                $item.parents('.am-select-option').slideUp(150);
                $tree.amtreeSet('allNoCheck');
                var $inputText = $select.find('.am-select-placeholder');
                $inputText.html(item.text);
                $inputText.css('color', '#999');
                $select.trigger("change");
                if (!!dfop.select) {
                    dfop.select([]);
                }
            }
        },
        treeNodeCheck: function (item, $item) {
            $tree = $item.parents('.am-select-option-content');
            var $select = $item.parents('.am-select');
            var $inputText = $select.find('.am-select-placeholder');
            $select.removeClass('am-select-focus');
            var dfop = $select[0]._select.dfop;
            var data = $tree.amtreeSet('getCheckNodesEx');
            dfop.currtentItems = data;
            var text = "";
            for (var i = 0, l = data.length; i < l; i++) {
                var one = data[i];
                if (text != "") {
                    text += ",";
                }
                text += one.text;
            }
            if (text == "") {
                $inputText.html("==" + dfop.placeholder + "==");
                $inputText.css('color', '#999');
            }
            else {
                $inputText.text(text);
                $inputText.css('color', '#000');
            }
            $select.trigger("change");
            if (!!dfop.select) {
                dfop.select(dfop.currtentItems);
            }            
        },
        defaultValue: function ($self) {
            var dfop = $self[0]._select.dfop;
            dfop.currtentItem = null;
            dfop._index = -1;
            var $inputText = $self.find('.am-select-placeholder');
            $inputText.css('color', '#999');
            $inputText.html('==' + dfop.placeholder + '==');
            $self.trigger("change");
        }
    };


    $.fn.select = function (op) {
        var dfop = {
            // 请选择
            placeholder: "请选择",
            // 类型
            type: 'default',// default,tree,treemultiple,gird,multiple
            // 字段
            value: "id",
            text: "text",
            title: "title",
            // 展开最大高度
            maxHeight: 200,
            // 宽度
            width: false,
            // 是否允许搜索
            allowSearch: false,
            // 访问数据接口地址
            url: false,
            data: false,
            // 访问数据接口参数
            param: null,
            // 接口请求的方法
            method: "GET",

            //选择事件
            select: false,
            
            isload: false, // 数据是否加载完成
            isrender: false// 选项是否渲染完成
        };
        $.extend(dfop, op || {});
        var $self = $(this);
        if ($self.length == 0) {
            return $self;
        }

        dfop.id = $self.attr('id');

        if (!dfop.id) {
            return false;
        }
        if (!!$self[0]._select) {
            return $self;
        }

        $self[0]._select = { dfop: dfop };
        // 基础信息渲染
        $.select.bindEvent($self);
        
        // 数据获取方式有三种：url,data,html
        // url优先级最高
        if (!!dfop.url) {
            ayma.httpAsync(dfop.method, dfop.url, dfop.param, function (data) {
                $self[0]._select.dfop.data = data || [];
                $self[0]._select.dfop.backdata = data || [];
                dfop.isload = true;
            });
        }
        else if (!!dfop.data) {
            dfop.isload = true;
            dfop.backdata = dfop.data;
        }
        else {// 最后是html方式获取（只适合数据比较少的情况）
            $.select.htmlToData($self);
            dfop.isload = true;
            dfop.backdata = dfop.data;
        }
        $.select.initRender(dfop, $self);
        return $self;
        
    };

    $.fn.selectRefresh = function (op) {
        var $self = $(this);
        if ($self.length == 0) {
            return $self;
        }
        if (!$self[0]._select) {
            return false;
        }
        var dfop = $self[0]._select.dfop;
        if (!dfop) {
            return false;
        }
        $.extend(dfop, op || {});

        dfop.isload = false;
        dfop.isrender = false;
        if (!!dfop.url) {
            if (dfop.isNotAsync) {
                ayma.httpNotAsync(dfop.method, dfop.url, dfop.param, function (data) {
                    $self[0]._select.dfop.data = data || [];
                    $self[0]._select.dfop.backdata = data || [];
                    dfop.isload = true;
                });
            } else {
                ayma.httpAsync(dfop.method, dfop.url, dfop.param, function (data) {
                    $self[0]._select.dfop.data = data || [];
                    $self[0]._select.dfop.backdata = data || [];
                    dfop.isload = true;
                });
            }
        }
        else if (!!dfop.data) {
            dfop.isload = true;
            dfop.backdata = dfop.data;
        }
        $.select.defaultValue($self);
        if (dfop._setValue != null && dfop._setValue != undefined) {
            $self.selectSet(dfop._setValue);
        }
    }

    
    $.fn.selectGet = function () {
        var $this = $(this);
        if ($this.length == 0) {
            return $this;
        }
        var dfop = $this[0]._select.dfop;
        var value = '';
        switch (dfop.type) {
            case 'default':
                if (!!dfop.data[dfop._index]) {
                    value = dfop.data[dfop._index][dfop.value];
                }
                break;
            case 'tree':
                if (!!dfop.currtentItem) {
                    value = dfop.currtentItem[dfop.value];
                }
                break;
            case 'treemultiple':
                if (!!dfop.currtentItems) {
                    for (var i = 0, l = dfop.currtentItems.length; i < l; i++) {
                        if (value != "") {
                            value += ",";
                        }
                        value += dfop.currtentItems[i][dfop.value];
                    }
                }
                break;
            case 'gird':
                break;
            case 'multiple':
                dfop.multipleValue = dfop.multipleValue || [];
                return String(dfop.multipleValue);
                break;
            default:
                break;
        }
        return value;
    };

    $.fn.selectGetText = function () {
        var $this = $(this);
        if ($this.length == 0) {
            return $this;
        }
        var dfop = $this[0]._select.dfop;
        var value = '';
        switch (dfop.type) {
            case 'default':
                if (!!dfop.data[dfop._index]) {
                    value = dfop.data[dfop._index][dfop.text];
                }
                break;
            case 'tree':
                if (!!dfop.currtentItem) {
                    value = dfop.currtentItem[dfop.text];
                }
                break;
            case 'treemultiple':
                if (!!dfop.currtentItems) {
                    for (var i = 0, l = dfop.currtentItems.length; i < l; i++) {
                        if (value != "") {
                            value += ",";
                        }
                        value += dfop.currtentItems[i][dfop.text];
                    }
                }
                break;
            default:
                break;
        }
        return value;
    };

    $.fn.selectSet = function (value) {
        // 设置数据的值
        var $this = $(this);
        if ($this.length == 0) {
            return $this;
        }
        value = value + '';
        if (value == '' || value == undefined || value == null) {
            $.select.defaultValue($this);
            return $this;
        }
        var dfop = $this[0]._select.dfop;
        dfop._setValue = null;
        if (!dfop) {
            return $this;
        }
        function _fn(dfop) {
            if (dfop.isload == false) {
                setTimeout(function () {
                    _fn(dfop);
                }, 100);
            }
            else if (dfop.isload == true) {
                var _currtentItem;
                switch (dfop.type) {
                    case 'default':
                        for (var i = 0, l = dfop.data.length; i < l; i++) {
                            if (dfop.data[i][dfop.value] == value) {
                                dfop._index = i;
                                _currtentItem = dfop.data[i];
                                break;
                            }
                        }
                        break;
                    case 'tree':
                        _currtentItem = $.amtree.findItem(dfop.data, dfop.value, value);
                        dfop.currtentItem = _currtentItem;
                        break;
                    case 'treemultiple':
                        $.select.render(dfop);
                        $this.find('.am-select-option-content').amtreeSet('setCheck', value.split(','));
                        return false;
                        break;
                    case 'gird':
                        break;
                    case 'multiple':
                        dfop.multipleMapValue = {};
                        dfop.multipleValue = [];
                        dfop.multipleText = [];
                        if (dfop.isrender) {
                            $this.find('.am-select-node-cb[src$="checkbox_1.png"]').attr('src', '/Content/images/aymatree/checkbox_0.png');
                        }
                        var _valuellist = value.split(',');
                        for (var i = 0, l = dfop.data.length; i < l; i++) {
                            var _arrayIndex = $.inArray(dfop.data[i][dfop.value], _valuellist);
                            
                            if (_arrayIndex != -1) {
                                dfop.multipleMapValue[i] = _arrayIndex;
                                dfop.multipleValue.push(dfop.data[i][dfop.value]);
                                dfop.multipleText.push(dfop.data[i][dfop.text]);

                                if (dfop.isrender) {
                                    $this.find('[data-value="' + i + '"] .am-select-node-cb').attr('src', '/Content/images/aymatree/checkbox_1.png');
                                }
                                if (!!dfop.select) {
                                    dfop.select(dfop.data[i], true, $this);
                                }
                            }
                        }

                        if (dfop.multipleText.length > 0) {
                            _currtentItem = dfop.multipleText;
                        }
                        break;
                    default:
                        break;
                }
               

                if (!!_currtentItem) {
                    if (dfop.type == 'multiple') {
                        var $inputText = $this.find('.am-select-placeholder');
                        if (dfop.multipleText.length > 0) {
                            $inputText.css('color', '#000');
                        }
                        else {
                            $inputText.css('color', '#999');
                        }
                        $inputText.html(String(dfop.multipleText));
                        $this.trigger("change");
                    } else {
                        var $inputText = $this.find('.am-select-placeholder');
                        $inputText.html(_currtentItem[dfop.text]);
                        $inputText.css('color', '#000');
                        $this.trigger("change");
                        if (!!dfop.select) {
                            dfop.select(_currtentItem);
                        }
                    }
                }
                else {
                    dfop._setValue = value;
                }
            }
        }
        _fn(dfop);
        return $this;
    };

})(jQuery, top.ayma);
