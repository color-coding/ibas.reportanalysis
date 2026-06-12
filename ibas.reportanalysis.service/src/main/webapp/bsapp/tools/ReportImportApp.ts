/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        /** 列表应用-BOE报表 */
        export class ReportImportApp extends ibas.Application<IReportImportView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "45a0761f-78af-47bd-871f-03f981353466";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_report_import";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportImportApp.APPLICATION_ID;
                this.name = ReportImportApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchReportDataGroupEvent = this.fetchReportDataGroup;
                this.view.fetchReportDataEvent = this.fetchReportData;
                this.view.importReportEvent = this.importReport;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 获取目录 */
            fetchReportDataGroup(): void {
                if (ibas.strings.isEmpty(this.view.server)) {
                    throw new Error(ibas.i18n.prop("reportanalysis_please_server_address"));
                }
                this.busy(true);
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let boRepository: bo.RemoteReporterService = new bo.RemoteReporterService();
                boRepository.address = this.view.server;
                boRepository.setToken(this.view.user, this.view.password);
                boRepository.fetchReportGroup({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ReportGroup>): void {
                        that.busy(false);
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.view.showReportGroups(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            /** 获取报表 */
            fetchReportData(groups: bo.ReportGroup[]): void {
                if (ibas.strings.isEmpty(this.view.server)) {
                    throw new Error(ibas.i18n.prop("reportanalysis_please_server_address"));
                }
                this.busy(true);
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let item of groups) {
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = "Group";
                    condition.value = item.id;
                    condition.relationship = ibas.emConditionRelationship.OR;
                }
                let boRepository: bo.RemoteReporterService = new bo.RemoteReporterService();
                boRepository.address = this.view.server;
                boRepository.setToken(this.view.user, this.view.password);
                boRepository.fetchReportData({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ReportData>): void {
                        that.busy(false);
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.view.showReportDatas(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            /** 导入报表 */
            importReport(datas: bo.ReportData[]): void {
                if (ibas.strings.isEmpty(this.view.server)) {
                    throw new Error(ibas.i18n.prop("reportanalysis_please_server_address"));
                }
                let that: this = this;
                let reports: ibas.ArrayList<bo.Report> = new ibas.ArrayList<bo.Report>();
                for (let item of datas) {
                    let report: bo.Report = new bo.Report;
                    report.name = item.name;
                    report.group = item.group;
                    report.activated = ibas.emYesNo.YES;
                    report.category = bo.emReportType.SERVICE;
                    report.server = this.view.server;
                    report.user = this.view.user;
                    report.password = this.view.password;
                    report.address = item.id;
                    if (item.parameters instanceof Array) {
                        for (let pItem of item.parameters) {
                            let pReport: bo.ReportParameter = report.reportParameters.create();
                            pReport.category = bo.emReportParameterType.TEXT;
                            pReport.name = pItem.name;
                            pReport.value = pItem.value;
                        }
                    }
                    reports.add(report);
                }
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                ibas.queues.execute(reports, (data, next) => {
                    boRepository.saveReport({
                        beSaved: data,
                        onCompleted(opRslt: ibas.IOperationResult<bo.IReport>): void {
                            if (opRslt.resultCode === 0) {
                                // 成功，继续下一个
                                let report: bo.IReport = opRslt.resultObjects.firstOrDefault();
                                if (!ibas.objects.isNull(report)) {
                                    that.proceeding(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("reportanalysis_import_successful", report.objectKey, report.name));
                                }
                                next();
                            } else {
                                // 失败，询问是否继续
                                that.messages({
                                    type: ibas.emMessageType.ERROR,
                                    message: ibas.i18n.prop("reportanalysis_import_failed", data.name, opRslt.message),
                                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                    onCompleted(action: ibas.emMessageAction): void {
                                        if (action === ibas.emMessageAction.YES) {
                                            next();
                                        }
                                    }
                                });

                            }
                        }
                    });
                }, (error) => {
                    if (error instanceof Error) {
                        that.messages(error);
                    }
                });
            }
        }
        /** 视图-BOE报表 */
        export interface IReportImportView extends ibas.IView {
            /** 服务地址 */
            readonly server: string;
            /** 用户 */
            readonly user: string;
            /** 密码 */
            readonly password: string;
            /** 获取目录 */
            fetchReportDataGroupEvent: Function;
            /** 显示目录 */
            showReportGroups(datas: bo.ReportGroup[]): void;
            /** 获取报表 */
            fetchReportDataEvent: Function;
            /** 显示报表 */
            showReportDatas(datas: bo.ReportData[]): void;
            /** 导入报表 */
            importReportEvent: Function;
        }
    }
}