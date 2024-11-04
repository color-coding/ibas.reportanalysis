/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        export class ReportDataService extends ibas.ServiceWithResultApplication<IReporDataServiceView, IReportDataServiceContract, ibas.DataTable> {
            /** 应用标识 */
            static APPLICATION_ID: string = "4a415c25-6941-40a0-a4d9-b5c6464ee5ff";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_report_data";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportDataService.APPLICATION_ID;
                this.name = ReportDataService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.chooseDataEvent = this.chooseData;
                this.view.fetchDataEvent = this.fetchData;
                this.view.newDataEvent = this.newData;
            }

            protected runService(contract: IReportDataServiceContract): void {
                if (!ibas.strings.isEmpty(contract.title)) {
                    this.description = contract.title;
                }
                // 数据选择类型
                this.dataChooseType = contract.chooseType;
                if (this.dataChooseType === ibas.emChooseType.SINGLE) {
                    if (contract.criteria instanceof ibas.Criteria) {
                        this.chooseFirstData = contract.criteria.result === 1 ? ibas.emYesNo.YES : undefined;
                    }
                }
                // 数据参数
                this.parameters = ibas.arrays.create(contract.parameters);
                this.triggerData = (<any>contract).trigger;
                // 报表选择类型
                this.view.chooseType = ibas.emChooseType.SINGLE;
                // 查询使用的报表
                let criteria: ibas.Criteria = null;
                if (contract.criteria instanceof ibas.Criteria) {
                    criteria = contract.criteria;
                } else if (contract.criteria instanceof Array) {
                    criteria = new ibas.Criteria();
                    for (let item of contract.criteria) {
                        if (item instanceof ibas.Condition) {
                            criteria.conditions.add(item);
                        }
                    }
                }
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                }
                if (criteria.conditions.length > 1) {
                    criteria.conditions.firstOrDefault().bracketOpen++;
                    criteria.conditions.lastOrDefault().bracketClose++;
                }
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.Report.PROPERTY_ACTIVATED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                // 修正查询数量
                ibas.criterias.resultCount(criteria);
                // 根据对象类型，修正排序条件
                ibas.criterias.sorts(criteria, bo.Report);
                // 存在查询，则直接触发查询事件
                if (this.view.query instanceof Function) {
                    // 视图存在查询方法，则调用此方法
                    this.view.query(criteria);
                } else {
                    this.fetchData(criteria);
                }
            }

            private triggerData?: any;
            private parameters?: ibas.IList<ibas.KeyText>;
            private dataChooseType: ibas.emChooseType;
            private chooseFirstData: ibas.emYesNo;

            protected viewShowed(): void {
            }

            /** 新建数据 */
            protected newData(): void {
                // 关闭自身
                this.destroy();
                // 调用编辑应用
                let app: ReportEditApp = new ReportEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            protected chooseData(report: bo.Report): void {
                if (report instanceof Array) {
                    report = report[0];
                }
                if (!(report instanceof bo.Report)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_using")
                    ));
                    return;
                }
                this.close();
                let that: this = this;
                let app: ReportDataChooseApp = new ReportDataChooseApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.onChoosedData = function (table: ibas.DataTable): void {
                    that.fireCompleted(table);
                };
                // 设置数据参数
                for (let item of report.reportParameters) {
                    if (item.category === bo.emReportParameterType.PRESET) {
                        continue;
                    }
                    if (item.category === bo.emReportParameterType.SYSTEM) {
                        continue;
                    }
                    let parameter: ibas.KeyText = this.parameters.firstOrDefault(
                        c => ibas.strings.equalsIgnoreCase(item.name, c.key)
                    );
                    if (!ibas.objects.isNull(parameter)) {
                        item.value = parameter.text;
                        continue;
                    }
                    if (!ibas.objects.isNull(this.triggerData)) {
                        if (ibas.strings.isWith(item.name, "${", "}")) {
                            let value: any = null;
                            let property: string = ibas.strings.remove(item.name, "${", "}");
                            if (ibas.strings.isWith(property, "U_", undefined)) {
                                let userFields: any = this.triggerData.userFields;
                                if (userFields instanceof ibas.UserFields) {
                                    value = userFields.get(property)?.value;
                                }
                            } else {
                                value = ibas.objects.propertyValue(this.triggerData, property, true);
                            }
                            if (!ibas.objects.isNull(value)) {
                                item.value = String(value);
                                continue;
                            }
                        }
                    }
                }
                app.run(report, this.dataChooseType, this.chooseFirstData);
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                boRepository.fetchReport({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Report>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 1
                                && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true) && !that.isViewShowed()) {
                                // 仅一条数据，直接选择
                                that.chooseData(opRslt.resultObjects.firstOrDefault());
                            } else {
                                if (!that.isViewShowed()) {
                                    // 没显示视图，先显示
                                    that.show();
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showData(opRslt.resultObjects);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }

        }
        /** 视图-报表 */
        export interface IReporDataServiceView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Report[]): void;
        }
        /** 报表数据服务映射 */
        export class ReportDataServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportDataService.APPLICATION_ID;
                this.name = ReportDataService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = ReportDataServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new ReportDataService();
            }
        }
        /** 报表结果服务映射 */
        export class ReportResultServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = "1d853094-b1de-4343-a773-e2f015793610";
                this.name = ReportDataService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.boCode = bo.BO_CODE_REPORTRESULT;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new ReportDataService();
            }
        }
    }
}
