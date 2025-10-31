/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace bo {
        /** 报表运行日志 */
        export class ReportRunningLog extends ibas.BOSimple<ReportRunningLog> implements IReportRunningLog {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_REPORTRUNNINGLOG;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(ReportRunningLog.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(ReportRunningLog.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(ReportRunningLog.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(ReportRunningLog.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-编号 */
            static PROPERTY_SIGN_NAME: string = "Sign";
            /** 获取-编号 */
            get sign(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_SIGN_NAME);
            }
            /** 设置-编号 */
            set sign(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_SIGN_NAME, value);
            }

            /** 映射的属性名称-报表 */
            static PROPERTY_REPORT_NAME: string = "Report";
            /** 获取-报表 */
            get report(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_REPORT_NAME);
            }
            /** 设置-报表 */
            set report(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_REPORT_NAME, value);
            }

            /** 映射的属性名称-报表名称 */
            static PROPERTY_REPORTNAME_NAME: string = "ReportName";
            /** 获取-报表名称 */
            get reportName(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_REPORTNAME_NAME);
            }
            /** 设置-报表名称 */
            set reportName(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_REPORTNAME_NAME, value);
            }

            /** 映射的属性名称-运行人 */
            static PROPERTY_RUNNER_NAME: string = "Runner";
            /** 获取-运行人 */
            get runner(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_RUNNER_NAME);
            }
            /** 设置-运行人 */
            set runner(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_RUNNER_NAME, value);
            }

            /** 映射的属性名称-开始日期 */
            static PROPERTY_STARTDATE_NAME: string = "StartDate";
            /** 获取-开始日期 */
            get startDate(): Date {
                return this.getProperty<Date>(ReportRunningLog.PROPERTY_STARTDATE_NAME);
            }
            /** 设置-开始日期 */
            set startDate(value: Date) {
                this.setProperty(ReportRunningLog.PROPERTY_STARTDATE_NAME, value);
            }

            /** 映射的属性名称-开始时间 */
            static PROPERTY_STARTTIME_NAME: string = "StartTime";
            /** 获取-开始时间 */
            get startTime(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_STARTTIME_NAME);
            }
            /** 设置-开始时间 */
            set startTime(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_STARTTIME_NAME, value);
            }

            /** 映射的属性名称-结束日期 */
            static PROPERTY_ENDDATE_NAME: string = "EndDate";
            /** 获取-结束日期 */
            get endDate(): Date {
                return this.getProperty<Date>(ReportRunningLog.PROPERTY_ENDDATE_NAME);
            }
            /** 设置-结束日期 */
            set endDate(value: Date) {
                this.setProperty(ReportRunningLog.PROPERTY_ENDDATE_NAME, value);
            }

            /** 映射的属性名称-结束时间 */
            static PROPERTY_ENDTIME_NAME: string = "EndTime";
            /** 获取-结束时间 */
            get endTime(): number {
                return this.getProperty<number>(ReportRunningLog.PROPERTY_ENDTIME_NAME);
            }
            /** 设置-结束时间 */
            set endTime(value: number) {
                this.setProperty(ReportRunningLog.PROPERTY_ENDTIME_NAME, value);
            }

            /** 映射的属性名称-参数文件 */
            static PROPERTY_PARAMETERFILE_NAME: string = "ParameterFile";
            /** 获取-参数文件 */
            get parameterFile(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_PARAMETERFILE_NAME);
            }
            /** 设置-参数文件 */
            set parameterFile(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_PARAMETERFILE_NAME, value);
            }

            /** 映射的属性名称-结果文件 */
            static PROPERTY_RESULTFILE_NAME: string = "ResultFile";
            /** 获取-结果文件 */
            get resultFile(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_RESULTFILE_NAME);
            }
            /** 设置-结果文件 */
            set resultFile(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_RESULTFILE_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(ReportRunningLog.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(ReportRunningLog.PROPERTY_REMARKS_NAME, value);
            }



            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(ReportRunningLog.BUSINESS_OBJECT_CODE);
            }
        }


    }
}
