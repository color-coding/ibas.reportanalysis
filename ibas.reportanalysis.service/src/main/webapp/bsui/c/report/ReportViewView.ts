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
             * 视图-Report
             */
            export class ReportViewView extends ibas.View implements IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 重置报表 */
                resetReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press: function (): void {
                                        (<any>that.page.getFooter()).setVisible(false);
                                        that.fireViewEvents(that.runReportEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_reset"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://reset",
                                    press: function (): void {
                                        (<any>that.page.getFooter()).setVisible(false);
                                        for (let item of (<any>that.page.getFooter()).getContent()) {
                                            if (item instanceof sap.m.Input) {
                                                item.setValue(null);
                                            }
                                        }
                                        that.fireViewEvents(that.resetReportEvent);
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.DataTableServiceProxy({
                                                data: that.viewContent.dataTable,
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let popover: sap.m.Popover = new sap.m.Popover("", {
                                                    showHeader: false,
                                                    placement: sap.m.PlacementType.Bottom,
                                                });
                                                for (let service of services) {
                                                    popover.addContent(new sap.m.Button("", {
                                                        text: ibas.i18n.prop(service.name),
                                                        type: sap.m.ButtonType.Transparent,
                                                        icon: service.icon,
                                                        press: function (): void {
                                                            service.run();
                                                            popover.close();
                                                        }
                                                    }));
                                                }
                                                popover.addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                                popover.openBy(event.getSource(), true);
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                            this.viewContent.draw()
                        ],
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            visible: false,
                            content: [
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("shell_data_choose"),
                                    icon: "sap-icon://bullet-text",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_all"),
                                                icon: "sap-icon://multiselect-all",
                                                press: function (): void {
                                                    let table: sap.ui.table.Table = (<any>that.page.getContent()[0])?.getItems()[0];
                                                    if (table instanceof sap.ui.table.Table) {
                                                        let model: any = table.getModel();
                                                        if (model instanceof sap.extension.model.JSONModel) {
                                                            for (let index: number = 0; index < model.size(); index++) {
                                                                if (!table.isIndexSelected(index)) {
                                                                    table.addSelectionInterval(index, index);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_reverse"),
                                                icon: "sap-icon://multi-select",
                                                press: function (): void {
                                                    let table: sap.ui.table.Table = (<any>that.page.getContent()[0])?.getItems()[0];
                                                    if (table instanceof sap.ui.table.Table) {
                                                        let model: any = table.getModel();
                                                        if (model instanceof sap.extension.model.JSONModel) {
                                                            let selects: ibas.IList<number> = ibas.arrays.create(table.getSelectedIndices());
                                                            table.clearSelection();
                                                            for (let index: number = 0; index < model.size(); index++) {
                                                                if (!selects.contain(index)) {
                                                                    table.addSelectionInterval(index, index);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                                                icon: "sap-icon://multiselect-none",
                                                press: function (): void {
                                                    let table: sap.ui.table.Table = (<any>that.page.getContent()[0])?.getItems()[0];
                                                    if (table instanceof sap.ui.table.Table) {
                                                        table.clearSelection();
                                                    }
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.ToolbarSpacer(""),
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
                                        let table: sap.ui.table.Table = (<any>that.page.getContent()[0])?.getItems()[0];
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
                            ]
                        }),
                    });
                    return this.page;
                }
                private page: sap.m.Page;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.viewContent.showReport(report);
                }
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    let type: emResultType = this.viewContent.showResults(table);
                    if (type === emResultType.HTML) {
                        this.page.setShowSubHeader(false);
                    } else {
                        this.page.setShowSubHeader(true);
                        (<any>this.page.getFooter()).setVisible(true);
                    }
                }
                proceeding(type: ibas.emMessageType, msg: string): void {
                    this.application.viewShower.proceeding(this, type, msg);
                }
                messages(caller: ibas.IMessgesCaller): void {
                    this.application.viewShower.messages(caller);
                }
                protected viewContent: ReportViewContent = new ReportViewContent(this);
            }
            /**
             * 视图-报表查看-页签，需要与上保持同步
             */
            export class ReportTabViewView extends ibas.TabView implements app.IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 重置报表 */
                resetReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
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
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.DataTableServiceProxy({
                                                data: that.viewContent.dataTable,
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let popover: sap.m.Popover = new sap.m.Popover("", {
                                                    showHeader: false,
                                                    placement: sap.m.PlacementType.Bottom,
                                                });
                                                for (let service of services) {
                                                    popover.addContent(new sap.m.Button("", {
                                                        text: ibas.i18n.prop(service.name),
                                                        type: sap.m.ButtonType.Transparent,
                                                        icon: service.icon,
                                                        press: function (): void {
                                                            service.run();
                                                            popover.close();
                                                        }
                                                    }));
                                                }
                                                popover.addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                                popover.openBy(event.getSource(), true);
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                            this.viewContent.draw()
                        ]
                    });
                }
                private page: sap.m.Page;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.viewContent.showReport(report);
                }
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    let type: emResultType = this.viewContent.showResults(table);
                    if (type === emResultType.HTML) {
                        this.page.setShowSubHeader(false);
                    } else {
                        this.page.setShowSubHeader(true);
                        (<any>this.page.getFooter()).setVisible(true);
                    }
                }
                proceeding(type: ibas.emMessageType, msg: string): void {
                    this.application.viewShower.proceeding(this, type, msg);
                }
                messages(caller: ibas.IMessgesCaller): void {
                    this.application.viewShower.messages(caller);
                }
                protected viewContent: ReportViewContent = new ReportViewContent(this);
            }
            /**
             * 视图-报表查看-对话框，需要与上保持同步
             */
            export class ReportDialogViewView extends ibas.DialogView implements app.IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 重置报表 */
                resetReportEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        subHeader: new sap.m.Toolbar("", {
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
                        }),
                        content: [
                            this.viewContent.draw()
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
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.viewContent.showReport(report);
                }
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.viewContent.showResults(table);
                }
                proceeding(type: ibas.emMessageType, msg: string): void {
                    this.application.viewShower.proceeding(this, type, msg);
                }
                messages(caller: ibas.IMessgesCaller): void {
                    this.application.viewShower.messages(caller);
                }
                protected viewContent: ReportViewContent = new ReportViewContent(this);
            }
            /**
             * 视图-报表查看-对话框，需要与上保持同步
             */
            export class ReportDataChooseView extends ReportDialogViewView implements app.IReportDataChooseView {
                /** 选择数据 */
                chooseDataEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        content: [
                            this.dataContainer = this.viewContent.draw()
                        ],
                        beginButton: this.button = new sap.m.Button("", {
                            text: ibas.i18n.prop("shell_run"),
                            type: sap.m.ButtonType.Transparent,
                            press: function (this: sap.m.Button): void {
                                if (this.getType() === sap.m.ButtonType.Accept) {
                                    that.fireViewEvents(that.chooseDataEvent, that.selectedDataTable());
                                } else {
                                    that.fireViewEvents(that.runReportEvent);
                                }
                            }
                        }),
                        endButton: new sap.m.Button("", {
                            text: ibas.i18n.prop("shell_exit"),
                            type: sap.m.ButtonType.Transparent,
                            press: function (): void {
                                that.fireViewEvents(that.closeEvent);
                            }
                        }),
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private button: sap.m.Button;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    super.showResults.apply(this, arguments);
                    this.button.setType(sap.m.ButtonType.Accept);
                    this.button.setText(ibas.i18n.prop("shell_confirm"));
                }
                private dataContainer: any;
                protected viewContent: ReportViewContent = new ReportViewContent(this);
                /** 获取选择的数据 */
                selectedDataTable(): ibas.DataTable {
                    if (this.dataContainer instanceof sap.ui.layout.cssgrid.CSSGrid) {
                        for (let item of this.dataContainer.getItems()) {
                            if (item instanceof sap.ui.table.Table) {
                                let indices: number[] = item.getSelectedIndices();
                                if ((indices instanceof Array) && indices.length > 0) {
                                    return this.viewContent.dataTable.clone(indices);
                                }
                            }
                        }
                    }
                    return null;
                }
            }
        }
    }
}