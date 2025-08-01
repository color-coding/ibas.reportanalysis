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
             * 视图-日志
             */
            export class ReportLogsView extends ibas.View implements app.IReportLogsView {
                /** 获取报表日志 */
                fetchReportLogsEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.m.Table("", {
                        autoPopinMode: true,
                        growing: true,
                        growingScrollToLoad: true,
                        chooseType: ibas.emChooseType.NONE,
                        columns: [
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_reportlog_id"),
                                }),
                                width: "8rem",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_reportlog_report"),
                                }),
                                width: "12rem",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_reportlog_runner"),
                                }),
                                width: "6rem",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_reportlog_begintime"),
                                }),
                                width: "8rem",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_reportlog_finishtime"),
                                }),
                                width: "8rem",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_reportlog_reportparameters"),
                                }),
                                width: "6rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_reportlog_reportdata"),
                                }),
                                width: "4rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                        ],
                        items: {
                            path: "/rows",
                            templateShareable: false,
                            template: new sap.m.ColumnListItem("", {
                                cells: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "id",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        active: true,
                                        press(): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof bo.ReportLog) {
                                                let criteria: ibas.Criteria = new ibas.Criteria();
                                                let condition: ibas.ICondition = criteria.conditions.create();
                                                condition.alias = bo.Report.PROPERTY_OBJECTKEY_NAME;
                                                condition.value = data.reportId;
                                                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                                                boRepository.fetchReport({
                                                    criteria: criteria,
                                                    onCompleted: (opRslt) => {
                                                        for (let item of opRslt.resultObjects) {
                                                            ibas.servicesManager.runEditService({
                                                                boCode: bo.Report.BUSINESS_OBJECT_CODE,
                                                                editData: item,
                                                                onCompleted: () => { }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        },
                                        bindingValue: {
                                            parts: [
                                                {
                                                    path: "reportId",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                {
                                                    path: "reportName",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            ],
                                            formatter(id: string, name: string): string {
                                                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                builder.append(id);
                                                if (!ibas.strings.isEmpty(name)) {
                                                    builder.append(" - ");
                                                    builder.append(name);
                                                }
                                                return builder.toString();
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        active: true,
                                        press(): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof bo.ReportLog) {
                                                if (ibas.strings.isWith(data.runner, "{", "}")) {
                                                    let values: string[] = data.runner.substring(1, data.runner.length - 1).split(":");
                                                    if (values.length > 1) {
                                                        ibas.servicesManager.runLinkService({
                                                            boCode: initialfantasy.bo.User.BUSINESS_OBJECT_CODE,
                                                            linkValue: values[1].replace("|", " - ")
                                                        });
                                                    }
                                                }
                                            }
                                        },
                                        bindingValue: {
                                            path: "runner",
                                            type: new sap.extension.data.Alphanumeric(),
                                            formatter(runner: string): string {
                                                if (ibas.strings.isWith(runner, "{", "}")) {
                                                    let values: string[] = runner.substring(1, runner.length - 1).split(":");
                                                    if (values.length > 1) {
                                                        return values[1].replace("|", " - ");
                                                    }
                                                }
                                                return runner;
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "beginTime",
                                            type: new sap.extension.data.DateTime(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "finishTime",
                                            type: new sap.extension.data.DateTime(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        active: true,
                                        press(): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof bo.ReportLog) {
                                                let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                                                    title: ibas.i18n.prop("bo_reportlog_reportparameters"),
                                                    type: sap.m.DialogType.Standard,
                                                    state: sap.ui.core.ValueState.None,
                                                    content: [
                                                        new sap.m.List("", {
                                                            items: {
                                                                path: "/",
                                                                templateShareable: false,
                                                                template: new sap.m.StandardListItem("", {
                                                                    title: {
                                                                        path: "key",
                                                                    },
                                                                    description: {
                                                                        path: "text",
                                                                    }
                                                                })
                                                            },
                                                        })
                                                    ],
                                                    buttons: [
                                                        new sap.m.Button("", {
                                                            text: ibas.i18n.prop("shell_exit"),
                                                            type: sap.m.ButtonType.Transparent,
                                                            icon: "sap-icon://inspect-down",
                                                            press: function (): void {
                                                                dialog.close();
                                                                dialog = null;
                                                            }
                                                        }),
                                                    ]
                                                }).addStyleClass("sapUiNoContentPadding");
                                                dialog.setModel(new sap.extension.model.JSONModel(data.parameters));
                                                dialog.open();
                                            }
                                        },
                                        bindingValue: {
                                            path: "parameters",
                                            formatter(parameters: any): string {
                                                if (parameters instanceof Array) {
                                                    return ibas.i18n.prop("bo_reportlog_parametercount", parameters.length);
                                                } else {
                                                    return ibas.i18n.prop("bo_reportlog_parametercount", 0);
                                                }
                                            }
                                        },
                                    }),
                                    new sap.m.HBox("", {
                                        fitContainer: true,
                                        justifyContent: sap.m.FlexJustifyContent.Center,
                                        alignItems: sap.m.FlexAlignItems.Center,
                                        renderType: sap.m.FlexRendertype.Div,
                                        items: [
                                            new sap.m.Button("", {
                                                icon: "sap-icon://detail-view",
                                                type: sap.m.ButtonType.Transparent,
                                                press: function (): void {
                                                    let data: bo.ReportLog = this.getParent().getBindingContext().getObject();
                                                    if (ibas.objects.isNull(data)) {
                                                        return;
                                                    }
                                                    jQuery.sap.require("sap.ui.codeeditor.CodeEditor");
                                                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                                                        title: ibas.i18n.prop("reportanalysis_title_content"),
                                                        type: sap.m.DialogType.Standard,
                                                        state: sap.ui.core.ValueState.None,
                                                        content: [
                                                            new sap.ui.codeeditor.CodeEditor("", {
                                                                height: ibas.strings.format("{0}px", window.innerHeight * 0.6),
                                                                width: ibas.strings.format("{0}px", window.innerWidth * 0.6),
                                                                type: "plain_text",
                                                                colorTheme: "eclipse",
                                                                value: {
                                                                    path: "/content"
                                                                },
                                                            })
                                                        ],
                                                        buttons: [
                                                            new sap.m.Button("", {
                                                                text: ibas.i18n.prop("reportanalysis_sql_code_pretty"),
                                                                type: sap.m.ButtonType.Transparent,
                                                                icon: "sap-icon://text-formatting",
                                                                press: function (): void {
                                                                    let content: any = dialog.getContent()[0];
                                                                    if (content instanceof sap.ui.codeeditor.CodeEditor) {
                                                                        content.prettyPrint();
                                                                    }
                                                                }
                                                            }),
                                                            new sap.m.Button("", {
                                                                text: ibas.i18n.prop("shell_exit"),
                                                                type: sap.m.ButtonType.Transparent,
                                                                icon: "sap-icon://inspect-down",
                                                                press: function (): void {
                                                                    dialog.close();
                                                                    dialog = null;
                                                                }
                                                            }),
                                                        ]
                                                    }).addStyleClass("sapUiNoContentPadding");
                                                    dialog.setModel(new sap.extension.model.JSONModel(data));
                                                    dialog.open();
                                                }
                                            }),
                                            new sap.m.Button("", {
                                                icon: "sap-icon://download",
                                                type: sap.m.ButtonType.Transparent,
                                                press: function (): void {
                                                    let data: bo.ReportLog = this.getParent().getBindingContext().getObject();
                                                    if (ibas.objects.isNull(data)) {
                                                        return;
                                                    }
                                                    let blob: Blob = new Blob([data.content], { type: "text/plain" });
                                                    ibas.files.save(blob, ibas.strings.format("{0}_{1}.csv", data.reportId, data.id));
                                                }
                                            }),
                                        ]
                                    })

                                ],
                            })
                        },
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (!that.table.hasModel()) {
                                return;
                            }
                            let model: any = that.table.getModel();
                            if (model instanceof sap.extension.model.JSONModel) {
                                let datas: ibas.ArrayList<bo.ReportLog> = model.getData("rows");
                                if (!(datas?.length > 0)) {
                                    return;
                                }
                                this.setBusy(true);
                                let criteria: ibas.ICriteria = new ibas.Criteria();
                                let condition: ibas.ICondition = criteria.conditions.create();
                                // condition.alias = ibas.CRITERIA_CONDITION_ALIAS_FOLDER;
                                // condition.value = ibas.strings.format("{0}/{1}", datas[datas.length - 1].reportId, datas[datas.length - 1].id);
                                condition.alias = ibas.CRITERIA_CONDITION_ALIAS_MODIFIED_TIME;
                                condition.value = datas[datas.length - 1].beginTime.getTime().toString();
                                condition.operation = ibas.emConditionOperation.LESS_THAN;
                                that.fireViewEvents(that.fetchReportLogsEvent, criteria);
                            }
                        }
                    });
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_refresh"),
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.table.setModel(null);
                                        that.table.destroyItems();
                                        that.fireViewEvents(that.fetchReportLogsEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.table,
                        ]
                    });
                }
                private table: sap.extension.m.Table;

                /** 显示报表日志 */
                showReportLogs(datas: bo.ReportLog[]): void {
                    let model: sap.ui.model.Model = this.table.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }
            }
        }
    }
}