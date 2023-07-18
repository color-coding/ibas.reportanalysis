/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        const BO_CODE_REPORT: string = ibas.config.applyVariables(bo.BO_CODE_REPORT);
        /** 查看应用-报表 */
        abstract class ReportViewApp<T extends IReportViewView> extends ibas.Application<T>  {
            /** 应用标识 */
            static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428ea";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_report_view";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportViewApp.APPLICATION_ID;
                this.name = ReportViewApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.runReportEvent = this.runReport;
                this.view.resetReportEvent = this.viewShowed;
                this.view.valueLinkEvent = this.valueLink;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.report.parameters)
                    || this.report.parameters.firstOrDefault((item) => {
                        if (item.category !== bo.emReportParameterType.PRESET) {
                            return true;
                        }
                    }) === null) {
                    // 没有参数的报表，直接运行
                    this.runReport();
                } else {
                    // 有参数报表
                    // 设置系统变量值
                    this.report.valueParameters();
                    // 显示信息
                    this.view.showReport(this.report);
                }
            }
            run(): void;
            run(report: bo.Report): void;
            run(report: bo.UserReport): void;
            /** 运行,覆盖原方法 */
            run(): void {
                let report: any = arguments[0];
                if (report instanceof bo.UserReport) {
                    this.report = report;
                } else if (report instanceof bo.Report) {
                    this.report = bo.UserReport.create(report);
                }
                if (!(this.report instanceof bo.UserReport)) {
                    throw new Error(ibas.i18n.prop("reportanalysis_run_report_error"));
                }
                this.description = ibas.strings.format("{0} - {1}", this.description, this.report.name);
                super.run.apply(this, arguments);
            }
            protected report: bo.UserReport;
            private runReport(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                boRepository.runUserReport({
                    report: this.report,
                    onCompleted(opRslt: ibas.IOperationResult<ibas.DataTable>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let table: ibas.DataTable = opRslt.resultObjects.firstOrDefault();
                            if (ibas.objects.isNull(table)) {
                                throw new Error(ibas.i18n.prop("reportanalysis_report_no_data"));
                            }
                            that.view.showResults(table);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("reportanalysis_running_report", this.report.name));
            }
            private valueLink(objectCode: string, value: string, rowData?: any): void {
                if (ibas.strings.isEmpty(objectCode) || ibas.objects.isNull(value)) {
                    return;
                }
                if (ibas.strings.equals(objectCode, BO_CODE_REPORT)) {
                    let condition: ibas.ICondition;
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    criteria.result = 1;
                    if (ibas.numbers.isNumber(value)) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.Report.PROPERTY_OBJECTKEY_NAME;
                        condition.value = value;
                    } else {
                        condition = criteria.conditions.create();
                        condition.alias = bo.Report.PROPERTY_NAME_NAME;
                        condition.value = value;
                    }
                    condition = criteria.conditions.create();
                    condition.alias = bo.Report.PROPERTY_ACTIVATED_NAME;
                    condition.value = ibas.emYesNo.YES.toString();
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.Report.PROPERTY_OBJECTKEY_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;

                    let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                    boRepository.fetchReport({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    throw new Error(ibas.i18n.prop("reportanalysis_not_found_report", value));
                                }
                                let useReport: bo.UserReport = bo.UserReport.create(opRslt.resultObjects.firstOrDefault());
                                if (typeof rowData === "object") {
                                    useReport.valueParameters();
                                    for (let item of useReport.parameters) {
                                        if (item.category === bo.emReportParameterType.PRESET) {
                                            continue;
                                        }
                                        if (item.category === bo.emReportParameterType.SYSTEM) {
                                            item.category = bo.emReportParameterType.PRESET;
                                            continue;
                                        }
                                        let name: string = item.name;
                                        if (ibas.strings.isWith(name, "${", "}")) {
                                            name = name.substring(2, name.length - 1);
                                        }
                                        let tmp: any = rowData[name];
                                        if (ibas.objects.isNull(tmp)) {
                                            continue;
                                        }
                                        item.value = tmp;
                                        item.category = bo.emReportParameterType.PRESET;
                                    }
                                }
                                let app: ReportViewerApp = new ReportViewerApp();
                                app.navigation = this.navigation;
                                app.viewShower = this.viewShower;
                                app.run(useReport);
                                this.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("reportanalysis_link_to_object_value", objectCode, value));
                            } catch (error) {
                                this.proceeding(ibas.emMessageType.ERROR, ibas.i18n.prop("reportanalysis_found_object_value", objectCode));
                            }
                        }
                    });

                } else {
                    if (ibas.servicesManager.runLinkService({
                        boCode: objectCode,
                        linkValue: value.toString()
                    })) {
                        this.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("reportanalysis_link_to_object_value", objectCode, value));
                    } else {
                        this.proceeding(ibas.emMessageType.ERROR, ibas.i18n.prop("reportanalysis_found_object_value", objectCode));
                    }
                }
            }
        }
        /** 视图-报表 */
        export interface IReportViewView extends ibas.IView {
            /** 运行报表 */
            runReportEvent: Function;
            /** 重置报表 */
            resetReportEvent: Function;
            /** 显示报表 */
            showReport(report: bo.UserReport): void;
            /** 显示报表结果 */
            showResults(table: ibas.DataTable): void;
            /** 值链接事件 */
            valueLinkEvent: Function;
        }
        /** 查看应用-报表普通 */
        export class ReportViewerApp extends ReportViewApp<IReportDataChooseView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428eb";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportViewerApp.APPLICATION_ID;
            }
        }
        /** 查看应用-报表页签 */
        export class ReportTabViewerApp extends ReportViewApp<IReportDataChooseView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428ec";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportTabViewerApp.APPLICATION_ID;
            }
            /** 使用报表 */
            useReport(report: bo.UserReport): void {
                this.report = report;
            }
        }
        /** 查看应用-报表数据选择 */
        export class ReportDataChooseApp extends ReportViewApp<IReportDataChooseView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428ed";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportDataChooseApp.APPLICATION_ID;
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.chooseDataEvent = this.chooseData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                super.viewShowed();
            }
            private chooseData(table: ibas.DataTable): void {
                if (ibas.objects.isNull(table) || table.rows.length <= 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_using")
                    ));
                    return;
                }
                this.close();
                if (this.onChoosedData instanceof Function) {
                    this.onChoosedData(table);
                }
            }
            /** 数据选择完成 */
            onChoosedData: (table: ibas.DataTable) => void;
        }
        /** 视图-报表 */
        export interface IReportDataChooseView extends IReportViewView {
            /** 选择数据 */
            chooseDataEvent: Function;
        }
    }
}