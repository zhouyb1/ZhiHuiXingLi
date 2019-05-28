/* * 创建人：超级管理员
 * 日  期：2019-05-13 14:01
 * 描  述：航班号记录
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
                    url: top.$.rootUrl + '/TwoDev/FlightNumberRecord/Form',
                    width: 500,
                    height: 370,
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
                        url: top.$.rootUrl + '/TwoDev/FlightNumberRecord/Form?keyValue=' + keyValue,
                        width: 500,
                        height: 370,
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
                            ayma.deleteForm(top.$.rootUrl + '/TwoDev/FlightNumberRecord/DeleteForm', { keyValue: keyValue}, function () {
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
                url: top.$.rootUrl + '/TwoDev/FlightNumberRecord/GetPageList',
                headData: [
                    //{ label: "标示", name: "F_Id", width: 160, align: "left"},
                    //{ label: "机场Id", name: "F_AirfieldId", width: 160, align: "left"},
                    { label: "机场名称", name: "F_AirfieldName", width: 160, align: "left", sort: true },
                    { label: "传送带号", name: "F_ConveyorNumber", width: 160, align: "left", sort: true },
                    { label: "起飞航站楼", name: "F_AirfieldFloorBegin", width: 160, align: "left", sort: true },
                    { label: "到达航站楼", name: "F_AirfieldFloor", width: 160, align: "left", sort: true },
                    { label: "航空公司", name: "F_FlightCompany", width: 160, align: "left", sort: true },
                    { label: "航班号", name: "F_FlightNumber", width: 160, align: "left", sort: true },
                    { label: "起飞城市", name: "AddressBegin", width: 160, align: "left", sort: true },
                    { label: "到达城市", name: "AddressEnd", width: 160, align: "left", sort: true },
                    { label: "起飞机场", name: "F_AirfieldBegin", width: 160, align: "left", sort: true },
                    { label: "到达机场", name: "F_AirfieldEnd", width: 160, align: "left", sort: true },
                    { label: "起飞时间", name: "DateTimeBegin", width: 160, align: "left", sort: true },
                    { label: "计划到达时间", name: "DateTimeEnd", width: 160, align: "left", sort: true },
                    { label: "实际到达时间", name: "DateTimeEndReality", width: 160, align: "left", sort: true },
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
