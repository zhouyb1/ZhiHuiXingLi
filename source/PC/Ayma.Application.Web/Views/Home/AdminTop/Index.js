/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.16
 * 描 述：顶部菜单皮肤	
 */
var bootstrap = function ($, ayma) {
    "use strict";
    // 菜单操作
    var meuns = {
        init: function () {
            this.load();
            this.bind();
        },
        load: function () {
            var modulesTree = ayma.clientdata.get(['modulesTree']);
            // 第一级菜单
            var parentId = '0';
            var modules = modulesTree[parentId] || [];
            var $firstmenus = $('<ul class="am-first-menu-list"></ul>');
            for (var i = 0, l = modules.length; i < l; i++) {
                var item = modules[i];
                if (item.F_IsMenu == 1) {
                    var $firstMenuItem = $('<li></li>');
                    if (!!item.F_Description) {
                        $firstMenuItem.attr('title', item.F_Description);
                    }
                    var menuItemHtml = '<a id="' + item.F_ModuleId + '" href="javascript:void(0);" class="am-menu-item">';
                    menuItemHtml += '<i class="' + item.F_Icon + ' am-menu-item-icon"></i>';
                    menuItemHtml += '<span class="am-menu-item-text">' + item.F_FullName + '</span>';
                    menuItemHtml += '</a>';
                    $firstMenuItem.append(menuItemHtml);
                    // 第二级菜单
                    var secondModules = modulesTree[item.F_ModuleId] || [];
                    var $secondMenus = $('<ul class="am-second-menu-list"></ul>');
                    var secondMenuHad = false;
                    for (var j = 0, sl = secondModules.length ; j < sl; j++) {
                        var secondItem = secondModules[j];
                        if (secondItem.F_IsMenu == 1) {
                            secondMenuHad = true;
                            var $secondMenuItem = $('<li></li>');
                            if (!!secondItem.F_Description) {
                                $secondMenuItem.attr('title', secondItem.F_Description);
                            }
                            var secondItemHtml = '<a id="' + secondItem.F_ModuleId + '" href="javascript:void(0);" class="am-menu-item" >';
                            secondItemHtml += '<i class="' + secondItem.F_Icon + ' am-menu-item-icon"></i>';
                            secondItemHtml += '<span class="am-menu-item-text">' + secondItem.F_FullName + '</span>';
                            secondItemHtml += '</a>';

                            $secondMenuItem.append(secondItemHtml);
                            // 第三级菜单
                            var threeModules = modulesTree[secondItem.F_ModuleId] || [];
                            var $threeMenus = $('<ul class="am-three-menu-list"></ul>');
                            var threeMenuHad = false;
                            for (var m = 0, tl = threeModules.length ; m < tl; m++) {
                                var threeItem = threeModules[m];
                                if (threeItem.F_IsMenu == 1) {
                                    threeMenuHad = true;
                                    var $threeMenuItem = $('<li></li>');
                                    $threeMenuItem.attr('title', threeItem.F_FullName);
                                    var threeItemHtml = '<a id="' + threeItem.F_ModuleId + '" href="javascript:void(0);" class="am-menu-item" >';
                                    threeItemHtml += '<i class="' + threeItem.F_Icon + ' am-menu-item-icon"></i>';
                                    threeItemHtml += '<span class="am-menu-item-text">' + threeItem.F_FullName + '</span>';
                                    threeItemHtml += '</a>';
                                    $threeMenuItem.append(threeItemHtml);

                                    // 第四级菜单
                                    var fourModules = modulesTree[threeItem.F_ModuleId] || [];
                                    var $fourMenus = $('<ul class="am-four-menu-list"></ul>');
                                    var fourMenuHad = false;
                                    for (var k = 0; k < fourModules.length; k++) {
                                        var fourItem = fourModules[k];
                                        if (fourItem.F_IsMenu == 1) {
                                            fourMenuHad = true;
                                            var $fourMenuItem = $('<li></li>');
                                            $fourMenuItem.attr('title', fourItem.F_FullName);
                                            var fourItemHtml = '<a id="' + fourItem.F_ModuleId + '" href="javascript:void(0);" class="am-menu-item" >';
                                            fourItemHtml += '<i class="' + fourItem.F_Icon + ' am-menu-item-icon"></i>';
                                            fourItemHtml += '<span class="am-menu-item-text">' + fourItem.F_FullName + '</span>';
                                            fourItemHtml += '</a>';
                                            $fourMenuItem.append(fourItemHtml);
                                            $fourMenus.append($fourMenuItem);
                                        }
                                    }
                                    if (fourMenuHad) {
                                        $threeMenuItem.addClass('am-meun-had');
                                        $threeMenuItem.find('a').addClass('open').append('<span class="am-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
                                        $threeMenuItem.append($fourMenus);
                                    }


                                    $threeMenus.append($threeMenuItem);
                                }
                            }
                            if (threeMenuHad) {
                                $secondMenuItem.addClass('am-meun-had');
                                $secondMenuItem.find('a').addClass('open').append('<span class="am-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
                                $secondMenuItem.append($threeMenus);
                            }
                            $secondMenus.append($secondMenuItem);
                        }
                    }
                    if (secondMenuHad) {
                        $secondMenus.attr('data-value', item.F_ModuleId);
                        $('#am_second_menu_wrap').append($secondMenus);
                    }
                    $firstmenus.append($firstMenuItem);
                }
            }
            $('#am_frame_menu').html($firstmenus);
        },
        bind: function () {
            $("#am_frame_menu").mCustomScrollbar({ // 优化滚动条
                axis: "x",
                theme: "minimal-dark"
            });

            $("#am_second_menu_wrap").mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
            // 添加点击事件
            $('#am_frame_menu .am-menu-item').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = ayma.clientdata.get(['modulesMap', id]);
                switch (_module.F_Target) {
                    case 'iframe':// 窗口
                        if (ayma.validator.isNotNull(_module.F_UrlAddress).code) {
                            ayma.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                    case 'expand':
                        if (!$obj.hasClass('active')) {
                            $('#am_frame_menu .am-menu-item.active').removeClass('active');
                            $obj.addClass('active');
                            var $subMenu = $('#am_second_menu_wrap');
                            $subMenu.find('.am-second-menu-list').hide();
                            $subMenu.find('.am-second-menu-list[data-value="' + id + '"]').show();
                        }
                        break;
                }
            });

            // 添加点击事件
            $('#am_second_menu_wrap .am-menu-item').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = ayma.clientdata.get(['modulesMap', id]);
                switch (_module.F_Target) {
                    case 'iframe':// 窗口
                        if (ayma.validator.isNotNull(_module.F_UrlAddress).code) {
                            ayma.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                    case 'expand':// 打开子菜单
                        var $ul = $obj.next();
                        if ($ul.is(':visible')) {
                            $ul.slideUp(500, function () {
                                $obj.removeClass('open');
                            });
                        }
                        else {
                            $ul.slideDown(300, function () {
                                $obj.addClass('open');
                            });
                        }
                        break;
                }
            });

            $('.am-first-menu-list>li').eq(0).find('a').trigger('click');

            $('#am_frame_menu_btn').on('click', function () {
                var $body = $('body');
                if ($body.hasClass('am-menu-closed')) {
                    $body.removeClass('am-menu-closed');
                }
                else {
                    $body.addClass('am-menu-closed');
                }
            });


            $('#am_second_menu_wrap a').hover(function () {
                if ($('body').hasClass('am-menu-closed')) {
                    var id = $(this).attr('id');
                    var text = $('#' + id + '>span').text();
                    layer.tips(text, $(this));
                }
            }, function () {
                if ($('body').hasClass('am-menu-closed')) {
                    layer.closeAll('tips');
                }
            });

        }
    };

    meuns.init();
};