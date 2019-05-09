/*!
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.08
 * 描 述：登录页面前端脚本
 */
(function ($) {
    "use strict";

    var amPage = {
        init: function () {
            if (window.location.href != top.window.location.href) {
                top.window.location.href = window.location.href;
            }
            var isIE = !!window.ActiveXObject;
            var isIE6 = isIE && !window.XMLHttpRequest;
            if (isIE6) {
                window.location.href = $.rootUrl + "/Error/ErrorBrowser";
            }          
            amPage.bind();
        },
        bind: function () {
            // 回车键
            document.onkeydown = function (e) {
                e = e || window.event;
                if ((e.keyCode || e.which) == 13) {
                    $('#am_login_btn').trigger('click');
                }
            }
            //输入框获取焦点
            $('.am-input-item input').on('focus', function () {
                var $item = $(this).parent();
                $item.addClass('focus');
            }).on('blur', function () {
                var $item = $(this).parent();
                $item.removeClass('focus');
            });
            
            // 点击切换验证码
            $("#am_verifycode_img").click(function () {
                $("#am_verifycode_input").val('');
                $("#am_verifycode_img").attr("src", $.rootUrl + "/Login/VerifyCode?time=" + Math.random());
            });
            var errornum = $('#errornum').val();
            if (errornum >= 3) {
                $('#am_verifycode_input').parent().show();
                $("#am_verifycode_img").trigger('click');
            }

            // 登录按钮事件
            $("#am_login_btn").on('click',function () {
                amPage.login();
            });
        },
        login: function () {
            amPage.tip();

            var $username = $("#am_username"), $password = $("#am_password"), $verifycode = $("#am_verifycode_input");
            var username = $.trim($username.val()), password = $.trim($password.val()), verifycode = $.trim($verifycode.val());

            if (username == "" ) {
                amPage.tip('请输入账户。');
                $username.focus();
                return false;
            }
            if (password == "") {
                amPage.tip('请输入密码。');
                $password.focus();
                return false;
            }

            if ($("#am_verifycode_input").is(":visible") && verifycode == "") {
                amPage.tip('请输入验证码。');
                $verifycode.focus();
                return false;
            }
            password = $.md5(password);
            amPage.logining(true);
            $.ajax({
                url: $.rootUrl + "/Login/CheckLogin",
                headers: { __RequestVerificationToken: $.amToken },
                data: { username: username, password: password, verifycode: verifycode },
                type: "post",
                dataType: "json",
                success: function (res) {
                    if (res.code == 200) {
                        window.location.href = $.rootUrl + '/Home/Index';
                    }
                    else if (res.code == 400) {
                        amPage.logining(false);
                        amPage.tip(res.info, true);
                        $('#errornum').val(res.data);
                        if (res.data >= 3) {
                            $('#am_verifycode_input').parent().show();
                            $("#am_verifycode_img").trigger('click');
                        }
                    }
                    else if (res.code == 500) {
                        console.error(res.info);
                        amPage.logining(false);
                        amPage.tip('服务端异常，请联系管理员', true);
                    }
                }
            });
        },
        logining: function (isShow) {
            if (isShow) {
                $('input').attr('disabled', 'disabled');
                $("#am_login_btn").addClass('active').attr('disabled', 'disabled').find('span').hide();
            }
            else {
                $('input').removeAttr('disabled');
                $("#am_login_btn").removeClass('active').removeAttr('disabled').find('span').show();
            }
        },
        tip: function (msg) {
            var $tip = $('#am_tips');
            $tip.hide();
            if (!!msg) {
                $tip.html('<b></b>' + msg);
                $tip.show();
            }            
        }
    };
    $(function () {
        amPage.init();
    });
})(window.jQuery)