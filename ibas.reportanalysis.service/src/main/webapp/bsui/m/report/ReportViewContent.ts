/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        export namespace m {
            const CONFIG_ITEM_LINE_MAX_TEXT_LENGTH: string = "maxLineTextLength";
            export class ReportViewContent extends c.ReportViewContent {
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    if (this.parent.viewContainer instanceof sap.m.Page) {
                        this.parent.viewContainer.setFooter(null);
                    }
                    super.showResults(table);
                    if (this.parent.viewContainer instanceof sap.m.Page) {
                        this.parent.viewContainer.setShowSubHeader(true);
                        this.parent.viewContainer.setShowFooter(true);
                        this.parent.viewContainer.setEnableScrolling(true);
                    } else if (this.parent.viewContainer instanceof sap.m.Dialog) {
                        this.parent.viewContainer.setVerticalScrolling(true);
                    }
                }
                protected createTable(table: ibas.DataTable): sap.ui.core.Control {
                    let template: sap.m.ObjectListItem;
                    let tableResult: sap.extension.m.List = new sap.extension.m.List("", {
                        items: {
                            path: "/rows",
                            template: template = new sap.m.ObjectListItem("", {
                                title: {
                                    path: "",
                                    formatter(data: any): string {
                                        let datas: any = tableResult.getModel().getData("rows");
                                        if (datas instanceof Array) {
                                            return ibas.strings.format("# {0}", datas.indexOf(data) + 1);
                                        }
                                        return null;
                                    }
                                },
                            }),
                        },
                    });
                    let maxLength: number = ibas.config.get(CONFIG_ITEM_LINE_MAX_TEXT_LENGTH, 30);
                    for (let index: number = 0; index < table.columns.length; index++) {
                        let col: ibas.DataTableColumn = table.columns[index];
                        if (ibas.strings.isEmpty(col.description)) {
                            col.description = ibas.i18n.prop(col.name);
                            if (col.description.startsWith("[") && col.description.endsWith("]")) {
                                col.description = col.name;
                            }
                        } else {
                            let value: string = col.description;
                            col.description = ibas.i18n.prop(col.description);
                            if (col.description.startsWith("[") && col.description.endsWith("]")) {
                                col.description = value;
                            }
                        }
                        if (col.definedDataType() === ibas.emTableDataType.DATE) {
                            template.addAttribute(new sap.extension.m.ObjectAttribute("", {
                                title: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                bindingValue: {
                                    path: index.toString(),
                                    formatter(data: any): any {
                                        return ibas.dates.toString(data);
                                    }
                                }
                            }));
                        } else {
                            template.addAttribute(new sap.extension.m.ObjectAttribute("", {
                                title: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                active: {
                                    path: index.toString(),
                                    formatter(data: string): boolean {
                                        if (typeof data === "string") {
                                            let length: number = 0;
                                            for (let item of data) {
                                                if (item.charCodeAt(0) > 255) {
                                                    // 字符编码大于255，说明是双字节字符
                                                    length += 2;
                                                } else {
                                                    length++;
                                                }
                                            }
                                            if (length >= maxLength) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                },
                                bindingValue: {
                                    path: index.toString(),
                                },
                                press: function (event: sap.ui.base.Event): void {
                                    let attribute: any = event.getSource();
                                    if (attribute instanceof sap.m.ObjectAttribute) {
                                        sap.extension.m.MessageBox.show(attribute.getText(), {
                                            title: attribute.getTitle(),
                                            type: ibas.emMessageType.INFORMATION,
                                        });
                                    }
                                },
                            }));
                        }
                    }
                    let modelData: any[] = table.convert({ format: true, nameAs: "index" });
                    let model: sap.extension.model.JSONModel = new sap.extension.model.JSONModel({ rows: modelData });
                    // 设置集合长度限制,默认100
                    model.setSizeLimit(modelData.length);
                    tableResult.setModel(model);
                    return tableResult;
                }
            }
        }
    }
}