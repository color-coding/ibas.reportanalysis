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
            /** 配置项目-全屏模式 */
            export const CONFIG_ITEM_FULL_SCREEN: string = "fullScreen";
            /** 参数，地址 */
            export const PARAMETER_NAME_URL: string = "${Url}";
            /** 结果类型 */
            export enum emResultType {
                HTML,
                TABLE
            }
            export interface IReportViewView extends app.IReportViewView {
                /** 进程消息 */
                proceeding(type: ibas.emMessageType, msg: string): void;
                /** 对话消息 */
                messages(caller: ibas.IMessgesCaller): void;
            }
            export class ReportViewContent {
                constructor(parent: IReportViewView) {
                    this.parent = parent;
                }
                private valuesMap: Map<bo.UserReportParameter, string>;
                private parent: IReportViewView;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    let form: sap.ui.layout.form.SimpleForm;
                    this.form.destroyItems();
                    if (ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE
                        || this.parent instanceof ibas.DialogView) {
                        this.form.addItem(form = new sap.ui.layout.form.SimpleForm("", {
                            editable: true,
                            content: [
                            ]
                        }));
                    } else {
                        this.form.setGridTemplateColumns("35% 30% 35%");
                        this.form.addItem(new sap.ui.layout.form.SimpleForm("", {
                        }));
                        this.form.addItem(form = new sap.ui.layout.form.SimpleForm("", {
                            editable: true,
                            content: [
                            ]
                        }));
                        this.form.addItem(new sap.ui.layout.form.SimpleForm("", {
                        }));
                    }
                    this.dataTable = undefined;
                    // 显示报表参数
                    if (ibas.objects.isNull(report.parameters) || report.parameters.length === 0) {
                        return;
                    }
                    form.addContent(new sap.m.Title("", {
                        level: sap.ui.core.TitleLevel.H3,
                        titleStyle: sap.ui.core.TitleLevel.H3,
                        textAlign: sap.ui.core.TextAlign.Center,
                        text: ibas.i18n.prop("reportanalysis_running_parameters"),
                    }));
                    for (let item of report.parameters) {
                        if (item.category === bo.emReportParameterType.PRESET) {
                            // 预设的不显示
                            continue;
                        }
                        // 记录参数值，避免重置丢失
                        if (ibas.objects.isNull(this.valuesMap)) {
                            this.valuesMap = new Map<bo.UserReportParameter, string>();
                        }
                        if (!this.valuesMap.has(item)) {
                            this.valuesMap.set(item, item.value);
                        }
                        let value: string = this.valuesMap.get(item);
                        form.addContent(new sap.m.Label("", {
                            text: ibas.strings.isEmpty(item.description) ? item.name.replace("\$\{", "").replace("\}", "") : ibas.strings.remove(item.description, "* ", "*"),
                            required: ibas.strings.isWith(item.description, "*", undefined) ? true : false,
                        }));
                        let input: sap.ui.core.Control;
                        if (item.category === bo.emReportParameterType.DATETIME) {
                            input = new sap.m.DatePicker("", {
                                valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                                displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                                value: {
                                    path: "/value"
                                }
                            });
                            if (ibas.strings.equalsIgnoreCase(item.value, "today")) {
                                item.value = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                            }
                        } else if (item.category === bo.emReportParameterType.SYSTEM) {
                            input = new sap.m.Input("", {
                                editable: false,
                                value: {
                                    path: "/value"
                                }
                            });
                        } else if (item.category === bo.emReportParameterType.RANGE) {
                            let items: Array<sap.ui.core.Item> = new Array<sap.ui.core.Item>();
                            if (!ibas.strings.isEmpty(value)) {
                                for (let item of value.split(";")) {
                                    items.push(new sap.ui.core.Item("", {
                                        key: item,
                                        text: item
                                    }));
                                }
                            }
                            input = new sap.m.Select("", {
                                items: items,
                                selectedKey: {
                                    path: "/value"
                                }
                            });
                        } else if (item.category === bo.emReportParameterType.CHOOSE_LIST && !ibas.strings.isEmpty(value)) {
                            value = ibas.config.applyVariables(value);
                            if (ibas.strings.isWith(value, "#{", "}")) {
                                value = ibas.strings.remove(value, "#", "{", "}");
                            }
                            let criteria: ibas.ICriteria, property: string;
                            if (ibas.strings.isWith(value, "{", "}")) {
                                criteria = ibas.criterias.valueOf(value);
                                if (ibas.strings.isEmpty(criteria.businessObject)) {
                                    criteria = null;
                                }
                                if (criteria.businessObject.indexOf(".") > 0) {
                                    property = criteria.businessObject.split(".")[1];
                                    criteria.businessObject = criteria.businessObject.split(".")[0];
                                }
                            } else if (value.indexOf(".") > 0) {
                                criteria = new ibas.Criteria();
                                criteria.businessObject = value.split(".")[0];
                                property = value.split(".")[1];
                            }
                            item.value = null;
                            input = new sap.m.Input("", {
                                showValueHelp: criteria && criteria.businessObject ? true : false,
                                valueHelpRequest: function (): void {
                                    ibas.servicesManager.runChooseService<any>({
                                        criteria: criteria,
                                        boCode: criteria.businessObject,
                                        chooseType: ibas.emChooseType.MULTIPLE,
                                        onCompleted(selecteds: ibas.IList<any>): void {
                                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                            for (let item of selecteds) {
                                                if (builder.length > 0) {
                                                    builder.append(ibas.DATA_SEPARATOR);
                                                }
                                                if (ibas.strings.isEmpty(property)) {
                                                    builder.append(item);
                                                } else {
                                                    builder.append(item[property]);
                                                }
                                            }
                                            if (input instanceof sap.m.InputBase) {
                                                input.setValue(builder.toString());
                                            }
                                        }
                                    });
                                },
                                value: {
                                    path: "/value"
                                }
                            });
                        } else {
                            input = new sap.m.Input("", {
                                value: {
                                    path: "/value"
                                }
                            });
                        }
                        input.setModel(new sap.ui.model.json.JSONModel(item));
                        form.addContent(input);
                    }
                }
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): emResultType {
                    this.form.destroyItems();
                    this.form.setGridTemplateColumns("100%");
                    this.dataTable = table;
                    if (table.rows.length === 1 && table.columns.length === 2) {
                        let data: ibas4j.IKeyValue = table.convert()[0];
                        if (!ibas.objects.isNull(data) && data.Key === PARAMETER_NAME_URL) {
                            this.parent.proceeding(
                                ibas.emMessageType.INFORMATION,
                                ibas.i18n.prop("reportanalysis_running_report", data.Value),
                            );
                            this.form.addItem(this.createHTML(data.Value));
                            return emResultType.HTML;
                        }
                    }
                    this.form.addItem(this.createTable(table));
                    return emResultType.TABLE;
                }
                protected createHTML(url: string): sap.ui.core.HTML {
                    let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                    url = boRepository.toUrl(url);
                    let html: ibas.StringBuilder = new ibas.StringBuilder();
                    if (ibas.strings.isWith(url, undefined, ".swf")) {
                        html.append("<embed");
                        html.append(" ");
                        html.append("src=\"");
                        html.append(url);
                        // 忽略缓存
                        html.append(url.indexOf("?") > 0 ? "&" : "?");
                        html.append("_=");
                        html.append(ibas.dates.now().getTime().toString());
                        html.append("\"");
                        html.append(" ");
                        html.append("type=\"application/x-shockwave-flash\"");
                        html.append(" ");
                        html.append("style=\"");
                        html.append("width:100%;");
                        html.append("height:-webkit-fill-available;");
                        html.append("height:-moz-fill-available;");
                        html.append("height:-moz-available;");
                        html.append("height:fill-available;");
                        html.append("\"");
                        html.append(" ");
                        html.append("/>");
                    } else {
                        // 宽
                        let width: number = window.innerWidth;
                        width = width - 52;
                        // 高
                        let height: number = window.innerHeight;
                        height = height - 96;
                        if (ibas.config.get(openui5.CONFIG_ITEM_COMPACT_SCREEN) === false) {
                            height = height - 8;
                        }
                        if (ibas.config.get(CONFIG_ITEM_FULL_SCREEN, false)) {
                            height = height + 48;
                        }
                        if (this.parent instanceof ibas.TabView) {
                            if (ibas.config.get(openui5.CONFIG_ITEM_COMPACT_SCREEN) === false) {
                                height = height + 48 - 48;
                            } else {
                                height = height + 40 - 32;
                            }
                        }
                        html.append("<iframe");
                        html.append(" ");
                        html.append("src=\"");
                        html.append(url);
                        html.append("\"");
                        html.append(" ");
                        html.append("width=\"");
                        html.append(width);
                        html.append("\"");
                        html.append(" ");
                        html.append("height=\"");
                        html.append(height);
                        html.append("\"");
                        html.append(" ");
                        html.append("frameborder=\"no\"");
                        html.append(" ");
                        html.append("scrolling=\"no\"");
                        html.append(" ");
                        html.append("style=\"border:0px;\"");
                        html.append(">");
                        html.append("</iframe>");
                    }
                    return new sap.ui.core.HTML("", {
                        content: html.toString(),
                        preferDOM: false,
                        sanitizeContent: true,
                        visible: true,
                    });
                }
                protected createTable(table: ibas.DataTable): sap.ui.core.Control {
                    let tableResult: sap.ui.table.Table = new sap.ui.table.Table("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        editable: false,
                        rows: "{/rows}",
                    });
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
                            tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                    width: "100px",
                                    autoResizable: true,
                                    sortProperty: index.toString(),
                                    filterProperty: index.toString(),
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: index.toString(),
                                        formatter(data: any): any {
                                            return ibas.dates.toString(data);
                                        }
                                    })
                                })
                            );
                        } else {
                            tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                    multiLabels: [
                                        new sap.m.Label("", {
                                            text: ibas.strings.isEmpty(col.description) ? col.name : col.description
                                        })
                                    ],
                                    width: "100px",
                                    autoResizable: true,
                                    sortProperty: index.toString(),
                                    filterProperty: index.toString(),
                                    columnMenuOpen(e: sap.ui.base.Event): boolean {
                                        let column: sap.ui.table.Column = this;
                                        let menu: sap.ui.unified.Menu = e.getParameter("menu");
                                        if (!!menu) {
                                            let totalItem: sap.ui.unified.MenuItemBase = null;
                                            let hideTotalItem: sap.ui.unified.MenuItemBase = null;
                                            for (let menuItem of menu.getItems()) {
                                                if (ibas.strings.equals(menuItem.getId(), menu.getId() + "-total")) {
                                                    totalItem = menuItem;
                                                }
                                                if (ibas.strings.equals(menuItem.getId(), menu.getId() + "-hideTotal")) {
                                                    hideTotalItem = menuItem;
                                                }
                                            }
                                            // 显示合计时,监听Binding的变化,变化后刷新合计值
                                            let refreshBinding: Function = () => {
                                                let total: number = 0;
                                                let decimalPlaces: number = ibas.config.get(ibas.CONFIG_ITEM_DECIMAL_PLACES, 6);
                                                let binding: sap.ui.model.Binding = tableResult.getBinding(undefined);
                                                if (binding instanceof sap.ui.model.json.JSONListBinding) {
                                                    for (let context of (<any>binding).getContexts()) {
                                                        let data: any = context.getObject();
                                                        total += ibas.numbers.valueOf(data[index.toString()]);
                                                    }
                                                }
                                                let multiLabels: sap.ui.core.Control[] = column.getMultiLabels();
                                                let totalLabel: sap.m.Label = null;
                                                if (multiLabels.length > 1 && multiLabels[1] instanceof sap.m.Label) {
                                                    totalLabel = <sap.m.Label>multiLabels[1];
                                                    totalLabel.setText(ibas.i18n.prop("reportanalysis_ui_total", total.toFixed(decimalPlaces)));
                                                }
                                            };
                                            if (!totalItem) {
                                                // 添加合计菜单项
                                                totalItem = new sap.ui.unified.MenuItem(menu.getId() + "-total", {
                                                    icon: "sap-icon://collections-management",
                                                    text: ibas.i18n.prop("reportanalysis_ui_calculation_total"),
                                                    select(): void {
                                                        let multiLabels: sap.ui.core.Control[] = column.getMultiLabels();
                                                        let totalLabel: sap.m.Label = null;
                                                        if (multiLabels.length > 1 && multiLabels[1] instanceof sap.m.Label) {
                                                            totalLabel = <sap.m.Label>multiLabels[1];
                                                        } else {
                                                            totalLabel = new sap.m.Label("", {
                                                            });
                                                            column.addMultiLabel(totalLabel);
                                                        }
                                                        let binding: sap.ui.model.Binding = tableResult.getBinding(undefined);
                                                        if (!!binding) {
                                                            binding.attachChange(refreshBinding);
                                                        }
                                                        // 立即刷新
                                                        refreshBinding();
                                                        menu.close();
                                                        totalItem.setVisible(false);
                                                        hideTotalItem.setVisible(true);
                                                    }
                                                });
                                                setTimeout(() => {
                                                    menu.addItem(totalItem);
                                                }, 100);
                                            }
                                            if (!hideTotalItem) {
                                                // 添加隐藏合计菜单项
                                                hideTotalItem = new sap.ui.unified.MenuItem(menu.getId() + "-hideTotal", {
                                                    icon: "sap-icon://hide",
                                                    text: ibas.i18n.prop("reportanalysis_ui_hide_total"),
                                                    visible: false,
                                                    select(): void {
                                                        column.removeAllMultiLabels();
                                                        column.addMultiLabel(new sap.m.Label("", {
                                                            text: ibas.strings.isEmpty(col.description) ? col.name : col.description
                                                        }));
                                                        let binding: sap.ui.model.Binding = tableResult.getBinding(undefined);
                                                        if (!!binding) {
                                                            binding.detachChange(refreshBinding);
                                                        }
                                                        totalItem.setVisible(true);
                                                        hideTotalItem.setVisible(false);
                                                    }
                                                });
                                                setTimeout(() => {
                                                    menu.addItem(hideTotalItem);
                                                }, 100);
                                            }
                                        }
                                        return true;
                                    },
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: index.toString(),
                                    })
                                })
                            );
                        }
                    }
                    let modelData: any[] = table.convert({ format: true, nameAs: "index" });
                    let model: sap.ui.model.json.JSONModel = new sap.extension.model.JSONModel({ rows: modelData });
                    // 设置集合长度限制,默认100
                    model.setSizeLimit(modelData.length);
                    tableResult.setModel(model);
                    return tableResult.addStyleClass("sapUiSizeCompact");
                }
                private form: sap.ui.layout.cssgrid.CSSGrid;
                public dataTable: ibas.DataTable;
                /** 绘制视图 */
                draw(): any {
                    return this.form = new sap.ui.layout.cssgrid.CSSGrid("", {
                        gridTemplateRows: "1fr",
                        gridGap: "1rem",
                        items: [
                        ]
                    });
                }
            }
        }
    }
}