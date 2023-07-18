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
            const BO_CODE_REPORT: string = ibas.config.applyVariables(bo.BO_CODE_REPORT);
            /** 配置项目-全屏模式 */
            export const CONFIG_ITEM_FULL_SCREEN: string = "fullScreen";
            /** 参数，地址 */
            export const PARAMETER_NAME_URL: string = "${Url}";
            /** 视图 */
            export interface IReportViewView extends app.IReportViewView {
                /** 视图数据 */
                viewData: ibas.DataTable;
                /** 视图容器 */
                viewContainer: sap.m.Page | sap.m.Dialog;
                /** 进程消息 */
                proceeding(type: ibas.emMessageType, msg: string): void;
                /** 对话消息 */
                messages(caller: ibas.IMessgesCaller): void;
                /** 触发值连接 */
                fireValueLink(objectCode: string, value: string, row?: any): void;
            }
            export class ReportViewContent {
                constructor(parent: IReportViewView, chooseType: ibas.emChooseType) {
                    this.parent = parent;
                    this.chooseType = chooseType ? chooseType : ibas.emChooseType.SINGLE;
                }
                private valuesMap: Map<bo.UserReportParameter, string>;
                protected chooseType: ibas.emChooseType;
                protected parent: IReportViewView;
                /** 显示报表 */
                showReport(report: bo.UserReport): void {
                    this.parent.viewData = undefined;
                    this.parent.viewContainer.destroyContent();
                    if (this.parent.viewContainer instanceof sap.m.Page) {
                        this.parent.viewContainer.setShowSubHeader(true);
                        this.parent.viewContainer.setShowFooter(false);
                        this.parent.viewContainer.setEnableScrolling(true);
                    } else if (this.parent.viewContainer instanceof sap.m.Dialog) {
                        this.parent.viewContainer.setVerticalScrolling(true);
                    }
                    // 显示报表参数
                    if (ibas.objects.isNull(report.parameters) || report.parameters.length === 0) {
                        return;
                    }
                    let form: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                        ],
                        layoutData: new sap.m.FlexItemData("", {
                            baseSize: "100%",
                            growFactor: 1
                        })
                    });
                    let title: sap.m.Title = new sap.m.Title("", {
                        level: sap.ui.core.TitleLevel.H3,
                        titleStyle: sap.ui.core.TitleLevel.H3,
                        textAlign: sap.ui.core.TextAlign.Center,
                        text: ibas.i18n.prop("reportanalysis_running_parameters"),
                    });
                    if (ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) !== ibas.emPlantform.PHONE) {
                        // pc端
                        if (this.parent.viewContainer instanceof sap.m.Page) {
                            // 正常页面
                            form.setLayoutData(new sap.m.FlexItemData("", {
                                baseSize: "65%",
                                growFactor: 0.65
                            }));
                            form.setWidth("75%");
                            title.setWidth("70%");
                            title.setTextAlign(sap.ui.core.TextAlign.End);
                        }
                    }
                    form.addContent(title);
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
                    this.parent.viewContainer.addContent(new sap.m.FlexBox("", {
                        width: "100%",
                        height: "100%",
                        fitContainer: true,
                        direction: sap.m.FlexDirection.RowReverse,
                        alignItems: sap.m.FlexAlignItems.Start,
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignContent: sap.m.FlexAlignContent.SpaceBetween,
                        renderType: sap.m.FlexRendertype.Div,
                        wrap: sap.m.FlexWrap.NoWrap,
                        items: [
                            form
                        ]
                    }));
                }
                /** 显示报表结果 */
                showResults(table: ibas.DataTable): void {
                    this.parent.viewData = table;
                    this.parent.viewContainer.destroyContent();
                    if (this.parent.viewContainer instanceof sap.m.Page) {
                        this.parent.viewContainer.setShowSubHeader(true);
                        this.parent.viewContainer.setShowFooter(true);
                        this.parent.viewContainer.setEnableScrolling(false);
                    } else if (this.parent.viewContainer instanceof sap.m.Dialog) {
                        this.parent.viewContainer.setVerticalScrolling(false);
                    }
                    if (table.rows.length === 1 && table.columns.length === 2) {
                        let data: ibas4j.IKeyValue = table.convert()[0];
                        if (!ibas.objects.isNull(data) && data.Key === PARAMETER_NAME_URL) {
                            if (ibas.strings.isWith(data.Value, undefined, ".xls")
                                || ibas.strings.isWith(data.Value, undefined, ".xlsx")
                                || ibas.strings.isWith(data.Value, undefined, ".csv")) {
                                let criteria: ibas.ICriteria = new ibas.Criteria();
                                let condition: ibas.ICondition = criteria.conditions.create();
                                condition.alias = ibas.CRITERIA_CONDITION_ALIAS_FILE_NAME;
                                condition.value = data.Value;
                                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                                boRepository.download({
                                    criteria: criteria,
                                    onCompleted: (opRslt) => {
                                        try {
                                            if (opRslt.resultCode !== 0) {
                                                throw new Error(opRslt.message);
                                            }
                                            if (opRslt.resultObjects.length === 0) {
                                                throw new Error(ibas.i18n.prop("reportanalysis_not_found_report_file", data.Value));
                                            }
                                            ibas.servicesManager.runApplicationService<any, ibas.DataTable>({
                                                proxy: new importexport.app.FileParsingServiceProxy({
                                                    file: opRslt.resultObjects.firstOrDefault(),
                                                    outType: "table"
                                                }),
                                                onCompleted: (result) => {
                                                    this.parent.viewContainer.addContent(this.createTable(result));
                                                    this.parent.viewData = result;
                                                }
                                            });
                                        } catch (error) {
                                            this.parent.messages({
                                                type: ibas.emMessageType.ERROR,
                                                message: error.message,
                                            });
                                        }
                                    }
                                }); return;
                            } else {
                                this.parent.viewContainer.addContent(this.createHTML(data.Value));
                                if (this.parent.viewContainer instanceof sap.m.Page) {
                                    this.parent.viewContainer.setShowSubHeader(false);
                                    this.parent.viewContainer.setShowFooter(false);
                                } return;
                            }
                        }
                    }
                    this.parent.viewContainer.addContent(this.createTable(table));
                }
                protected createHTML(url: string): sap.ui.core.HTML {
                    this.parent.proceeding(
                        ibas.emMessageType.INFORMATION,
                        ibas.i18n.prop("reportanalysis_running_report", url),
                    );
                    if (!ibas.strings.isWith(url, "http://", undefined, true) && !ibas.strings.isWith(url, "https://", undefined, true)) {
                        let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                        url = boRepository.toUrl(url);
                    }
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
                    let that: this = this;
                    let tableResult: sap.ui.table.Table = new sap.extension.table.Table("", {
                        enableSelectAll: true,
                        chooseType: this.chooseType,
                        selectionBehavior: sap.ui.table.SelectionBehavior.RowOnly,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: "#",
                                autoResizable: true,
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "#",
                                })
                            })
                        ]
                    });
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
                        if (col.definedDataType() === ibas.emTableDataType.DATE) {
                            tableResult.addColumn(new sap.ui.table.Column("", {
                                autoResizable: true,
                                label: infoCol.description,
                                sortProperty: infoCol.path,
                                filterProperty: infoCol.path,
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: infoCol.path,
                                    type: new sap.extension.data.Date(),
                                })
                            }));
                        } else if (!ibas.objects.isNull(infoCol.objectCode)) {
                            // 对象有值，""认为是任意对象，具体从值中解析
                            tableResult.addColumn(new sap.ui.table.Column("", {
                                autoResizable: true,
                                label: infoCol.description,
                                sortProperty: infoCol.path,
                                filterProperty: infoCol.path,
                                template: new sap.extension.m.Link("", {
                                    press(this: sap.extension.m.Link): void {
                                        let objectCode: string = infoCol.objectCode;
                                        if (ibas.strings.isEmpty(objectCode)) {
                                            // 未指定对象，从原始值中获取
                                            let value: string = this.getTooltip()?.toString();
                                            if (typeof value === "string" && value.endsWith("}")) {
                                                let index: number = value.indexOf("#{");
                                                if (index > 0) {
                                                    let data: string = value.substring(index);
                                                    objectCode = data.substring(2, data.length - 1);
                                                    value = value.substring(0, index);
                                                }
                                            }
                                        }
                                        if (!ibas.strings.isEmpty(objectCode)) {
                                            let linkValue: string = this.getBindingValue();
                                            if (objectCode.indexOf(".") > 0) {
                                                linkValue = objectCode.substring(objectCode.indexOf(".") + 1);
                                                objectCode = objectCode.substring(0, objectCode.indexOf("."));
                                            }
                                            let data: any = this.getBindingContext().getObject();
                                            let rowData: any = {};
                                            for (let item in data) {
                                                if (ibas.objects.isNull(item)) {
                                                    continue;
                                                }
                                                let name: string = table.columns[item]?.name;
                                                if (ibas.objects.isNull(name)) {
                                                    continue;
                                                }
                                                rowData[name] = data[item];
                                            }
                                            that.parent.fireValueLink(objectCode, linkValue, rowData);
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: infoCol.path,
                                    type: new sap.extension.data.Alphanumeric(),
                                    formatter: function (value: string): string {
                                        if (typeof value === "string" && value.endsWith("}") && value.indexOf("#{") > 0) {
                                            this.setTooltip(value);
                                            return value.substring(0, value.indexOf("#{"));
                                        }
                                        return value;
                                    }
                                })
                            }));
                        } else {
                            tableResult.addColumn(new sap.ui.table.Column("", {
                                autoResizable: true,
                                label: infoCol.description,
                                multiLabels: [
                                    new sap.m.Label("", {
                                        text: infoCol.description,
                                    })
                                ],
                                sortProperty: infoCol.path,
                                filterProperty: infoCol.path,
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
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: infoCol.path,
                                    type: new sap.extension.data.Alphanumeric(),
                                })
                            }));
                        }
                    }
                    let modelData: any[] = table.convert({ format: true, nameAs: "index" });
                    let index: number = 1;
                    for (let item of modelData) {
                        item["#"] = index;
                        index++;
                    }
                    let model: sap.ui.model.json.JSONModel = new sap.extension.model.JSONModel({ rows: modelData });
                    // 设置集合长度限制,默认100
                    model.setSizeLimit(modelData.length);
                    tableResult.setModel(model);
                    return tableResult;
                }
            }
        }
    }
}