/* * 
 * 
 * 创建人：框架开发组
 * 日  期：2017-06-21 16:30
 * 描  述：数据权限
 */
var objectId = request("objectId");
var objectType = request("objectType");

var refreshGirdData;
var bootstrap = function ($, ayma) {
    "use strict";

    var interfaceId = '';

    var page = {
        init: function () {
            page.inittree();
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyword: keyword });
            });
            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            if (!!objectId) {
                // 新增
                $('#am_add').on('click', function () {
                    if (!interfaceId) {
                        ayma.alert.warning('请选择左侧接口！');
                        return false;
                    }
                    ayma.layerForm({
                        id: 'form',
                        title: '新增数据权限',
                        url: top.$.rootUrl + '/AM_AuthorizeModule/DataAuthorize/Form?interfaceId=' + interfaceId + '&objectId=' + objectId + '&objectType=' + objectType,
                        width: 700,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                });
            }
            else {
                $('#am_add').hide();
            }
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑数据权限',
                        url: top.$.rootUrl + '/AM_AuthorizeModule/DataAuthorize/Form?interfaceId=' + interfaceId + '&objectId=' + objectId + '&objectType=' + objectType + '&keyValue=' + keyValue,
                        width: 700,
                        height: 400,
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
                            ayma.deleteForm(top.$.rootUrl + '/AM_AuthorizeModule/DataAuthorize/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });

            /*接口管理*/
            $('#am_interface').on('click', function () {
                ayma.layerForm({
                    id: 'InterfaceIndex',
                    title: '接口管理',
                    url: top.$.rootUrl + '/AM_SystemModule/Interface/Index',
                    width: 800,
                    height: 500,
                    maxmin: true,
                    btn: null,
                    end: function () {
                        location.reload();
                    }
                });
            });
        },
        inittree: function () {
            $('#interface_tree').amtree({
                url: top.$.rootUrl + '/AM_SystemModule/Interface/GetTree',
                nodeClick: page.treeNodeClick
            });
        },
        treeNodeClick: function (item) {
            interfaceId = item.id;
            $('#titleinfo').text(item.text);
            page.search();
        },
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/AM_AuthorizeModule/DataAuthorize/GetRelationPageList',
                headData: [
                    { label: "名称", name: "F_Name", width: 160, align: "left" },
                    {
                        label: "用户/角色", name: "F_ObjectId", width: 180, align: "left",
                        formatter: function (cellvalue, row) {
                            return !!row.UserName ? row.UserName : row.RoleName;
                        }
                    },
                    { label: "公式", name: "F_Formula", width: 280, align: "left" },
                    {
                        label: '创建人', name: 'F_CreateUserName', width: 130, align: 'center'
                    },
                    {
                        label: "创建时间", name: "F_CreateDate", width: 100, align: "center",
                        formatter: function (cellvalue) {
                            return ayma.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    }
                ],
                isPage: true,
                reloadSelected: true,
                mainId: 'F_Id'
            });
            page.search();
        },
        search: function (param) {
            param = param || { };
            param.interfaceId = interfaceId;
            param.objectId = objectId;
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
