/* * 创建人：超级管理员
 * 日  期：2019-05-23 09:32
 * 描  述：运费设置
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
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                ayma.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/TwoDev/CustomerPayInfo/Form',
                    width: 600,
                    height: 400,
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
                        url: top.$.rootUrl + '/TwoDev/CustomerPayInfo/Form?keyValue=' + keyValue,
                        width: 600,
                        height: 400,
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
                            ayma.deleteForm(top.$.rootUrl + '/TwoDev/CustomerPayInfo/DeleteForm', { keyValue: keyValue}, function () {
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
                url: top.$.rootUrl + '/TwoDev/CustomerPayInfo/GetPageList',
                headData: [
                    //{ label: "标示", name: "F_Id", width: 160, align: "left"},
                    //{ label: "机场Id", name: "F_AirfieldId", width: 160, align: "left"},
                    { label: "机场名称", name: "F_AirfieldName", width: 160, align: "left"},
                    { label: "单件费用", name: "F_NumberPice", width: 160, align: "left"},
                    { label: "基础公里数", name: "F_DistanceBaseQty", width: 160, align: "left"},
                    { label: "每公里加价", name: "F_DistancePrice", width: 160, align: "left"},
                    { label: "折扣1", name: "F_Discount1", width: 160, align: "left"},
                    { label: "折扣2", name: "F_Discount2", width: 160, align: "left"},
                    { label: "折扣3", name: "F_Discount3", width: 160, align: "left" },
                    { label: "加急比例", name: "F_UrgentRatio", width: 160, align: "left" },
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
