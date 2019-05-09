/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.12
 * 描 述：amLayout 页面布局插件
 */
(function ($, ayma) {
    "use strict";

    $.fn.amLayout = function (op) {
        var dfop = {
            blocks: [
                {
                    target: '.am-layout-left',
                    type: 'right',
                    size: 203
                }
            ]
        };
        $.extend(dfop, op || {});
        var $this = $(this);
        if ($this.length <= 0) {
            return false;
        }
        $this[0]._amLayout = { "dfop": dfop };
        dfop.id = "amLayout" + new Date().getTime();

        for (var i = 0, l = dfop.blocks.length; i < l; i++) {
            var _block = dfop.blocks[i];
            $this.children(_block.target).append('<div class="am-layout-move am-layout-move-' + _block.type + ' " path="' + i + '"  ></div>');
        }

        $this.on('mousedown', function (e) {
            var et = e.target || e.srcElement;
            var $et = $(et);
            var $this = $(this);
            var dfop = $this[0]._amLayout.dfop;
            if ($et.hasClass('am-layout-move')) {
                var _index = $et.attr('path');
                dfop._currentBlock = dfop.blocks[_index];
                dfop._ismove = true;
                dfop._pageX = e.pageX;
            }
        });

        $this.mousemove(function (e) {
            var $this = $(this);
            var dfop = $this[0]._amLayout.dfop;
            if (!!dfop._ismove) {
                var $block = $this.children(dfop._currentBlock.target);
                $block.css('width', dfop._currentBlock.size + (e.pageX - dfop._pageX));
                $this.css('padding-left', dfop._currentBlock.size + (e.pageX - dfop._pageX));
            }
        });

        $this.on('click', function (e) {
            var $this = $(this);
            var dfop = $this[0]._amLayout.dfop;
            if (!!dfop._ismove) {
                dfop._currentBlock.size += (e.pageX - dfop._pageX);
                dfop._ismove = false;
            }
        });
    }
})(jQuery, top.ayma);
