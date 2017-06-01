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
    strings,
    ICriteria, Criteria,
    ICondition
} from "ibas/index";
import {
    IBOEFolder,
} from "../../api/index";

/** BOE文件夹 */
export class BOEFolder extends BusinessObject<BOEFolder> implements IBOEFolder {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "CC_BOE_FOLDER";
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编号 */
    static PROPERTY_ID_NAME: string = "Id";
    /** 获取-编号 */
    get id(): number {
        return this.getProperty<number>(BOEFolder.PROPERTY_ID_NAME);
    }
    /** 设置-编号 */
    set id(value: number) {
        this.setProperty(BOEFolder.PROPERTY_ID_NAME, value);
    }

    /** 映射的属性名称-父项编号 */
    static PROPERTY_PARENTID_NAME: string = "ParentId";
    /** 获取-父项编号 */
    get parentId(): string {
        return this.getProperty<string>(BOEFolder.PROPERTY_PARENTID_NAME);
    }
    /** 设置-父项编号 */
    set parentId(value: string) {
        this.setProperty(BOEFolder.PROPERTY_PARENTID_NAME, value);
    }

    /** 映射的属性名称-文件夹名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-文件夹名称 */
    get name(): string {
        return this.getProperty<string>(BOEFolder.PROPERTY_NAME_NAME);
    }
    /** 设置-文件夹名称 */
    set name(value: string) {
        this.setProperty(BOEFolder.PROPERTY_NAME_NAME, value);
    }

    /** 获取查询 */
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = BOEFolder.PROPERTY_ID_NAME;
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

