/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { IReportImportView } from "../../../bsapp/tools/index";

const CONFIG_ITEM_DEFAULT_BOE_SERVER: string = "defaultBOEServer";
const CONFIG_ITEM_DEFAULT_BOE_USER: string = "defaultBOEUser";
const CONFIG_ITEM_DEFAULT_BOE_PASSWORD: string = "defaultBOEPassword";
/**
 * 视图-BOEReport
 */
export class ReportImportView extends ibas.View implements IReportImportView {
    /** 连接BOE */
    connectEvent: Function;
    /** 获取目录 */
    fetchFolderEvent: Function;
    /** 获取报表 */
    fetchReportEvent: Function;
    /** 导入报表 */
    importReportEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        let address: string = ibas.config.get(CONFIG_ITEM_DEFAULT_BOE_SERVER);
        if (!ibas.objects.isNull(address)) {
            address = ibas.urls.normalize(address);
        }
        this.iptServer = new sap.m.Input("", {
            value: address,
        });
        this.iptUser = new sap.m.Input("", {
            value: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) ? ibas.config.get(CONFIG_ITEM_DEFAULT_BOE_USER) : "",
        });
        this.iptPassword = new sap.m.Input("", {
            type: sap.m.InputType.Password,
            value: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) ? ibas.config.get(CONFIG_ITEM_DEFAULT_BOE_PASSWORD) : "",
        });
        this.iptReplace = new sap.m.CheckBox("", {
            selected: false,
            text: ibas.i18n.prop("businessobjectsenterprise_replace_exists"),
        });
        this.tableFolders = new sap.ui.table.TreeTable("", {
            enableSelectAll: true,
            visibleRowCount: 4,
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rowHeight: 22,
            columnHeaderHeight: 22,
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    width: "100px",
                    label: ibas.i18n.prop("bo_boefolder_id"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "id",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boefolder_name"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "name",
                    })
                }),
                new sap.ui.table.Column("", {
                    width: "100px",
                    label: ibas.i18n.prop("bo_boefolder_parentid"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "parentId",
                    })
                }),
            ]
        });
        this.tableReports = new sap.ui.table.Table("", {
            enableSelectAll: true,
            visibleRowCount: 10,
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    width: "100px",
                    label: ibas.i18n.prop("bo_boereport_id"),
                    template: new sap.m.Text("", {
                        width: "100%",
                        wrapping: false
                    }).bindProperty("text", {
                        path: "id",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boereport_name"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "name",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boereport_description"),
                    template: new sap.m.Text("", {
                        width: "100%",
                        wrapping: false
                    }).bindProperty("text", {
                        path: "description",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boereport_path"),
                    template: new sap.m.Text("", {
                        width: "100%",
                        wrapping: false
                    }).bindProperty("text", {
                        path: "path",
                    })
                }),
            ]
        });
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.m.Toolbar("", {
                    design: sap.m.ToolbarDesign.Transparent,
                    content: [
                        new sap.m.Title("", {
                            text: ibas.i18n.prop("businessobjectsenterprise_import_boe")
                        }),
                        new sap.m.ToolbarSpacer("", {}),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("businessobjectsenterprise_import_connect"),
                            icon: "sap-icon://connected",
                            type: sap.m.ButtonType.Transparent,
                            press(): void {
                                that.fireViewEvents(that.connectEvent);
                            }
                        }),
                    ]
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("businessobjectsenterprise_import_server") }),
                this.iptServer,
                new sap.m.Label("", { text: ibas.i18n.prop("businessobjectsenterprise_import_user") }),
                this.iptUser,
                new sap.m.Label("", { text: ibas.i18n.prop("businessobjectsenterprise_import_password") }),
                this.iptPassword,
                new sap.m.Toolbar("", {
                    design: sap.m.ToolbarDesign.Transparent,
                    content: [
                        new sap.m.Title("", {
                            text: ibas.i18n.prop("businessobjectsenterprise_import_folders")
                        }),
                        new sap.m.ToolbarSpacer("", {}),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("businessobjectsenterprise_import_refresh"),
                            icon: "sap-icon://refresh",
                            type: sap.m.ButtonType.Transparent,
                            press(): void {
                                that.fireViewEvents(that.fetchFolderEvent);
                            }
                        }),
                    ]
                }),
                this.tableFolders,
                new sap.m.Toolbar("", {
                    design: sap.m.ToolbarDesign.Transparent,
                    content: [
                        new sap.m.Title("", { text: ibas.i18n.prop("businessobjectsenterprise_import_reports") }),
                        new sap.m.ToolbarSpacer("", {}),
                        // this.iptReplace,
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("businessobjectsenterprise_import_import"),
                            icon: "sap-icon://journey-arrive",
                            type: sap.m.ButtonType.Transparent,
                            press(): void {
                                that.fireViewEvents(that.importReportEvent,
                                    // 获取表格选中的对象
                                    utils.getTableSelecteds<bo.BOEReport>(that.tableReports)
                                );
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("businessobjectsenterprise_import_refresh"),
                            icon: "sap-icon://refresh",
                            type: sap.m.ButtonType.Transparent,
                            press(): void {
                                that.fireViewEvents(that.fetchReportEvent,
                                    // 获取表格选中的对象
                                    utils.getTableSelecteds<bo.BOEFolder>(that.tableFolders)
                                );
                            }
                        }),
                    ]
                }),
                this.tableReports,
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private tableReports: sap.ui.table.Table;
    private tableFolders: sap.ui.table.Table;
    private iptServer: sap.m.Input;
    private iptUser: sap.m.Input;
    private iptPassword: sap.m.Input;
    private iptReplace: sap.m.CheckBox;
    /** BOE服务地址 */
    get server(): string {
        return this.iptServer.getValue();
    }
    /** BOE用户 */
    get user(): string {
        return this.iptUser.getValue();
    }
    /** BOE密码 */
    get password(): string {
        return this.iptPassword.getValue();
    }
    /** 替换已存在报表 */
    get replace(): boolean {
        return this.iptReplace.getSelected();
    }
    /** 显示目录 */
    showFolders(datas: bo.BOEFolder[]): void {
        let parentNode: Function = function (node: TreeNode, parentId: number): TreeNode {
            if (ibas.objects.isNull(node)) {
                return null;
            }
            if (node.id === parentId) {
                return node;
            }
            if (!ibas.objects.isNull(node.nodes)) {
                for (let item of node.nodes) {
                    let parent: TreeNode = parentNode(item);
                    if (!ibas.objects.isNull(parent)) {
                        return parent;
                    }
                }
            }
            return null;
        };
        let trees: Array<TreeNode> = new Array<TreeNode>();
        for (let item of datas) {
            let parent: TreeNode = null;
            for (let node of trees) {
                parent = parentNode(node, item.parentId);
                if (!ibas.objects.isNull(parent)) {
                    break;
                }
            }
            if (ibas.objects.isNull(parent)) {
                trees.push(new TreeNode(item.id, item.name));
            } else {
                parent.nodes.push(new TreeNode(item.id, item.name));
            }
        }
        this.tableFolders.setModel(new sap.ui.model.json.JSONModel({ rows: trees }));
    }
    /** 显示报表 */
    showReports(datas: bo.BOEReport[]): void {
        this.tableReports.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
    }
}

class TreeNode {
    constructor(id: number, name: string);
    constructor() {
        this.id = arguments[0];
        this.name = arguments[1];
        this.nodes = new ibas.ArrayList<TreeNode>();
    }
    id: number;
    name: string;
    nodes: ibas.ArrayList<TreeNode>;
}