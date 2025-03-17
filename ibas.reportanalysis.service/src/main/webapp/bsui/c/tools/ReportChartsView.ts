/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        export namespace c {
            /**
             * 视图-报表图形
             */
            export class ReportChartsView extends ibas.DialogView implements app.IReportChartsView {
                /** 绘制图表 */
                drawChartEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        contentWidth: "80%",
                        contentHeight: "60%",
                        content: [
                            this.container = new sap.m.NavContainer("", {
                                autoFocus: false,
                                pages: [
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        content: [
                                            new sap.m.FlexBox("", {
                                                width: "100%",
                                                height: "100%",
                                                fitContainer: true,
                                                renderType: sap.m.FlexRendertype.Div,
                                                alignItems: sap.m.FlexAlignItems.Stretch,
                                                alignContent: sap.m.FlexAlignContent.Stretch,
                                                justifyContent: sap.m.FlexJustifyContent.Center,
                                                direction: sap.m.FlexDirection.Row,
                                                items: [
                                                    this.pageConfig = new sap.ui.layout.form.SimpleForm("", {
                                                        width: "20rem",

                                                    })
                                                ]
                                            }),
                                        ]
                                    }),
                                    this.pageChart = new sap.m.FlexBox("", {
                                        width: "100%",
                                        height: "100%",
                                        fitContainer: true,
                                        renderType: sap.m.FlexRendertype.Div,
                                        alignItems: sap.m.FlexAlignItems.Stretch,
                                        alignContent: sap.m.FlexAlignContent.Stretch,
                                        justifyContent: sap.m.FlexJustifyContent.Center,
                                        direction: sap.m.FlexDirection.Row,
                                    }),
                                ],
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_reset"),
                                type: sap.m.ButtonType.Attention,
                                press: function (): void {
                                    that.container.backToTop();
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_apply"),
                                type: sap.m.ButtonType.Accept,
                                press: function (): void {
                                    let name: any = null;
                                    let contents: ibas.ArrayList<any> = new ibas.ArrayList<any>();
                                    for (let i: number = 0; i < that.pageConfig.getContent().length; i++) {
                                        let item: any = that.pageConfig.getContent()[i];
                                        if (item instanceof sap.m.Select) {
                                            if (i < 2) {
                                                name = item.getSelectedItem()?.getBindingContext()?.getObject();
                                            } else {
                                                contents.add(item.getSelectedItem()?.getBindingContext()?.getObject());
                                            }
                                        }
                                    }
                                    that.drawChartEvent.apply(that.application, ibas.arrays.create(name, contents));
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Reject,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private container: sap.m.NavContainer;
                private pageConfig: sap.ui.layout.form.SimpleForm;
                private pageChart: sap.m.FlexBox;
                /** 显示标签列 */
                showLabels(columns: ibas.DataTableColumn[]): void {
                    this.pageConfig.destroyContent();
                    this.pageConfig.addContent(new sap.m.Label("", {
                        width: "100%",
                        showColon: true,
                        text: ibas.i18n.prop("reportanalysis_chart_labels"),
                    }));
                    let select: sap.m.Select = new sap.m.Select("", {
                        width: "100%",
                        items: {
                            path: "/",
                            template: new sap.ui.core.Item("", {
                                key: {
                                    path: "name",
                                },
                                text: {
                                    parts: [
                                        {
                                            path: "name",
                                        }, {
                                            path: "description"
                                        }
                                    ],
                                    formatter(name: string, description: string): string {
                                        if (!ibas.strings.isEmpty(description)) {
                                            return description;
                                        }
                                        return name;
                                    }
                                }
                            })
                        }
                    });
                    this.pageConfig.addContent(select);
                    select.setModel(new sap.extension.model.JSONModel(columns));
                }
                /** 显示内容列 */
                showContents(columns: ibas.DataTableColumn[]): void {
                    this.pageConfig.addContent(new sap.m.Label("", {
                        width: "100%",
                        showColon: true,
                        text: ibas.i18n.prop("reportanalysis_chart_contents"),
                    }));
                    let select: sap.m.Select = new sap.m.Select("", {
                        width: "100%",
                        items: {
                            path: "/",
                            template: new sap.ui.core.Item("", {
                                key: {
                                    path: "name",
                                },
                                text: {
                                    parts: [
                                        {
                                            path: "name",
                                        }, {
                                            path: "description"
                                        }
                                    ],
                                    formatter(name: string, description: string): string {
                                        if (!ibas.strings.isEmpty(description)) {
                                            return description;
                                        }
                                        return name;
                                    }
                                }
                            })
                        }
                    });
                    this.pageConfig.addContent(select);
                    select.setModel(new sap.extension.model.JSONModel(columns));
                    if (columns.length > this.pageConfig.getContent().length / 2) {
                        let index: number = (this.pageConfig.getContent().length / 2) - 1;
                        if (index > 0) {
                            setTimeout(() => {
                                select.setSelectedItem(select.getItemAt(index));
                            }, 100);
                        }
                    }
                }
                /** 显示展现数据 */
                showChart(type: app.ChartType, labels: string[], ...datas: any[]): void {
                    this.container.to(this.pageChart);
                    this.pageChart.destroyItems();
                    let dialog: any = this.container.getParent();
                    let width: string = null, height: string = null;
                    if (dialog instanceof sap.m.Dialog && dialog.isOpen()) {
                        width = ibas.strings.format("{0}px", (<any>dialog)._$dialog.width());
                        height = ibas.strings.format("{0}px", (<any>dialog)._$dialog.height());
                    }
                    if (type === app.ChartType.PIE) {
                        this.pageChart.addItem(new sap.extension.chart.PieChart("", {
                            width: width,
                            height: height,
                            data: {
                                labels: labels,
                                datasets: [{
                                    label: ibas.i18n.prop("reportanalysis_chart_data", 1),
                                    data: datas[0],
                                    hoverOffset: 4
                                }]
                            },
                            options: {
                                plugins: {
                                    legend: {
                                        // 标签超过，不显示了
                                        display: labels.length > sap.extension.table.visibleRowCount(15) ? false : true,
                                    }
                                }
                            },
                        }));
                    } else if (type === app.ChartType.LINE) {
                        this.pageChart.addItem(new sap.extension.chart.LineChart("", {
                            width: width,
                            height: height,
                            data: {
                                labels: labels,
                                datasets: [{
                                    label: ibas.i18n.prop("reportanalysis_chart_data", 1),
                                    data: datas[0],
                                    fill: false,
                                    tension: 0.1
                                }]
                            },
                            options: {
                                plugins: {
                                    legend: {
                                        // 标签超过，不显示了
                                        display: labels.length > sap.extension.table.visibleRowCount(15) ? false : true,
                                    }
                                }
                            },
                        }));
                    } else if (type === app.ChartType.BUBBLE) {
                        let nDatas: { label: string, data: [{ x: number, y: number, r: number }] }[] = [];
                        for (let i: number = 0; i < labels.length; i++) {
                            nDatas.push({
                                label: labels[i],
                                data: [{
                                    x: datas[0][i],
                                    y: datas[1][i],
                                    r: datas[2][i],
                                }]
                            });
                        }
                        this.pageChart.addItem(new sap.extension.chart.BubbleChart("", {
                            width: width,
                            height: height,
                            data: {
                                datasets: nDatas
                            },
                            options: {
                                plugins: {
                                    legend: {
                                        // 标签超过，不显示了
                                        display: labels.length > sap.extension.table.visibleRowCount(15) ? false : true,
                                    }
                                }
                            },
                        }));
                    } else if (type === app.ChartType.SCATTER) {
                        let nDatas: { label: string, data: [{ x: number, y: number, }] }[] = [];
                        for (let i: number = 0; i < labels.length; i++) {
                            nDatas.push({
                                label: labels[i],
                                data: [{
                                    x: datas[0][i],
                                    y: datas[1][i],
                                }]
                            });
                        }
                        this.pageChart.addItem(new sap.extension.chart.ScatterChart("", {
                            width: width,
                            height: height,
                            data: {
                                datasets: nDatas
                            },
                            options: {
                                plugins: {
                                    legend: {
                                        // 标签超过，不显示了
                                        display: labels.length > sap.extension.table.visibleRowCount(15) ? false : true,
                                    }
                                }
                            },
                        }));
                    } else {
                        this.pageChart.addItem(new sap.m.IllustratedMessage("", {
                            illustrationSize: sap.m.IllustratedMessageSize.Scene,
                            illustrationType: sap.m.IllustratedMessageType.SimpleNotFoundMagnifier,
                        }));
                    }
                }
            }
        }
    }
}