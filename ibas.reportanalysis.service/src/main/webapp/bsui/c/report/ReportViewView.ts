/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        class DataTableServiceProxy extends ibas.DataTableServiceProxy {
            constructor(contract: ibas.IDataTableServiceContract) {
                if (contract.data instanceof ibas.DataTable) {
                    // 去除标记字符
                    let data: ibas.DataTable = contract.data.clone();
                    for (let column of data.columns) {
                        if (typeof column.description === "string") {
                            let index: number = column.description.indexOf("#{");
                            if (index > 0 && ibas.strings.isWith(column.description, undefined, "}")) {
                                column.description = column.description.substring(0, index);
                            }
                        } else if (typeof column.name === "string") {
                            let index: number = column.name.indexOf("#{");
                            if (index > 0 && ibas.strings.isWith(column.name, undefined, "}")) {
                                column.name = column.name.substring(0, index);
                            }
                        }
                    }
                    for (let row of data.rows) {
                        for (let i: number = 0; i < row.cells.length; i++) {
                            let cell: any = row.cells[i];
                            if (typeof cell === "string") {
                                let index: number = cell.indexOf("#{");
                                if (index > 0 && ibas.strings.isWith(cell, undefined, "}")) {
                                    row.cells[i] = cell.substring(0, index);
                                }
                            }
                        }
                    }
                    super({
                        data: data,
                    });
                } else {
                    super(contract);
                }
            }
        }
        export namespace c {
            /**
             * 视图-Report
             */
            export class ReportViewView extends ibas.View implements IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 重置报表 */
                resetReportEvent: Function;
                /** 值链接事件 */
                valueLinkEvent: Function;
                /** 触发事件 */
                fireValueLink(objectCode: string, value: string, row?: any): void {
                    this.fireViewEvents(this.valueLinkEvent, objectCode, value, row);
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.viewContainer = new sap.m.Page("", {
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
                                        for (let item of (<any>that.viewContainer.getFooter()).getContent()) {
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
                                            proxy: new DataTableServiceProxy({
                                                data: that.viewData,
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let actionSheet: sap.m.ActionSheet = new sap.m.ActionSheet("", {
                                                    placement: sap.m.PlacementType.Bottom,
                                                    buttons: {
                                                        path: "/",
                                                        template: new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            text: {
                                                                path: "name",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? ibas.i18n.prop(data) : "";
                                                                }
                                                            },
                                                            icon: {
                                                                path: "icon",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? data : "sap-icon://e-care";
                                                                }
                                                            },
                                                            press(this: sap.m.Button): void {
                                                                let service: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                                if (service) {
                                                                    service.run();
                                                                }
                                                            }
                                                        })
                                                    }
                                                });
                                                actionSheet.setModel(new sap.extension.model.JSONModel(services));
                                                actionSheet.openBy(event.getSource());
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                        ],
                        floatingFooter: true,
                        showFooter: false,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                /*
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
                                                    let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
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
                                                    let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
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
                                                    let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
                                                    if (table instanceof sap.ui.table.Table) {
                                                        table.clearSelection();
                                                    }
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                */
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
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("reportanalysis_text_align"),
                                    icon: "sap-icon://outdent",
                                    type: sap.m.ButtonType.Accept,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_left"),
                                                icon: "sap-icon://outdent",
                                                press: function (): void {
                                                    let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
                                                    if (table instanceof sap.ui.table.Table) {
                                                        for (let row of table.getRows()) {
                                                            for (let cell of row.getCells()) {
                                                                if (cell instanceof sap.m.Text || cell instanceof sap.m.Link) {
                                                                    cell.setTextAlign(sap.ui.core.TextAlign.Left);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    this.getParent().getParent().setIcon(this.getIcon());
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_right"),
                                                icon: "sap-icon://indent",
                                                press: function (): void {
                                                    let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
                                                    if (table instanceof sap.ui.table.Table) {
                                                        for (let row of table.getRows()) {
                                                            for (let cell of row.getCells()) {
                                                                if (cell instanceof sap.m.Text || cell instanceof sap.m.Link) {
                                                                    cell.setTextAlign(sap.ui.core.TextAlign.Right);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    this.getParent().getParent().setIcon(this.getIcon());
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_number_left"),
                                                icon: "sap-icon://outdent",
                                                press: function (): void {
                                                    let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
                                                    if (table instanceof sap.ui.table.Table) {
                                                        for (let row of table.getRows()) {
                                                            for (let cell of row.getCells()) {
                                                                if (cell instanceof sap.m.Text || cell instanceof sap.m.Link) {
                                                                    let binding: any = cell.getBinding("bindingValue");
                                                                    if (binding?.getType() instanceof sap.ui.model.type.Float
                                                                        || binding?.getType() instanceof sap.ui.model.type.Integer) {
                                                                        cell.setTextAlign(sap.ui.core.TextAlign.Begin);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    this.getParent().getParent().setIcon(this.getIcon());
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_number_right"),
                                                icon: "sap-icon://indent",
                                                press: function (): void {
                                                    let table: sap.ui.table.Table = (<any>that.viewContainer.getContent()[0]);
                                                    if (table instanceof sap.ui.table.Table) {
                                                        for (let row of table.getRows()) {
                                                            for (let cell of row.getCells()) {
                                                                if (cell instanceof sap.m.Text || cell instanceof sap.m.Link) {
                                                                    let binding: any = cell.getBinding("bindingValue");
                                                                    if (binding?.getType() instanceof sap.ui.model.type.Float
                                                                        || binding?.getType() instanceof sap.ui.model.type.Integer) {
                                                                        cell.setTextAlign(sap.ui.core.TextAlign.End);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    this.getParent().getParent().setIcon(this.getIcon());
                                                }
                                            }),
                                        ],
                                    })
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
                                new sap.m.ToolbarSeparator(""),
                                this.chartMenus = new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("reportanalysis_chart_display"),
                                    icon: "sap-icon://line-charts",
                                    type: sap.m.ButtonType.Accept,
                                    visible: false,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_chart_pie"),
                                                icon: "sap-icon://pie-chart",
                                                press: function (): void {
                                                    let app: reportanalysis.app.ReportChartsApp = new reportanalysis.app.ReportChartsApp();
                                                    app.navigation = that.application.navigation;
                                                    app.viewShower = that.application.viewShower;
                                                    app.run(that.viewData, reportanalysis.app.ChartType.PIE);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_chart_line"),
                                                icon: "sap-icon://line-chart",
                                                press: function (): void {
                                                    let app: reportanalysis.app.ReportChartsApp = new reportanalysis.app.ReportChartsApp();
                                                    app.navigation = that.application.navigation;
                                                    app.viewShower = that.application.viewShower;
                                                    app.run(that.viewData, reportanalysis.app.ChartType.LINE);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_chart_scatter"),
                                                icon: "sap-icon://scatter-chart",
                                                press: function (): void {
                                                    let app: reportanalysis.app.ReportChartsApp = new reportanalysis.app.ReportChartsApp();
                                                    app.navigation = that.application.navigation;
                                                    app.viewShower = that.application.viewShower;
                                                    app.run(that.viewData, reportanalysis.app.ChartType.SCATTER);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysis_chart_bubble"),
                                                icon: "sap-icon://bubble-chart",
                                                press: function (): void {
                                                    let app: reportanalysis.app.ReportChartsApp = new reportanalysis.app.ReportChartsApp();
                                                    app.navigation = that.application.navigation;
                                                    app.viewShower = that.application.viewShower;
                                                    app.run(that.viewData, reportanalysis.app.ChartType.BUBBLE);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                    });
                }
                viewContainer: sap.m.Page;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.viewContent.showReport(report);
                }
                viewData: ibas.DataTable;
                private countText: sap.extension.m.Text;
                private chartMenus: sap.m.MenuButton;

                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.viewContent.showResults(this.viewData = table);
                    let toolBar: any = this.viewContainer.getFooter();
                    if (toolBar instanceof sap.m.Toolbar) {
                        if (ibas.objects.isNull(this.countText)) {
                            this.countText = new sap.extension.m.Text("", {
                            });
                            toolBar.insertContent(this.countText, 0);
                        }
                        this.countText.setText(ibas.i18n.prop("reportanalysis_ui_count", table.rows.length));
                    }
                    // 判断表格是否可形成图表
                    if (table?.rows.length > 1 && table?.columns.length > 1) {
                        this.chartMenus.setVisible(true);
                    } else {
                        this.chartMenus.setVisible(false);
                    }
                }
                proceeding(type: ibas.emMessageType, msg: string): void {
                    this.application.viewShower.proceeding(this, type, msg);
                }
                messages(caller: ibas.IMessgesCaller): void {
                    if (ibas.strings.isEmpty(caller.title)) {
                        caller.title = ibas.i18n.prop("reportanalysis_app_report_view");
                    }
                    this.application.viewShower.messages(caller);
                }
                protected viewContent: ReportViewContent = new ReportViewContent(this, ibas.emChooseType.SINGLE);
            }
            /**
             * 视图-报表查看-页签，需要与上保持同步
             */
            export class ReportTabViewView extends ibas.TabView implements app.IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 重置报表 */
                resetReportEvent: Function;
                /** 值链接事件 */
                valueLinkEvent: Function;
                /** 触发事件 */
                fireValueLink(objectCode: string, value: string, row?: any): void {
                    this.fireViewEvents(this.valueLinkEvent, objectCode, value, row);
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.viewContainer = new sap.m.Page("", {
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
                                            proxy: new DataTableServiceProxy({
                                                data: that.viewData,
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let actionSheet: sap.m.ActionSheet = new sap.m.ActionSheet("", {
                                                    placement: sap.m.PlacementType.Bottom,
                                                    buttons: {
                                                        path: "/",
                                                        template: new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            text: {
                                                                path: "name",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? ibas.i18n.prop(data) : "";
                                                                }
                                                            },
                                                            icon: {
                                                                path: "icon",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? data : "sap-icon://e-care";
                                                                }
                                                            },
                                                            press(this: sap.m.Button): void {
                                                                let service: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                                if (service) {
                                                                    service.run();
                                                                }
                                                            }
                                                        })
                                                    }
                                                });
                                                actionSheet.setModel(new sap.extension.model.JSONModel(services));
                                                actionSheet.openBy(event.getSource());
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                        ]
                    });
                }
                viewContainer: sap.m.Page;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.viewContent.showReport(report);
                }
                viewData: ibas.DataTable;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.viewContent.showResults(this.viewData = table);
                }
                proceeding(type: ibas.emMessageType, msg: string): void {
                    this.application.viewShower.proceeding(this, type, msg);
                }
                messages(caller: ibas.IMessgesCaller): void {
                    if (ibas.strings.isEmpty(caller.title)) {
                        caller.title = ibas.i18n.prop("reportanalysis_app_report_view");
                    }
                    this.application.viewShower.messages(caller);
                }
                protected viewContent: ReportViewContent = new ReportViewContent(this, ibas.emChooseType.SINGLE);
            }
            /**
             * 视图-报表查看-对话框，需要与上保持同步
             */
            export class ReportDialogViewView extends ibas.DialogView implements app.IReportViewView {
                /** 运行报表 */
                runReportEvent: Function;
                /** 重置报表 */
                resetReportEvent: Function;
                /** 值链接事件 */
                valueLinkEvent: Function;
                /** 触发事件 */
                fireValueLink(objectCode: string, value: string, row?: any): void {
                    this.fireViewEvents(this.valueLinkEvent, objectCode, value, row);
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.viewContainer = new sap.m.Dialog("", {
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
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                }
                viewContainer: sap.m.Dialog;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.viewContent.showReport(report);
                }
                viewData: ibas.DataTable;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.viewContent.showResults(this.viewData = table);
                }
                proceeding(type: ibas.emMessageType, msg: string): void {
                    this.application.viewShower.proceeding(this, type, msg);
                }
                messages(caller: ibas.IMessgesCaller): void {
                    if (ibas.strings.isEmpty(caller.title)) {
                        caller.title = ibas.i18n.prop("reportanalysis_app_report_view");
                    }
                    this.application.viewShower.messages(caller);
                }
                protected viewContent: ReportViewContent = new ReportViewContent(this, ibas.emChooseType.MULTIPLE);
            }
            /**
             * 视图-报表查看-对话框，需要与上保持同步
             */
            export class ReportDataChooseView extends ReportDialogViewView implements app.IReportDataChooseView {
                /** 选择数据 */
                chooseDataEvent: Function;
                /** 选择方式 */
                chooseType: ibas.emChooseType;
                /** 选择第一行 */
                chooseFirtData: ibas.emYesNo;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.viewContainer = new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        content: [
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_run"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (this: sap.m.Button): void {
                                    that.fireViewEvents(that.runReportEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                visible: false,
                                text: ibas.i18n.prop("shell_confirm"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (this: sap.m.Button): void {
                                    that.fireViewEvents(that.chooseDataEvent, that.selectedDataTable());
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                }
                viewContainer: sap.m.Dialog;
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    if (this.chooseFirtData === ibas.emYesNo.YES) {
                        if (table?.rows?.length > 0) {
                            this.fireViewEvents(this.chooseDataEvent, table.clone([0]));
                            return;
                        }
                    }
                    this.viewContainer.getButtons()[0].setVisible(false);
                    this.viewContainer.getButtons()[1].setVisible(true);
                    super.showResults.apply(this, arguments);
                    if (this.viewContainer instanceof sap.m.Dialog) {
                        for (let item of this.viewContainer.getContent()) {
                            if (item instanceof sap.extension.table.Table) {
                                item.setChooseType(this.chooseType);
                            } else if (item instanceof sap.extension.m.List) {
                                item.setChooseType(this.chooseType);
                            }
                        }
                    }
                }
                /** 获取选择的数据 */
                selectedDataTable(): ibas.DataTable {
                    if (this.viewContainer instanceof sap.m.Dialog) {
                        for (let item of this.viewContainer.getContent()) {
                            if (item instanceof sap.extension.table.Table) {
                                let model: any = item.getModel()?.getData("rows");
                                if (model instanceof Array) {
                                    let indices: number[] = [];
                                    for (let selected of item.getSelecteds()) {
                                        let index: number = model.indexOf(selected);
                                        if (index >= 0) {
                                            indices.push(index);
                                        }
                                    }
                                    if (indices.length > 0) {
                                        return this.viewData.clone(indices);
                                    }
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