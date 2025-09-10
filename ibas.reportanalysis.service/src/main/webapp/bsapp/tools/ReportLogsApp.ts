/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        /** 应用-报表日志 */
        export class ReportLogsApp extends ibas.Application<IReportLogsView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "9458189d-fb3f-451c-8514-6770ddd6c810";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_report_logs";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportLogsApp.APPLICATION_ID;
                this.name = ReportLogsApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchReportLogsEvent = this.fetchReportLogs;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (this.filter instanceof ibas.Criteria) {
                    this.fetchReportLogs(this.filter);
                }
            }

            private filter: ibas.ICriteria;

            run(criteria?: ibas.ICriteria): void {
                this.filter = criteria;
                super.run();
            }

            protected fetchReportLogs(criteria: ibas.ICriteria): void {
                if (ibas.objects.isNull(criteria)) {
                    criteria = this.filter.clone();
                } else {
                    let nCriteria: ibas.ICriteria = this.filter.clone();
                    if (criteria?.conditions?.length > 0) {
                        for (let item of criteria.conditions) {
                            nCriteria.conditions.add(item);
                        }
                    }
                    criteria = nCriteria;
                }
                if (ibas.numbers.valueOf(criteria.result) === 0) {
                    criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                }
                if (criteria.sorts.length === 0) {
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.ReportRunningLog.PROPERTY_OBJECTKEY_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                }
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                boRepository.fetchReportRunningLog({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            this.view.showReportLogs(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
        }
        /** 视图-报表日志 */
        export interface IReportLogsView extends ibas.IView {
            /** 获取报表日志 */
            fetchReportLogsEvent: Function;
            /** 显示报表日志 */
            showReportLogs(datas: bo.ReportRunningLog[]): void;
        }
    }
}