/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { IReportEditView } from "../../../bsapp/report/index";

/**
 * 视图-Report
 */
export class ReportEditView extends ibas.BOEditView implements IReportEditView {

    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 添加报表参数事件 */
    addReportParameterEvent: Function;
    /** 删除报表参数事件 */
    removeReportParameterEvent: Function;
    /** 报表-业务对象选择 */
    chooseReportBOCodeEvent: Function;
    /** 报表-应用选择 */
    chooseReportApplicationIdEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_ui_basic") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_name") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "/name"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_group") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "/group"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_activated") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/activated",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_ui_associated") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_bocode") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseReportBOCodeEvent);
                    }
                }).bindProperty("value", {
                    path: "/boCode"
                }), new sap.m.Label("", { text: ibas.i18n.prop("bo_report_applicationid") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseReportApplicationIdEvent);
                    }
                }).bindProperty("value", {
                    path: "/applicationId"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_ui_content") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_category") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(bo.emReportType)
                }).bindProperty("selectedKey", {
                    path: "/category",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_sqlstring") }),
                new sap.m.TextArea("", {
                    rows: 9
                }).bindProperty("value", {
                    path: "/sqlString"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_server") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "/server"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_username") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "/userName"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_password") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Password
                }).bindProperty("value", {
                    path: "/password"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_report_address") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "/address"
                }),
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_reportparameter") }));
        this.tableReportParameter = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addReportParameterEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeReportParameterEvent);
                        }
                    })
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_reportparameter_name"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "name",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_reportparameter_description"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "description",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_reportparameter_category"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(bo.emReportParameterType)
                    }).bindProperty("selectedKey", {
                        path: "category",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_reportparameter_value"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "value",
                    })
                }),
            ]
        });
        this.form.addContent(this.tableReportParameter);
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    /** 改变视图状态 */
    private changeViewStatus(data: bo.Report): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
        // 不可编辑：已批准，
        /*
        if (data.approvalStatus === ibas.emApprovalStatus.APPROVED) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
            utils.changeFormEditable(this.form, false);
        }
        */
    }
    private tableReportParameter: sap.ui.table.Table;

    /** 显示数据 */
    showReport(data: bo.Report): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
    /** 显示数据 */
    showReportParameters(datas: bo.ReportParameter[]): void {
        this.tableReportParameter.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableReportParameter, datas);
    }
}
