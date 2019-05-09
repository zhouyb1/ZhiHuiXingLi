/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：即时聊天-》系统内部通讯
 */
/*连接服务端操作*/
(function ($, ayma) {
    "use strict";
    var userinfo;
    var imChat;
    var isLoaded = 0;

    $.imServer = {
        init: function () {
            /* 首先需要获取用户的登录信息 */
            $.imServer.getUserInfo(function () {
                // 注册服务端方法
                //$.imServer.registerServer();

                // 初始化客户端界面代码
                //$.amIM.init();
                // 连接服务端
                //$.imServer.connect();
            });
        }

        // 连接服务端
        , connect: function () {
            $.ajax({
                url: userinfo.imUrl + "/hubs",
                type: "get",
                dataType: "text",
                success: function (data) {
                    eval(data);
                    console.log(userinfo);
                    //Set the hubs URL for the connection
                    $.connection.hub.url = userinfo.imUrl;
                    $.connection.hub.qs = { "userId": userinfo.userId };
                    // Declare a proxy to reference the hub.
                    imChat = $.connection.ChatsHub;
                    $.imServer.registerClient();
                    // 连接成功后注册服务器方法
                    $.connection.hub.start().done(function () {
                        $.imServer.afterSuccess();
                    });
                    //断开连接后
                    $.connection.hub.disconnected(function () {
                        $.imServer.disconnected();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    isLoaded = -1;
                },
            });
        }
        // 连接成功后执行方法
        , afterSuccess: function () {
            isLoaded = 1;
        }
        // 断开连接后执行
        , disconnected: function () {

        }

        // 注册客户端方法
        , registerClient: function () {
            if (imChat) {
                //接收消息
                imChat.client.revMsg = function (formUser, msg, dateTime) {

                }
            }
        }
        // 注册服务端方法
        , registerServer: function () {
            // 获取
            $.imServer.getUserList = function (departmentId, callback) {
                console.log(isLoaded);
                if (isLoaded == 1) {
                    imChat.server.getUserList(departmentId).done(function (list) {
                        if (!!callback) {
                            callback(list);
                        }
                    });
                }
                else if (isLoaded == 0) {
                    setTimeout(function () {
                        $.imServer.getUserList(departmentId, callback);
                    }, 500);
                }
            };
        }

        // 获取用户登录信息
        , getUserInfo: function (callback) {
            userinfo = ayma.clientdata.get(['userinfo']);
            if (!!userinfo) {
                callback();
            }
            else {
                setTimeout(function () {
                    $.imServer.getUserInfo(callback);
                }, 100);
            }
        }
    };
})(jQuery, top.ayma);

/*网页端操作*/
(function ($, ayma) {
    "use strict";
    var userinfo;
    var isWindowOpen = false;

    $.amIM = {
        init: function () {
            $._amIM.render();

            
        },

        // 添加一条信息
        // id:消息主键;name:消息名称;msg:消息内容;img:消息头像
        addMsgTolist: function (id, name, msg, img) {
            var $list = $('#ayma_im_last_list');
            var $item = $list.find('[data-value="' + id + '"]');
            if ($item.length > 0) {


            }
            else {
                var _html = '<li data-value="' + id + '">';
                _html += '<img src="' + top.$.rootUrl + '/Content/images/aymaim/' + img + '">';
                _html += '';
                _html += '<div class="am-im-onemsg">';
                _html += '<p class="am-im-onemsg-title">' + name + '</p>';
                _html += '<p class="am-im-onemsg-content">' + msg + '</p>';
                _html += '</div></li>';
            }
        }
        // 更新某一个聊天对象消息数量
        , updateMsgNum: function (id, num) {

        }
    };

    $._amIM = {
        render: function () {
            var _html = '<div class="am-im-icon"  ><a href="javascript:;" id="am_imicon_btn" title="企业内部通讯"><i class="fa fa-commenting"></i><span class="label label-success"></span></a></div>';
            _html += '<div class="am-im-wrap" >';
            /*联系人列表*/
            _html += '<div class="am-im-user-list" style="display:none;" id="ayma_im_list" >';
            _html += '<div class="am-im-header">企业内部通讯<div class="am-im-close"><a id="ayma_im_close" href="javascript:;">×</a></div></div>';
            _html += '<div class="am-im-search"><input type="text" placeholder="搜索：同事名称、讨论组名称"><i class="fa fa-search"></i></div>';

            _html += '<div class="am-im-body">';

            _html += '<div class="am-im-body-nav" id="ayma_im_list_nav" ><ul>';
            _html += '<li class="active nav_tab" data-value="last"><a title="最近回话"><i class="fa fa-comment"></i></a></li>';
            _html += '<li class="nav_tab" data-value="user"><a title="联系人"><i class="fa fa-user"></i></a></li>';
            _html += '<li class="nav_tab" data-value="group"><a title="讨论组"><i class="fa fa-users" style="font-size: 20px;"></i></a></li>';
            _html += '</ul></div>';

            _html += '<div class="am-im-body-list" id="ayma_im_body_list">';

            _html += '<div id="ayma_im_last_list" class="ayma_im_body_ul active" ></div>';
            _html += '<div id="ayma_im_user_list" class="ayma_im_body_user" style="display:none;" ><div class="am-top-department" > <div id="im_department"></div> </div><div class="am-userlist-content" id="am_userlist_content" > <ul id="am_userlist" class="am-im-chatlist"></ul></div></div>';
            _html += '<div id="ayma_im_group_list" class="ayma_im_body_ul" style="display:none;" ></div>';

            _html += '</div>';

            _html += '</div>';//<div class="am-im-body">
            _html += '</div>';//<div class="am-im-user-list">

            /*聊天窗口*/
            _html += '<div class="am-im-window" style="display:none;" id="ayma_im_window">';

            _html += '<div class="am-im-window-header"><span class="text"></span><div class="close"><a href="javascript:;">×</a></div></div>';

            _html += '<div class="am-im-window-chat">';
            _html += '<div class="am-im-window-content">';
            _html += '</div></div>';

            _html += '<div class="am-im-window-tool"><a class="am-im-window-tool-chatlogbtn "><i class="fa fa-clock-o"></i>沟通记录</a></div>';//<a class="am-im-window-tool-face " title="选择表情"><i class="fa fa-meh-o"></i></a>
            _html += '<div class="am-im-window-send"><textarea autofocus placeholder="按回车发送消息,shift+回车换行"></textarea></div>'

            _html += '</div>';

            _html += '</div>';

            $('body').append(_html);



            /*注册事件*/
            // 外部触发按钮
            $('#am_imicon_btn').on('click', function () {
                var $im = $('#ayma_im_list');
                if ($im.is(':hidden')) {
                    $im.show();
                }
            });

            // 关闭按钮
            $('#ayma_im_close').on('click', function () {
                var $im = $('#ayma_im_list');
                var $im_message_window = $('#ayma_im_window');
                $im.hide();
                $im_message_window.hide();
            });

            // 联系人列表切换
            $('#ayma_im_list_nav li').on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    var $parent = $this.parent();
                    $parent.find('.active').removeClass('active');
                    $this.addClass('active');

                    var id = '#ayma_im_' + $this.attr('data-value') + '_list';
                    var $list = $(id);

                    $('#ayma_im_body_list>div.active').removeClass('active').hide();
                    $list.addClass('active').show();
                }
            });
            // 打开聊天窗口
            $('#ayma_im_body_list').delegate(".am-user-item", "click", function (e) {
                var $this = $(this);
                var userId = $this.attr('data-value');
                var userName = $this.find('a').text();
                console.log(userId);

                $._amIM.openWindow(userId, userName);

               
            });
            // 发送消息
            var $textarea = $('#ayma_im_window .am-im-window-send');
            $textarea.delegate("textarea", 'keypress', function (e) {
                var keyCode = e.keyCode || e.which || e.charCode;
                var shiftKey = e.shiftKey || e.metaKey;
                if (shiftKey && keyCode == "13") {
                }
                else if (keyCode == "13" && isWindowOpen) {
                    var sendText = $(this).val();
                    if (sendText) {
                        $._amIM.addRightMsg(userinfo.realName, ayma.getDate('yyyy-MM-dd hh:mm'), $._amIM.getUserImg(), sendText);
                    }
                    $('#ayma_im_window .am-im-window-send').html('<textarea autofocus placeholder="按回车发送消息,shift+回车换行"></textarea>');
                    setTimeout(function () {
                        $('#ayma_im_window .am-im-window-send>textarea').focus();
                    }, 100);
                    e.preventDefault();
                    return false;
                }
            });


            // 加载部门
            $('#im_department').select({
                type: 'tree',
                // 展开最大高度
                maxHeight: 343,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/AM_OrganizationModule/Department/GetTree',
                // 访问数据接口参数
                param: { companyId: '', parentId: '' },
                placeholder: '请选择部门',
                select: function (department) {
                    var $list = $('#am_userlist');
                    $list.html("");
                    // 获取本部门员工信息列表，如果为空就隐藏
                    $.imServer.getUserList(department.value, function (list) {
                        $.each(list, function (id, item) {
                            $list.append($._amIM.getUserHtml(item));
                        });
                    });
                }
            });
            userinfo = ayma.clientdata.get(['userinfo']);
            $('#im_department').selectSet(userinfo.departmentId);

            // 优化滚动条
            $('#am_userlist_content').mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
            $('#ayma_im_window .am-im-window-chat').mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
            //$('#ayma_im_body_list').mCustomScrollbar({ // 优化滚动条
            //    theme: "minimal-dark"
            //});
        }
        , initData: function () { // 初始化数据
            
        }
        , getUserHtml: function (userItem) {
            if (userItem.F_UserId != userinfo.userId) {
                var _li = '';
                if (ayma.isExistImg(top.$.rootUrl + userItem.F_HeadIcon)) {
                    headimg = top.$.rootUrl + userItem.F_HeadIcon;
                }
                else if (userItem.F_Gender != 0) {
                    headimg = top.$.rootUrl + '/Content/images/head/on-boy.jpg';
                }
                else {
                    headimg = top.$.rootUrl + '/Content/images/head/on-girl.jpg';
                }
                _li = '<li class="am-user-item" data-value="' + userItem.F_UserId + '"  ><img class="headimg" src="' + headimg + '"><a>' + userItem.F_RealName + '</a></li>';
                return _li;
            }
        },
        getUserImg: function () {
            var headimg = '';
            if (ayma.isExistImg(top.$.rootUrl + userinfo.headIcon)) {
                headimg = top.$.rootUrl + userinfo.headIcon;
            }
            else if (userinfo.gender != 0) {
                headimg = top.$.rootUrl + '/Content/images/head/on-boy.jpg';
            }
            else {
                headimg = top.$.rootUrl + '/Content/images/head/on-girl.jpg';
            }
            return headimg;

        },
        openWindow: function (userId, userName) {
            var $window = $('#ayma_im_window');
            $window.attr('data-value', userId);
            $window.find('.am-im-window-header>.text').text(userName);
            $('#ayma_im_window .am-im-window-content').html("");
            $window.show();
            isWindowOpen = true;
        },
        addRightMsg: function (userName, datatime, img, msg) {
            var html = '<div class="right"><div class="author-name">';
            html += '<small class="chat-date">' + datatime + '</small>';
            html += '<small class="chat-text">' + userName + '</small>';
            html += '<img src="' + img + '" />';
            html += '</div>';
            html += '<div class="chat-message"><em></em>' + msg + '</div></div>';
            $('#ayma_im_window .am-im-window-content').append(html);
            $("#ayma_im_window .am-im-window-chat").mCustomScrollbar("scrollTo", 'bottom');
        }
    }
})(jQuery, top.ayma);
