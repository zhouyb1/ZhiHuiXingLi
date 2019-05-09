﻿/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：流程模板选择
 */
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var categoryId = '';
    var keyword = '';
    var schemeList = [];


    var render = function () {
        var $warp = $('<div></div>');
        for (var i = 0, l = schemeList.length; i < l; i++) {
            var item = schemeList[i];
            var ponit;

            if (categoryId != '') {
                if (item.F_Category == categoryId) {
                    ponit = item;
                }
            }
            else {
                ponit = item;
            }

            if (!!ponit) {
                if (keyword != '') {
                    if (ponit.F_Name.indexOf(keyword) == -1 && ponit.F_Code.indexOf(keyword) == -1) {
                        ponit = null;
                    }
                }
            }

            if (!!ponit) {// 刷新流程模板数据
                var _cardbox = "";
                _cardbox += '<div class="card-box" data-value="' + item.F_Code + '" >';
                _cardbox += '    <div class="card-box-img">';
                _cardbox += '        <img src="' + top.$.rootUrl + '/Content/images/filetype/Scheme.png" />';
                _cardbox += '    </div>';
                _cardbox += '    <div class="card-box-content">';
                _cardbox += '        <p>名称：' + item.F_Name + '</p>';
                _cardbox += '        <p>编号：' + item.F_Code + '</p>';
                _cardbox += '    </div>';
                _cardbox += '</div>';
                var $cardbox = $(_cardbox);
                $cardbox[0].shceme = item;
                $warp.append($cardbox);
            }
        }
        $warp.find('.card-box').on('click', function () {
            var $this = $(this);
            
            if ($this.hasClass('active')) {
                $this.removeClass('active');
            }
            else {
                $warp.find('.card-box.active').removeClass('active');
                $this.addClass('active');
            }
        });

        $('#main_list').html($warp);
    }

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 加载自定义流程列表
            ayma.httpAsync('GET', top.$.rootUrl + '/AM_WorkFlowModule/WfScheme/GetCustmerSchemeInfoList', {}, function (data) {
                schemeList = data;
                render();
            });

            // 左侧数据加载
            $('#am_left_tree').amtree({
                url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetDetailTree',
                param: { itemCode: 'FlowSort' },
                nodeClick: function (item) {
                    categoryId = item.value;
                    render();
                }
            });

            $("#txt_keyword").keydown(function (event) {
                if (event.keyCode == 13) {
                    keyword = $(this).val();
                    render();
                }
            });
            // 滚动条
            $('#main_list_warp').mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
        }
    };
    // 保存数据
    acceptClick = function () {
        var $selected = $('#main_list').find('.card-box.active');
        var shcemeCode = $selected.attr('data-value');
        if (!!shcemeCode) {
            var id = $selected[0].shceme.F_Id;
            // 发起流程
            ayma.frameTab.open({ F_ModuleId: id, F_Icon: 'fa magic', F_FullName: '发起流程【' + $selected[0].shceme.F_Name + '】', F_UrlAddress:  '/AM_WorkFlowModule/WfMyTask/CustmerWorkFlowForm?shcemeCode=' + shcemeCode + '&tabIframeId=' + id + '&type=0' });
            return true;
        }
        else {
            ayma.alert.error('请选择流程模板');
            return false;
        }
    };
    page.init();
}