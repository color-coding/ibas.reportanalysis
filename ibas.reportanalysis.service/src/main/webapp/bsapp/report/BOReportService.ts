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
        /** 业务对象报表服务 */
        export class BOReportService extends ibas.ServiceApplication<IBOReportServiceView, ibas.IBOServiceContract>  {
            /** 应用标识 */
            static APPLICATION_ID: string = "2c75d394-0a21-45f3-86a1-ee2f237e7c10";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_bo_report_service";
            constructor() {
                super();
                this.id = BOReportService.APPLICATION_ID;
                this.name = BOReportService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 运行服务 */
            runService(contract: ibas.IBOServiceContract): void {
                if (!ibas.objects.isNull(contract) && !ibas.objects.isNull(contract.data)) {
                    let boCode: string = null;
                    for (let item of ibas.arrays.create(contract.data)) {
                        if (!(item instanceof ibas.BusinessObject)) {
                            continue;
                        }
                        if (ibas.strings.isEmpty(boCode)) {
                            boCode = (<ibas.IBOStorageTag><any>item).objectCode;
                            break;
                        }
                    }
                    if (ibas.strings.isEmpty(boCode)) {
                        // 输入数据无效，服务不运行
                        this.proceeding(ibas.emMessageType.WARNING,
                            ibas.i18n.prop("importexport_service_dataexport") + ibas.i18n.prop("sys_invalid_parameter", "data"));
                    } else {
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.Report.PROPERTY_ACTIVATED_NAME;
                        condition.value = ibas.emYesNo.YES.toString();
                        condition = criteria.conditions.create();
                        condition.alias = bo.Report.PROPERTY_BOCODE_NAME;
                        condition.value = boCode;
                        let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                        boRepository.fetchReport({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                try {
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    let reports: ibas.ArrayList<bo.UserReport> = new ibas.ArrayList<bo.UserReport>();
                                    for (let rItem of opRslt.resultObjects) {
                                        let uReport: bo.UserReport = bo.UserReport.create(rItem);
                                        for (let pItem of uReport.parameters) {
                                            if (pItem.category === bo.emReportParameterType.PRESET) {
                                                continue;
                                            }
                                            if (pItem.category === bo.emReportParameterType.SYSTEM) {
                                                if (ibas.strings.isWith(pItem.value, "${", "}")) {
                                                    pItem.value = ibas.variablesManager.getValue(pItem.value);
                                                }
                                                continue;
                                            }
                                            let property: string = ibas.strings.remove(pItem.name, "${", "}");
                                            if (ibas.strings.isEmpty(property)) {
                                                continue;
                                            } else {
                                                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                builder.map(null, "");
                                                builder.map(undefined, "");
                                                if (contract.data instanceof Array) {
                                                    for (let item of contract.data) {
                                                        let value: any = ibas.objects.propertyValue(item, property, true);
                                                        if (ibas.objects.isNull(value)) {
                                                            continue;
                                                        }
                                                        if (builder.length > 0) {
                                                            builder.append(ibas.DATA_SEPARATOR);
                                                        }
                                                        builder.append(value);
                                                    }
                                                } else {
                                                    let value: any = ibas.objects.propertyValue(contract.data, property, true);
                                                    if (ibas.objects.isNull(value)) {
                                                        continue;
                                                    }
                                                    builder.append(value);
                                                }
                                                if (builder.length > 0) {
                                                    pItem.value = builder.toString();
                                                }
                                            }
                                        }
                                        reports.add(uReport);
                                    }
                                    if (reports.length === 0) {
                                        this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("reportanalysis_not_found_report", boCode));
                                    } else {
                                        if (!this.isViewShowed()) {
                                            // 没显示视图，先显示
                                            this.show();
                                        }
                                        this.view.showReports(reports);
                                    }
                                } catch (error) {
                                    this.messages(error);
                                }
                            }
                        });
                    }
                } else {
                    // 输入数据无效，服务不运行
                    this.proceeding(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("importexport_service_dataexport") + ibas.i18n.prop("sys_invalid_parameter", "data"));
                }
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                this.view.selectReportEvent = this.selectReport;
                this.view.resetReportEvent = this.resetReport;
                this.view.runReportEvent = this.runReport;
                this.view.valueLinkEvent = this.valueLink;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            protected report: bo.UserReport;
            private selectReport(report: bo.UserReport): void {
                this.view.showReport(this.report = report);
                if (this.report.parameters.firstOrDefault(c => ibas.strings.isEmpty(c.value)) === null) {
                    // 没有需要输入值的参数，则直接运行
                    this.runReport();
                }
            }
            private resetReport(): void {
                this.view.showReport(this.report);
            }
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
        /** 业务对象报表服务-视图 */
        export interface IBOReportServiceView extends IReportViewView {
            /** 显示报表 */
            showReports(reports: bo.UserReport[]): void;
            /** 选择报表 */
            selectReportEvent: Function;
        }
        /** 业务对象报表服务映射 */
        export class BOReportServiceMapping extends ibas.ServiceMapping {
            constructor() {
                super();
                this.id = BOReportService.APPLICATION_ID;
                this.name = BOReportService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = ibas.BOServiceProxy;
                this.icon = ibas.i18n.prop("reportanalysis_icon");
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new BOReportService();
            }
        }
    }
}