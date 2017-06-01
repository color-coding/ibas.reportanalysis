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
    ICriteria, Criteria, ICondition, strings
} from "ibas/index";
import {
    IBOEReport,
} from "../../api/index";

/** BOE报表 */
export class BOEReport extends BusinessObject<BOEReport> implements IBOEReport {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "CC_BOE_REPORT";
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编号 */
    static PROPERTY_ID_NAME: string = "Id";
    /** 获取-编号 */
    get id(): number {
        return this.getProperty<number>(BOEReport.PROPERTY_ID_NAME);
    }
    /** 设置-编号 */
    set id(value: number) {
        this.setProperty(BOEReport.PROPERTY_ID_NAME, value);
    }

    /** 映射的属性名称-唯一标识 */
    static PROPERTY_SIGN_NAME: string = "Sign";
    /** 获取-唯一标识 */
    get sign(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_SIGN_NAME);
    }
    /** 设置-唯一标识 */
    set sign(value: string) {
        this.setProperty(BOEReport.PROPERTY_SIGN_NAME, value);
    }

    /** 映射的属性名称-报表名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-报表名称 */
    get name(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_NAME_NAME);
    }
    /** 设置-报表名称 */
    set name(value: string) {
        this.setProperty(BOEReport.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-报表描述 */
    static PROPERTY_DESCRIPTION_NAME: string = "Description";
    /** 获取-报表描述 */
    get description(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_DESCRIPTION_NAME);
    }
    /** 设置-报表描述 */
    set description(value: string) {
        this.setProperty(BOEReport.PROPERTY_DESCRIPTION_NAME, value);
    }

    /** 映射的属性名称-报表类型 */
    static PROPERTY_CATEGORY_NAME: string = "Category";
    /** 获取-报表类型 */
    get category(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_CATEGORY_NAME);
    }
    /** 设置-报表类型 */
    set category(value: string) {
        this.setProperty(BOEReport.PROPERTY_CATEGORY_NAME, value);
    }

    /** 映射的属性名称-报表路径 */
    static PROPERTY_PATH_NAME: string = "Path";
    /** 获取-报表路径 */
    get path(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_PATH_NAME);
    }
    /** 设置-报表路径 */
    set path(value: string) {
        this.setProperty(BOEReport.PROPERTY_PATH_NAME, value);
    }

    /** 映射的属性名称-报表组别 */
    static PROPERTY_GROUP_NAME: string = "Group";
    /** 获取-报表组别 */
    get group(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_GROUP_NAME);
    }
    /** 设置-报表组别 */
    set group(value: string) {
        this.setProperty(BOEReport.PROPERTY_GROUP_NAME, value);
    }

    /** 映射的属性名称-报表地址 */
    static PROPERTY_URL_NAME: string = "Url";
    /** 获取-报表地址 */
    get url(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_URL_NAME);
    }
    /** 设置-报表地址 */
    set url(value: string) {
        this.setProperty(BOEReport.PROPERTY_URL_NAME, value);
    }

    /** 映射的属性名称-报表服务地址 */
    static PROPERTY_SERVER_NAME: string = "Server";
    /** 获取-报表服务地址 */
    get server(): string {
        return this.getProperty<string>(BOEReport.PROPERTY_SERVER_NAME);
    }
    /** 设置-报表服务地址 */
    set server(value: string) {
        this.setProperty(BOEReport.PROPERTY_SERVER_NAME, value);
    }

    /** 获取查询 */
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = BOEReport.PROPERTY_ID_NAME;
        condition.value = strings.valueOf(this.id);
        return criteria;
    }

    toString(): string {
        return strings.format("boefolder: {0}", this.id);
    }
    /** 初始化数据 */
    protected init(): void {
        //
    }
}

