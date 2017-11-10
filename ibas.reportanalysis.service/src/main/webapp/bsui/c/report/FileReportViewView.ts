/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="../../../3rdparty/swfobject" />
import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { BORepositoryReportAnalysis } from "../../../borep/BORepositories";
import { IReportViewView } from "../../../bsapp/report/index";
import { ReportViewView, ReportViewTabView } from "./ReportViewView";

/** 配置项目-全屏模式 */
const CONFIG_ITEM_FULL_SCREEN: string = "fullScreen";
/** 获取窗口宽度 */
let getWindowWidth: Function = function (tab: boolean): number {
    let consume: number = 96;
    return window.innerWidth - consume;
};
/** 获取窗口高度 */
let getWindowHeight: Function = function (tab: boolean): number {
    let consume: number = 86;
    if (ibas.config.get(CONFIG_ITEM_FULL_SCREEN, false)) {
        consume = consume - 50;
    }
    if (tab) {
        consume = consume + 50;
    }
    return window.innerHeight - consume;
};
let showResults: Function = function (table: ibas.DataTable, form: sap.ui.layout.form.SimpleForm): void {
    let datas: any[] = table.convert();
    if (datas.length === 1) {
        let data: any = datas[0];
        if (data.Key === "${Url}") {
            let criteria: ibas.ICriteria = new ibas.Criteria();
            let condition: ibas.ICondition = criteria.conditions.create();
            condition.alias = ibas.CRITERIA_CONDITION_ALIAS_FILE_NAME;
            condition.value = data.Value;
            let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
            boRepository.loadReport({
                criteria: criteria,
                onCompleted(opRslt: ibas.IOperationResult<any>): void {
                    let blob: Blob = opRslt.resultObjects.firstOrDefault();
                    if (!ibas.objects.isNull(blob)) {
                        if (data.Value.endsWith(".swf")) {
                            let fileReader: FileReader = new FileReader();
                            fileReader.onload = function (e: ProgressEvent): void {
                                let dataUrl: string = (<any>e.target).result;
                                let datas: string[] = dataUrl.split(","),
                                    mime: string = "data:application/x-shockwave-flash",
                                    // atob() 函数用来解码一个已经被base-64编码过的数据
                                    decodedDatas: string = atob(datas[1]),
                                    length: number = decodedDatas.length,
                                    uint8Array: Uint8Array = new Uint8Array(length);
                                while (length--) {
                                    uint8Array[length] = decodedDatas.charCodeAt(length);
                                }
                                let newBlob: Blob = new Blob([uint8Array], { type: mime });
                                // 成功获取
                                let url: string = window.URL.createObjectURL(newBlob);
                                form.addContent(new sap.ui.core.HTML("", {
                                    content: ibas.strings.format("<embed src='{0}' type='application/x-shockwave-flash' \
                                    style= 'width:100%; \
                                    height:-webkit-fill-available;height: -moz-fill-available; \
                                    height: -moz-available;height: fill-available;' />", url)
                                }));
                            };
                            fileReader.readAsDataURL(blob);
                        } else {
                            // 成功获取
                            let url: string = window.URL.createObjectURL(blob);
                            form.addContent(
                                new sap.ui.core.HTML("", {
                                    content: ibas.strings.format(
                                        `<iframe src="{0}" width="{1}" height="{2}" frameborder="no" border="0" scrolling="no"></iframe>`,
                                        url,
                                        getWindowWidth(true),
                                        getWindowHeight(true)),
                                    preferDOM: false,
                                    sanitizeContent: true,
                                    visible: true,
                                })
                            );
                        }
                    } else {
                        // 获取失败
                        form.addContent(new sap.m.MessagePage("", {
                            showHeader: false,
                            showNavButton: false,
                        }));
                    }
                }
            });
        }
    }
};
/**
 * 视图-Report
 */
export class FileReportViewView extends ReportViewView {
    /** 运行报表 */
    runReportEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
                contentLeft: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_run"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://begin",
                        press: function (): void {
                            that.fireViewEvents(that.runReportEvent);
                        }
                    }),
                ],
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private tableResult: sap.ui.table.Table;
    /** 显示报表结果 */
    showResults(table: ibas.DataTable): void {
        if (!ibas.objects.isNull(this.tableResult)) {
            this.tableResult.destroy(true);
        }
        this.form.destroyContent();
        this.page.setShowSubHeader(false);
        showResults(table, this.form);
    }
}
/**
 * 视图-报表查看-页签，需要与上保持同步
 */
export class FileReportViewTabView extends ReportViewTabView {
    /** 运行报表 */
    runReportEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
                contentLeft: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_run"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://begin",
                        press: function (): void {
                            that.fireViewEvents(that.runReportEvent);
                        }
                    }),
                ],
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private tableResult: sap.ui.table.Table;
    /** 显示报表结果 */
    showResults(table: ibas.DataTable): void {
        if (!ibas.objects.isNull(this.tableResult)) {
            this.tableResult.destroy(true);
        }
        this.form.destroyContent();
        this.page.setShowSubHeader(false);
        showResults(table, this.form);
    }
}
