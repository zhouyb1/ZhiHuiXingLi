/*
 * 创建人：前端开发组
 * 日 期：2017.03.16
 * 描 述：表单数据验证完整性
 */
(function ($, ayma) {
    "use strict";
    
    $.ValidformMessage = function ($this, errormsg) {
        /*错误处理*/
        $this.addClass('am-field-error');
        $this.parent().append('<div class="am-field-error-info" title="' + errormsg + '！"><i class="fa fa-info-circle"></i></div>');
        var validatemsg = $this.parent().find('.form-item-title').text() + ' ' + errormsg;
        ayma.alert.error('表单信息输入有误,请检查！</br>' + validatemsg);
        if ($this.attr('type') == 'select') {
            $this.on('change', function () {
                removeErrorMessage($(this));
            });
        }
        else if ($this.attr('type') == 'formselect') {
            $this.on('change', function () {
                removeErrorMessage($(this));
            });
        }
        else if ($this.hasClass('am-input-wdatepicker')) {
            $this.on('change', function () {
                var $input = $(this);
                if ($input.val()) {
                    removeErrorMessage($input);
                }
            });
        }
        else {
            $this.on('input propertychange', function () {
                var $input = $(this);
                if ($input.val()) {
                    removeErrorMessage($input);
                }
            });
        }
    };

    $.fn.RemoveValidMessage = function () {
        removeErrorMessage($(this));
    }

    $.fn.Validform = function () {
        var validateflag = true;
        var validHelper = ayma.validator;
        $(this).find("[isvalid=yes]").each(function () {
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

    function removeErrorMessage($obj) {
        $obj.removeClass('am-field-error');
        $obj.parent().find('.am-field-error-info').remove();
    }

})(window.jQuery, top.ayma);
