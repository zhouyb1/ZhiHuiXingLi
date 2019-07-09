/* * 创建人：超级管理员
 * 日  期：2019-05-13 16:02
 * 描  述：分拣员信息管理
 */
var refreshGirdData;
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            $('#multiple_condition_query').MultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 220, 400);
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                ayma.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/TwoDev/SorterMessage/Form',
                    width: 800,
                    height: 500,
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
                        url: top.$.rootUrl + '/TwoDev/SorterMessage/Form?keyValue=' + keyValue,
                        width: 800,
                        height: 500,
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
                            ayma.deleteForm(top.$.rootUrl + '/TwoDev/SorterMessage/DeleteForm', { keyValue: keyValue}, function () {
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
                url: top.$.rootUrl + '/TwoDev/SorterMessage/GetPageList',
                headData: [
                    //{ label: "标示", name: "F_Id", width: 160, align: "left"},
                    //{ label: "微信OpenId", name: "F_Openid", width: 160, align: "left"},
                    { label: "微信名称", name: "F_Nickname", width: 160, align: "center" },
                    { label: "真实姓名", name: "F_Name", width: 100, align: "center" },
                    { label: "联系电话", name: "F_Phone", width: 100, align: "center" },
                    { label: "性别", name: "F_Sex", width: 80, align: "center" },
                    { label: "语言", name: "F_Language", width: 80, align: "center" },
                    { label: "城市", name: "F_City", width: 80, align: "center" },
                    { label: "省份", name: "F_Province", width: 80, align: "center" },
                    { label: "国家", name: "F_Country", width: 80, align: "center" },
                    { label: "图像地址", name: "F_Headimgurl", width: 160, align: "center" },
                    { label: "创建时间", name: "F_CreateTime", width: 160, align: "center" },
                    { label: "身份证号码", name: "F_IdCard", width: 160, align: "center" },
                    { label: "工号", name: "F_Code", width: 100, align: "center" },
                    { label: "密码", name: "F_PassWord", width: 100, align: "center" },
                    { label: "等级", name: "F_Grade", width: 100, align: "center" },
                    { label: "分数", name: "F_Fraction", width: 100, align: "center" },
                ],
                mainId:'F_Id',
                reloadSelected: true,
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
