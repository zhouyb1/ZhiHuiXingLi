/*
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：人员管理	
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, ayma) {
    "use strict";
    var companyId = '';
    var departmentId = '';

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

            // 部门选择
            $('#department_select').select({
                type: 'tree',
                placeholder:'请选择部门',
                // 展开最大高度
                maxHeight: 300,
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {
                    if (item.value == '-1') {
                        departmentId = '';
                    }
                    else {
                        departmentId = item.value;
                    }
                    page.search();
                }
            });

            // 刷新
            $('#am_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#am_add').on('click', function () {
                if (!companyId) {
                    ayma.alert.warning('请选择公司！');
                    return false;
                }
                selectedRow = null;
                ayma.layerForm({
                    id: 'form',
                    title: '添加账号',
                    url: top.$.rootUrl + '/AM_OrganizationModule/User/Form?companyId=' + companyId,
                    width: 750,
                    height: 450,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#am_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'form',
                        title: '编辑账号',
                        url: top.$.rootUrl + '/AM_OrganizationModule/User/Form?companyId=' + companyId,
                        width: 750,
                        height: 450,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_OrganizationModule/User/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 用户数据导出
            $('#am_export').on('click', function () {
                location.href = top.$.rootUrl + "/AM_OrganizationModule/User/ExportUserList";
            });
            // 启用
            $('#am_enabled').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认要【启用】账号！', function (res) {
                        if (res) {
                            ayma.postForm(top.$.rootUrl + '/AM_OrganizationModule/User/UpdateState', { keyValue: keyValue, state: 1 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 禁用
            $('#am_disabled').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认要【禁用】账号！', function (res) {
                        if (res) {
                            ayma.postForm(top.$.rootUrl + '/AM_OrganizationModule/User/UpdateState', { keyValue: keyValue, state: 0 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 重置账号
            $('#am_resetpassword').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认要【重置密码】！', function (res) {
                        if (res) {
                            ayma.postForm(top.$.rootUrl + '/AM_OrganizationModule/User/ResetPassword', { keyValue: keyValue}, function () {
                            });
                        }
                    });
                }
            });
            // 功能授权
            $('#am_authorize').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'authorizeForm',
                        title: '功能授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/AM_AuthorizeModule/Authorize/Form?objectId=' + keyValue + '&objectType=2',
                        width: 550,
                        height: 690,
                        btn: null
                    });
                }
            });
            // 数据授权
            $('#am_dataauthorize').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'dataAuthorizeForm',
                        title: '数据授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/AM_AuthorizeModule/DataAuthorize/Index?objectId=' + keyValue + '&objectType=2',
                        width: 1100,
                        height: 700,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            // 设置Ip过滤
            $('#am_ipfilter').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'filterIPIndex',
                        title: 'TCP/IP 地址访问限制 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/AM_AuthorizeModule/FilterIP/Index?objectId=' + keyValue + '&objectType=Uesr',
                        width: 600,
                        height: 400,
                        btn: null,
                        callBack: function (id) { }
                    });
                }
            });
            // 设置时间段过滤
            $('#am_timefilter').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_UserId');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerForm({
                        id: 'filterTimeForm',
                        title: '时段访问过滤 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/AM_AuthorizeModule/FilterTime/Form?objectId=' + keyValue + '&objectType=Uesr',
                        width: 610,
                        height: 470,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
        },
        inittree: function () {
            $('#companyTree').amtree({
                url: top.$.rootUrl + '/AM_OrganizationModule/Company/GetTree',
                param: { parentId: '0' },
                nodeClick: page.treeNodeClick
            });
            $('#companyTree').amtreeSet('setValue', '53298b7a-404c-4337-aa7f-80b2a4ca6681');
        },
        treeNodeClick: function (item) {
            companyId = item.id;
            $('#titleinfo').text(item.text);

            $('#department_select').selectRefresh({
                // 访问数据接口地址
                url: top.$.rootUrl + '/AM_OrganizationModule/Department/GetTree',
                // 访问数据接口参数
                param: { companyId: companyId, parentId: '0' },
            });
            departmentId = '';
            page.search();
        },
        initGird: function () {
            $('#girdtable').AuthorizeJfGrid({
                url: top.$.rootUrl + '/AM_OrganizationModule/User/GetPageList',
                headData: [
                        { label: '账户', name: 'F_Account', width: 100, align: 'left' },
                        { label: '姓名', name: 'F_RealName',  width: 160, align: 'left' },
                        {
                            label: '性别', name: 'F_Gender', width: 45, align: 'center',
                            formatter: function (cellvalue) {
                                return cellvalue == 0 ? "女" : "男";
                            }
                        },
                        { label: '手机', name: 'F_Mobile', width: 100, align: 'center'},
                        {
                            label: '部门', name: 'F_DepartmentId', width: 100, align: 'left',
                            formatterAsync: function (callback, value, row) {
                                ayma.clientdata.getAsync('department', {
                                    key: value,
                                    callback: function (item) {
                                        callback(item.name);
                                    }
                                });
                            }
                        },
                        {
                            label: "状态", name: "F_EnabledMark", index: "F_EnabledMark", width: 50, align: "center",
                            formatter: function (cellvalue) {
                                if (cellvalue == 1) {
                                    return '<span class=\"label label-success\" style=\"cursor: pointer;\">正常</span>';
                                } else if (cellvalue == 0) {
                                    return '<span class=\"label label-default\" style=\"cursor: pointer;\">禁用</span>';
                                }
                            }
                        },
                        { label: "备注", name: "F_Description", index: "F_Description", width: 200, align: "left" }

                ],
                isPage: true,
                reloadSelected: true,
                mainId: 'F_UserId'
            });
        },
        search: function (param) {
            param = param || {};
            param.companyId = companyId;
            param.departmentId = departmentId;
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };

    refreshGirdData = function () {
        var keyword = $('#txt_Keyword').val();
        page.search({ keyword: keyword });
    };

    page.init();
}


