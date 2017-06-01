/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    BusinessObject,
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    config,
    strings,
} from "ibas/index";
import {
    IReport,
    IReportParameter,
    IReportParameters,
    BO_CODE_REPORT,
    emReportType,
    emReportParameterType,
} from "../../api/index";

/** 报表 */
export class Report extends BOSimple<Report> implements IReport {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_REPORT;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(Report.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(Report.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(Report.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(Report.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-实例号 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号 */
    get logInst(): number {
        return this.getProperty<number>(Report.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号 */
    set logInst(value: number) {
        this.setProperty(Report.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(Report.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(Report.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(Report.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(Report.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(Report.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(Report.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(Report.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(Report.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-更新日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-更新日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(Report.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-更新日期 */
    set updateDate(value: Date) {
        this.setProperty(Report.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-更新时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-更新时间 */
    get updateTime(): number {
        return this.getProperty<number>(Report.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-更新时间 */
    set updateTime(value: number) {
        this.setProperty(Report.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(Report.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(Report.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-更新用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-更新用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(Report.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-更新用户 */
    set updateUserSign(value: number) {
        this.setProperty(Report.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(Report.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(Report.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(Report.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(Report.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-数据所有者 */
    static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(Report.PROPERTY_DATAOWNER_NAME);
    }
    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(Report.PROPERTY_DATAOWNER_NAME, value);
    }

    /** 映射的属性名称-团队成员 */
    static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
    /** 获取-团队成员 */
    get teamMembers(): string {
        return this.getProperty<string>(Report.PROPERTY_TEAMMEMBERS_NAME);
    }
    /** 设置-团队成员 */
    set teamMembers(value: string) {
        this.setProperty(Report.PROPERTY_TEAMMEMBERS_NAME, value);
    }

    /** 映射的属性名称-数据所属组织 */
    static PROPERTY_ORGANIZATION_NAME: string = "Organization";
    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(Report.PROPERTY_ORGANIZATION_NAME);
    }
    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(Report.PROPERTY_ORGANIZATION_NAME, value);
    }

    /** 映射的属性名称-报表名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-报表名称 */
    get name(): string {
        return this.getProperty<string>(Report.PROPERTY_NAME_NAME);
    }
    /** 设置-报表名称 */
    set name(value: string) {
        this.setProperty(Report.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-是否启用 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-是否启用 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(Report.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-是否启用 */
    set activated(value: emYesNo) {
        this.setProperty(Report.PROPERTY_ACTIVATED_NAME, value);
    }

    /** 映射的属性名称-报表类型 */
    static PROPERTY_CATEGORY_NAME: string = "Category";
    /** 获取-报表类型 */
    get category(): emReportType {
        return this.getProperty<emReportType>(Report.PROPERTY_CATEGORY_NAME);
    }
    /** 设置-报表类型 */
    set category(value: emReportType) {
        this.setProperty(Report.PROPERTY_CATEGORY_NAME, value);
    }

    /** 映射的属性名称-报表组别 */
    static PROPERTY_GROUP_NAME: string = "Group";
    /** 获取-报表组别 */
    get group(): string {
        return this.getProperty<string>(Report.PROPERTY_GROUP_NAME);
    }
    /** 设置-报表组别 */
    set group(value: string) {
        this.setProperty(Report.PROPERTY_GROUP_NAME, value);
    }

    /** 映射的属性名称-关联的业务对象 */
    static PROPERTY_BOCODE_NAME: string = "BOCode";
    /** 获取-关联的业务对象 */
    get boCode(): string {
        return this.getProperty<string>(Report.PROPERTY_BOCODE_NAME);
    }
    /** 设置-关联的业务对象 */
    set boCode(value: string) {
        this.setProperty(Report.PROPERTY_BOCODE_NAME, value);
    }

    /** 映射的属性名称-关联的应用 */
    static PROPERTY_APPLICATIONID_NAME: string = "ApplicationId";
    /** 获取-关联的应用 */
    get applicationId(): string {
        return this.getProperty<string>(Report.PROPERTY_APPLICATIONID_NAME);
    }
    /** 设置-关联的应用 */
    set applicationId(value: string) {
        this.setProperty(Report.PROPERTY_APPLICATIONID_NAME, value);
    }

    /** 映射的属性名称-关联的报表 */
    static PROPERTY_ASSOCIATEDREPORT_NAME: string = "AssociatedReport";
    /** 获取-关联的报表 */
    get associatedReport(): number {
        return this.getProperty<number>(Report.PROPERTY_ASSOCIATEDREPORT_NAME);
    }
    /** 设置-关联的报表 */
    set associatedReport(value: number) {
        this.setProperty(Report.PROPERTY_ASSOCIATEDREPORT_NAME, value);
    }

    /** 映射的属性名称-查询语句 */
    static PROPERTY_SQLSTRING_NAME: string = "SqlString";
    /** 获取-查询语句 */
    get sqlString(): string {
        return this.getProperty<string>(Report.PROPERTY_SQLSTRING_NAME);
    }
    /** 设置-查询语句 */
    set sqlString(value: string) {
        this.setProperty(Report.PROPERTY_SQLSTRING_NAME, value);
    }

    /** 映射的属性名称-服务器名称 */
    static PROPERTY_SERVER_NAME: string = "Server";
    /** 获取-服务器名称 */
    get server(): string {
        return this.getProperty<string>(Report.PROPERTY_SERVER_NAME);
    }
    /** 设置-服务器名称 */
    set server(value: string) {
        this.setProperty(Report.PROPERTY_SERVER_NAME, value);
    }

    /** 映射的属性名称-用户名 */
    static PROPERTY_USER_NAME: string = "User";
    /** 获取-用户名 */
    get user(): string {
        return this.getProperty<string>(Report.PROPERTY_USER_NAME);
    }
    /** 设置-用户名 */
    set user(value: string) {
        this.setProperty(Report.PROPERTY_USER_NAME, value);
    }

    /** 映射的属性名称-密码 */
    static PROPERTY_PASSWORD_NAME: string = "Password";
    /** 获取-密码 */
    get password(): string {
        return this.getProperty<string>(Report.PROPERTY_PASSWORD_NAME);
    }
    /** 设置-密码 */
    set password(value: string) {
        this.setProperty(Report.PROPERTY_PASSWORD_NAME, value);
    }

    /** 映射的属性名称-报表地址 */
    static PROPERTY_ADDRESS_NAME: string = "Address";
    /** 获取-报表地址 */
    get address(): string {
        return this.getProperty<string>(Report.PROPERTY_ADDRESS_NAME);
    }
    /** 设置-报表地址 */
    set address(value: string) {
        this.setProperty(Report.PROPERTY_ADDRESS_NAME, value);
    }


    /** 映射的属性名称-报表参数集合 */
    static PROPERTY_REPORTPARAMETERS_NAME: string = "ReportParameters";
    /** 获取-报表参数集合 */
    get reportParameters(): ReportParameters {
        return this.getProperty<ReportParameters>(Report.PROPERTY_REPORTPARAMETERS_NAME);
    }
    /** 设置-报表参数集合 */
    set reportParameters(value: ReportParameters) {
        this.setProperty(Report.PROPERTY_REPORTPARAMETERS_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.reportParameters = new ReportParameters(this);
        this.objectCode = config.applyVariables(Report.BUSINESS_OBJECT_CODE);
    }
}

/** 报表参数 */
export class ReportParameter extends BOSimpleLine<ReportParameter> implements IReportParameter {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(ReportParameter.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(ReportParameter.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-对象行号 */
    get lineId(): number {
        return this.getProperty<number>(ReportParameter.PROPERTY_LINEID_NAME);
    }
    /** 设置-对象行号 */
    set lineId(value: number) {
        this.setProperty(ReportParameter.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(ReportParameter.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(ReportParameter.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-实例号 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号 */
    get logInst(): number {
        return this.getProperty<number>(ReportParameter.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号 */
    set logInst(value: number) {
        this.setProperty(ReportParameter.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ReportParameter.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ReportParameter.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ReportParameter.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ReportParameter.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-更新日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-更新日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ReportParameter.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-更新日期 */
    set updateDate(value: Date) {
        this.setProperty(ReportParameter.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-更新时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-更新时间 */
    get updateTime(): number {
        return this.getProperty<number>(ReportParameter.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-更新时间 */
    set updateTime(value: number) {
        this.setProperty(ReportParameter.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ReportParameter.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ReportParameter.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-更新用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-更新用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ReportParameter.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-更新用户 */
    set updateUserSign(value: number) {
        this.setProperty(ReportParameter.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ReportParameter.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ReportParameter.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ReportParameter.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ReportParameter.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-参数名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-参数名称 */
    get name(): string {
        return this.getProperty<string>(ReportParameter.PROPERTY_NAME_NAME);
    }
    /** 设置-参数名称 */
    set name(value: string) {
        this.setProperty(ReportParameter.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-参数类型 */
    static PROPERTY_CATEGORY_NAME: string = "Category";
    /** 获取-参数类型 */
    get category(): emReportParameterType {
        return this.getProperty<emReportParameterType>(ReportParameter.PROPERTY_CATEGORY_NAME);
    }
    /** 设置-参数类型 */
    set category(value: emReportParameterType) {
        this.setProperty(ReportParameter.PROPERTY_CATEGORY_NAME, value);
    }

    /** 映射的属性名称-参数说明 */
    static PROPERTY_DESCRIPTION_NAME: string = "Description";
    /** 获取-参数说明 */
    get description(): string {
        return this.getProperty<string>(ReportParameter.PROPERTY_DESCRIPTION_NAME);
    }
    /** 设置-参数说明 */
    set description(value: string) {
        this.setProperty(ReportParameter.PROPERTY_DESCRIPTION_NAME, value);
    }

    /** 映射的属性名称-参数值 */
    static PROPERTY_VALUE_NAME: string = "Value";
    /** 获取-参数值 */
    get value(): string {
        return this.getProperty<string>(ReportParameter.PROPERTY_VALUE_NAME);
    }
    /** 设置-参数值 */
    set value(value: string) {
        this.setProperty(ReportParameter.PROPERTY_VALUE_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
    }
    /** 属性改变时 */
    protected onPropertyChanged(name: string): void {
        if (strings.equalsIgnoreCase(name, ReportParameter.PROPERTY_NAME_NAME)) {
            let tmp: string = this.name;
            if (!tmp.startsWith("${")) {
                tmp = "${" + tmp;
            }
            if (!tmp.endsWith("}")) {
                tmp = tmp + "}";
            }
            this.name = tmp;
        }
    }
}

/** 报表参数 集合 */
export class ReportParameters extends BusinessObjects<ReportParameter, Report> implements IReportParameters {

    /** 创建并添加子项 */
    create(): ReportParameter {
        let item: ReportParameter = new ReportParameter();
        this.add(item);
        return item;
    }
}
