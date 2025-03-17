/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        /** 应用-报表图表 */
        export class ReportChartsApp extends ibas.Application<IReportChartsView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "34a4a970-0143-4867-ab8f-e4af2851f97f";
            /** 应用名称 */
            static APPLICATION_NAME: string = "reportanalysis_app_report_charts";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ReportChartsApp.APPLICATION_ID;
                this.name = ReportChartsApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.drawChartEvent = this.drawChart;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.chartData)) {
                    this.chartData = new ibas.DataTable();
                }
                this.view.showLabels(this.chartData.columns);
                this.view.showContents(this.chartData.columns);
                if (this.chartType === ChartType.SCATTER) {
                    // 需要两个数据参数
                    this.view.showContents(this.chartData.columns);
                } else if (this.chartType === ChartType.BUBBLE) {
                    // 需要三个数据参数
                    this.view.showContents(this.chartData.columns);
                    this.view.showContents(this.chartData.columns);
                }
            }
            protected chartData: ibas.DataTable;
            protected chartType: ChartType;
            /**
             * 运行
             * @param data 展示数据
             * @param chartType 展示方式
             */
            run(data?: ibas.DataTable, chartType?: ChartType): void {
                if (ibas.objects.isNull(data) || data.columns.length === 0 || data.rows.length === 0) {
                    this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("reportanalysis_report_no_data"));
                    return;
                }
                this.chartData = data;
                this.chartType = chartType;
                super.run();
            }
            protected drawChart(label: ibas.DataTableColumn, ...datas: ibas.DataTableColumn[]): void {
                let tblables: Array<string> = new Array<any>();
                let tbdatas: Array<any[]> = new Array<any>();
                for (let column of this.chartData.columns) {
                    if (column === label || column.name === label.name) {
                        let index: number = this.chartData.columns.indexOf(column);
                        for (let row of this.chartData.rows) {
                            tblables.push(column.convert(row.cells[index]));
                        }
                    }
                    for (let i: number = 0; i < datas.length; i++) {
                        let data: any = datas[i];
                        if (column === data || column.name === data.name) {
                            let tbdata: Array<any> = new Array<any>();
                            let index: number = this.chartData.columns.indexOf(column);
                            for (let row of this.chartData.rows) {
                                tbdata.push(column.convert(row.cells[index]));
                            }
                            tbdatas[i] = tbdata;
                        }
                    }
                }
                // 使用动态参数方式调用
                let params: Array<any> = new Array<any>();
                params.push(this.chartType);
                params.push(tblables);
                for (let item of tbdatas) {
                    params.push(item);
                }
                this.view.showChart.apply(this.view, params);
            }

        }
        export enum ChartType {
            /** 饼图 */
            "PIE",
            /** 折线图 */
            "LINE",
            /** 气泡图 */
            "BUBBLE",
            /** 散点图 */
            "SCATTER"
        }
        /** 视图-报表图表 */
        export interface IReportChartsView extends ibas.IView {
            /** 显示标签列 */
            showLabels(columns: ibas.DataTableColumn[]): void;
            /** 显示内容列 */
            showContents(columns: ibas.DataTableColumn[]): void;
            /** 绘制图表 */
            drawChartEvent: Function;
            /** 显示展现数据 */
            showChart(type: ChartType, labels: string[], ...datas: any[]): void;
        }
    }
}