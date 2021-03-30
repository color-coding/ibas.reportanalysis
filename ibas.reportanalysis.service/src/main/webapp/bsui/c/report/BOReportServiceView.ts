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
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.dialog = new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        content: [
                        ],
                        endButton: new sap.m.Button("", {
                            text: ibas.i18n.prop("shell_exit"),
                            type: sap.m.ButtonType.Transparent,
                            press: function (): void {
                                that.fireViewEvents(that.closeEvent);
                            }
                        }),
                    }).addStyleClass("sapUiNoContentPadding");
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
                                }
                            }),
                        ]
                    }));
                    this.dialog.destroyContent();
                    this.dialog.addContent(this.viewContent.draw());
                    super.showReport(report);
                }
            }
        }
    }
}