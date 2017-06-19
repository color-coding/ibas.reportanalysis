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
import { BO_CODE_SYSTEM_VARIABLE } from "../../3rdparty/initialfantasy/index";

/** 应用-报表 */
export class ReportEditApp extends ibas.BOEditApplication<IReportEditView, bo.Report> {

    /** 应用标识 */
    static APPLICATION_ID: string = "f68fd50e-0055-41ad-9aaf-f08960f97511";
    /** 应用名称 */
    static APPLICATION_NAME: string = "reportanalysis_app_report_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.Report.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ReportEditApp.APPLICATION_ID;
        this.name = ReportEditApp.APPLICATION_NAME;
        this.boCode = ReportEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.addReportParameterEvent = this.addReportParameter;
        this.view.removeReportParameterEvent = this.removeReportParameter;
        this.view.chooseReportAssociatedReportEvent = this.chooseReportAssociatedReport;
        this.view.chooseReportParameterVariableEvent = this.chooseReportParameterVariable;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.Report();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
        }
        this.view.showReport(this.editData);
        this.view.showReportParameters(this.editData.reportParameters.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.Report)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
                boRepository.fetchReport({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Report>): void {
                        let data: bo.Report;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.Report)) {
                            // 查询到了有效数据
                            that.editData = data;
                            that.show();
                        } else {
                            // 数据重新检索无效
                            that.messages({
                                type: ibas.emMessageType.WARNING,
                                message: ibas.i18n.prop("sys_shell_data_deleted_and_created"),
                                onCompleted(): void {
                                    that.show();
                                }
                            });
                        }
                    }
                });
                // 开始查询数据
                return;
            }
        }
        super.run();
    }
    /** 待编辑的数据 */
    protected editData: bo.Report;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
        boRepository.saveReport({
            beSaved: this.editData,
            onCompleted(opRslt: ibas.IOperationResult<bo.Report>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        // 删除成功，释放当前对象
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                        that.editData = undefined;
                    } else {
                        // 替换编辑对象
                        that.editData = opRslt.resultObjects.firstOrDefault();
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("sys_shell_data_save") + ibas.i18n.prop("sys_shell_sucessful"));
                    }
                    // 刷新当前视图
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
    }
    /** 删除数据 */
    protected deleteData(): void {
        let that: this = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("sys_whether_to_delete"),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    that.editData.delete();
                    that.saveData();
                }
            }
        });
    }
    /** 新建数据，参数1：是否克隆 */
    protected createData(clone: boolean): void {
        let that: this = this;
        let createData: Function = function (): void {
            if (clone) {
                // 克隆对象
                that.editData = that.editData.clone();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_cloned_new"));
                that.viewShowed();
            } else {
                // 新建对象
                that.editData = new bo.Report();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
                that.viewShowed();
            }
        };
        if (that.editData.isDirty) {
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("sys_data_not_saved_whether_to_continue"),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action: ibas.emMessageAction): void {
                    if (action === ibas.emMessageAction.YES) {
                        createData();
                    }
                }
            });
        } else {
            createData();
        }
    }
    /** 添加报表参数事件 */
    addReportParameter(): void {
        this.editData.reportParameters.create();
        this.view.showReportParameters(this.editData.reportParameters.filterDeleted());
    }
    /** 删除报表参数事件 */
    removeReportParameter(items: bo.ReportParameter[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.reportParameters.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.reportParameters.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showReportParameters(this.editData.reportParameters.filterDeleted());
    }
    /** 选择报表 */
    private chooseReportAssociatedReport(): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Report>({
            boCode: bo.Report.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Report.PROPERTY_ACTIVATED_NAME,
                    ibas.emConditionOperation.EQUAL, "Y"),
                new ibas.Condition(bo.Report.PROPERTY_OBJECTKEY_NAME,
                    ibas.emConditionOperation.NOT_EQUAL, ibas.strings.valueOf(this.editData.objectKey)),
            ],
            onCompleted(selecteds: ibas.List<bo.Report>): void {
                that.editData.associatedReport = selecteds.firstOrDefault().objectKey;
            }
        });
    }
    /** 报表参数-系统变量选择 */
    chooseReportParameterVariable(caller: bo.ReportParameter): void {
        if (ibas.objects.isNull(caller)) {
            return;
        }
        if (caller.category !== bo.emReportParameterType.SYSTEM) {
            return;
        }
        let that: this = this;
        ibas.servicesManager.runChooseService<ibas.KeyValue>({
            boCode: BO_CODE_SYSTEM_VARIABLE,
            onCompleted(selecteds: ibas.List<ibas.KeyValue>): void {
                // 获取触发的对象
                let index: number = that.editData.reportParameters.indexOf(caller);
                let item: bo.ReportParameter = that.editData.reportParameters[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.reportParameters.create();
                        item.category = bo.emReportParameterType.SYSTEM;
                        created = true;
                    }
                    if (ibas.strings.isEmpty(item.name)) {
                        item.name = selected.key;
                    }
                    item.value = selected.key;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showReportParameters(that.editData.reportParameters.filterDeleted());
                }
            }
        });

    }
}
/** 视图-报表 */
export interface IReportEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showReport(data: bo.Report): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加报表参数事件 */
    addReportParameterEvent: Function;
    /** 删除报表参数事件 */
    removeReportParameterEvent: Function;
    /** 显示数据 */
    showReportParameters(datas: bo.ReportParameter[]): void;
    /** 报表-业务对象选择 */
    chooseReportBOCodeEvent: Function;
    /** 报表-应用选择 */
    chooseReportApplicationIdEvent: Function;
    /** 报表-报表选择 */
    chooseReportAssociatedReportEvent: Function;
    /** 报表参数-系统变量选择 */
    chooseReportParameterVariableEvent: Function;
}
