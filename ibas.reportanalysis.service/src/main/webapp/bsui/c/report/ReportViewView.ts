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
import { IReportViewView } from "../../../bsapp/report/index";

/**
 * 视图-Report
 */
export abstract class ReportViewView extends ibas.View implements IReportViewView {
    /** 运行报表 */
    runReportEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
                contentLeft: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_run"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://begin",
                        press: function (): void {
                            that.fireViewEvents(that.runReportEvent);
                        }
                    })
                ],
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    protected page: sap.m.Page;
    protected form: sap.ui.layout.form.SimpleForm;

    /** 显示报表 */
    showReport(report: bo.UserReport): void {
        this.form.destroyContent();
        drawParameterUIs(this.form, report.parameters);
    }
    /** 显示报表结果 */
    abstract showResults(table: ibas.DataTable): void;
}

/**
 * 视图-报表查看-页签，需要与上保持同步
 */
export abstract class ReportViewTabView extends ibas.TabView implements IReportViewView {
    /** 运行报表 */
    runReportEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
                contentLeft: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_run"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://begin",
                        press: function (): void {
                            that.fireViewEvents(that.runReportEvent);
                        }
                    }),
                ],
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    protected page: sap.m.Page;
    protected form: sap.ui.layout.form.SimpleForm;
    /** 显示报表 */
    showReport(report: bo.UserReport): void {
        this.form.destroyContent();
        drawParameterUIs(this.form, report.parameters);
    }
    /** 显示报表结果 */
    abstract showResults(table: ibas.DataTable): void;
}

function drawParameterUIs(form: sap.ui.layout.form.SimpleForm, parameters: bo.UserReportParameter[]): void {
    if (ibas.objects.isNull(parameters) || parameters.length === 0) {
        form.addContent(new sap.m.Title("", {
            text: ibas.i18n.prop("reportanalysis_running_parameters")
        }));
        return;
    }
    form.addContent(new sap.ui.core.Title("", {
        text: ibas.i18n.prop("reportanalysis_running_parameters")
    }));
    for (let item of parameters) {
        if (item.category === bo.emReportParameterType.PRESET) {
            // 预设的不显示
            continue;
        }
        form.addContent(new sap.m.Label("", {
            textAlign: sap.ui.core.TextAlign.Left,
            width: "20%",
            text: ibas.objects.isNull(item.description) ? item.name.replace("\$\{", "").replace("\}", "") : item.description
        }));
        let input: sap.ui.core.Control;
        if (item.category === bo.emReportParameterType.DATETIME) {
            input = new sap.m.DatePicker("", {
                width: "60%",
                valueFormat: "yyyy-MM-dd",
            });
            input.bindProperty("value", {
                path: "/value"
            });
        } else if (item.category === bo.emReportParameterType.SYSTEM) {
            input = new sap.m.Input("", {
                width: "60%",
                editable: false,
            });
            input.bindProperty("value", {
                path: "/value"
            });
        } else if (item.category === bo.emReportParameterType.RANGE) {
            let values: Array<sap.ui.core.Item> = new Array<sap.ui.core.Item>();
            for (let value of item.value.split(";")) {
                if (ibas.strings.isEmpty(value)) {
                    continue;
                }
                values.push(new sap.ui.core.Item("", {
                    key: value,
                    text: value
                }));
            }
            input = new sap.m.Select("", {
                width: "60%",
                items: values
            });
            input.bindProperty("selectedKey", {
                path: "/value"
            });
        } else {
            input = new sap.m.Input("", {
                width: "60%",
            });
            input.bindProperty("value", {
                path: "/value"
            });
        }
        input.setModel(new sap.ui.model.json.JSONModel(item));
        form.addContent(input);
    }
}