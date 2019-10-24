/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        export namespace c {
            /**
             * 视图-Report
             */
            export class ReportEditView extends ibas.BOEditView implements app.IReportEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加报表参数事件 */
                addReportParameterEvent: Function;
                /** 删除报表参数事件 */
                removeReportParameterEvent: Function;
                /** 报表-业务对象选择 */
                chooseReportBusinessObjectEvent: Function;
                /** 报表-应用选择 */
                chooseReportApplicationEvent: Function;
                /** 报表-报表选择 */
                chooseReportAssociatedReportEvent: Function;
                /** 报表参数-系统变量选择 */
                chooseReportParameterVariableEvent: Function;
                /** 上传报表文件 */
                uploadReportEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_basic") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_group") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "group",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_associated") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_bocode") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: initialfantasy.bo.BOInformation,
                                    key: initialfantasy.bo.BOInformation.PROPERTY_CODE_NAME,
                                    text: initialfantasy.bo.BOInformation.PROPERTY_DESCRIPTION_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseReportBusinessObjectEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "boCode",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_applicationid") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: initialfantasy.bo.ApplicationElement,
                                    key: initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTID_NAME,
                                    text: initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTNAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseReportApplicationEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "applicationId",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 36
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_associatedreport") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryReportAnalysis,
                                dataInfo: {
                                    type: bo.Report,
                                    key: bo.Report.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.Report.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseReportAssociatedReportEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "associatedReport",
                                type: new sap.extension.data.Numeric()
                            }),
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_content") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_category") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: bo.emReportType
                            }).bindProperty("bindingValue", {
                                path: "category",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emReportType
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_sqlstring") }),
                            new sap.extension.m.TextArea("", {
                                rows: 9
                            }).bindProperty("bindingValue", {
                                path: "sqlString",
                                type: new sap.extension.data.Alphanumeric()
                            }).bindProperty("editable", {
                                path: "category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.REPORT) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", {
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("reportanalysis_sql_code_edit"),
                                type: sap.m.ButtonType.Accept,
                                press: function (): void {
                                    let data: bo.Report = that.page.getModel().getData();
                                    if (ibas.objects.isNull(data)) {
                                        return;
                                    }
                                    jQuery.sap.require("sap.ui.codeeditor.CodeEditor");
                                    let dialog: sap.m.Dialog = new sap.extension.m.Dialog("", {
                                        title: ibas.i18n.prop("reportanalysis_sql_code_edit"),
                                        type: sap.m.DialogType.Standard,
                                        state: sap.ui.core.ValueState.None,
                                        content: [
                                            new sap.ui.codeeditor.CodeEditor("", {
                                                height: ibas.strings.format("{0}px", window.innerHeight * 0.6),
                                                width: ibas.strings.format("{0}px", window.innerWidth * 0.6),
                                                type: "sql",
                                                colorTheme: "eclipse",
                                                value: {
                                                    path: "/sqlString"
                                                }
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
                                    });
                                    dialog.setModel(new sap.extension.model.JSONModel(data));
                                    dialog.open();
                                }
                            }).bindProperty("enabled", {
                                path: "category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.REPORT) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_server") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "server",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                })
                            }).bindProperty("editable", {
                                path: "category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.SERVICE) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_user") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "user",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                })
                            }).bindProperty("editable", {
                                path: "category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.SERVICE) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_password") }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Password
                            }).bindProperty("bindingValue", {
                                path: "password",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                })
                            }).bindProperty("editable", {
                                path: "category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.SERVICE) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_address") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "address",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 250
                                })
                            }).bindProperty("editable", {
                                path: "category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.SERVICE) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("reportanalysis_report_file") }),
                            new sap.ui.unified.FileUploader("", {
                                name: "file",
                                width: "100%",
                                placeholder: ibas.i18n.prop("shell_browse"),
                                change(event: sap.ui.base.Event): void {
                                    if (ibas.objects.isNull(event.getParameters())
                                        || ibas.objects.isNull(event.getParameters().files)
                                        || event.getParameters().files.length === 0) {
                                        return;
                                    }
                                    let fileData: FormData = new FormData();
                                    fileData.append("file", event.getParameters().files[0], encodeURI(event.getParameters().newValue));
                                    that.application.viewShower.messages({
                                        type: ibas.emMessageType.QUESTION,
                                        title: that.application.description,
                                        actions: [
                                            ibas.emMessageAction.YES,
                                            ibas.emMessageAction.NO
                                        ],
                                        message: ibas.i18n.prop("reportanalysis_upload_report"),
                                        onCompleted(action: ibas.emMessageAction): void {
                                            if (action === ibas.emMessageAction.YES) {
                                                that.fireViewEvents(that.uploadReportEvent, fileData);
                                            }
                                        }
                                    });
                                }
                            }).bindProperty("enabled", {
                                path: "category",
                                formatter(data: bo.emReportType): any {
                                    if (data === bo.emReportType.FILE) {
                                        return true;
                                    }
                                    return false;
                                }
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_parameters") }),
                            this.tableReportParameter = new sap.extension.table.DataTable("", {
                                enableSelectAll: false,
                                visibleRowCount: sap.extension.table.visibleRowCount(6),
                                dataInfo: {
                                    code: bo.Report.BUSINESS_OBJECT_CODE,
                                    name: bo.ReportParameter.name
                                },
                                toolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_add"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://add",
                                            press: function (): void {
                                                that.fireViewEvents(that.addReportParameterEvent);
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_remove"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://less",
                                            press: function (): void {
                                                that.fireViewEvents(that.removeReportParameterEvent, that.tableReportParameter.getSelecteds());
                                            }
                                        })
                                    ]
                                }),
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_reportparameter_name"),
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 30
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_reportparameter_description"),
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "description",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 60
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_reportparameter_category"),
                                        template: new sap.extension.m.EnumSelect("", {
                                            enumType: bo.emReportParameterType
                                        }).bindProperty("bindingValue", {
                                            path: "category",
                                            type: new sap.extension.data.Enum({
                                                enumType: bo.emReportParameterType
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_reportparameter_value"),
                                        template: new sap.extension.m.Input("", {
                                            showValueHelp: true,
                                            valueHelpOnly: false,
                                            valueHelpRequest: function (): void {
                                                that.fireViewEvents(that.chooseReportParameterVariableEvent,
                                                    // 获取当前对象
                                                    this.getBindingContext().getObject()
                                                );
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "value",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 200
                                            })
                                        }),
                                    }),
                                ]
                            })
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.Report.BUSINESS_OBJECT_CODE,
                        },
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formBottom,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableReportParameter: sap.extension.table.Table;

                /** 显示数据 */
                showReport(data: bo.Report): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据-报表参数 */
                showReportParameters(datas: bo.ReportParameter[]): void {
                    this.tableReportParameter.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}