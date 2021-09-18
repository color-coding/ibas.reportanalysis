/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
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
                    for (let item of this.report.parameters) {
                        if (item.category === bo.emReportParameterType.SYSTEM) {
                            if (ibas.strings.isWith(item.value, "${", "}")) {
                                let value: any = ibas.variablesManager.getValue(item.value);
                                if (value instanceof Array) {
                                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                    builder.map(undefined, "");
                                    builder.map(null, "");
                                    for (let item of value) {
                                        if (builder.length > 0) {
                                            builder.append(ibas.DATA_SEPARATOR);
                                        }
                                        builder.append(item);
                                    }
                                    value = builder.toString();
                                }
                                item.value = value;
                            }
                        }
                    }
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