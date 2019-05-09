/*
 * 创建人：前端开发组
 * 日 期：2017.05.24
 * 描 述：am-uploader 表单附件选择插件
 */
(function ($, ayma) {
    "use strict";

    $.Uploader = {
        init: function ($self) {
            var dfop = $self[0]._Uploader.dfop;
            $.Uploader.initRender($self, dfop);
        },
        initRender: function ($self, dfop) {
            $self.attr('type', 'am-Uploader').addClass('Uploader-wrap');
            var $wrap = $('<div class="Uploader-input" ></div>');

            var $btnGroup = $('<div class="Uploader-btn-group"></div>');
            var $uploadBtn = $('<a id="Uploader_uploadBtn_' + dfop.id + '" class="btn btn-success Uploader-input-btn">上传</a>');
            var $downBtn = $('<a id="Uploader_downBtn_' + dfop.id + '" class="btn btn-danger Uploader-input-btn">下载</a>');
            var $previewBtn = $('<a id="Uploader_previewBtn_' + dfop.id + '" class="btn btn-primary Uploader-input-btn">预览</a>');

            $self.append($wrap);

            $btnGroup.append($uploadBtn);
            $btnGroup.append($downBtn);
            $btnGroup.append($previewBtn);
            $self.append($btnGroup);

            $uploadBtn.on('click', $.Uploader.openUploadForm);
            $downBtn.on('click', $.Uploader.openDownForm);
            $previewBtn.on("click", $.Uploader.openPreviewForm);

        },
        openPreviewForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.Uploader-wrap');
            var dfop = $self[0]._Uploader.dfop;
            ayma.layerForm({
                id: dfop.id,
                title: "预览图片",
                url: top.$.rootUrl + '/AM_SystemModule/Annexes/PreviewForm?keyVaule=' + dfop.value,
                width: window.screen.availWidth,
                height: window.screen.availHeight,
                maxmin: true,
                btn: null
            });
        },
        openUploadForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.Uploader-wrap');
            var dfop = $self[0]._Uploader.dfop;
            if (dfop.value == "null" || dfop.value=="") {
                dfop.value = ayma.newGuid();
            }
            ayma.layerForm({
                id: dfop.id,
                title: dfop.placeholder,
                url: top.$.rootUrl + '/AM_SystemModule/Annexes/UploadForm?keyVaule=' + dfop.value + "&extensions=" + dfop.extensions,
                width: 600,
                height: 400,
                maxmin: true,
                btn: null,
                end: function () {
                    ayma.httpAsyncGet(top.$.rootUrl + '/AM_SystemModule/Annexes/GetFileNames?folderId=' + dfop.value, function (res) {
                        if (res.code == ayma.httpCode.success) {
                            $('#' + dfop.id).find('.Uploader-input').text(res.info);
                            if (res.info == "") {
                                dfop.value = "";
                            }
                        }
                    });
                }
            });
        },
        openDownForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.Uploader-wrap');
            var dfop = $self[0]._Uploader.dfop;
            ayma.layerForm({
                id: dfop.id,
                title: dfop.placeholder,
                url: top.$.rootUrl + '/AM_SystemModule/Annexes/DownForm?keyVaule=' + dfop.value,
                width: 600,
                height: 400,
                maxmin: true,
                btn: null
            });
        }
    };

    $.fn.Uploader = function (op) {
        var $this = $(this);
        if (!!$this[0]._Uploader) {
            return $this;
        }
        var dfop = {
            placeholder: '上传附件',
            isUpload: true,
            isDown: true,
            extensions: ''
        }

        $.extend(dfop, op || {});
        dfop.id = $this.attr('id');
        dfop.value = ayma.newGuid();
        $this[0]._Uploader = { dfop: dfop };
        $.Uploader.init($this);
    };

    $.fn.UploaderSet = function (value) {
        var $self = $(this);
        var dfop = $self[0]._Uploader.dfop;
        if (value == "null" || dfop.value == "") {
            value = ayma.newGuid();
        }
        dfop.value = value;
        ayma.httpAsyncGet(top.$.rootUrl + '/AM_SystemModule/Annexes/GetFileNames?folderId=' + dfop.value, function (res) {
            if (res.code == ayma.httpCode.success) {
                $('#' + dfop.id).find('.Uploader-input').text(res.info);
                if (res.info == "") {
                    dfop.value = "";
                }
            }
        });
    }

    $.fn.UploaderGet = function () {
        var $this = $(this);
        var dfop = $this[0]._Uploader.dfop;
        return dfop.value;
    }
})(jQuery, top.ayma);
