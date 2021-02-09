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
             * 视图-ReportData
             */
            export class ReportImportView extends ibas.View implements app.IReportImportView {
                /** 获取目录 */
                fetchReportDataGroupEvent: Function;
                /** 获取报表 */
                fetchReportDataEvent: Function;
                /** 导入报表 */
                importReportEvent: Function;
                /** B服务地址 */
                get server(): string {
                    return this.serverInfo.server;
                }
                /** 用户 */
                get user(): string {
                    return this.serverInfo.user;
                }
                /** 密码 */
                get password(): string {
                    return this.serverInfo.password;
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableGroup = new sap.ui.table.TreeTable("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: {
                            path: "/rows",
                            parameters: {
                                arrayNames: [
                                    "nodes"
                                ]
                            }
                        },
                        columns: [
                            new sap.ui.table.Column("", {
                                width: "130px",
                                label: ibas.i18n.prop("bo_reportgroup_id"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "id",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportgroup_name"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "name",
                                }),
                                filterProperty: "name"
                            }),
                        ]
                    });
                    this.tableReport = new sap.ui.table.Table("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                width: "100px",
                                label: ibas.i18n.prop("bo_reportdata_id"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "id",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportdata_name"),
                                template: new sap.m.Input("", {
                                }).bindProperty("value", {
                                    path: "name",
                                }),
                                filterProperty: "name"
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportdata_group"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "group",
                                }),
                                filterProperty: "group"
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_reportdata_remarks"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "remarks",
                                })
                            }),
                        ]
                    });
                    this.pageGroup = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("reportanalysis_groups")
                                }),
                                new sap.m.ToolbarSeparator("", {}),
                                new sap.m.ToolbarSpacer("", {}),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("reportanalysis_refresh"),
                                    icon: "sap-icon://refresh",
                                    type: sap.m.ButtonType.Transparent,
                                    press(): void {
                                        if (ibas.objects.isNull(that.serverInfo) || ibas.strings.isEmpty(that.serverInfo.server)) {
                                            that.serverInfo = new ServerInfo();
                                            that.inputServerInfo(that.serverInfo);
                                        } else {
                                            that.fireViewEvents(that.fetchReportDataGroupEvent);
                                        }
                                    }
                                }),
                            ]
                        }),
                        //  floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSeparator("", {}),
                                new sap.m.Text("", {
                                    wrapping: false,
                                    text: ibas.i18n.prop("reportanalysis_please_server_address")
                                }),
                                new sap.m.ToolbarSpacer("", {}),
                                new sap.m.ToolbarSeparator("", {}),
                                new sap.m.Button("", {
                                    icon: "sap-icon://action-settings",
                                    type: sap.m.ButtonType.Transparent,
                                    press(): void {
                                        if (ibas.objects.isNull(that.serverInfo)) {
                                            that.serverInfo = new ServerInfo();
                                        }
                                        that.inputServerInfo(that.serverInfo);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.tableGroup
                        ]
                    });
                    this.pageReport = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("reportanalysis_reports")
                                }),
                                new sap.m.ToolbarSeparator("", {}),
                                new sap.m.ToolbarSpacer("", {}),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("reportanalysis_import"),
                                    icon: "sap-icon://journey-arrive",
                                    type: sap.m.ButtonType.Transparent,
                                    press(): void {
                                        if (ibas.objects.isNull(that.serverInfo) || ibas.strings.isEmpty(that.serverInfo.server)) {
                                            that.serverInfo = new ServerInfo();
                                            that.inputServerInfo(that.serverInfo);
                                        } else {
                                            that.fireViewEvents(that.importReportEvent,
                                                // 获取表格选中的对象
                                                openui5.utils.getSelecteds<bo.ReportData>(that.tableReport)
                                            );
                                        }
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("reportanalysis_refresh"),
                                    icon: "sap-icon://refresh",
                                    type: sap.m.ButtonType.Transparent,
                                    press(): void {
                                        if (ibas.objects.isNull(that.serverInfo) || ibas.strings.isEmpty(that.serverInfo.server)) {
                                            that.serverInfo = new ServerInfo();
                                            that.inputServerInfo(that.serverInfo);
                                        } else {
                                            let treeNodes: TreeNode[] = openui5.utils.getSelecteds<TreeNode>(that.tableGroup);
                                            let sltGroups: ibas.ArrayList<bo.ReportGroup> = new ibas.ArrayList<bo.ReportGroup>();
                                            let subItems: Function = function (nodes: TreeNode[]): void {
                                                for (let node of nodes) {
                                                    sltGroups.add(node.data);
                                                    subItems(node.nodes);
                                                }
                                            };
                                            subItems(treeNodes);
                                            that.fireViewEvents(that.fetchReportDataEvent, sltGroups);
                                            subItems = null;
                                        }
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.tableReport
                        ]
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageGroup,
                        ],
                        detailPages: [
                            this.pageReport
                        ],
                    });
                }
                private tableReport: sap.ui.table.Table;
                private tableGroup: sap.ui.table.TreeTable;
                private pageGroup: sap.m.Page;
                private pageReport: sap.m.Page;
                private serverInfo: ServerInfo;
                /** 显示报表组 */
                showReportGroups(datas: bo.ReportGroup[]): void {
                    let values: ibas.ArrayList<TreeNode> = new ibas.ArrayList<TreeNode>();
                    for (let item of datas) {
                        values.add(new TreeNode(item));
                    }
                    let trees: ibas.ArrayList<TreeNode> = new ibas.ArrayList<TreeNode>();
                    for (let node of values) {
                        let root: boolean = true;
                        for (let item of values) {
                            if (node.data.parentId === item.data.id) {
                                item.nodes.add(node);
                                root = false;
                                break;
                            }
                        }
                        if (root === true) {
                            trees.add(node);
                        }
                    }
                    this.tableGroup.setModel(new sap.ui.model.json.JSONModel({ rows: trees }));
                }
                /** 显示报表 */
                showReportDatas(datas: bo.ReportData[]): void {
                    this.tableReport.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
                /** 输入服务器信息 */
                private inputServerInfo(serverInfo: ServerInfo): void {
                    let that: this = this;
                    let servers: sap.ui.core.Item[] = [
                        new sap.ui.core.Item("", {
                            key: "b1",
                            text: "http://ibas-demo-b1:8080/businessone/services/rest/data",
                        }),
                        new sap.ui.core.Item("", {
                            key: "boe",
                            text: "http://ibas-demo-boe:8080/businessobjectsenterprise/services/rest/data",
                        }),
                        new sap.ui.core.Item("", {
                            key: "ibas",
                            text: "http://localhost:8080/reportanalysis/services/rest/data",
                        })
                    ];
                    if (ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) === true) {
                        serverInfo.user = "admin";
                        serverInfo.password = "1q2w3e";
                    }
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        title: ibas.i18n.prop("reportanalysis_remote_service"),
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        content: [
                            new sap.ui.layout.form.SimpleForm("", {
                                editable: true,
                                content: [
                                    new sap.m.Label("", {
                                        text: ibas.i18n.prop("reportanalysis_server")
                                    }),
                                    new sap.m.ComboBox("", {
                                        width: "100%",
                                        items: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) === true ? servers : null,
                                    }).bindProperty("value", {
                                        path: "/server"
                                    }),
                                    new sap.m.Label("", {
                                        text: ibas.i18n.prop("reportanalysis_user")
                                    }),
                                    new sap.m.Input("", {
                                    }).bindProperty("value", {
                                        path: "/user"
                                    }),
                                    new sap.m.Label("", {
                                        text: ibas.i18n.prop("reportanalysis_password")
                                    }),
                                    new sap.m.Input("", {
                                        type: "Password",
                                    }).bindProperty("value", {
                                        path: "/password"
                                    })
                                ]
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ],
                        afterClose(): void {
                            let toolbar: any = that.pageGroup.getFooter();
                            if (toolbar instanceof sap.m.Toolbar) {
                                for (let item of toolbar.getContent()) {
                                    if (item instanceof sap.m.Text) {
                                        item.setText(serverInfo.toString());
                                    }
                                }
                            }
                        }
                    }).addStyleClass("sapUiNoContentPadding");
                    dialog.setModel(new sap.ui.model.json.JSONModel(serverInfo));
                    dialog.open();
                }
            }
            /** 创建数据结构 */
            class TreeNode {
                constructor(data: bo.ReportGroup) {
                    this.data = data;
                    // 在节点的子项加入节点
                    this.nodes = new ibas.ArrayList<TreeNode>();
                }
                data: bo.ReportGroup;
                get id(): string {
                    return this.data.id;
                }
                get name(): string {
                    return this.data.name;
                }
                nodes: ibas.ArrayList<TreeNode>;
            }
            class ServerInfo {
                server: string;
                user: string;
                password: string;
                toString(): string {
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    builder.map(null, "unknown");
                    builder.map(undefined, "unknown");
                    builder.append(this.server);
                    builder.append(" - ");
                    builder.append(this.user);
                    return builder.toString();
                }
            }
        }
    }
}