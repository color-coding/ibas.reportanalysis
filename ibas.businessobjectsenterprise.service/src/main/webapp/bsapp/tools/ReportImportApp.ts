/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryBusinessObjectsEnterprise } from "../../borep/BORepositories";
import { transforms } from "../../borep/DataConverters";
import {
    IReport, IBORepositoryReportAnalysis, BO_REPOSITORY_REPORTANALYSIS
} from "../../3rdparty/reportanalysis/index";

/** 列表应用-BOE报表 */
export class ReportImportApp extends ibas.Application<IReportImportView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "45a0761f-78af-47bd-871f-03f981353466";
    /** 应用名称 */
    static APPLICATION_NAME: string = "businessobjectsenterprise_app_report_import";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ReportImportApp.APPLICATION_ID;
        this.name = ReportImportApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.connectEvent = this.connect;
        this.view.fetchFolderEvent = this.fetchFolder;
        this.view.fetchReportEvent = this.fetchReport;
        this.view.importReportEvent = this.importReport;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** boe仓库 */
    private boeRepository: BORepositoryBusinessObjectsEnterprise;
    /** 连接boe */
    connect(): void {
        let address: string = this.view.server;
        if (ibas.objects.isNull(address) || address.length === 0) {
            throw new Error(ibas.i18n.prop("businessobjectsenterprise_please_server_address"));
        }
        if (!address.startsWith("http")) {
            // 没有http开头认为是非完整地址
            address = "http://" + address + "/businessobjectsenterprise/services/rest/data";
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("businessobjectsenterprise_completion_server_address"));
        }
        let that: this = this;
        this.boeRepository = new BORepositoryBusinessObjectsEnterprise();
        this.boeRepository.address = address;
        this.boeRepository.connect({
            user: this.view.user,
            password: this.view.password,
            onCompleted(opRslt: ibas.IOperationMessages): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("businessobjectsenterprise_connected_server"));
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
    }
    /** 获取目录 */
    fetchFolder(): void {
        if (ibas.objects.isNull(this.boeRepository) || ibas.objects.isNull(this.boeRepository.address)) {
            // 没有连接服务
            throw new Error(ibas.i18n.prop("businessobjectsenterprise_please_connect_servers"));
        }
        let that: this = this;
        this.boeRepository.fetchFolder({
            criteria: new ibas.Criteria(),
            onCompleted(opRslt: ibas.IOperationResult<bo.BOEFolder>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.view.showFolders(opRslt.resultObjects);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
    }
    /** 获取报表 */
    fetchReport(folders: bo.BOEFolder[]): void {
        if (ibas.objects.isNull(this.boeRepository) || ibas.objects.isNull(this.boeRepository.address)) {
            // 没有连接服务
            throw new Error(ibas.i18n.prop("businessobjectsenterprise_please_connect_servers"));
        }
        let criteria: ibas.ICriteria = new ibas.Criteria();
        if (folders instanceof Array) {
            for (let item of folders) {
                if (item instanceof bo.BOEFolder) {
                    let folder: bo.BOEFolder = <bo.BOEFolder>item;
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.CRITERIA_CONDITION_ALIAS_PARENT_ID;
                    condition.value = ibas.strings.valueOf(folder.id);
                    condition.relationship = ibas.emConditionRelationship.OR;
                }
            }
        }
        // 报表查询条件
        let that: this = this;
        this.boeRepository.fetchReport({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.BOEReport>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.view.showReports(opRslt.resultObjects);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
    }
    /** 导入报表 */
    importReport(items: bo.BOEReport[]): void {
        let that: this = this;
        let reports: ibas.ArrayList<IReport> = new ibas.ArrayList<IReport>();
        for (let item of items) {
            let report: IReport = transforms.toReport(item);
            report.user = this.view.user;
            report.password = this.view.password;
            reports.add(report);
        }
        let index: number = 0;
        let saver: Function = function (): void {
            let boRepository: IBORepositoryReportAnalysis
                = ibas.boFactory.create<IBORepositoryReportAnalysis>(BO_REPOSITORY_REPORTANALYSIS);
            if (index < reports.length) {
                // 数据未处理完成
                boRepository.saveReport({
                    beSaved: reports[index],
                    onCompleted(opRslt: ibas.IOperationResult<IReport>): void {
                        try {
                            if (opRslt.resultCode === 0) {
                                // 成功，继续下一个
                                let report: IReport = opRslt.resultObjects.firstOrDefault();
                                if (!ibas.objects.isNull(report)) {
                                    that.proceeding(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("businessobjectsenterprise_import_successful", report.objectKey, report.name));
                                }
                                index++;
                                saver();
                            } else {
                                // 失败，询问是否继续
                                that.messages({
                                    type: ibas.emMessageType.ERROR,
                                    message: ibas.i18n.prop("businessobjectsenterprise_import_faild",
                                        reports[index].name, opRslt.message),
                                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                    onCompleted(action: ibas.emMessageAction): void {
                                        if (action === ibas.emMessageAction.YES) {
                                            index++;
                                            saver();
                                        }
                                    }
                                });
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
        };
        // 调用保存
        saver();
    }
}
/** 视图-BOE报表 */
export interface IReportImportView extends ibas.IView {
    /** BOE服务地址 */
    readonly server: string;
    /** BOE用户 */
    readonly user: string;
    /** BOE密码 */
    readonly password: string;
    /** 替换已存在报表 */
    readonly replace: boolean;
    /** 连接BOE */
    connectEvent: Function;
    /** 获取目录 */
    fetchFolderEvent: Function;
    /** 显示目录 */
    showFolders(datas: bo.BOEFolder[]): void;
    /** 获取报表 */
    fetchReportEvent: Function;
    /** 显示报表 */
    showReports(datas: bo.BOEReport[]): void;
    /** 导入报表 */
    importReportEvent: Function;
}
