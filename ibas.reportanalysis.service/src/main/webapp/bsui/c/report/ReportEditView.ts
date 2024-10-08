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
                /** 报表-报表选择 */
                chooseReportAssociatedReportEvent: Function;
                /** 报表-第三方应用选择 */
                chooseReportThirdPartyAppEvent: Function;
                /** 报表参数-系统变量选择 */
                chooseReportParameterVariableEvent: Function;
                /** 上传报表文件 */
                uploadReportEvent: Function;
                /** 下载报表文件 */
                downloadReportEvent: Function;
                /** 运行报表 */
                runReportEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 180
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_group") }),
                            new sap.extension.m.PropertyInput("", {
                                showValueHelp: true,
                                valueHelpOnly: false,
                                dataInfo: {
                                    code: bo.Report.BUSINESS_OBJECT_CODE,
                                },
                                propertyName: bo.Report.PROPERTY_GROUP_NAME,
                            }).bindProperty("bindingValue", {
                                path: "group",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_objectkey") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "objectKey",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                        ],
                    });
                    let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.IconTabBar("", {
                                headerBackgroundDesign: sap.m.BackgroundDesign.Transparent,
                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                expandable: false,
                                items: [
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("reportanalysis_title_content"),
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Toolbar("", { visible: false }),
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
                                                        rows: 6
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
                                                            let dialog: sap.m.Dialog = new sap.m.Dialog("", {
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
                                                            }).addStyleClass("sapUiNoContentPadding");
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
                                                    new sap.m.Toolbar("", { visible: false }),
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
                                                        autocomplete: false,
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
                                                    new sap.m.FlexBox("", {
                                                        width: "100%",
                                                        justifyContent: sap.m.FlexJustifyContent.Start,
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "address",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            }).bindProperty("editable", {
                                                                path: "category",
                                                                formatter(data: bo.emReportType): any {
                                                                    if (data === bo.emReportType.SERVICE) {
                                                                        return true;
                                                                    } else if (data === bo.emReportType.THIRD_APP) {
                                                                        return true;
                                                                    }
                                                                    return false;
                                                                }
                                                            }),
                                                            new sap.m.MenuButton("", {
                                                                icon: "sap-icon://attachment",
                                                                width: "auto",
                                                                type: sap.m.ButtonType.Transparent,
                                                                menu: new sap.m.Menu("", {
                                                                    items: [
                                                                        new sap.m.MenuItem("", {
                                                                            text: "Excel",
                                                                            icon: "sap-icon://excel-attachment",
                                                                            press: function (): void {
                                                                                ibas.files.open((files) => {
                                                                                    if (files.length > 0) {
                                                                                        let fileData: FormData = new FormData();
                                                                                        fileData.append("file", files[0], encodeURI(files[0].name));
                                                                                        that.fireViewEvents(that.uploadReportEvent, fileData);
                                                                                    }
                                                                                }, {
                                                                                    multiple: false,
                                                                                    accept: "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                                                });
                                                                            }
                                                                        }),
                                                                        new sap.m.MenuItem("", {
                                                                            text: "Report",
                                                                            icon: "sap-icon://business-objects-experience",
                                                                            press: function (): void {
                                                                                ibas.files.open((files) => {
                                                                                    if (files.length > 0) {
                                                                                        let fileData: FormData = new FormData();
                                                                                        fileData.append("file", files[0], encodeURI(files[0].name));
                                                                                        that.fireViewEvents(that.uploadReportEvent, fileData);
                                                                                    }
                                                                                }, {
                                                                                    multiple: false,
                                                                                    accept: "application/x-shockwave-flash,application/x-rpt"
                                                                                });
                                                                            }
                                                                        }),
                                                                        new sap.m.MenuItem("", {
                                                                            text: "Download",
                                                                            icon: "sap-icon://download-from-cloud",
                                                                            press: function (): void {
                                                                                that.fireViewEvents(that.downloadReportEvent);
                                                                            }
                                                                        }),
                                                                    ],
                                                                }),
                                                                buttonMode: sap.m.MenuButtonMode.Split,
                                                                useDefaultActionOnly: true,
                                                                defaultAction: function (): void {
                                                                    ibas.files.open((files) => {
                                                                        if (files.length > 0) {
                                                                            let fileData: FormData = new FormData();
                                                                            fileData.append("file", files[0], encodeURI(files[0].name));
                                                                            that.fireViewEvents(that.uploadReportEvent, fileData);
                                                                        }
                                                                    }, { multiple: false });
                                                                }
                                                            }).addStyleClass("sapUiTinyMarginBegin").bindProperty("visible", {
                                                                path: "category",
                                                                formatter(data: bo.emReportType): any {
                                                                    if (data === bo.emReportType.FILE) {
                                                                        return true;
                                                                    } else if (data === bo.emReportType.THIRD_APP) {
                                                                        return true;
                                                                    }
                                                                    return false;
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_report_thirdpartyapp") }),
                                                    new sap.extension.m.RepositoryInput("", {
                                                        showValueHelp: true,
                                                        repository: thirdpartyapp.bo.BORepositoryThirdPartyApp,
                                                        dataInfo: {
                                                            type: thirdpartyapp.bo.Application,
                                                            key: thirdpartyapp.bo.Application.PROPERTY_CODE_NAME,
                                                            text: thirdpartyapp.bo.Application.PROPERTY_NAME_NAME
                                                        },
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseReportThirdPartyAppEvent);
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "thirdPartyApp",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 20
                                                        })
                                                    }).bindProperty("editable", {
                                                        path: "category",
                                                        formatter(data: bo.emReportType): any {
                                                            if (data === bo.emReportType.THIRD_APP) {
                                                                return true;
                                                            }
                                                            return false;
                                                        }
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("reportanalysis_title_parameters"),
                                        content: [
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
                                                                maxLength: 100
                                                            })
                                                        }),
                                                        width: "14rem",
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
                                                            type: new sap.extension.data.Alphanumeric()
                                                        }),
                                                        width: "100%",
                                                    }),
                                                ]
                                            }),
                                        ]
                                    }),
                                ]
                            }),
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_dataowner") }),
                            new sap.extension.m.DataOwnerInput("", {
                                showValueHelp: true,
                                organization: {
                                    path: "organization",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 8
                                    })
                                }
                            }).bindProperty("bindingValue", {
                                path: "dataOwner",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_organization") }),
                            new sap.extension.m.OrganizationInput("", {
                                showValueHelp: true,
                            }).bindProperty("bindingValue", {
                                path: "organization",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_report_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Toolbar("", { visible: false }),
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
                            new sap.extension.m.SelectionInput("", {
                                showValueHelp: true,
                                valueHelpOnly: false,
                                repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: initialfantasy.bo.ApplicationElement,
                                    key: initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTID_NAME,
                                    text: initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTNAME_NAME
                                },
                                criteria: [
                                    new ibas.Condition(
                                        initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTTYPE_NAME,
                                        ibas.emConditionOperation.NOT_EQUAL,
                                        initialfantasy.bo.emElementType.MODULE
                                    )
                                ],
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
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://display",
                                    press: function (): void {
                                        that.fireViewEvents(that.runReportEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formMiddle,
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