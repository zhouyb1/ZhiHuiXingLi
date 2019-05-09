/* * 
 * 
 * 创建人：超级管理员
 * 日  期：2017-12-12 11:52
 * 描  述：数据表草稿管理
 */
var selectedRow;
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
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
            // 删除
            $('#am_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (ayma.checkrow(keyValue)) {
                    ayma.layerConfirm('是否确认删除！', function (res) {
                        if (res) {
                            ayma.deleteForm(top.$.rootUrl + '/AM_SystemModule/DatabaseTable/DeleteDraft', { keyValue: keyValue }, function () {
                                page.search();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/AM_SystemModule/DatabaseTable/GetDraftList',
                headData: [
                    { label: '表名', name: 'F_Name', width: 180, align: 'left' },
                    { label: '表备注', name: 'F_Remark', width: 180, align: 'left' },

                    { label: '创建人', name: 'F_CreateUserName', width: 100, align: "center" },
                    {
                        label: "创建时间", name: "F_CreateDate", width: 120, align: "center",
                        formatter: function (cellvalue) {
                            return ayma.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    }
                ],
                mainId: 'F_Id',
                onSelectRow: function (rowdata) {
                    selectedRow = rowdata;
                },
                reloadSelected: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    page.init();

    // 保存数据
    acceptClick = function (callBack) {
        callBack(selectedRow);
        return true;
    };
}
