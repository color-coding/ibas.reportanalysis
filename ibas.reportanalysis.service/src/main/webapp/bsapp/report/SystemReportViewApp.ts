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
export class SystemReportViewApp extends ReportViewApp<ISystemReportViewView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428ea";
    /** 应用名称 */
    static APPLICATION_NAME: string = "reportanalysis_app_report_view";
    /** 构造函数 */
    constructor() {
        super();
        this.id = SystemReportViewApp.APPLICATION_ID;
        this.name = SystemReportViewApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.resetReportEvent = this.viewShowed;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        super.viewShowed();
    }
}
/** 视图-报表 */
export interface ISystemReportViewView extends IReportViewView, ibas.IBOViewWithServices {
    /** 调用服务事件 */
    callServicesEvent: Function;
    /** 重置报表 */
    resetReportEvent: Function;
}
/** 查看应用-报表-页签 */
export class SystemReportTabViewApp extends SystemReportViewApp {
    /** 应用标识 */
    static APPLICATION_ID: string = "3c42c391-4dc3-4188-a9d7-b6cc757428eb";
    /** 构造函数 */
    constructor() {
        super();
        this.id = SystemReportTabViewApp.APPLICATION_ID;
    }
}