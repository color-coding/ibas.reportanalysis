/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        export namespace c {
            /**
             * 视图-业务对象报表服务视图
             */
            export class BOReportServiceView extends ReportDialogViewView implements app.IReportViewView {
                /** 选择报表 */
                selectReportEvent: Function;
                /** 值链接事件 */
                valueLinkEvent: Function;
                /** 触发事件 */
                fireValueLink(objectCode: string, value: string, row?: any): void {
                    this.fireViewEvents(this.valueLinkEvent, objectCode, value, row);
                }
                private tableBar: sap.m.Toolbar;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.dialog = super.draw();
                    if (this.dialog instanceof sap.m.Dialog) {
                        this.dialog.destroyButtons();
                        this.dialog.destroySubHeader();
                        this.dialog.addButton(new sap.m.Button("", {
                            text: ibas.i18n.prop("shell_exit"),
                            type: sap.m.ButtonType.Transparent,
                            press: function (): void {
                                that.fireViewEvents(that.closeEvent);
                            }
                        }));
                    }
                    return this.dialog;
                }
                private dialog: sap.m.Dialog;
                /** 显示报表 */
                showReports(reports: bo.UserReport[]): void {
                    if (reports.length === 1) {
                        this.fireViewEvents(this.selectReportEvent, reports[0]);
                    } else {
                        let list: sap.m.ListBase;
                        let that: this = this;
                        this.dialog.destroyContent();
                        this.dialog.addContent(list = new sap.extension.m.List("", {
                            inset: false,
                            growing: false,
                            mode: sap.m.ListMode.None,
                            items: {
                                path: "/",
                                template: new sap.m.StandardListItem("", {
                                    title: "# {id}",
                                    description: "{name}",
                                    type: sap.m.ListType.Active,
                                    press: function (oEvent: sap.ui.base.Event): void {
                                        that.fireViewEvents(that.selectReportEvent, this.getBindingContext().getObject());
                                    },
                                })
                            }
                        }));
                        list.setModel(new sap.extension.model.JSONModel(reports));
                    }
                }
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    let that: this = this;
                    this.dialog.setSubHeader(new sap.m.Toolbar("", {
                        content: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_run"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://begin",
                                press: function (): void {
                                    that.fireViewEvents(that.runReportEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_reset"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://reset",
                                press: function (): void {
                                    that.fireViewEvents(that.resetReportEvent);
                                    that.tableBar.setVisible(false);
                                }
                            }),
                            new sap.m.ToolbarSpacer(""),
                            this.tableBar = new sap.m.Toolbar("", {
                                visible: false,
                                content: [
                                    new sap.m.ToolbarSeparator(""),
                                    new sap.m.Label("", {
                                        width: "auto",
                                        text: ibas.i18n.prop("reportanalysis_fixed_table"),
                                    }),
                                    new sap.m.Input("", {
                                        width: "3rem",
                                        type: sap.m.InputType.Number,
                                        textAlign: sap.ui.core.TextAlign.Right,
                                    }),
                                    new sap.m.Input("", {
                                        width: "3rem",
                                        type: sap.m.InputType.Number,
                                        textAlign: sap.ui.core.TextAlign.Right,
                                    }),
                                    new sap.m.Input("", {
                                        width: "3rem",
                                        type: sap.m.InputType.Number,
                                        textAlign: sap.ui.core.TextAlign.Right,
                                    }),
                                    new sap.m.Button("", {
                                        text: ibas.i18n.prop("shell_apply"),
                                        type: sap.m.ButtonType.Success,
                                        press: function (event: sap.ui.base.Event): void {
                                            let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
                                            if (table instanceof sap.ui.table.Table) {
                                                let source: any = event.getSource();
                                                if (source instanceof sap.m.Button) {
                                                    let toolBar: any = source.getParent();
                                                    if (toolBar instanceof sap.m.Toolbar) {
                                                        let count: number = 0;
                                                        for (let item of toolBar.getContent()) {
                                                            if (item instanceof sap.m.Input) {
                                                                let value: number = ibas.numbers.valueOf(item.getValue());
                                                                if (count === 0) {
                                                                    table.setFixedColumnCount(value > 0 && value < table.getColumns().length ? value : 0);
                                                                    count++;
                                                                } else if (count === 1) {
                                                                    table.setFixedRowCount(value > 0 && value < table.getRows().length ? value : 0);
                                                                    count++;
                                                                } else if (count === 2) {
                                                                    table.setFixedBottomRowCount(value > 0 && value < table.getRows().length ? value : 0);
                                                                    count++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }),
                                    new sap.m.ToolbarSeparator(""),
                                    new sap.m.Button("", {
                                        text: ibas.i18n.prop("reportanalysis_resize_column"),
                                        type: sap.m.ButtonType.Accept,
                                        press: function (event: sap.ui.base.Event): void {
                                            let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
                                            if (table instanceof sap.ui.table.Table) {
                                                for (let column: number = table.getColumns().length - 1; column >= 0; column--) {
                                                    table.autoResizeColumn(column);
                                                }
                                            }
                                        }
                                    }),
                                ]
                            })
                        ]
                    }));
                    super.showReport(report);
                }
                showResults(table: ibas.DataTable): void {
                    super.showResults(table);
                    this.tableBar.setVisible(true);
                }
            }
        }
    }
}