/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
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
                if (report.category === bo.emReportType.KPI) {
                    // 激活关联报表
                    let parameter: bo.UserReportParameter = report.parameters.firstOrDefault((item) => {
                        return item.name === PARAMETER_NAME_ASSOCIATED_REPORT;
                    });
                    if (!ibas.objects.isNull(parameter)) {
                        // 查找关联的报表
                        let criteria: ibas.Criteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.Report.PROPERTY_OBJECTKEY_NAME;
                        condition.value = parameter.value;
                        condition = criteria.conditions.create();
                        condition.alias = bo.Report.PROPERTY_ACTIVATED_NAME;
                        condition.value = ibas.emYesNo.YES.toString();
                        let that: this = this;
                        let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                        boRepository.fetchReport({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.Report>): void {
                                try {
                                    if (opRslt.resultObjects.length > 0) {
                                        let report: bo.UserReport = bo.UserReport.create(opRslt.resultObjects.firstOrDefault());
                                        let app: IReportViewer = reportFactory.createViewer(report);
                                        app.navigation = that.navigation;
                                        app.viewShower = that.viewShower;
                                        app.run(report);
                                    } else {
                                        this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("reportanalysis_not_found_report", parameter.value));
                                    }
                                } catch (error) {
                                    that.messages(error);
                                }
                            }
                        });
                    }
                } else {
                    let app: IReportViewer = reportFactory.createViewer(report);
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(report);
                }
            }
            /** 当前用户报表集合 */
            private reports: ibas.ArrayList<bo.UserReport>;
            private refreshReports(type: bo.emReportType): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                boRepository.fetchUserReports({
                    user: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE),
                    onCompleted(opRslt: ibas.IOperationResult<bo.UserReport>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.reports = new ibas.ArrayList<bo.UserReport>();
                            that.reports.add(opRslt.resultObjects);
                            let beShowed: bo.UserReport[] = that.reports.where((item: bo.UserReport) => {
                                return type === undefined ? true : item.category === type;
                            });
                            that.view.showReports(beShowed);
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
            }
            private runReportKpi(kpiReport: bo.UserReport): void {
                if (!ibas.objects.instanceOf(kpiReport, bo.UserReport)) {
                    return;
                }
                let that: this = this;
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                boRepository.runUserReport({
                    report: kpiReport,
                    onCompleted(opRslt: ibas.IOperationResult<ibas.DataTable>): void {
                        if (opRslt.resultCode === 0) {
                            let table: ibas.DataTable = opRslt.resultObjects.firstOrDefault();
                            if (!ibas.objects.isNull(table)) {
                                that.view.updateReport(kpiReport, table);
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
            /** 更新报表 */
            updateReport(report: bo.UserReport, table: ibas.DataTable): void;
        }
    }
}