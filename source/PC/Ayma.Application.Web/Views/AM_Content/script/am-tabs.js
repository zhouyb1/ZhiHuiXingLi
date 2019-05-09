/*
 * 创建人：前端 开发组
 * 日 期：2017.03.16
 * 描 述：tab窗口操作方法
 */
(function ($, ayma) {
    "use strict";
    //初始化菜单和tab页的属性Id
    var iframeIdList = {};

    ayma.frameTab = {
        iframeId: '',
        init: function () {
            ayma.frameTab.bind();
        },
        bind: function () {
            $(".am-frame-tabs-wrap").mCustomScrollbar({ // 优化滚动条
                axis: "x",
                theme: "minimal-dark"
            });
           
        },
        setCurrentIframeId: function (iframeId) {
            ayma.iframeId = iframeId;
        },
        open: function (module, notAllowClosed) {
            var $tabsUl = $('#am_frame_tabs_ul');
            var $frameMain = $('#am_frame_main');

            if (iframeIdList[module.F_ModuleId] == undefined || iframeIdList[module.F_ModuleId] == null) {
                // 隐藏之前的tab和窗口
                if (ayma.frameTab.iframeId != '') {
                    $tabsUl.find('#am_tab_' + ayma.frameTab.iframeId).removeClass('active');
                    $frameMain.find('#am_iframe_' + ayma.frameTab.iframeId).removeClass('active');
                    iframeIdList[ayma.frameTab.iframeId] = 0;
                }
                var parentId = ayma.frameTab.iframeId;
                ayma.frameTab.iframeId = module.F_ModuleId;
                iframeIdList[ayma.frameTab.iframeId] = 1;

                // 打开一个功能模块tab_iframe页面
                var $tabItem = $('<li class="am-frame-tabItem active" id="am_tab_' + module.F_ModuleId + '" parent-id="' + parentId + '"  ><span><i class="' + module.F_Icon + '"></i>&nbsp;' + module.F_FullName + '</span></li>');
                if (!notAllowClosed) {
                    $tabItem.append('<span class="reomve" title="关闭窗口"></span>');
                }
                var $iframe = $('<iframe class="am-frame-iframe active" id="am_iframe_' + module.F_ModuleId + '" frameborder="0" src="' + $.rootUrl + module.F_UrlAddress + '"></iframe>');
                $tabsUl.append($tabItem);
                $frameMain.append($iframe);

                $(".am-frame-tabs-wrap").mCustomScrollbar("update");
                $(".am-frame-tabs-wrap").mCustomScrollbar("scrollTo", $tabItem);

                //绑定一个点击事件
                $tabItem.on('click', function () {
                    var id = $(this).attr('id').replace('am_tab_', '');
                    ayma.frameTab.focus(id);
                });
                $tabItem.find('.reomve').on('click', function () {
                    var id = $(this).parent().attr('id').replace('am_tab_', '');
                    ayma.frameTab.close(id);
                    return false;
                });

                if (!!ayma.frameTab.opencallback) {
                    ayma.frameTab.opencallback();
                }
                if (!notAllowClosed) {
                    $.ajax({
                        url: top.$.rootUrl + "/Home/VisitModule",
                        data: { moduleName: module.F_FullName, moduleUrl: module.F_UrlAddress },
                        type: "post",
                        dataType: "text"
                    });
                }
            }
            else {
                ayma.frameTab.focus(module.F_ModuleId);
            }
        },
        focus: function (moduleId) {
            if (iframeIdList[moduleId] == 0) {
                // 定位焦点tab页
                $('#am_tab_' + ayma.frameTab.iframeId).removeClass('active');
                $('#am_iframe_' + ayma.frameTab.iframeId).removeClass('active');
                iframeIdList[ayma.frameTab.iframeId] = 0;

                $('#am_tab_' + moduleId).addClass('active');
                $('#am_iframe_' + moduleId).addClass('active');
                ayma.frameTab.iframeId = moduleId;
                iframeIdList[moduleId] = 1;

                $(".am-frame-tabs-wrap").mCustomScrollbar("scrollTo", $('#am_tab_' + moduleId));

                if (!!ayma.frameTab.opencallback) {
                    ayma.frameTab.opencallback();
                }
            }
        },
        leaveFocus: function () {
            $('#am_tab_' + ayma.frameTab.iframeId).removeClass('active');
            $('#am_iframe_' + ayma.frameTab.iframeId).removeClass('active');
            iframeIdList[ayma.frameTab.iframeId] = 0;
            ayma.frameTab.iframeId = '';
        },
        close: function (moduleId) {
            delete iframeIdList[moduleId];

            var $this = $('#am_tab_' + moduleId);
            var $prev = $this.prev();// 获取它的上一个节点数据;
            if ($prev.length < 1) {
                $prev = $this.next();
            }
            $this.remove();
            $('#am_iframe_' + moduleId).remove();
            if (moduleId == ayma.frameTab.iframeId && $prev.length > 0) {
                var prevId = $prev.attr('id').replace('am_tab_', '');

                $prev.addClass('active');
                $('#am_iframe_' + prevId).addClass('active');
                ayma.frameTab.iframeId = prevId;
                iframeIdList[prevId] = 1;

                $('.am-frame-tabs').css('width', '10000px');
                $(".am-frame-tabs-wrap").mCustomScrollbar("update");
                $('.am-frame-tabs').css('width', '100%');
                $(".am-frame-tabs-wrap").mCustomScrollbar("scrollTo", $prev);
            }
            else {
                if ($prev.length < 1) {
                    ayma.frameTab.iframeId = "";
                }
                $('.am-frame-tabs').css('width', '10000px');
                $(".am-frame-tabs-wrap").mCustomScrollbar("update");
                $('.am-frame-tabs').css('width', '100%');
            }

            if (!!ayma.frameTab.closecallback) {
                ayma.frameTab.closecallback();
            }
        }
        // 获取当前窗口
        ,currentIframe: function () {
            var ifameId = 'am_iframe_' + ayma.frameTab.iframeId;
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }
        ,parentIframe: function () {
            var ifameId = 'am_iframe_' + top.$('#am_tab_'+ayma.frameTab.iframeId).attr('parent-id');
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }


        , opencallback: false
        , closecallback: false
    };

    ayma.frameTab.init();
})(window.jQuery, top.ayma);
