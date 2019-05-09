/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：预览排版	
 */
var formId = request('formId');

var bootstrap = function ($, ayma) {
    "use strict";
    var tabs = top[formId].tabList[0].ChildNodes;

    function getFontHtml(verify) {
        var res = "";
        switch (verify) {
            case "NotNull":
            case "Num":
            case "Email":
            case "EnglishStr":
            case "Phone":
            case "Fax":
            case "Mobile":
            case "MobileOrPhone":
            case "Uri":
                res = '<font face="宋体">*</font>';
                break;
        }
        return res;
    }
    var page = {
        init: function () {
            var iLen = tabs.length;
            var $ul;
            var $container;
            if (iLen > 1) {
                var html = '<div class="am-form-tabs" id="am_form_tabs">';
                html += '<ul class="nav nav-tabs"></ul></div>';
                html += '<div class="tab-content am-tab-content" id="am_tab_content">';
                html += '</div>';
                $('body').append(html);
                $('#am_form_tabs').FormTab();
                $ul = $('#am_form_tabs ul');
                $container = $('#am_tab_content');
            }
            else {
                $container = $('body');
            }

            for (var i = 0; i < iLen; i++) {
                var $content = $('<div class="am-form-wrap"></div>');
                $container.append($content);
                for (var j = 0, jLen = tabs[i].componts.length; j < jLen; j++) {
                    var compont = tabs[i].componts[j];
                    if (compont.type != 'gridtable') {
                        var $row = $('<div class="col-xs-' + (12 / parseInt(compont.proportion)) + ' am-form-item" ></div>');
                        var $title = $(' <div class="am-form-item-title">' + compont.fieldName + getFontHtml(compont.validator) + '</div>');
                        $row.append($title);
                        $row.append('<div style="position:relative;width:100%;height:28px;border:solid 1px #ccc;"  ></div>');
                        $content.append($row);
                    }
                    else {
                        var $row = $('<div class="col-xs-' + (12 / parseInt(compont.proportion)) + ' am-form-item" ></div>');                   
                        $row.addClass('am-form-item-grid').append('<div style="position:relative;width:100%;height:400px;border:solid 1px #ccc;"  ></div>');
                        $content.append($row);
                    }
                }


                if (iLen > 1) {// 如果大于一个选项卡，需要添加选项卡，否则不需要
                    $ul.append('<li><a data-value="' + tabs[i].id + '">' + tabs[i].text + '</a></li>');
                    $content.addClass('tab-pane').attr('id', tabs[i].id);
                    if (i == 0) {
                        $ul.find('li').trigger('click');
                    }
                }
            }

            $('.am-form-wrap').mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
        }
    };
    page.init();
}