/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：aymaISearch 输入搜索框，支持input输入框，数据异步加载，本地查询
 */
(function ($, ayma) {
    "use strict";
    $.isearch = {
        init: function ($self) {
            var dfop = $self[0]._isearch.dfop;
            $self.parent().append('<div class="am-isearch-panel"  style="max-height:' + dfop.maxHeight + 'px;" ><ul id="isearch_' + dfop.id + '" ></ul></div>');
        },
        bind: function ($self) {
            $self.on('input propertychange', function () {
                var $this = $(this);
                $.isearch.triggerSearch($self);
            });
        },
        triggerSearch: function ($self) {
            var dfop = $self[0]._isearch.dfop;
            var $showPanel = $('#isearch_' + dfop.id);
            $showPanel.parent().hide();
            var _value = $self.val();
            if (_value) {
                if (!dfop._isload) {
                    dfop._isSearchneed = true;
                }
                else {
                    dfop._first = true;
                    dfop._value = _value;
                    dfop._begin = 0;
                    dfop._end = 100 > dfop.data.length ? dfop.data.length : 100;
                    if (dfop._isSearched) {
                        dfop._isSearched = false;
                        setTimeout(function () {
                            $.isearch.search($self);
                        });
                    }
                }
            }
            else {
                dfop._isSearchneed = false;
                $showPanel.html("");
            }
        },

        search: function ($self) {// 每次搜索100条
            var dfop = $self[0]._isearch.dfop;
            var value = dfop._value;
            var begin = dfop._begin;
            var end = dfop._end;
            var data = dfop.data;

            for (var i = begin; i < end; i++) {
                var _item = data[i];
                if (item[dfop.text].indexOf(value) != -1) {
                    $.isearch.renderNone($self, item[dfop.text]);
                }
            }

            if (end < data.length) {
                dfop._begin = end;
                dfop._end = end + 100;
                if (dfop._end > data.length) {
                    dfop._end = data.length;
                }
                setTimeout(function () {
                    $.isearch.search($self);
                });
            }
            else {
                dfop._isSearched = true;
            }
        },
        renderNone: function ($self, text) {// 刷新一条数据
            var dfop = $self[0]._isearch.dfop;
            var $showPanel = $('#isearch_' + dfop.id);
            if (dfop._first) {
                dfop._first = false;
                $showPanel.html("");
                $showPanel.parent().show();
            }
            $showPanel.append('<li>' + text + '</li>');
        }
    };


    $.fn.isearch = function (op) {
        var dfop = {
            // 展开最大高度
            maxHeight: 200,
            // 字段
            text: "text",

            method: "GET",
            url: '',
            data: [],
            // 访问数据接口参数
            param: null,

            _isload: false,
            _isSearched: false,
            _first: false,
            _isSearchneed: false
        };
        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        $self[0]._isearch = {dfop:dfop};

        $.isearch.init($self);
        //加载数据
        if (!!dfop.url) {
            ayma.httpAsync(dfop.method, dfop.url, dfop.param, function (data) {
                $self[0]._isearch.dfop.data = data || [];
                dfop.isload = true;
                if (dfop._isSearchneed) {
                    $.isearch.triggerSearch($self);// 触发查询函数
                }
                
            });
        }
        else {
            dfop.isload = true;
        }
        return $self;
    }


})(jQuery, top.ayma);
