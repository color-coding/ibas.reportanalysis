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
import { BO_CODE_USER, IUser, BO_CODE_ROLE, IRole } from "../../3rdparty/initialfantasy/index";

/** 应用-报表簿 */
export class ReportBookEditApp extends ibas.BOEditApplication<IReportBookEditView, bo.ReportBook> {

    /** 应用标识 */
    static APPLICATION_ID: string = "2ce72468-0c9d-45e5-b170-85ced746f983";
    /** 应用名称 */
    static APPLICATION_NAME: string = "reportanalysis_app_reportbook_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ReportBook.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ReportBookEditApp.APPLICATION_ID;
        this.name = ReportBookEditApp.APPLICATION_NAME;
        this.boCode = ReportBookEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.addReportBookItemEvent = this.addReportBookItem;
        this.view.removeReportBookItemEvent = this.removeReportBookItem;
        this.view.chooseUserRoleEvent = this.chooseUserRole;
        this.view.chooseReportBookItemReportEvent = this.chooseReportBookItemReport;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.ReportBook();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
        }
        this.view.showReportBook(this.editData);
        this.view.showReportBookItems(this.editData.reportBookItems.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.ReportBook)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
                boRepository.fetchReportBook({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ReportBook>): void {
                        let data: bo.ReportBook;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.ReportBook)) {
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
    protected editData: bo.ReportBook;
    /** 保存数据 */
    protected saveData(): void {
        try {
            let that: this = this;
            let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
            boRepository.saveReportBook({
                beSaved: this.editData,
                onCompleted(opRslt: ibas.IOperationResult<bo.ReportBook>): void {
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
        } catch (error) {
            this.messages(error);
        }
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
                that.editData = new bo.ReportBook();
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
    /** 添加报表簿-项目事件 */
    addReportBookItem(): void {
        this.editData.reportBookItems.create();
        // 仅显示没有标记删除的
        this.view.showReportBookItems(this.editData.reportBookItems.filterDeleted());
    }
    /** 删除报表簿-项目事件 */
    removeReportBookItem(items: bo.ReportBookItem[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.reportBookItems.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.reportBookItems.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showReportBookItems(this.editData.reportBookItems.filterDeleted());
    }
    /** 选择客户、角色行事件 */
    chooseUserRole(): void {
        let that: this = this;
        if (this.editData.assignedType === bo.emAssignedType.ROLE) {
            ibas.servicesManager.runChooseService<IRole>({
                boCode: BO_CODE_ROLE,
                onCompleted(selecteds: ibas.List<IRole>): void {
                    that.editData.assigned = selecteds.firstOrDefault().code;
                    if (ibas.objects.isNull(that.editData.name)) {
                        that.editData.name = ibas.i18n.prop("reportanalysis_someone_report", selecteds.firstOrDefault().name);
                    }
                }
            });
        } else if (this.editData.assignedType === bo.emAssignedType.USER) {
            ibas.servicesManager.runChooseService<IUser>({
                boCode: BO_CODE_USER,
                onCompleted(selecteds: ibas.List<IUser>): void {
                    that.editData.assigned = selecteds.firstOrDefault().code;
                    if (ibas.objects.isNull(that.editData.name)) {
                        that.editData.name = ibas.i18n.prop("reportanalysis_someone_report", selecteds.firstOrDefault().name);
                    }
                }
            });
        }
    }
    /** 选择报表簿-项目-报表事件 */
    chooseReportBookItemReport(caller: bo.ReportBookItem): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Report>({
            caller: caller,
            boCode: bo.Report.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Report.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, "Y")
            ],
            onCompleted(selecteds: ibas.List<bo.Report>): void {
                // 获取触发的对象
                let index: number = that.editData.reportBookItems.indexOf(caller);
                let item: bo.ReportBookItem = that.editData.reportBookItems[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.reportBookItems.create();
                        created = true;
                    }
                    item.report = selected.objectKey;
                    item.name = selected.name;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showReportBookItems(that.editData.reportBookItems.filterDeleted());
                }
            }
        });

    }

}
/** 视图-报表簿 */
export interface IReportBookEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showReportBook(data: bo.ReportBook): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加报表簿-项目事件 */
    addReportBookItemEvent: Function;
    /** 删除报表簿-项目事件 */
    removeReportBookItemEvent: Function;
    /** 显示数据 */
    showReportBookItems(datas: bo.ReportBookItem[]): void;
    /** 选择报表簿-项目-报表事件 */
    chooseReportBookItemReportEvent: Function;
    /** 选择用户、角色事件 */
    chooseUserRoleEvent: Function;
}
