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
                    let ptySelect: sap.extension.m.Select = new sap.extension.m.Select("", {
                        width: "40%",
                    }).addStyleClass("sapUiTinyMarginEnd");
                    let tableResult: sap.extension.m.List = new sap.extension.m.List("", {
                        chooseType: this.chooseType,
                        growingThreshold: table.rows.length > 20 ? table.rows.length : 20,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.SearchField("", {
                                    width: "60%",
                                    search(event: sap.ui.base.Event): void {
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.SearchField) {
                                            let parent: any = source.getParent();
                                            if (parent instanceof sap.m.Toolbar) {
                                                let select: any = parent.getContent()[1];
                                                if (select instanceof sap.m.Select) {
                                                    let search: string = source.getValue();
                                                    let property: number = select.indexOfItem(select.getSelectedItem());
                                                    for (let item of tableResult.getItems()) {
                                                        let visible: boolean = true;
                                                        if (property >= 0 && !ibas.strings.isEmpty(search)) {
                                                            if (item instanceof sap.m.ObjectListItem) {
                                                                let attribute: any = item.getAttributes()[property];
                                                                if (attribute instanceof sap.m.ObjectAttribute) {
                                                                    if (ibas.strings.isEmpty(attribute.getText())) {
                                                                        visible = false;
                                                                    } else {
                                                                        if (attribute.getText().indexOf(search) < 0) {
                                                                            visible = false;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        item.setVisible(visible);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }),
                                ptySelect,
                            ]
                        }),
                        items: {
                            path: "/rows",
                            template: template = new sap.m.ObjectListItem("", {
                                title: {
                                    path: "#",
                                    formatter(data: any): string {
                                        return ibas.strings.format("# {0}", data);
                                    }
                                },
                            }),
                        },
                    });
                    let maxLength: number = ibas.config.get(CONFIG_ITEM_LINE_MAX_TEXT_LENGTH, 30);
                    for (let index: number = 0; index < table.columns.length; index++) {
                        let col: ibas.DataTableColumn = table.columns[index];
                        let infoCol: { path: string, objectCode?: string, description: string } = {
                            path: index.toString(),
                            description: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                        };
                        if (typeof infoCol.description === "string" && infoCol.description.indexOf("#{") > 0 && infoCol.description.endsWith("}")) {
                            let value: string = infoCol.description.substring(infoCol.description.indexOf("#{"));
                            infoCol.objectCode = value.substring(2, value.length - 1);
                            infoCol.description = infoCol.description.substring(0, infoCol.description.indexOf("#{"));
                        }
                        ptySelect.addItem(new sap.extension.m.SelectItem("", {
                            key: infoCol.path,
                            text: infoCol.description,
                            default: table.columns.length > 1 ?
                                index === 1 : table.columns.length > 0 ?
                                    index === 0 : false
                        }));
                        if (col.definedDataType() === ibas.emTableDataType.DATE) {
                            template.addAttribute(new sap.extension.m.ObjectAttribute("", {
                                title: infoCol.description,
                                bindingValue: {
                                    path: infoCol.path,
                                    type: new sap.extension.data.Date(),
                                }
                            }));
                        } else {
                            template.addAttribute(new sap.extension.m.ObjectAttribute("", {
                                title: infoCol.description,
                                active: {
                                    path: infoCol.path,
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
                                    path: infoCol.path,
                                    formatter: function (value: string): string {
                                        if (typeof value === "string" && value.endsWith("}") && value.indexOf("#{") > 0) {
                                            this.setTooltip(value);
                                            return value.substring(0, value.indexOf("#{"));
                                        }
                                        return value;
                                    }
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
                    let index: number = 1;
                    for (let item of modelData) {
                        item["#"] = index;
                        index++;
                    }
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