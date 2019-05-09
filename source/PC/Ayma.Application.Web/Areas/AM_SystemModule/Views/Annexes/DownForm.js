var keyVaule = request('keyVaule');
var bootstrap = function ($, ayma) {
    "use strict";

    $.SetForm(top.$.rootUrl + '/AM_SystemModule/Annexes/GetAnnexesFileList?folderId=' + keyVaule, function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            $('#am_form_file_queue .am-form-file-queue-bg').hide();
            var item = data[i];
            var $item = $('<div class="am-form-file-queue-item" id="am_filequeue_' + item.F_Id + '" ></div>');
            $item.append('<div class="am-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + item.F_FileType + '.png"></div>');
            $item.append('<span class="am-file-name">' + item.F_FileName + '(' + ayma.countFileSize(item.F_FileSize) + ')</span>');
            $item.append('<div class="am-tool-bar"><i class="fa fa-cloud-download" title="下载"  data-value="' + item.F_Id + '" ></i></div>');

            $item.find('.am-tool-bar .fa-cloud-download').on('click', function () {
                var fileId = $(this).attr('data-value');
                DownFile(fileId);
            });

            $('#am_form_file_queue_list').append($item);
        }
    });
    // 下载文件
    var DownFile = function (fileId) {
        ayma.download({ url: top.$.rootUrl + '/AM_SystemModule/Annexes/DownAnnexesFile', param: { fileId: fileId, __RequestVerificationToken: $.amToken }, method: 'POST' });
    }


    $('#am_form_file_queue').mCustomScrollbar({ // 优化滚动条
        theme: "minimal-dark"
    });
}
