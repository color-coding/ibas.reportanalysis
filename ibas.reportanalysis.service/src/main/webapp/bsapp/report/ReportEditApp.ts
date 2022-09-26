/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
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
                this.view.chooseReportBusinessObjectEvent = this.chooseReportBusinessObject;
                this.view.chooseReportThirdPartyAppEvent = this.chooseReportThirdPartyApp;
                this.view.uploadReportEvent = this.uploadReport;
                this.view.downloadReportEvent = this.downloadFile;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.Report();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showReport(this.editData);
                this.view.showReportParameters(this.editData.reportParameters.filterDeleted());
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Report): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.Report)) {
                    let data: bo.Report = arguments[0];
                    // 新对象直接编辑
                    if (data.isNew) {
                        that.editData = data;
                        that.show();
                        return;
                    }
                    // 尝试重新查询编辑对象
                    let criteria: ibas.ICriteria = data.criteria();
                    if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                        // 有效的查询对象查询
                        let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
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
                                        message: ibas.i18n.prop("shell_data_deleted_and_created"),
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
                super.run.apply(this, arguments);
            }
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
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
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                            }
                            // 刷新当前视图
                            that.viewShowed();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
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
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.Report();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
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
            private addReportParameter(): void {
                this.editData.reportParameters.create();
                this.view.showReportParameters(this.editData.reportParameters.filterDeleted());
            }
            /** 删除报表参数事件 */
            private removeReportParameter(items: bo.ReportParameter[]): void {
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
                        new ibas.Condition(bo.Report.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Report>): void {
                        that.editData.associatedReport = selecteds.firstOrDefault().objectKey;
                    }
                });
            }
            /** 报表参数-系统变量选择 */
            private chooseReportParameterVariable(caller: bo.ReportParameter): void {
                if (ibas.objects.isNull(caller)) {
                    return;
                }
                if (caller.category === bo.emReportParameterType.SYSTEM) {
                    let that: this = this;
                    ibas.servicesManager.runChooseService<ibas.KeyValue>({
                        boCode: initialfantasy.bo.BO_CODE_SYSTEM_VARIABLE,
                        onCompleted(selecteds: ibas.IList<ibas.KeyValue>): void {
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
                } else if (caller.category === bo.emReportParameterType.CHOOSE_LIST) {
                    let that: this = this;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    criteria.noChilds = true;
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = initialfantasy.bo.BOInformation.PROPERTY_CODE_NAME;
                    condition.value = ".";
                    condition.operation = ibas.emConditionOperation.NOT_CONTAIN;
                    ibas.servicesManager.runChooseService<initialfantasy.bo.IBOInformation>({
                        boCode: initialfantasy.bo.BO_CODE_BOINFORMATION,
                        criteria: criteria,
                        onCompleted(selecteds: ibas.IList<initialfantasy.bo.IBOInformation>): void {
                            // 获取触发的对象
                            let index: number = that.editData.reportParameters.indexOf(caller);
                            let item: bo.ReportParameter = that.editData.reportParameters[index];
                            // 选择返回数量多余触发数量时,自动创建新的项目
                            let created: boolean = false;
                            for (let selected of selecteds) {
                                if (ibas.objects.isNull(item)) {
                                    item = that.editData.reportParameters.create();
                                    item.category = bo.emReportParameterType.CHOOSE_LIST;
                                    created = true;
                                }
                                if (ibas.strings.isEmpty(item.name)) {
                                    item.name = selected.name;
                                }
                                if (ibas.strings.isEmpty(item.description)) {
                                    item.description = selected.description;
                                }
                                // 默认赋值字段
                                if (selected.objectType === "Simple") {
                                    item.value = ibas.strings.format("{0}.ObjectKey", selected.code);
                                } else if (selected.objectType === "MasterData") {
                                    item.value = ibas.strings.format("{0}.Code", selected.code);
                                } else if (selected.objectType === "Document") {
                                    item.value = ibas.strings.format("{0}.DocEntry", selected.code);
                                } else {
                                    item.value = selected.code;
                                }
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
            /** 选择业务对象 */
            private chooseReportBusinessObject(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.noChilds = true;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = initialfantasy.bo.BOInformation.PROPERTY_CODE_NAME;
                condition.value = ".";
                condition.operation = ibas.emConditionOperation.NOT_CONTAIN;
                ibas.servicesManager.runChooseService<initialfantasy.bo.IBOInformation>({
                    boCode: initialfantasy.bo.BO_CODE_BOINFORMATION,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<initialfantasy.bo.IBOInformation>): void {
                        // 获取触发的对象
                        that.editData.boCode = selecteds.firstOrDefault().code;
                    }
                });
            }
            /** 选择第三方应用 */
            private chooseReportThirdPartyApp(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.noChilds = true;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = thirdpartyapp.bo.Application.PROPERTY_ACTIVATED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                ibas.servicesManager.runChooseService<thirdpartyapp.bo.IApplication>({
                    boCode: thirdpartyapp.bo.Application.BUSINESS_OBJECT_CODE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<thirdpartyapp.bo.IApplication>): void {
                        // 获取触发的对象
                        that.editData.thirdPartyApp = selecteds.firstOrDefault().code;
                    }
                });
            }
            /** 上传报表 */
            private uploadReport(data: FormData): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                boRepository.upload({
                    fileData: data,
                    onCompleted(opRslt: ibas.IOperationResult<ibas.FileData>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let fileData: ibas.FileData = opRslt.resultObjects.firstOrDefault();
                            if (!ibas.objects.isNull(fileData)) {
                                that.editData.address = ibas.strings.format("file://{0}", fileData.fileName);
                                if (ibas.strings.isEmpty(that.editData.name)) {
                                    that.editData.name = decodeURI((<any>data.get("file"))?.name);
                                }
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_upload") + ibas.i18n.prop("shell_sucessful"));
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_uploading_file"));
            }
            /** 下载文件 */
            protected downloadFile(): void {
                if (ibas.strings.isEmpty(this.editData.address)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("reportanalysis_no_report_file"));
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = ibas.CRITERIA_CONDITION_ALIAS_FILE_NAME;
                condition.value = this.editData.address;
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                boRepository.download({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<Blob>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let data: Blob = opRslt.resultObjects.firstOrDefault();
                            if (!ibas.objects.isNull(data)) {
                                ibas.files.save(data, that.editData.name);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_downloading_file"));
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
            chooseReportBusinessObjectEvent: Function;
            /** 报表-第三方应用选择 */
            chooseReportThirdPartyAppEvent: Function;
            /** 报表-报表选择 */
            chooseReportAssociatedReportEvent: Function;
            /** 报表参数-系统变量选择 */
            chooseReportParameterVariableEvent: Function;
            /** 上传报表文件 */
            uploadReportEvent: Function;
            /** 下载报表文件 */
            downloadReportEvent: Function;
        }
    }
}