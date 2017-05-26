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
} from "ibas/index";
import {
    IReportBook,
    IReportBookItem,
    IReportBookItems,
    BO_CODE_REPORTBOOK,
    emAssignedType,
} from "../../api/index";

/** 报表簿 */
export class ReportBook extends BOSimple<ReportBook> implements IReportBook {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_REPORTBOOK;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(ReportBook.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(ReportBook.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-实例号 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号 */
    get logInst(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号 */
    set logInst(value: number) {
        this.setProperty(ReportBook.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(ReportBook.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ReportBook.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ReportBook.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ReportBook.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ReportBook.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-更新日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-更新日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ReportBook.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-更新日期 */
    set updateDate(value: Date) {
        this.setProperty(ReportBook.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-更新时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-更新时间 */
    get updateTime(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-更新时间 */
    set updateTime(value: number) {
        this.setProperty(ReportBook.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ReportBook.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-更新用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-更新用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-更新用户 */
    set updateUserSign(value: number) {
        this.setProperty(ReportBook.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ReportBook.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ReportBook.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-数据所有者 */
    static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(ReportBook.PROPERTY_DATAOWNER_NAME);
    }
    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(ReportBook.PROPERTY_DATAOWNER_NAME, value);
    }

    /** 映射的属性名称-团队成员 */
    static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
    /** 获取-团队成员 */
    get teamMembers(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_TEAMMEMBERS_NAME);
    }
    /** 设置-团队成员 */
    set teamMembers(value: string) {
        this.setProperty(ReportBook.PROPERTY_TEAMMEMBERS_NAME, value);
    }

    /** 映射的属性名称-数据所属组织 */
    static PROPERTY_ORGANIZATION_NAME: string = "Organization";
    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_ORGANIZATION_NAME);
    }
    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(ReportBook.PROPERTY_ORGANIZATION_NAME, value);
    }

    /** 映射的属性名称-指派类型 */
    static PROPERTY_ASSIGNEDTYPE_NAME: string = "AssignedType";
    /** 获取-指派类型 */
    get assignedType(): emAssignedType {
        return this.getProperty<emAssignedType>(ReportBook.PROPERTY_ASSIGNEDTYPE_NAME);
    }
    /** 设置-指派类型 */
    set assignedType(value: emAssignedType) {
        this.setProperty(ReportBook.PROPERTY_ASSIGNEDTYPE_NAME, value);
    }

    /** 映射的属性名称-指派目标 */
    static PROPERTY_ASSIGNED_NAME: string = "Assigned";
    /** 获取-指派目标 */
    get assigned(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_ASSIGNED_NAME);
    }
    /** 设置-指派目标 */
    set assigned(value: string) {
        this.setProperty(ReportBook.PROPERTY_ASSIGNED_NAME, value);
    }

    /** 映射的属性名称-报表名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-报表名称 */
    get name(): string {
        return this.getProperty<string>(ReportBook.PROPERTY_NAME_NAME);
    }
    /** 设置-报表名称 */
    set name(value: string) {
        this.setProperty(ReportBook.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-是否启用 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-是否启用 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(ReportBook.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-是否启用 */
    set activated(value: emYesNo) {
        this.setProperty(ReportBook.PROPERTY_ACTIVATED_NAME, value);
    }


    /** 映射的属性名称-报表簿-项目集合 */
    static PROPERTY_REPORTBOOKITEMS_NAME: string = "ReportBookItems";
    /** 获取-报表簿-项目集合 */
    get reportBookItems(): ReportBookItems {
        return this.getProperty<ReportBookItems>(ReportBook.PROPERTY_REPORTBOOKITEMS_NAME);
    }
    /** 设置-报表簿-项目集合 */
    set reportBookItems(value: ReportBookItems) {
        this.setProperty(ReportBook.PROPERTY_REPORTBOOKITEMS_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.reportBookItems = new ReportBookItems(this);
        this.objectCode = config.applyVariables(ReportBook.BUSINESS_OBJECT_CODE);
        this.assignedType = emAssignedType.ROLE;
    }
}

/** 报表簿-项目 */
export class ReportBookItem extends BOSimpleLine<ReportBookItem> implements IReportBookItem {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-对象行号 */
    get lineId(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_LINEID_NAME);
    }
    /** 设置-对象行号 */
    set lineId(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(ReportBookItem.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(ReportBookItem.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-实例号 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号 */
    get logInst(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号 */
    set logInst(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ReportBookItem.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ReportBookItem.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ReportBookItem.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ReportBookItem.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-更新日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-更新日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ReportBookItem.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-更新日期 */
    set updateDate(value: Date) {
        this.setProperty(ReportBookItem.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-更新时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-更新时间 */
    get updateTime(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-更新时间 */
    set updateTime(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-更新用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-更新用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-更新用户 */
    set updateUserSign(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ReportBookItem.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ReportBookItem.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ReportBookItem.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ReportBookItem.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-报表编号 */
    static PROPERTY_REPORT_NAME: string = "Report";
    /** 获取-报表编号 */
    get report(): number {
        return this.getProperty<number>(ReportBookItem.PROPERTY_REPORT_NAME);
    }
    /** 设置-报表编号 */
    set report(value: number) {
        this.setProperty(ReportBookItem.PROPERTY_REPORT_NAME, value);
    }

    /** 映射的属性名称-项目名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-项目名称 */
    get name(): string {
        return this.getProperty<string>(ReportBookItem.PROPERTY_NAME_NAME);
    }
    /** 设置-项目名称 */
    set name(value: string) {
        this.setProperty(ReportBookItem.PROPERTY_NAME_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
    }
}

/** 报表簿-项目 集合 */
export class ReportBookItems extends BusinessObjects<ReportBookItem, ReportBook> implements IReportBookItems {

    /** 创建并添加子项 */
    create(): ReportBookItem {
        let item: ReportBookItem = new ReportBookItem();
        this.add(item);
        return item;
    }
}
