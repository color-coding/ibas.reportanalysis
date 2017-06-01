/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryReportAnalysis } from "../../borep/BORepositories";
import { ReportBookEditApp } from "./ReportBookEditApp";

/** 查看应用-报表簿 */
export class ReportBookViewApp extends ibas.BOViewService<IReportBookViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "05d3f95b-f796-4601-945b-ed6ea0d71aac";
    /** 应用名称 */
    static APPLICATION_NAME: string = "reportanalysis_app_reportbook_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ReportBook.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ReportBookViewApp.APPLICATION_ID;
        this.name = ReportBookViewApp.APPLICATION_NAME;
        this.boCode = ReportBookViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.editDataEvent = this.editData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 编辑数据，参数：目标数据 */
    protected editData(): void {
        let app: ReportBookEditApp = new ReportBookEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        if (arguments[0] instanceof bo.ReportBook) {
            this.viewData = arguments[0];
            this.show();
        } else {
            super.run();
        }
    }
    private viewData: bo.ReportBook;
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that: this = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
            // 添加查询条件

        }
        try {
            let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
            boRepository.fetchReportBook({
                criteria: criteria,
                onCompleted(opRslt: ibas.IOperationResult<bo.ReportBook>): void {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        that.viewData = opRslt.resultObjects.firstOrDefault();
                        that.viewShowed();
                    } catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
        } catch (error) {
            that.messages(error);
        }
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-报表簿 */
export interface IReportBookViewView extends ibas.IBOViewView {

}
/** 报表簿连接服务映射 */
export class ReportBookLinkServiceMapping extends ibas.BOLinkServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = ReportBookViewApp.APPLICATION_ID;
        this.name = ReportBookViewApp.APPLICATION_NAME;
        this.boCode = ReportBookViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new ReportBookViewApp();
    }
}
