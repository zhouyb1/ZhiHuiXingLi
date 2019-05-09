/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：附件上传管理	
 */
var keyVaule = request('keyVaule');
var extensions = request('extensions');

var bootstrap = function ($, ayma) {
    "use strict";
   
    $.SetForm(top.$.rootUrl + '/AM_SystemModule/Annexes/GetAnnexesFileList?folderId=' + keyVaule, function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            $('#am_form_file_queue .am-form-file-queue-bg').hide();
            var item = data[i];
            fileInfo[item.F_Id] = {
                fileGuid: item.F_Id,
                chunks: 1
            }
            var $item = $('<div class="am-form-file-queue-item" id="am_filequeue_' + item.F_Id + '" ></div>');
            $item.append('<div class="am-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + item.F_FileType + '.png"></div>');
            $item.append('<span class="am-file-name">' + item.F_FileName + '(' + ayma.countFileSize(item.F_FileSize) + ')</span>');

            $item.append('<div class="am-msg"><i class="fa fa-check-circle"></i></div>');
            $item.append('<div class="am-tool-bar"><i class="fa fa-cloud-preview" title="预览"  data-value="' + item.F_Id + '" ></i><i class="fa fa-cloud-download" title="下载"  data-value="' + item.F_Id + '" ></i><i class="fa fa-minus-circle" title="删除"  data-value="' + item.F_Id + '" ></i></div>');

            $item.find('.am-tool-bar .fa-minus-circle').on('click', function () {
                var fileId = $(this).attr('data-value');
                DeleteFile(fileId);
            });

            $item.find('.am-tool-bar .fa-cloud-download').on('click', function () {
                var fileId = $(this).attr('data-value');
                DownFile(fileId);
            });
            //预览
            $item.find('.am-tool-bar .fa-cloud-preview').on('click', function () {
                var fileId = $(this).attr('data-value');
                PreviewFile(fileId);
            });

            $('#am_form_file_queue_list').append($item);
        }
    });

    var fileInfo = {};
    
    // 触发合并文件碎片
    var mergeFileChunks = function (file) {
        var param = {};
        param['__RequestVerificationToken'] = $.amToken;
        param['folderId'] = keyVaule;
        param['fileGuid'] = fileInfo[file.id].fileGuid;
        param['fileName'] = fileInfo[file.id].name;
        param['chunks'] = fileInfo[file.id].chunks;
        ayma.httpAsyncPost(top.$.rootUrl + "/AM_SystemModule/Annexes/MergeAnnexesFile", param, function (res) {
            var $fileItem = $('#am_form_file_queue_list').find('#am_filequeue_' + file.id);
            $fileItem.find('.am-uploader-progress').remove();
            if (res.code == ayma.httpCode.success) {
                // 文件保存成功后
                $fileItem.append('<div class="am-msg"><i class="fa fa-check-circle"></i></div>');
                $fileItem.append('<div class="am-tool-bar"><i class="fa fa-minus-circle" title="删除"  data-value="' + file.id + '" ></i></div>');

                $fileItem.find('.am-tool-bar .fa-minus-circle').on('click', function () {
                    var fileId = $(this).attr('data-value');
                    DeleteFile(fileId);
                });
            }
            else {
                $fileItem.append('<div class="am-msg"><i class="fa fa-exclamation-circle"></i></div>');
            }
        });
    }
    // 触发清除文件碎片
    var reomveFileChunks = function (file) {
        var param = {};
        param['__RequestVerificationToken'] = $.amToken;
        param['fileGuid'] = fileInfo[file.id].fileGuid;
        param['chunks'] = fileInfo[file.id].chunks;
        ayma.httpAsyncPost(top.$.rootUrl + "/AM_SystemModule/Annexes/MergeAnnexesFile", param, function (res) {});
        var $fileItem = $('#am_form_file_queue_list').find('#am_filequeue_' + file.id);
        $fileItem.find('.am-uploader-progress').remove();
        $fileItem.append('<div class="am-msg"><i class="fa fa-exclamation-circle"></i></div>');
    }
    // 删除文件
    var DeleteFile = function (fileId) {
        var param = {};
        param['__RequestVerificationToken'] = $.amToken;
        param['fileId'] = fileInfo[fileId].fileGuid;
        ayma.httpAsyncPost(top.$.rootUrl + "/AM_SystemModule/Annexes/DeleteAnnexesFile", param, function (res) {});
        var file = page.uploader.getFile(fileId);
        if (!!file) {
            page.uploader.removeFile(file);
        }
        delete fileInfo[fileId];
        var $fileItem = $('#am_form_file_queue_list').find('#am_filequeue_' + fileId);
        $fileItem.remove();
        if ($('#am_form_file_queue_list>div').length == 0) {
            $('#am_form_file_queue .am-form-file-queue-bg').show();
        }
            }
    // 下载文件
    var DownFile = function (fileId) {
        ayma.download({ url: top.$.rootUrl + '/AM_SystemModule/Annexes/DownAnnexesFile', param: { fileId: fileId, __RequestVerificationToken: $.amToken }, method: 'POST' });
    }

    // 预览图片
    var PreviewFile = function (fileId) {
        ayma.download({ url: top.$.rootUrl + '/AM_SystemModule/Annexes/DownAnnexesFile', param: { fileId: fileId, __RequestVerificationToken: $.amToken }, method: 'POST' });
    }

    var page = {
        uploader: null,
        init: function () {
            if (!WebUploader.Uploader.support()) {
                alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
                throw new Error('WebUploader does not support the browser you are using.');
            }

            page.uploader = WebUploader.create({
                auto: true,
                swf: top.$.rootUrl + '/Content/webuploader/Uploader.swf',
                // 文件接收服务端。
                server: top.$.rootUrl + "/AM_SystemModule/Annexes/UploadAnnexesFileChunk",
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#am_add_file_btn',
                dnd: '#am_form_file_queue',
                paste: 'document.body',
                disableGlobalDnd:true,
                accept: {
                    extensions: extensions || "gif,jpeg,jpg,png,psd,rar,zip,pdf,doc,docx,ppt,pptx,txt,xls,xlsx"
                },
                multiple: true,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                // 文件分片上传
                chunked: true,
                chunkRetry: 3,
                prepareNextFile: true,
                chunkSize:'1048576',
                // 上传参数
                formData: {
                    __RequestVerificationToken: $.amToken
                }
            });
            page.uploader.on('fileQueued', page.fileQueued);
            page.uploader.on('uploadStart', page.uploadStart);
            page.uploader.on('uploadBeforeSend', page.uploadBeforeSend);
            page.uploader.on('uploadProgress', page.uploadProgress);
            page.uploader.on('uploadSuccess', page.uploadSuccess);
            page.uploader.on('uploadError', page.uploadError);
            page.uploader.on('uploadComplete', page.uploadComplete);
            page.uploader.on('error', page.error);
            

            $('#am_form_file_queue').mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
            
        },
        fileQueued: function (file) {// 文件加载到队列
            fileInfo[file.id] = { name: file.name };
            $('#am_form_file_queue .am-form-file-queue-bg').hide();
            // 添加一条文件记录
            var $item = $('<div class="am-form-file-queue-item" id="am_filequeue_' + file.id + '" ></div>');
            $item.append('<div class="am-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + file.ext + '.png"></div>');
            $item.append('<span class="am-file-name">' + file.name + '(' + ayma.countFileSize(file.size) + ')</span>');

            $('#am_form_file_queue_list').append($item);
        },
        uploadStart: function (file) {
            var $fileItem = $('#am_form_file_queue_list').find('#am_filequeue_' + file.id);
            $fileItem.append('<div class="am-uploader-progress"><div class="am-uploader-progress-bar" style="width:0%;"></div></div>');
        },
        uploadBeforeSend: function (object, data, headers) {
            data.chunk = data.chunk || 0;
            data.chunks = data.chunks || 1;
            fileInfo[data.id].fileGuid = fileInfo[data.id].fileGuid || WebUploader.Base.guid();
            data.fileGuid = fileInfo[data.id].fileGuid;
            fileInfo[data.id].chunks = data.chunks;
        },
        uploadProgress: function (file, percentage) {
            var $fileItem = $('#am_form_file_queue_list').find('#am_filequeue_' + file.id);
            $fileItem.find('.am-uploader-progress-bar').css('width', (percentage * 100 + '%'));
        },
        uploadSuccess: function (file, res) {
            if (res.code == 200) {// 上传成功
                mergeFileChunks(file);
            }
            else {// 上传失败
                reomveFileChunks(file);
            }
        },
        uploadError: function (file, code) {
            reomveFileChunks(file);
        },
        uploadComplete: function (file) {
        },
        error: function (type) {
            switch (type) {
                case 'Q_TYPE_DENIED':
                    ayma.alert.error('当前文件类型不允许上传');
                    break;
            };
        }
    };
    page.init();
}
