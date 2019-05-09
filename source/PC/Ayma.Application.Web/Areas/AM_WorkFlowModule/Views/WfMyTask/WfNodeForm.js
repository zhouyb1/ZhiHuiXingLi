﻿/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：节点信息展示
 */
var acceptClick;
var bootstrap = function ($, ayma) {
    "use strict";

    var currentNode = ayma.frameTab.currentIframe().currentNode;


    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#girdtable').jfGrid({
                headData: [
                    { label: "执行人", name: "F_CreateUserName", width: 100, align: "left",frozen:true },
                    {
                        label: "执行动作", name: "F_TaskType", width: 80, align: "center",frozen:true,
                        formatter: function (cellvalue, row) {
                            switch (cellvalue)//0.创建 1.审批 2.重新创建 3.确认阅读 4.加签
                            {
                                case 0:
                                    return '<span class=\"label label-success \" >发起</span>';
                                    break;
                                case 1:
                                    if (row.F_Result == 1) {
                                        return '<span class=\"label label-primary \" >审批-同意</span>';
                                    }
                                    else {
                                        return '<span class=\"label label-danger \" >审批-驳回</span>';
                                    }
                                    break;
                                case 2:
                                    return '<span class=\"label label-info \" >重新发起</span>';
                                    break;
                                case 3:
                                    return '<span class=\"label label-primary \" >已阅</span>';
                                    break;
                                case 4:
                                    return '<span class=\"label label-warning \" >加签</span>';
                                    break;
                            }
                        }
                    },
                    {
                        label: "执行时间", name: "F_CreateDate", width: 140, align: "center", frozen: true,
                        formatter: function (cellvalue) {
                            return ayma.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
                        }
                    },
                    { label: "内容", name: "F_Description", width: 400, align: "left" }
                ]
            });
        },
        initData: function () {
            if (!!currentNode) {
                $('#girdtable').jfGridSet('refreshdata', { rowdatas: currentNode.history });

                console.log(currentNode);
            }
        }
    };
    page.init();
}