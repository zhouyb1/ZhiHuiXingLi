/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：amdate 时间段选择器 @YY@-当年 @MM@-当月 @DD@-当天 @JJ@-当季度
 */
(function ($, ayma) {
    "use strict";
    $.amdate = {
        init: function ($self) {
            var dfop = $self[0]._amdate.dfop;
            $self.html('');
            $self.addClass('am-search-date');
            var $text = $('<div class="am-search-date-text" id="am_search_date_' + dfop.id + '" ></div>');
            var $container = $('<div class="am-search-date-container" id="am_search_date_container_' + dfop.id + '"><div class="am-search-date-arrow"><div class="am-search-date-inside"></div></div></div>');

            var $btnlist = $('<div class="am-search-date-content-btns" id="am_search_date_content_btns_' + dfop.id + '"></div>');
            var $customDate = $('<div class="am-search-date-btn-block"><a href="javascript:;" data-value="customDate">自定义</a></div>');
            $btnlist.append($customDate);
            $container.append($btnlist);

            var $datepickerContent = $('<div class="am-search-date-datepicker-content"></div>');

            var $datepicker1 = $('<div class="am-search-date-datepicker-container first" id="am_search_date_datepicker1_' + dfop.id + '"  ></div>');
            var $datepicker2 = $('<div class="am-search-date-datepicker-container" id="am_search_date_datepicker2_' + dfop.id + '"  ></div>');
            var $datepickerBtn = $('<div class="am-search-date-datepicker-btn"><a class="btn btn-primary">确定</a></div>');
            $datepickerContent.append($datepicker1);
            $datepickerContent.append($datepicker2);
            $datepickerContent.append($datepickerBtn);

            $container.append($datepickerContent);

            $self.append($text);
            $self.append($container);

          

            WdatePicker({ eCont: 'am_search_date_datepicker1_' + dfop.id, onpicked: function (dp) { dfop._begindate = dp.cal.getDateStr() + " 00:00:00"; }, minDate: dfop.minDate, maxDate: dfop.maxDate });// 开始时间
            WdatePicker({ eCont: 'am_search_date_datepicker2_' + dfop.id, onpicked: function (dp) { dfop._enddate = dp.cal.getDateStr() + " 23:59:59"; }, minDate: dfop.minDate, maxDate: dfop.maxDate });// 结束时间


            /*事件的绑定*/
            $text.on('click', function (e) {
                var $this = $(this);
                var $self = $this.parents('.am-search-date');
                var dfop = $self[0]._amdate.dfop;
                var $container =$self.find('#am_search_date_container_' + dfop.id);
                if ($container.is(':hidden')) {
                    $container.show();
                }
                else {
                    $container.hide();
                }
            });
            $(document).click(function (e) {
                var et = e.target || e.srcElement;
                var $et = $(et);
                if (!$et.hasClass('am-search-date') && $et.parents('.am-search-date').length <= 0) {
                    $('.am-search-date-container').hide();
                }
            });

            $customDate.find('a').on('click', function (e) {
                var $this = $(this);
                var $self = $this.parents('.am-search-date');
                var dfop = $self[0]._amdate.dfop;

                $self.find('.am-search-date-content-btns a.active').removeClass('active');
                $('#am_search_date_container_' + dfop.id).addClass('width');
                $this.addClass('active');
                $self.find('.am-search-date-datepicker-content').show();

            });
            // 时间确定按钮
            $datepickerBtn.find('a').on('click', function () {
                var $self = $(this).parents('.am-search-date');
                var dfop = $self[0]._amdate.dfop;
                var $container = $self.find('#am_search_date_container_' + dfop.id);
                var $text = $self.find('#am_search_date_' + dfop.id);
                $container.hide();
                var label = ayma.formatDate(dfop._begindate, 'yyyy-MM-dd') + '~' + ayma.formatDate(dfop._enddate, 'yyyy-MM-dd');
                $text.html(label);

                if (!!dfop.selectfn) {
                    dfop.selectfn(dfop._begindate, dfop._enddate);
                }
            });
        },
        monthinit: function ($self) {// 月：上月，本月
            var dfop = $self[0]._amdate.dfop;
            var $btnlist = $('#am_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="am-search-date-btn-block"></div>');
            if (dfop.premShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="preM">上月</a>');
            }
            if (dfop.mShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="currentM">本月</a>');
            }
            $btnlist.prepend($block);
            dfop = null;
        },
        jinit: function ($self) {// 季度
            var dfop = $self[0]._amdate.dfop;
            var $btnlist = $('#am_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="am-search-date-btn-block"></div>');
            if (dfop.prejShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="preJ">上季度</a>');
            }
            if (dfop.jShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="currentJ">本季度</a>');
            }
            $btnlist.prepend($block);
            dfop = null;
        },
        yinit: function ($self) {
            var dfop = $self[0]._amdate.dfop;
            var $btnlist = $('#am_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="am-search-date-btn-block"></div>');
            if (dfop.ysShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="yS">上半年</a>');
            }
            if (dfop.yxShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="yX">下半年</a>');
            }
            if (dfop.preyShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="preY">去年</a>');
            }
            if (dfop.yShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="currentY">今年</a>');
            }
            $btnlist.prepend($block);
            dfop = null;
        },
        custmerinit: function ($self) {
            var dfop = $self[0]._amdate.dfop;
            var $btnlist = $('#am_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="am-search-date-btn-block"></div>');
            
            for (var i = 0, l = dfop.dfdata.length; i < l; i++) {
                var item = dfop.dfdata[i];
                $block.append('<a href="javascript:;" class="datebtn" data-value="' + i + '">' + item.name + '</a>');
            }

            $btnlist.prepend($block);
            dfop = null;
        },
        bindEvent: function ($self) {
            $self.find('.datebtn').on('click', function () {
                var $this = $(this);
                var $self = $this.parents('.am-search-date');
                var value = $this.attr('data-value');
                $.amdate.select($self, value);
            });
        },
        select: function ($self, value) {
            var dfop = $self[0]._amdate.dfop;
            var $container = $self.find('#am_search_date_container_' + dfop.id);
            var $text = $self.find('#am_search_date_' + dfop.id);
            var $btnlist = $('#am_search_date_content_btns_' + dfop.id);
            $btnlist.find('.active').removeClass('active');
            var $this = $btnlist.find('.datebtn[data-value="' + value + '"]').addClass('active');
            switch (value) {
                case 'currentD':
                    dfop._begindate = ayma.getDate('yyyy-MM-dd 00:00:00');
                    dfop._enddate = ayma.getDate('yyyy-MM-dd 23:59:59');
                    break;
                case 'preM':
                    var d = ayma.getPreMonth();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'currentM':
                    var d = ayma.getMonth();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'preJ':
                    var d = ayma.getPreQuarter();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'currentJ':
                    var d = ayma.getCurrentQuarter();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'yS':
                    var d = ayma.getFirstHalfYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'yX':
                    var d = ayma.getSecondHalfYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'preY':
                    var d = ayma.getPreYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'currentY':
                    var d = ayma.getYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                default:
                    var rowid = parseInt(value);
                    var data = dfop.dfdata[rowid];

                    dfop._begindate = data.begin();
                    dfop._enddate = data.end();
                    break;
            }
            $container.hide();
            var label = ayma.formatDate(dfop._begindate, 'yyyy-MM-dd') + '~' + ayma.formatDate(dfop._enddate, 'yyyy-MM-dd');
            $text.html(label);
            $('#am_search_date_container_' + dfop.id).removeClass('width');
            $self.find('.am-search-date-datepicker-content').hide();
            if (!!dfop.selectfn) {
                dfop.selectfn(dfop._begindate, dfop._enddate);
            }
        }
    };

    $.fn.amdate = function (op) {
        var dfop = {
            // 自定义数据
            dfdata: [],
            // 月
            mShow: true,
            premShow: true,
            // 季度
            jShow: true,
            prejShow: true,
            // 年
            ysShow: true,
            yxShow: true,
            preyShow: true,
            yShow: true,

            dfvalue: false,//currentD,preM,currentM,preJ,currentJ,yS,yX,preY,currentY,
            selectfn: false,

            minDate: '',
            maxDate: '',

            
        };
        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        $self[0]._amdate = { "dfop": dfop };
        $.amdate.init($self);

        $.amdate.yinit($self);
        $.amdate.jinit($self);
        $.amdate.monthinit($self);

        $.amdate.custmerinit($self);

        $.amdate.bindEvent($self);

        if (dfop.dfvalue != "") {
            $.amdate.select($self, dfop.dfvalue);
        }
        return $self;
    };
})(jQuery, top.ayma);
