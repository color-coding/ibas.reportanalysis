/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryReportAnalysis } from "../../borep/BORepositories";
import { reportFactory } from "../report/ReportFactory";
import { IReportViewer } from "../report/Report.d";

/** 显示的报表类型 */
export const CONFIG_ITEM_DISPLAY_REPORT_TYPE: string = "displayReportType";
export const PARAMETER_NAME_ASSOCIATED_REPORT: string = "${Report}";

/** 应用-用户报表 */
export class UserReportPageApp extends ibas.Application<IUserReportPageView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "2046bfa3-e5ad-41d3-aed1-1c8dbacc91de";
    /** 应用名称 */
    static APPLICATION_NAME: string = "reportanalysis_app_user_report_page";
    /** 构造函数 */
    constructor() {
        super();
        this.id = UserReportPageApp.APPLICATION_ID;
        this.name = UserReportPageApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.activeReportEvent = this.activeReport;
        this.view.refreshReportsEvent = this.refreshReports;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        let type: any = undefined;
        let cValue: string = ibas.config.get(CONFIG_ITEM_DISPLAY_REPORT_TYPE);
        if (!ibas.objects.isNull(cValue)) {
            type = ibas.enums.valueOf(bo.emReportType, cValue);
        }
        this.refreshReports(type);
    }
    private activeReport(report: bo.UserReport): void {
        if (!ibas.objects.instanceOf(report, bo.UserReport)) {
            return;
        }
        try {
            if (report.category === bo.emReportType.KPI) {
                // kpi报表
                // 刷新指标
                this.runReportKpi(report);
                // 激活关联报表
                let parameter: bo.UserReportParameter = report.parameters.firstOrDefault((item: bo.UserReportParameter) => {
                    return item.name === PARAMETER_NAME_ASSOCIATED_REPORT;
                });
                if (!ibas.objects.isNull(parameter)) {
                    for (let item of this.reports) {
                        if (item.id === parameter.value) {
                            this.activeReport(item);
                            return;
                        }
                    }
                    // 用户没有此关联报表
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("reportanalysis_not_found_report", parameter.value));
                }
            } else {
                let app: IReportViewer = reportFactory.createViewer(report);
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(report);
            }
        } catch (error) {
            this.messages(error);
        }
    }
    /** 当前用户报表集合 */
    private reports: ibas.ArrayList<bo.UserReport>;
    private refreshReports(type: bo.emReportType): void {
        let that: this = this;
        let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
        boRepository.fetchUserReports({
            user: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE),
            onCompleted(opRslt: ibas.IOperationResult<bo.UserReport>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.reports = new ibas.ArrayList<bo.UserReport>();
                    that.reports.add(opRslt.resultObjects);
                    let beShowed: bo.UserReport[] = that.reports.where((item: bo.UserReport) => {
                        return type === undefined ? true : item.category === type;
                    });
                    that.view.showReports(beShowed);
                    that.busy(false);
                    // 激活kpi类型报表
                    for (let item of beShowed) {
                        if (item.category !== bo.emReportType.KPI) {
                            continue;
                        }
                        that.runReportKpi(item);
                    }
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
    }
    private runReportKpi(kpiReport: bo.UserReport): void {
        if (!ibas.objects.instanceOf(kpiReport, bo.UserReport)) {
            return;
        }
        let that: this = this;
        let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
        boRepository.runUserReport({
            report: kpiReport,
            onCompleted(opRslt: ibas.IOperationResult<ibas.DataTable>): void {
                if (opRslt.resultCode === 0) {
                    let table: ibas.DataTable = opRslt.resultObjects.firstOrDefault();
                    if (!ibas.objects.isNull(table)) {
                        that.view.updateKPI(kpiReport, table);
                    }
                }
            }
        });
    }
}
/** 视图-报表 */
export interface IUserReportPageView extends ibas.IView {
    /** 显示用户报表 */
    showReports(reports: bo.UserReport[]): void;
    /** 激活报表 */
    activeReportEvent: Function;
    /** 刷新报表 */
    refreshReportsEvent: Function;
    /** 更新KPI */
    updateKPI(report: bo.UserReport, table: ibas.DataTable): void;
}
