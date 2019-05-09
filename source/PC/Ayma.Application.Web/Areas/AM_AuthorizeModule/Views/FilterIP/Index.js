/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：IP过滤设置	
 */
var objectId = request('objectId');
var objectType = request('objectType');

var refreshGirdData;
var bootstrap = function ($, ayma) {
    "use strict";
    var visitType = '1';

    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 切换白黑名单
            $('#btn_visitType a').on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $("#btn_visitType a.active").removeClass('active');
                    $this.addClass('active');
                    visitType = $this.attr('data-value');
                    page.search();
                }
            });
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                ayma.layerForm({
                    id: 'form',
                    title: '添加IP地址',
                    url: top.$.rootUrl + '/AM_AuthorizeModule/FilterIP/Form?objectId=' + objectId + '&objectType=' + objectType + "&visitType=" + visitType,
                    width: 400,
                    height: 240,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_FilterIPId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑IP地址',
                        url: top.$.rootUrl + '/AM_AuthorizeModule/FilterIP/Form?keyValue=' + keyValue,
                        width: 400,
                        height: 260,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_FilterIPId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_AuthorizeModule/FilterIP/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/AM_AuthorizeModule/FilterIP/GetList',
                headData: [
                    {
                        label: "访问", name: "F_VisitType", width: 80, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == 0) {
                                return '<span value=' + cellvalue + ' class=\"label label-danger\">拒绝</span>';
                            } else {
                                return '<span value=' + cellvalue + ' class=\"label label-success\">授权</span>';
                            }
                        }
                    },
                    { label: "IP地址(子网掩码)", name: "F_IPLimit", width: 450, align: "left"}
                ]
            });
            page.search();
        },
        search: function () {
            $('#girdtable').jfGridSet('reload', { param: { visitType: visitType, objectId: objectId } });
        }
    };

    refreshGirdData = function () {
        page.search();
    };

    page.init();
}


