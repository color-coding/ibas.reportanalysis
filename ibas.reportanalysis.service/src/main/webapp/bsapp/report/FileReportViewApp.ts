/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { IReportViewer } from "./Report.d";
import { BORepositoryReportAnalysis } from "../../borep/BORepositories";
import { ReportViewApp, IReportViewView } from "./ReportViewApp";

/** 查看应用-报表 */
export class FileReportViewApp extends ReportViewApp<IReportViewView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "539038dc-d53a-40ca-a536-5e6e85fc4ef0";
    /** 应用名称 */
    static APPLICATION_NAME: string = "reportanalysis_app_report_view";
    /** 构造函数 */
    constructor() {
        super();
        this.id = FileReportViewApp.APPLICATION_ID;
        this.name = FileReportViewApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        super.viewShowed();
    }
}
/** 查看应用-报表-页签 */
export class FileReportTabViewApp extends FileReportViewApp {
    /** 应用标识 */
    static APPLICATION_ID: string = "539038dc-d53a-40ca-a536-5e6e85fc4ef1";
    /** 构造函数 */
    constructor() {
        super();
        this.id = FileReportTabViewApp.APPLICATION_ID;
    }
}