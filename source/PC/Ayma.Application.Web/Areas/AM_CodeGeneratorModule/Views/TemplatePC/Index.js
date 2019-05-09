/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.17
 * 描 述：PC端代码生成模板管理	
 */
var bootstrap = function ($, ayma) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 自定义开发模板
            $('#am_custmerCode').on('click', function () {
                ayma.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(自定义开发模板)',
                    url: top.$.rootUrl + '/AM_CodeGeneratorModule/TemplatePC/CustmerCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 快速开发模板
            $('#am_fastCode').on('click', function () {
                ayma.layerForm({
                    id: 'FastCodeIndex',
                    title: '在线代码生成器 并自动创建代码(快速开发模板)',
                    url: top.$.rootUrl + '/AM_CodeGeneratorModule/TemplatePC/FastCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 实体映射类生成
            $('#am_entityCode').on('click', function () {
                ayma.layerForm({
                    id: 'FastCodeIndex',
                    title: '在线代码生成器 并自动创建代码(实体映射类生成)',
                    url: top.$.rootUrl + '/AM_CodeGeneratorModule/TemplatePC/EntityCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 系统表单开发模板
            $('#am_workflowCode').on('click', function () {
                ayma.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(流程系统表单开发模板)',
                    url: top.$.rootUrl + '/AM_CodeGeneratorModule/TemplatePC/WorkflowCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
        }
    };
    page.init();
}