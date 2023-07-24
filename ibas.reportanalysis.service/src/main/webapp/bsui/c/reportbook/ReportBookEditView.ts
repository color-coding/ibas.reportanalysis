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
             * 视图-ReportBook
             */
            export class ReportBookEditView extends ibas.BOEditView implements app.IReportBookEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加报表簿-项目事件 */
                addReportBookItemEvent: Function;
                /** 删除报表簿-项目事件 */
                removeReportBookItemEvent: Function;
                /** 选择报表簿-项目-报表事件 */
                chooseReportBookItemReportEvent: Function;
                /** 选择客户、角色的事件 */
                chooseUserRoleEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_reportbook_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_reportbook_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("reportanalysis_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_reportbook_assignedtype") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: bo.emAssignedType
                            }).bindProperty("bindingValue", {
                                path: "assignedType",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emAssignedType
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_reportbook_assigned") }),
                            new sap.m.FlexBox("", {
                                items: [
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                        dataInfo: {
                                            type: initialfantasy.bo.User,
                                            key: initialfantasy.bo.User.PROPERTY_CODE_NAME,
                                            text: initialfantasy.bo.User.PROPERTY_NAME_NAME
                                        },
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseUserRoleEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "assignedType",
                                        formatter(data: any): any {
                                            if (data === bo.emAssignedType.USER) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "assigned",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 100
                                        })
                                    }),
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                        dataInfo: {
                                            type: initialfantasy.bo.Organization,
                                            key: initialfantasy.bo.Organization.PROPERTY_CODE_NAME,
                                            text: initialfantasy.bo.Organization.PROPERTY_NAME_NAME
                                        },
                                        dataStartMarker: "!",
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseUserRoleEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "assignedType",
                                        formatter(data: any): any {
                                            if (data === bo.emAssignedType.ROLE) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "assigned",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 100
                                        })
                                    }),
                                    new sap.extension.m.Input("", {
                                        editable: false,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                    }).bindProperty("visible", {
                                        path: "assignedType",
                                        formatter(data: any): any {
                                            if (data === bo.emAssignedType.ALL) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "assigned",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 20
                                        })
                                    }),
                                ]
                            }),
                        ]
                    });
                    let formReportBookItem: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_reportbookitem") }),
                            this.tableReportBookItem = new sap.extension.table.DataTable("", {
                                enableSelectAll: false,
                                visibleRowCount: sap.extension.table.visibleRowCount(8),
                                dataInfo: {
                                    code: bo.ReportBook.BUSINESS_OBJECT_CODE,
                                    name: bo.ReportBookItem.name
                                },
                                toolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_add"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://add",
                                            press: function (): void {
                                                that.fireViewEvents(that.addReportBookItemEvent);
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_remove"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://less",
                                            press: function (): void {
                                                that.fireViewEvents(that.removeReportBookItemEvent, that.tableReportBookItem.getSelecteds());
                                            }
                                        })
                                    ]
                                }),
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_reportbookitem_report"),
                                        template: new sap.extension.m.Input("", {
                                            showValueHelp: true,
                                            valueHelpRequest: function (): void {
                                                that.fireViewEvents(that.chooseReportBookItemReportEvent,
                                                    // 获取当前对象
                                                    this.getBindingContext().getObject()
                                                );
                                            }
                                        }).bindProperty("value", {
                                            path: "report",
                                            type: new sap.extension.data.Numeric()
                                        })
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_reportbookitem_name"),
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 200
                                            })
                                        }),
                                        width: "100%",
                                    }),
                                ]
                            })
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.ReportBook.BUSINESS_OBJECT_CODE,
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
                            formReportBookItem,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableReportBookItem: sap.extension.table.Table;

                /** 显示数据 */
                showReportBook(data: bo.ReportBook): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据-报表簿-项目 */
                showReportBookItems(datas: bo.ReportBookItem[]): void {
                    this.tableReportBookItem.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}