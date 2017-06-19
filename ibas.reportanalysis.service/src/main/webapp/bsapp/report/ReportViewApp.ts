/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { IReportViewer } from "./Report.d";
import { BORepositoryReportAnalysis } from "../../borep/BORepositories";

/** 查看应用-报表 */
export class ReportViewApp extends ibas.BOApplicationWithServices<IReportViewView> implements IReportViewer {
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
            || this.report.parameters.firstOrDefault((item: bo.UserReportParameter) => {
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
                    item.value = ibas.variablesManager.getValue(item.value);
                }
            }
            // 显示信息
            this.view.showReport(this.report);
        }
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        try {
            if (ibas.objects.instanceOf(this.report, bo.UserReport)) {
                super.run();
                return;
            } else if (arguments.length === 1) {
                let report: bo.UserReport = arguments[0];
                if (ibas.objects.instanceOf(report, bo.UserReport) && report.category === bo.emReportType.REPORT) {
                    this.report = report;
                    this.description = ibas.strings.format("{0} - {1}", this.description, this.report.name);
                    super.run();
                    return;
                }
            }
            throw new Error(ibas.i18n.prop("reportanalysis_run_report_error"));
        } catch (error) {
            this.messages(error);
        }
    }
    report: bo.UserReport;
    runReport(): void {
        let that: this = this;
        let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
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
                    that.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_sucessful"));
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("reportanalysis_running_report", this.report.name));
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-报表 */
export interface IReportViewView extends ibas.IBOViewWithServices {
    /** 调用服务事件 */
    callServicesEvent: Function;
    /** 运行报表 */
    runReportEvent: Function;
    /** 重置报表 */
    resetReportEvent: Function;
    /** 显示报表 */
    showReport(report: bo.UserReport): void;
    /** 显示报表结果 */
    showResults(table: ibas.DataTable): void;
}
/** 查看应用-报表-页签 */
export class ReportTabViewApp extends ReportViewApp {
    /** 应用标识 */
    static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428eb";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ReportTabViewApp.APPLICATION_ID;
    }
}