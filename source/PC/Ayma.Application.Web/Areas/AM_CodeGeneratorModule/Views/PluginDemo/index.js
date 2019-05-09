/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：插件演示页面	
 */
var bootstrap = function ($, ayma) {
    "use strict";
   
    var page = {
        init: function () {
            page.bind();
            page.initLeftTree();
        },
        bind: function () {
            $(".am-tab-scroll-content").mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
        },
        initLeftTree: function () {
            $('#plugin_list').amtree({
                data: pluginList,
                nodeClick: function (item) {
                    switch (item.value)
                    {
                        case 'aymatree':
                            $('#title_info').text(item.text);
                            $('#ayma_tree_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#ayma_tree_area').addClass('active');
                            pluginlist.treeinit();
                            break;
                        case 'aymaselect':
                            $('#title_info').text(item.text);
                            $('#ayma_select_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#ayma_select_area').addClass('active');
                            pluginlist.selectinit();
                            break;
                        case 'aymauserselect':
                            $('#title_info').text(item.text);
                            $('#ayma_selectuser_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#ayma_selectuser_area').addClass('active');
                            pluginlist.selectUserinit();
                            break;
                        case 'jfGrid':
                            $('#title_info').text(item.text);
                            $('#jfgrid_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#jfgrid_area').addClass('active');
                            pluginlist.jfgridinit();
                            break;
                        case 'webUploader':
                            $('#title_info').text(item.text);
                            $('#uploader_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#uploader_area').addClass('active');
                            pluginlist.uploaderInit();
                            break;
                    }
                }
            });
        }
    };

    //树插件
    var treeCode = {
        base:
function () {
    $('#tree_show_base').amtree({
        data: [{
            id: '0',
            text: '父节点',
            value: 'no',
            hasChildren: true,
            isexpand: true,
            complete: true,
            ChildNodes: [
                {
                    id: '1',
                    text: '子节点一',
                    value: 'aymatree',
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '2',
                            text: '子节点二',
                            value: 'aymatree',
                            complete: true
                        }
                    ]
                }
            ]
        }]
    });
},
        ajax:
function () {
    $('#tree_show_ajax').amtree({
        url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetClassifyTree'
    });
},
        checkbox:
function () {
    $('#tree_show_checkbox').amtree({
        data: [{
            id: '0',
            text: '父节点',
            value: 'no',
            showcheck: true,
            hasChildren: true,
            isexpand: true,
            complete: true,
            ChildNodes: [
                {
                    id: '1',
                    text: '子节点一',
                    value: 'aymatree',
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '2',
                            text: '子节点二',
                            value: 'aymatree',
                            showcheck:true,
                            complete: true
                        },
                        {
                            id: '3',
                            text: '子节点三',
                            value: 'aymatree',
                            showcheck: true,
                            complete: true
                        }, {
                            id: '4',
                            text: '子节点四',
                            value: 'aymatree',
                            showcheck: true,
                            complete: true
                        }
                    ]
                },
                {
                    id: '11',
                    text: '子节点一一',
                    value: 'aymatree',
                    showcheck: true,
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '12',
                            text: '子节点一二',
                            value: 'aymatree',
                            showcheck: true,
                            complete: true
                        }
                    ]
                }
            ]
        }]
    });
}
    }

    // jfgrid
    var initGird = function () {
        $('#ayma_jfgrid').jfGrid({
            isPage:true,

            isMultiselect: true,

            isSubGrid: true,    // 是否有子表单
            subGridRowExpanded: function () {

            },
            rowdatas: [
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 }
            ],
            headData: [
                { label: 'A', name: 'A', width: 80, align: 'left', frozen: true },
                {
                    label: 'B', name: 'B', width: 80, align: 'center', frozen: true,
                    children: [
                         { label: 'B1', name: 'B1', width: 80, align: 'center' },
                         {
                             label: 'B2', name: 'B2', width: 80, align: 'center',
                             children: [
                                  { label: 'B21', name: 'B21', width: 80, align: 'center' },
                                  {
                                      label: 'B21', name: 'B22', width: 80, align: 'center'
                                  }
                             ]
                         }
                    ]
                },
                { label: 'C', name: 'C', width: 80, align: 'right' },
                {
                    label: 'D', name: 'D', width: 80, align: 'center',
                    children: [
                        { label: 'D1', name: 'D1', width: 80, align: 'center' },
                        { label: 'D2', name: 'D2', width: 80, align: 'center' }
                    ]
                },
                {
                    label: "E", name: "E", width: 300, align: "left",
                    formatter: function (cellvalue) {
                        return cellvalue == 1 ? "<span class=\"label label-success\" style=\"cursor: pointer;\">是</span>" : "<span class=\"label label-default\" style=\"cursor: pointer;\">否</span>";
                    }
                }
            ]
        });
    };


    var pluginlist = {
        treeinit: function () {
            treeCode.base();

            treeCode.ajax();

            treeCode.checkbox();
        },
        selectinit: function () {
            var dfop = {
                type: 'tree',
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/AM_OrganizationModule/Company/GetTree',
                // 访问数据接口参数
                param: { parentId: '0' },
            }
            $('#select1').select(dfop);


            var dfop2 = {
                // 字段
                value: "F_AreaCode",
                text: "F_AreaName",
                title: "F_AreaName",
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/AM_SystemModule/Area/Getlist',
                // 访问数据接口参数
                param: { parentId: '' },
            }

            $('#select2').select(dfop2);

            $('#select4').select({
                // 字段
                value: "F_AreaCode",
                text: "F_AreaName",
                title: "F_AreaName",
                type: 'multiple',
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/AM_SystemModule/Area/Getlist',
                // 访问数据接口参数
                param: { parentId: '' },
            });

            $('#select5').GirdSelect({
                // 字段
                url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetDetailList',
                param: { itemCode: 'Client_ProductInfo' },
                selectWord: 'F_ItemName',
                value: 'F_ItemValue',
                text: 'F_ItemName',
                headData: [{ label: "商品编号", name: "F_ItemValue", width: 100, align: "left" },
                    { label: "商品名称", name: "F_ItemName", width: 450, align: "left" }],
                select: function (item) {
                    console.log(item);
                }

            });

            $('#select3').select({
                type: 'treemultiple',
                allowSearch: true,
                //type: 'tree',
                select: function (items) {
                },
                data: [{
                    id: '0',
                    text: '父节点',
                    value: 'no',
                    showcheck: true,
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '1',
                            text: '子节点一',
                            value: 'aymatree',
                            hasChildren: true,
                            isexpand: true,
                            complete: true,
                            ChildNodes: [
                                {
                                    id: '2',
                                    text: '子节点二',
                                    value: 'aymatree',
                                    showcheck: true,
                                    complete: true
                                },
                                {
                                    id: '3',
                                    text: '子节点三',
                                    value: 'aymatree',
                                    showcheck: true,
                                    complete: true
                                }, {
                                    id: '4',
                                    text: '子节点四',
                                    value: 'aymatree',
                                    showcheck: true,
                                    complete: true
                                }
                            ]
                        },
                        {
                            id: '11',
                            text: '子节点一一',
                            value: 'aymatree',
                            showcheck: true,
                            hasChildren: true,
                            isexpand: true,
                            complete: true,
                            ChildNodes: [
                                {
                                    id: '12',
                                    text: '子节点一二',
                                    value: 'aymatree',
                                    showcheck: true,
                                    complete: true
                                }
                            ]
                        }
                    ]
                }]
            });
        },
        selectUserinit: function () {
            $('#selectuser1').formselect({
                layerUrl: top.$.rootUrl + '/AM_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl:''
            });
        },
        jfgridinit:function(){
            initGird();
        },
        uploaderInit: function () {
            $('#ayma_uploader').Uploader();
        }
    }

    page.init();
}