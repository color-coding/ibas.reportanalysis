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
import { IUserReportPageView } from "../../../bsapp/users/index";
import { BORepositoryReportAnalysis } from "../../../borep/BORepositories";
/**
 * 视图-Report
 */
export class UserReportPageView extends ibas.View implements IUserReportPageView {
    /** 激活报表 */
    activeReportEvent: Function;
    /** 刷新报表 */
    refreshReportsEvent: Function;
    private page: sap.m.Page;
    private container: sap.m.TileContainer;
    /** 页面头部 */
    private mainHeader: sap.tnt.ToolHeader;
    /** 报表筛选条件下拉菜单 */
    private multicombobox: sap.m.MultiComboBox;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.multicombobox = new sap.m.MultiComboBox("", {
            width: "20%",
            Deselected: true,
            filterSecondaryValues: false,
            showSecondaryValues: true,
            placement: sap.m.PlacementType.Auto,
            selectionFinish: function (oEvent) {
                let selectedItems = oEvent.getParameter("selectedItems");
                let messageText: any[] = [];
                for (let i = 0; i < selectedItems.length; i++) {
                    messageText.push(selectedItems[i].getText());
                };
                that.groupsTranslateReports(messageText);
            },
        });
        this.container = new sap.m.TileContainer("", {
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            content: [
                this.container,
            ],
            footer: new sap.m.Toolbar("", {
                content: [
                    new sap.m.ToolbarSpacer(""),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("sys_shell_refresh"),
                        type: sap.m.ButtonType.Transparent,
                        width: "auto",
                        icon: "sap-icon://refresh",
                        buttonMode: sap.m.MenuButtonMode.Split,
                        defaultAction: function (): void {
                            that.fireViewEvents(that.refreshReportsEvent);
                        },
                        menu: new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("reportanalysisusers_refresh_all"),
                                    icon: "sap-icon://opportunity"
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("reportanalysisusers_refresh_kpi"),
                                    icon: that.getIcon(bo.emReportType.KPI)
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("reportanalysisusers_refresh_boe"),
                                    icon: that.getIcon(bo.emReportType.BOE)
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("reportanalysisusers_refresh_report"),
                                    icon: that.getIcon(bo.emReportType.REPORT)
                                }),
                            ],
                            itemSelected: function (event: any): void {
                                let item: any = event.getParameter("item");
                                if (item instanceof sap.m.MenuItem) {
                                    if (item.getIcon() === that.getIcon(bo.emReportType.KPI)) {
                                        that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.KPI);
                                    } else if (item.getIcon() === that.getIcon(bo.emReportType.BOE)) {
                                        that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.BOE);
                                    } else if (item.getIcon() === that.getIcon(bo.emReportType.REPORT)) {
                                        that.fireViewEvents(that.refreshReportsEvent, bo.emReportType.REPORT);
                                    } else {
                                        that.fireViewEvents(that.refreshReportsEvent);
                                    }
                                }
                            }
                        })
                    }),
                    this.multicombobox,
                    new sap.m.ToolbarSpacer(""),
                ]
            })
        });
        this.id = this.page.getId();
        return this.page;
    }
    /** 显示数据 */
    showReports(reports: bo.UserReport[]): void {
        this.container.destroyTiles();
        let reportgroups: string[] = [];
        let that: this = this;
        for (let item of reports) {
            this.container.addTile(
                new sap.m.StandardTile("", {
                    info: ibas.i18n.prop("reportanalysis_report_id", item.id),
                    icon: this.getIcon(item.category),
                    title: item.name,
                    press(): void {
                        that.fireViewEvents(that.activeReportEvent, item);
                    }
                })
            );
            //将用户报表组别添加进reportgroups
            if (reportgroups.length > 0) {
                let status = false;
                for (let i = 0; i < reportgroups.length; i++) {
                    if (reportgroups[i] === item.group) {
                        status = true;
                    }
                    if (i === reportgroups.length - 1 && status === false) {
                        reportgroups.push(item.group)
                    }
                }
            } else {
                reportgroups.push(item.group);
            }
        };
        //解决选择筛选条件后下拉框元素重组
        if (this.multicombobox.getItems().length === 0) {
            this.initMulticomboboxItem(reportgroups);
            //将第一次获取到的当前用户报表保存
            this.reports = reports;
        }
    }
    /** 当前用户报表集合 */
    reports: bo.UserReport[];
    /** 将用户选择的条件转化为具体哪些报表作为参数传给showReports函数 */
    groupsTranslateReports(groups): void {
        let that: this = this;
        let beShowed: bo.UserReport[];
        let beShowedes: bo.UserReport[] = [];
        //在用户报表集合中找出所有符合用户选定条件的报表
        if (groups.length > 0) {
            for (let i = 0; i < that.reports.length; i++) {
                for (let item of that.reports) {
                    if (groups[i] === item.group) {
                        beShowedes.push(item)
                    }
                }
            };
            that.showReports(beShowedes);
        }
        //当用户清空筛选条件，显示所有报表
        else {
            that.showReports(that.reports);
        }
    }
    /** 初始化筛选条件下拉框 */
    initMulticomboboxItem(list): void {
        this.multicombobox.destroyItems();
        for (let item of list) {
            this.multicombobox.addItem(new sap.ui.core.Item("", {
                text: item
            }));
        }
    }
    private getIcon(type: bo.emReportType): string {
        if (type === bo.emReportType.BOE) {
            return "sap-icon://bbyd-dashboard";
        } else if (type === bo.emReportType.KPI) {
            return "sap-icon://kpi-corporate-performance";
        }
        return "sap-icon://pie-chart";
    }
    /** 更新KPI */
    updateKPI(report: bo.UserReport, table: ibas.DataTable): void {
        let results: any[] = table.convert();
        for (let item of this.container.getTiles()) {
            if (item instanceof sap.m.StandardTile) {
                if (item.getInfo().indexOf("[" + report.id + "]") > 0) {
                    for (let result of results) {
                        if (result.Key === "${Kpi}") {
                            item.setNumber(result.Value);
                        }
                    }
                    // item.setInfoState(sap.ui.core.ValueState.Warning);
                }
            }
        }
    }
}
