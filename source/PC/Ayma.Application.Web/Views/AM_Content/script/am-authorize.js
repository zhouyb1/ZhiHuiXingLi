/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.16
 * 描 述：权限验证模块
 */
(function ($, ayma) {
    "use strict";

    $.fn.AuthorizeJfGrid = function (op) {
        var _headData = [];
        
        $.each(op.headData, function (id, item) {
            if (!!ModuleColumnList[item.name.toLowerCase()]) {
                _headData.push(item);
            }
        });
        
        op.headData = _headData;
        $(this).jfGrid(op);
    }

    $(function () {
        function btnAuthorize() {
            if (!!ModuleButtonList) {
                var $container = $('[ayma-authorize="yes"]');
                $container.find('[id]').each(function () {
                    var $this = $(this);
                    var id = $this.attr('id');
                    if (!ModuleButtonList[id]) {
                        $this.remove();
                    }
                });
                $container.find('.dropdown-menu').each(function () {
                    var $this = $(this);
                    if ($this.find('li').length == 0) {
                        $this.remove();
                    }
                });
                $container.css({ 'display': 'inline-block' });
            }
            else {
                setTimeout(btnAuthorize,100);
            }
        }
        btnAuthorize();
    });

})(window.jQuery, top.ayma);
