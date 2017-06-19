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
import { ISystemReportViewView } from "../../../bsapp/report/index";
import { ReportViewView, ReportViewTabView } from "./ReportViewView";

/**
 * 视图-Report
 */
export class SystemReportViewView extends ReportViewView implements ISystemReportViewView {
    /** 调用服务事件 */
    callServicesEvent: Function;
    /** 重置报表 */
    resetReportEvent: Function;
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
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_reset"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://reset",
                        press: function (): void {
                            that.fireViewEvents(that.resetReportEvent);
                        }
                    })
                ],
                contentRight: [
                    new sap.m.Button("", {
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://action",
                        press: function (event: any): void {
                            that.fireViewEvents(that.callServicesEvent, {
                                displayServices(services: ibas.IServiceAgent[]): void {
                                    if (ibas.objects.isNull(services) || services.length === 0) {
                                        return;
                                    }
                                    let popover: sap.m.Popover = new sap.m.Popover("", {
                                        showHeader: false,
                                        placement: sap.m.PlacementType.Bottom,
                                    });
                                    for (let service of services) {
                                        popover.addContent(new sap.m.Button({
                                            text: ibas.i18n.prop(service.name),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: service.icon,
                                            press: function (): void {
                                                service.run();
                                                popover.close();
                                            }
                                        }));
                                    }
                                    (<any>popover).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                    popover.openBy(event.getSource(), true);
                                }
                            });
                        }
                    })
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private tableResult: sap.ui.table.Table;

    /** 显示报表结果 */
    showResults(table: ibas.DataTable): void {
        if (!ibas.objects.isNull(this.tableResult)) {
            this.tableResult.destroy(true);
        }
        this.form.destroyContent();
        this.tableResult = new sap.ui.table.Table("", {
            enableSelectAll: true,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            editable: false,
            rows: "{/rows}",
        });
        for (let col of table.columns) {
            if (col.definedDataType() === ibas.emTableDataType.DATE) {
                this.tableResult.addColumn(
                    new sap.ui.table.Column("", {
                        label: col.name,
                        width: "100px",
                        autoResizable: false,
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: col.name,
                            formatter(data: any): any {
                                return ibas.dates.toString(data);
                            }
                        })
                    })
                );
            } else {
                this.tableResult.addColumn(
                    new sap.ui.table.Column("", {
                        label: col.name,
                        width: "100px",
                        autoResizable: false,
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: col.name,
                        })
                    })
                );
            }
        }
        this.tableResult.setModel(new sap.ui.model.json.JSONModel({ rows: table.convert() }));
        this.form.addContent(this.tableResult);
    }
}

/**
 * 视图-报表查看-页签，需要与上保持同步
 */
export class SystemReportViewTabView extends ReportViewTabView implements ISystemReportViewView {
    /** 调用服务事件 */
    callServicesEvent: Function;
    /** 重置报表 */
    resetReportEvent: Function;
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
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_reset"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://reset",
                        press: function (): void {
                            that.fireViewEvents(that.resetReportEvent);
                        }
                    })
                ],
                contentRight: [
                    new sap.m.Button("", {
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://action",
                        press: function (event: any): void {
                            that.fireViewEvents(that.callServicesEvent, {
                                displayServices(services: ibas.IServiceAgent[]): void {
                                    if (ibas.objects.isNull(services) || services.length === 0) {
                                        return;
                                    }
                                    let popover: sap.m.Popover = new sap.m.Popover("", {
                                        showHeader: false,
                                        placement: sap.m.PlacementType.Bottom,
                                    });
                                    for (let service of services) {
                                        popover.addContent(new sap.m.Button({
                                            text: ibas.i18n.prop(service.name),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: service.icon,
                                            press: function (): void {
                                                service.run();
                                                popover.close();
                                            }
                                        }));
                                    }
                                    (<any>popover).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                    popover.openBy(event.getSource(), true);
                                }
                            });
                        }
                    })
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private tableResult: sap.ui.table.Table;

    /** 显示报表结果 */
    showResults(table: ibas.DataTable): void {
        if (!ibas.objects.isNull(this.tableResult)) {
            this.tableResult.destroy(true);
        }
        this.form.destroyContent();
        this.tableResult = new sap.ui.table.Table("", {
            enableSelectAll: true,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            editable: false,
            rows: "{/rows}",
        });
        for (let col of table.columns) {
            if (col.definedDataType() === ibas.emTableDataType.DATE) {
                this.tableResult.addColumn(
                    new sap.ui.table.Column("", {
                        label: col.name,
                        width: "100px",
                        autoResizable: false,
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: col.name,
                            formatter(data: any): any {
                                return ibas.dates.toString(data);
                            }
                        })
                    })
                );
            } else {
                this.tableResult.addColumn(
                    new sap.ui.table.Column("", {
                        label: col.name,
                        width: "100px",
                        autoResizable: false,
                        template: new sap.m.Text("", {
                            wrapping: false
                        }).bindProperty("text", {
                            path: col.name,
                        })
                    })
                );
            }
        }
        this.tableResult.setModel(new sap.ui.model.json.JSONModel({ rows: table.convert() }));
        this.form.addContent(this.tableResult);
    }
}
