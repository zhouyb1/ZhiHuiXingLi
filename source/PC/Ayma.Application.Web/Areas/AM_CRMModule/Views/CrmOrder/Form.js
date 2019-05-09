/*
 * 
 * 
 * 创建人：前端开发组
 * 日 期：2017.04.18
 * 描 述：新增表单	
 */

var keyValue = request('keyValue');

var bootstrap = function ($, ayma) {
    "use strict";

    // 保存数据
    var acceptClick = function (type) {// 0保存并新增 1保存
        if (!$('.am-layout-wrap').Validform()) {
            return false;
        }
        var formData = $('.am-layout-wrap').GetFormData(keyValue);
        var productData = [];
        var productDataTmp = $('#productgird').jfGridGet('rowdatas');

        for (var i = 0, l = productDataTmp.length; i < l; i++) {
            if (!!productDataTmp[i]['F_ProductName']) {
                productData.push(productDataTmp[i]);
            }
        }

        var postData = {
            crmOrderJson: JSON.stringify(formData),
            crmOrderProductJson: JSON.stringify(productData)
        };

        ayma.layerConfirm('注：您确认要保存此操作吗？', function (res, index) {
            if (res) {
                $.SaveForm(top.$.rootUrl + '/AM_CRMModule/CrmOrder/SaveForm?keyValue=' + keyValue, postData, function (res) {
                    if (res.code == 200) {
                        if (type == 0) {
                            window.location.href = top.$.rootUrl + '/AM_CRMModule/CrmOrder/Form';
                        }
                        else {
                            ayma.frameTab.close('order_add');
                        }
                    }
                });
                top.layer.close(index); //再执行关闭  
            }
        });
    };

    var page = {
        init: function () {
            page.bind();
            page.initData();
            page.inputFocus(5);
        },
        bind: function () {
            // 优化滚动条
            $('.am-layout-wrap').mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });
            // 客户选择
            $('#F_CustomerId').select({
                url: top.$.rootUrl + '/AM_CRMModule/Customer/GetList',
                text: 'F_FullName',
                value: 'F_CustomerId',
                allowSearch: true,
                maxHeight:400
            });
            // 销售人员
            $('#F_SellerId').select({
                url: top.$.rootUrl + '/AM_OrganizationModule/User/GetList?departmentId=99463ce7-eba4-4276-8e56-5eaff89afdb9',
                text: 'F_RealName',
                value: 'F_UserId',
                allowSearch: true,
                maxHeight: 400
            });
            // 收款方式
            $('#F_PaymentMode').DataItemSelect({ code: 'PaymentType' });

            // 合同附件
            $('#F_ContractFile').Uploader();


            // 订单产品信息
            $('#productgird').jfGrid({
                headData: [
                    {
                        label: "商品信息", name: "a1", width: 80, align: "center",
                        children: [
                            {
                                label: '商品名称', name: 'F_ProductName', width: 260, align: 'left', editType: 'select',
                                editOp: {
                                    width: 600,
                                    height: 400,
                                    colData: [
                                       { label: "商品编号", name: "F_ItemValue", width: 100, align: "left" },
                                       { label: "商品名称", name: "F_ItemName", width: 450, align: "left" }
                                    ],
                                    url: top.$.rootUrl + '/AM_SystemModule/DataItem/GetDetailList',
                                    param: { itemCode: 'Client_ProductInfo' },
                                    callback: function (selectdata, rownum, row) {
                                        row.F_ProductName = selectdata.F_ItemName;
                                        row.F_ProductCode = selectdata.F_ItemValue;

                                        row.F_Qty = '1';
                                        row.F_Price = '12';
                                        row.F_Amount = '12';
                                        row.F_TaxRate = '0';
                                        row.F_Taxprice = '0';
                                        row.F_Tax = '0';
                                        row.F_TaxAmount = '0';
                                    }
                                }
                            },
                            { label: '商品编号', name: 'F_ProductCode', width: 100, align: 'center',editType:'label' },
                            { label: '单位', name: 'F_UnitId', width: 100, align: 'center', editType: 'input' }
                        ]
                    },
                    {
                        label: "价格信息", name: "a2", width: 80, align: "center",
                        children: [
                           {
                               label: '数量', name: 'F_Qty', width: 80, align: 'center', editType: 'input', statistics: true,
                               editOp: {
                                   callback: function (rownum, row) {
                                       row.F_Amount =parseInt(parseFloat(row.F_Price || '0') * parseFloat(row.F_Qty || '0'));
                                       row.F_TaxAmount = parseInt((parseFloat(row.F_Price || '0') * (1 + parseFloat(row.F_TaxRate || '0') / 100)) * parseFloat(row.F_Qty || '0'));
                                       row.F_Tax = row.F_TaxAmount - row.F_Amount;
                                   }
                               }
                           },
                           {
                               label: '单价', name: 'F_Price', width: 80, align: 'center', editType: 'input',
                               editOp: {
                                   callback: function (rownum, row) {
                                       row.F_Amount = parseInt(parseFloat(row.F_Price || '0') * parseFloat(row.F_Qty || '0'));
                                       row.F_TaxAmount = parseInt(parseFloat(row.F_Price || '0') * (1 + parseFloat(row.F_TaxRate || '0') / 100)) * parseFloat(row.F_Qty || '0');
                                       row.F_Tax = row.F_TaxAmount - row.F_Amount;

                                       row.F_Taxprice = parseInt(parseFloat(row.F_Price || '0') * (1 + parseFloat(row.F_TaxRate || '0') / 100));
                                   }
                               }
                           },
                           { label: '金额', name: 'F_Amount', width: 80, align: 'center', editType: 'label', statistics: true },
                           {
                               label: '税率(%)', name: 'F_TaxRate', width: 80, align: 'center', editType: 'input',
                               editOp: {
                                   callback: function (rownum, row) {
                                       row.F_Amount = parseInt(parseFloat(row.F_Price || '0') * parseFloat(row.F_Qty || '0'));
                                       row.F_TaxAmount = parseInt((parseFloat(row.F_Price || '0') * (1 + parseFloat(row.F_TaxRate || '0') / 100)) * parseFloat(row.F_Qty || '0'));
                                       row.F_Tax = row.F_TaxAmount - row.F_Amount;

                                       row.F_Taxprice = parseInt(parseFloat(row.F_Price || '0') * (1 + parseFloat(row.F_TaxRate || '0') / 100));
                                   }
                               }
                           },
                           { label: '含税单价', name: 'F_Taxprice', width: 80, align: 'center', editType: 'label' },
                           { label: '税额', name: 'F_Tax', width: 80, align: 'center', editType: 'label', statistics: true },
                           { label: '含税金额', name: 'F_TaxAmount', width: 80, align: 'center', editType: 'label', statistics: true },
                        ]
                    },
                    { label: "说明信息", name: "F_Description", width: 200, align: "center", editType: 'input' }
                ],
                //isAutoHeight: true,
                isEidt: true,
                footerrow: true,
                isStatistics: true,
                height: 400,
                isMultiselect: true
            });

            // 保存数据
            $('#savaAndAdd').on('click', function () {
                acceptClick(0);
            });
            $('#save').on('click', function () {
                acceptClick(1);
            });
        },
        initData: function () {
            if (!!keyValue) {
                $.SetForm(top.$.rootUrl + '/AM_CRMModule/CrmOrder/GetFormData?keyValue=' + keyValue, function (data) {
                    $('.am-layout-wrap').SetFormData(data.orderData);
                    $('#productgird').jfGridSet('refreshdata', { rowdatas: data.orderProductData });
                });
            }
        },
        //绑定jfgrid中的input让输入框支持上下左右聚焦 rowInputCount:每行input个数
        inputFocus: function (rowInputCount) {
            var baseindex = 1;
            $(".jfgrid-data-cell").each(function (r) {
                $(this).find("input[type=text]").attr("tabindex", baseindex).addClass("cGridInput");
                if ($(this).find("input[type=text]").length > 0) {
                    baseindex++;
                }
            });
            $(".cGridInput").on("keydown", function (evt) {
                var tabIndex = parseInt($(this).attr("tabindex"));
                switch (evt.which) {
                    case 38: //上
                        tabIndex -= rowInputCount;
                        break;
                    case 40: //下
                        tabIndex += rowInputCount;
                        break;
                    case 37: //左
                        tabIndex--;
                        break;
                    case 39: //右
                        tabIndex++;
                        break;
                    default:
                        return;
                }
                if (tabIndex > 0) {
                    $(".cGridInput[tabindex=" + tabIndex + "]").focus();
                    return false;
                }
                return true;
            });
        }
    };
    
    page.init();
}