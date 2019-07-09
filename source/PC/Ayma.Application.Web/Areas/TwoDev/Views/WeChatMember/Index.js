/* * 创建人：超级管理员
 * 日  期：2019-05-14 09:53
 * 描  述：微信客户会员基础资料
 */
var refreshGirdData;
var bootstrap = function ($, ayma) {
    "use strict";
    var startTime;
    var endTime;
    var page = {
        init: function () {
            page.initGird();
            page.bind();
            page.doubleClick();
        },
        bind: function () {
            // 时间搜索框
            $('#datesearch').amdate({
                dfdata: [
                    { name: '今天', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00') }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近7天', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00', 'd', -6) }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近1个月', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00', 'm', -1) }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近3个月', begin: function () { return ayma.getDate('yyyy-MM-dd 00:00:00', 'm', -3) }, end: function () { return ayma.getDate('yyyy-MM-dd 23:59:59') } }
                ],
                // 月
                mShow: false,
                premShow: false,
                // 季度
                jShow: false,
                prejShow: false,
                // 年
                ysShow: false,
                yxShow: false,
                preyShow: false,
                yShow: false,
                // 默认
                dfvalue: '1',
                selectfn: function (begin, end) {
                    startTime = begin;
                    endTime = end;
                    page.search();
                }
            });
            $('#multiple_condition_query').MultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 170, 400);
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                ayma.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/TwoDev/WeChatMember/Form',
                    width: 500,
                    height: 340,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/TwoDev/WeChatMember/Form?keyValue=' + keyValue,
                        width: 500,
                        height: 340,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/TwoDev/WeChatMember/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            
        },
        // 初始化列表
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/TwoDev/WeChatMember/GetPageList',
                headData: [
                    {
                        label: "订单数", name: "OrderSum", width: 100, align: "center",
                        
                        formatter: function (cellvalue, options, rowObject) {
                            //if (cellvalue > 0 && cellvalue != 0) {
                            //    for (var i = 0; i <= cellvalue; i++) {
                            //        $(".ordersumclick").click(function () {
                            //            alert(cellvalue);
                            //        })
                            //        break;
                            //    }
                            //}
                            return "<span class='label label-success ordersumclick'>" + cellvalue + "</span>";
                        }
                    },
                    { label: "微信名称", name: "F_Nickname", width: 160, align: "center" },
                    { label: "真实姓名", name: "F_Name", width: 100, align: "center" },
                    { label: "联系电话", name: "F_Phone", width: 100, align: "center" },
                    { label: "性别", name: "F_Sex", width: 80, align: "center" },
                    { label: "语言", name: "F_Language", width: 80, align: "center" },
                    { label: "城市", name: "F_City", width: 80, align: "center" },
                    { label: "省份", name: "F_Province", width: 100, align: "center" },
                    { label: "国家", name: "F_Country", width: 100, align: "center" },
                    { label: "图像地址", name: "F_Headimgurl", width: 160, align: "center" },
                    { label: "创建时间", name: "F_CreateTime", width: 160, align: "center" },
                    { label: "身份证号码", name: "F_IdCard", width: 160, align: "center" },
                ],
                mainId:'F_Id',
                reloadSelected: true,
                isPage: true
            });
        },
        doubleClick:function(){
            $("#girdtable").on("dblclick", function () {
                var WxOpenid = $("#girdtable").jfGridValue("F_Openid");
                if (ayma.checkrow(WxOpenid)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '订单列表',
                        url: top.$.rootUrl + '/TwoDev/WeChatMember/OrderList?OpenId=' + WxOpenid + '&startTime=' + startTime + '&endTime=' + endTime,
                        width: 1000,
                        height: 600,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            }); 
        },
        search: function (param) {
            param = param || {};
            param.StartTime = startTime;
            param.EndTime = endTime;
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
