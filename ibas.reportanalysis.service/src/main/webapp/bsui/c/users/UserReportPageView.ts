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

/**
 * 视图-Report
 */
export class UserReportPageView extends ibas.View implements IUserReportPageView {
    private page: sap.m.Page;
    private container: sap.m.TileContainer;
    /** 页面头部 */
    private mainHeader:sap.tnt.ToolHeader;
    /** 报表分组框 */
    private popover: sap.m.Popover;
    /** 激活报表 */
    activeReportEvent: Function;
    /** 刷新报表 */
    refreshReportsEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.container = new sap.m.TileContainer("", {
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            content: [
                new sap.ui.layout.VerticalLayout("", {
                    class: "",
                    width: "100%",
                    content: [
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("bo_reportbookitem_group"),
                            press: "showReportGroup",
                        }),
                    ],
                    press: function (oEvent): void {
                       // this.mainHeader.addContent(
                           let popover: sap.m.Popover = new sap.m.Popover("", {
                                //title: bo.ReportBookItem.PROPERTY_REPORT_NAME,
                                showHeader:false,
                                placement: sap.m.PlacementType.Bottom,
                                content: [
                                    new sap.m.ToolbarSpacer("", {
                                        Button: new sap.m.Button("", {
                                            text: ibas.i18n.prop("bo_reportbookitem_name"),
                                            template: new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "name",
                                            })
                                        })
                                    }),
                                ],
                                text: ibas.i18n.prop("bo_reportbookitem_group"),
                            })
                     //   )
                    },
                }),

                this.container
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
        }
    }
    /** 显示报表分组 */
    showReportGroup(oEvent): void {
        // create popover
        //if (!this.popover) {
        //  let popover = sap.ui.xmlfragment("sap.m.sample.Popover.Popover", this);
        this.popover.addContent(
            new sap.m.Popover("", {
                title: bo.ReportBookItem.PROPERTY_REPORT_NAME,
                footer: [
                    new sap.m.ToolbarSpacer("", {
                        Button: new sap.m.Button("", {
                            text: ibas.i18n.prop("bo_reportbookitem_name"),
                            template: new sap.m.Text("", {
                                wrapping: false
                            }).bindProperty("text", {
                                path: "name",
                            })
                        })
                    }),
                ],
                text: ibas.i18n.prop("bo_reportbookitem_group"),
            })
        );

        //this.getView().addDependent(this.popover);
        this.popover.bindElement("/ProductCollection/0");
        //  }

        // delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
        var oButton = oEvent.getSource();
        jQuery.sap.delayedCall(0, this, function () {
            this._oPopover.openBy(oButton);
        });
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
