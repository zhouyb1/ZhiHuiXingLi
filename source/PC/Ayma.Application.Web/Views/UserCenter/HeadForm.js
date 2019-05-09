

/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.11
 * 描 述：个人中心-我的头像	
 */
var loaddfimg;
var baseinfo;
var bootstrap = function ($, ayma) {
    "use strict";
    var getBaseinfo = function (callback) {
        baseinfo = ayma.frameTab.currentIframe().baseinfo;
        if (!baseinfo) {
            setTimeout(function () { getBaseinfo(callback) }, 100);
        }
        else {
            callback();
        }
    };


    var page = {
        init: function () {
            getBaseinfo(function () {
                page.initData();
                page.bind();
            });
        },
        bind: function () {
            function uploadImg() {
                var f = document.getElementById('uploadFile').files[0]
                var src = window.URL.createObjectURL(f);
                document.getElementById('uploadPreview').src = src;
            };

            $('#uploadFile').on('change', uploadImg);
            
            $('#am_save_btn').on('click', function () {
                var f = document.getElementById('uploadFile').files[0];
                if (!!f)
                {
                    ayma.loading(true, '正在保存...');
                    $.ajaxFileUpload({
                        url: "/UserCenter/UploadFile",
                        secureuri: false,
                        fileElementId: 'uploadFile',
                        dataType: 'json',
                        success: function (data) {
                            ayma.loading(false);
                            $('#uploadFile').on('change', uploadImg);
                            if (data.code == 200) {
                                ayma.alert.success('保存成功');
                            }
                        }
                    });
                }
            });
        },
        initData: function () {
            $('.file').prepend('<img src="' + top.$.rootUrl + baseinfo.headIcon + '" id="uploadPreview" onerror="loaddfimg()" >');
            var headimg;
            if (baseinfo.gender != 0) {
                headimg = top.$.rootUrl + '/Content/images/head/on-boy.jpg';
            }
            else {
                headimg = top.$.rootUrl + '/Content/images/head/on-girl.jpg';
            }

            loaddfimg = function () {
                document.getElementById('uploadPreview').src = headimg;
            }
        }
    };
    page.init();
}