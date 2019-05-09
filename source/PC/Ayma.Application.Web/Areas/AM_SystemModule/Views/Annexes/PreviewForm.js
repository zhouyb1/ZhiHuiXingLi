var keyVaule = request('keyVaule');
var bootstrap = function ($, ayma) {
    "use strict";

    $.SetForm(top.$.rootUrl + '/AM_SystemModule/Annexes/GetAnnexesFileList?folderId=' + keyVaule, function (data) {
        var viewerList = $("#viewerList");
        for (var i = 0, l = data.length; i < l; i++) {
            var item = data[i];
            var imgtypes = "jpg,jpeg,gif,png,bmp";
            if (imgtypes.indexOf(item.F_FileType) != -1) {
                viewerList.append("<li><img width='100' height='120' src='" + top.$.rootUrl + "/AM_SystemModule/Annexes/ReadImage?fileId=" + item.F_Id + "' title='" + item.F_FileName + "' /></li>");
            }
        }
        viewerList.viewer();
    });
}
