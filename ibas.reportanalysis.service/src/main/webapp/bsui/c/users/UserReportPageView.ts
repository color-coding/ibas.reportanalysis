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
                    jQuery.sap.require("sap.ui.layout.cssgrid.GridBasicLayout");
                    this.multiCombobox = new sap.m.MultiComboBox("", {
                        width: "auto",
                        placeholder: ibas.i18n.prop("reportanalysisusers_filter_report_by_groups"),
                        selectionFinish: function (): void {
                            that.rebuildView();
                        },
                    });
                    this.gridList = new sap.extension.f.GridList("", {
                        mode: sap.m.ListMode.None,
                        showNoData: false,
                        customLayout: new sap.ui.layout.cssgrid.GridBasicLayout("", {
                            gridTemplateColumns: "repeat(auto-fill, minmax(16rem, auto))",
                            gridGap: "4px 4px",
                        }),
                    });
                    return new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.scrollContainer = new sap.m.ScrollContainer("", {
                                vertical: true,
                                height: "100%",
                                content: [
                                    this.gridList
                                ]
                            }).addStyleClass("sapUiContentPadding")
                        ],
                        footer: new sap.m.Toolbar("", {
                            content: [
                                this.expandButton = new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://navigation-up-arrow",
                                    visible: false,
                                    press(): void {
                                        that.toggleExpandAll();
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                this.multiCombobox,
                                this.searchField = new sap.m.SearchField("", {
                                    liveChange: function (oEvent: sap.ui.base.Event): void {
                                        that.searchQuery = this.getValue();
                                        that.rebuildView();
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
                                        that.searchField.setValue("");
                                        that.searchQuery = "";
                                    },
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_report"),
                                                icon: that.getIcon(bo.emReportType.REPORT),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.REPORT);
                                                    that.multiCombobox.destroyItems();
                                                    that.searchField.setValue("");
                                                    that.searchQuery = "";
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_service"),
                                                icon: that.getIcon(bo.emReportType.SERVICE),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.SERVICE);
                                                    that.multiCombobox.destroyItems();
                                                    that.searchField.setValue("");
                                                    that.searchQuery = "";
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_file"),
                                                icon: that.getIcon(bo.emReportType.FILE),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.FILE);
                                                    that.multiCombobox.destroyItems();
                                                    that.searchField.setValue("");
                                                    that.searchQuery = "";
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("reportanalysisusers_refresh_3rdparty"),
                                                icon: that.getIcon(bo.emReportType.THIRD_APP),
                                                press: function (): void {
                                                    that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.THIRD_APP);
                                                    that.multiCombobox.destroyItems();
                                                    that.searchField.setValue("");
                                                    that.searchQuery = "";
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
                private scrollContainer: sap.m.ScrollContainer;
                private gridList: sap.extension.f.GridList;
                /** 搜索框 */
                private searchField: sap.m.SearchField;
                /** 展开/收缩钮 */
                private expandButton: sap.m.Button;
                /** 是否全部展开 */
                private allExpanded: boolean = true;
                /** 报表筛选条件下拉菜单 */
                private multiCombobox: sap.m.MultiComboBox;
                /** 排序钮 */
                private button: sap.m.Button;
                /** 搜索关键字 */
                private searchQuery: string = "";
                /** 全部报表数据 */
                private allReports: bo.UserReport[];
                /** 获取已选中的分组 */
                private getSelectedGroups(): string[] {
                    let groups: string[] = [];
                    for (let item of this.multiCombobox.getSelectedItems()) {
                        groups.push(item.getText());
                    }
                    return groups;
                }
                /** 获取筛选后的报表 */
                private getFilteredReports(): bo.UserReport[] {
                    let reports: bo.UserReport[] = this.allReports || [];
                    let groups: string[] = this.getSelectedGroups();
                    if (groups.length > 0) {
                        reports = reports.filter(function (r: bo.UserReport): boolean {
                            return !ibas.strings.isEmpty(r.group) && groups.indexOf(r.group) >= 0;
                        });
                    }
                    if (!ibas.strings.isEmpty(this.searchQuery)) {
                        let query: string = this.searchQuery.toLowerCase();
                        reports = reports.filter(function (r: bo.UserReport): boolean {
                            return (r.name && r.name.toLowerCase().indexOf(query) >= 0)
                                || String(r.id).indexOf(query) >= 0;
                        });
                    }
                    return reports;
                }
                /** 根据筛选状态重建视图 */
                private rebuildView(): void {
                    let groups: string[] = this.getSelectedGroups();
                    let filteredReports: bo.UserReport[] = this.getFilteredReports();
                    this.scrollContainer.removeAllContent();
                    if (groups.length > 0) {
                        let groupedReports: { [key: string]: bo.UserReport[] } = {};
                        let ungroupedReports: bo.UserReport[] = [];
                        for (let report of filteredReports) {
                            if (!ibas.strings.isEmpty(report.group)) {
                                if (!groupedReports[report.group]) {
                                    groupedReports[report.group] = [];
                                }
                                groupedReports[report.group].push(report);
                            } else {
                                ungroupedReports.push(report);
                            }
                        }
                        let vbox: sap.m.VBox = new sap.m.VBox("", { width: "100%" });
                        for (let groupName of groups) {
                            let groupReports: bo.UserReport[] = groupedReports[groupName];
                            if (!groupReports || groupReports.length === 0) {
                                continue;
                            }
                            let panel: sap.m.Panel = new sap.m.Panel("", {
                                headerText: groupName,
                                expandable: true,
                                expanded: true,
                                backgroundDesign: sap.m.BackgroundDesign.Translucent,
                            });
                            let grid: sap.extension.f.GridList = new sap.extension.f.GridList("", {
                                mode: sap.m.ListMode.None,
                                showNoData: false,
                                customLayout: new sap.ui.layout.cssgrid.GridBasicLayout("", {
                                    gridTemplateColumns: "repeat(auto-fill, minmax(16rem, auto))",
                                    gridGap: "8px 8px",
                                }),
                            });
                            for (let report of groupReports) {
                                grid.addItem(this.createTile(report));
                            }
                            panel.addContent(grid);
                            vbox.addItem(panel);
                        }
                        if (ungroupedReports.length > 0) {
                            let grid: sap.extension.f.GridList = new sap.extension.f.GridList("", {
                                mode: sap.m.ListMode.None,
                                showNoData: false,
                                customLayout: new sap.ui.layout.cssgrid.GridBasicLayout("", {
                                    gridTemplateColumns: "repeat(auto-fill, minmax(16rem, auto))",
                                    gridGap: "8px 8px",
                                }),
                            });
                            for (let report of ungroupedReports) {
                                grid.addItem(this.createTile(report));
                            }
                            vbox.addItem(grid);
                        }
                        this.scrollContainer.addContent(vbox);
                    } else {
                        this.gridList.removeAllItems();
                        for (let report of filteredReports) {
                            this.gridList.addItem(this.createTile(report));
                        }
                        this.scrollContainer.addContent(this.gridList);
                    }
                    this.expandButton.setVisible(groups.length > 0);
                    this.allExpanded = true;
                    this.expandButton.setIcon("sap-icon://navigation-up-arrow");
                }
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
                    if (this.multiCombobox.getItems().length === 0) {
                        for (let item of groups) {
                            this.multiCombobox.addItem(new sap.ui.core.Item("", {
                                text: item
                            }));
                        }
                    }
                    this.allReports = reports.slice();
                    this.rebuildView();
                }
                /** 创建报表卡片 */
                private createTile(report: bo.UserReport): sap.f.GridListItem {
                    let that: this = this;
                    let objectNumber: sap.m.ObjectNumber = new sap.m.ObjectNumber("", {
                        number: "",
                    }).addStyleClass("sapMObjectNumberLarge");
                    let item: sap.f.GridListItem = new sap.f.GridListItem("", {
                        type: sap.m.ListType.Active,
                        content: [
                            new sap.f.Card("", {
                                width: "100%",
                                height: "100%",
                                header: new sap.f.cards.Header("", {
                                    title: ibas.strings.format("# {0}", report.id),
                                    subtitle: report.name,
                                    iconSrc: this.getIcon(report.category),
                                    press: function (): void {
                                        that.fireViewEvents(that.activeReportEvent, report);
                                    }
                                }),
                                content: [
                                    new sap.m.FlexBox("", {
                                        alignItems: sap.m.FlexAlignItems.Center,
                                        justifyContent: sap.m.FlexJustifyContent.Center,
                                        items: [objectNumber]
                                    })
                                ],
                            })
                        ],
                    });
                    item.data("objectNumber", objectNumber);
                    return item;
                }
                /** 批量展开/收缩分组 */
                private toggleExpandAll(): void {
                    this.allExpanded = !this.allExpanded;
                    this.expandButton.setIcon(this.allExpanded ? "sap-icon://navigation-up-arrow" : "sap-icon://navigation-down-arrow");
                    for (let content of this.scrollContainer.getContent()) {
                        if (content instanceof sap.m.VBox) {
                            for (let child of content.getItems()) {
                                if (child instanceof sap.m.Panel) {
                                    child.setExpanded(this.allExpanded);
                                }
                            }
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
                /** 查找ObjectNumber */
                private findObjectNumber(reportId: string): sap.m.ObjectNumber {
                    for (let content of this.scrollContainer.getContent()) {
                        if (content instanceof sap.extension.f.GridList) {
                            for (let item of content.getItems()) {
                                if (!(item instanceof sap.f.GridListItem)) {
                                    continue;
                                }
                                let r: bo.UserReport = item.data("report");
                                if (r && String(r.id) === reportId) {
                                    return item.data("objectNumber");
                                }
                            }
                        } else if (content instanceof sap.m.VBox) {
                            for (let child of content.getItems()) {
                                let grids: sap.extension.f.GridList[] = [];
                                if (child instanceof sap.m.Panel) {
                                    for (let panelContent of child.getContent()) {
                                        if (panelContent instanceof sap.extension.f.GridList) {
                                            grids.push(panelContent);
                                        }
                                    }
                                } else if (child instanceof sap.extension.f.GridList) {
                                    grids.push(child);
                                }
                                for (let grid of grids) {
                                    for (let item of grid.getItems()) {
                                        if (!(item instanceof sap.f.GridListItem)) {
                                            continue;
                                        }
                                        let r: bo.UserReport = item.data("report");
                                        if (r && String(r.id) === reportId) {
                                            return item.data("objectNumber");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                }
                /** 更新KPI */
                updateReport(report: bo.UserReport, table: ibas.DataTable): void {
                    let results: any[] = table.convert();
                    let objectNumber: sap.m.ObjectNumber = this.findObjectNumber(String(report.id));
                    if (objectNumber) {
                        for (let result of results) {
                            if (result.Key === "${Kpi}") {
                                objectNumber.setNumber(result.Value);
                            }
                        }
                    }
                }
            }
        }
    }
}