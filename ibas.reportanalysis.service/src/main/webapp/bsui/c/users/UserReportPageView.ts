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
            export class UserReportPageView extends ibas.View implements app.IUserReportPageView {
                /** 激活报表 */
                activeReportEvent: Function;
                /** 刷新报表 */
                refreshReportsEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.multiCombobox = new sap.m.MultiComboBox("", {
                        width: "auto",
                        placeholder: ibas.i18n.prop("reportanalysisusers_filter_report_by_groups"),
                        selectionFinish: function (oEvent: any): void {
                            let groups: ibas.ArrayList<string> = new ibas.ArrayList<string>();
                            for (let item of that.multiCombobox.getSelectedItems()) {
                                groups.push(item.getText());
                            }
                            for (let item of that.container.getTiles()) {
                                if (item instanceof sap.m.StandardTile) {
                                    item.setVisible(true);
                                    if (groups.length === 0) {
                                        continue;
                                    }
                                    let report: bo.UserReport = (<any>item.getModel()).getData();
                                    if (ibas.objects.isNull(report)) {
                                        continue;
                                    }
                                    if (groups.contain(report.group)) {
                                        continue;
                                    }
                                    item.setVisible(false);
                                }
                            }
                            let model: any = (<any>that.container.getBinding("tiles"));
                            if (model instanceof sap.ui.model.ListBinding) {
                                let filters: sap.ui.model.Filter[] = [];
                                for (let item of groups) {
                                    filters.push(new sap.ui.model.Filter("group", sap.ui.model.FilterOperator.Contains, item));
                                }
                                if (filters.length > 0) {
                                    model.filter(new sap.ui.model.Filter({
                                        filters: filters,
                                        and: false
                                    }));
                                } else {
                                    model.filter(undefined);
                                }
                            }
                        },
                    });
                    return new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.container = new sap.m.TileContainer("", {
                                tiles: {
                                    path: "/",
                                    template: new sap.m.StandardTile("", {
                                        info: "# {id}",
                                        title: "{name}",
                                        icon: {
                                            path: "category",
                                            formatter(data: any): string {
                                                return that.getIcon(data);
                                            }
                                        },
                                        press(): void {
                                            that.fireViewEvents(that.activeReportEvent, this.getBindingContext().getObject());
                                        }
                                    })
                                }
                            })
                        ],
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                this.multiCombobox,
                                new sap.m.SearchField("", {
                                    liveChange: function (oEvent: sap.ui.base.Event): void {
                                        let sQuery: string = this.getValue();
                                        let aFilters: ibas.ArrayList<sap.ui.model.Filter> = new ibas.ArrayList<sap.ui.model.Filter>();
                                        let oBinding: any = that.container.getBinding("tiles");
                                        if (sQuery) {
                                            // 对多个属性进行搜索
                                            let oFilter: sap.ui.model.Filter = new sap.ui.model.Filter([
                                                new sap.ui.model.Filter(
                                                    ibas.businessobjects.properties.naming.lowerCamelCase(reportanalysis.bo.Report.PROPERTY_NAME_NAME),
                                                    sap.ui.model.FilterOperator.Contains, sQuery
                                                ),
                                                new sap.ui.model.Filter(
                                                    ibas.businessobjects.properties.naming.lowerCamelCase(reportanalysis.bo.Report.PROPERTY_OBJECTKEY_NAME),
                                                    sap.ui.model.FilterOperator.Contains, sQuery
                                                )
                                            ], false);
                                            aFilters.push(oFilter);
                                        }
                                        // 应用过滤器
                                        oBinding.filter(aFilters);
                                    }
                                }),
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("shell_refresh"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://refresh",
                                    buttonMode: sap.m.MenuButtonMode.Split,
                                    textDirection: sap.ui.core.TextDirection.Inherit,
                                    useDefaultActionOnly: true,
                                    defaultAction: function (): void {
                                        that.fireViewEvents(that.refreshReportsEvent);
                                        that.multiCombobox.destroyItems();
                                    },
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_report"),
                                                icon: that.getIcon(bo.emReportType.REPORT),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.REPORT);
                                                    that.multiCombobox.destroyItems();
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_service"),
                                                icon: that.getIcon(bo.emReportType.SERVICE),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.SERVICE);
                                                    that.multiCombobox.destroyItems();
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_file"),
                                                icon: that.getIcon(bo.emReportType.FILE),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.FILE);
                                                    that.multiCombobox.destroyItems();
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_3rdparty"),
                                                icon: that.getIcon(bo.emReportType.THIRD_APP),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.THIRD_APP);
                                                    that.multiCombobox.destroyItems();
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                this.button = new sap.m.Button("", {
                                    type: sap.m.ButtonType.Emphasized,
                                    icon: "sap-icon://alphabetical-order",
                                    press(event: sap.ui.base.Event): void {
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.Button) {
                                            if (source.getType() === sap.m.ButtonType.Transparent) {
                                                source.setType(sap.m.ButtonType.Emphasized);
                                            } else if (source.getType() === sap.m.ButtonType.Emphasized) {
                                                source.setType(sap.m.ButtonType.Transparent);
                                            }
                                        }
                                    }
                                }),
                            ]
                        })
                    });
                }
                private container: sap.m.TileContainer;
                /** 报表筛选条件下拉菜单 */
                private multiCombobox: sap.m.MultiComboBox;
                /** 排序钮 */
                private button: sap.m.Button;
                /** 显示数据 */
                showReports(reports: bo.UserReport[]): void {
                    if (this.button.getType() === sap.m.ButtonType.Emphasized && reports.length > 0) {
                        reports.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1;
                            } else if (a.name < b.name) {
                                return -1;
                            }
                            return 0;
                        });
                    }
                    let groups: ibas.IList<string> = new ibas.ArrayList<string>();
                    for (let item of reports) {
                        if (!ibas.strings.isEmpty(item.group) && !groups.contain(item.group)) {
                            groups.add(item.group);
                        }
                    }
                    let model: sap.ui.model.json.JSONModel = new sap.ui.model.json.JSONModel(reports);
                    model.setSizeLimit(reports.length);
                    this.container.setModel(model);
                    if (this.multiCombobox.getItems().length === 0) {
                        for (let item of groups) {
                            this.multiCombobox.addItem(new sap.ui.core.Item("", {
                                text: item
                            }));
                        }
                    }
                }
                private getIcon(type: bo.emReportType): string {
                    if (type === bo.emReportType.REPORT) {
                        return "sap-icon://bbyd-dashboard";
                    } else if (type === bo.emReportType.SERVICE) {
                        return "sap-icon://kpi-corporate-performance";
                    } else if (type === bo.emReportType.THIRD_APP) {
                        return "sap-icon://puzzle";
                    }
                    return "sap-icon://pie-chart";
                }
                /** 更新KPI */
                updateReport(report: bo.UserReport, table: ibas.DataTable): void {
                    let results: any[] = table.convert();
                    for (let item of this.container.getTiles()) {
                        if (item instanceof sap.m.StandardTile) {
                            if (item.getInfo() === ibas.strings.format("# {0}", report.id)) {
                                for (let result of results) {
                                    if (result.Key === "${Kpi}") {
                                        item.setNumber(result.Value);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}