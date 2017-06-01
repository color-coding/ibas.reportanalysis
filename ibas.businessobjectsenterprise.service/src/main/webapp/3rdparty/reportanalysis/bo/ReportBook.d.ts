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
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBODocument,
    IBODocumentLine,
    IBOSimple,
    IBOSimpleLine
} from "ibas/index";
import {
    emAssignedType
} from "../Datas";

/** 报表簿 */
export interface IReportBook extends IBOSimple {

    /** 对象编号 */
    objectKey: number;

    /** 对象类型 */
    objectCode: string;

    /** 实例号 */
    logInst: number;

    /** 服务系列 */
    series: number;

    /** 数据源 */
    dataSource: string;

    /** 创建日期 */
    createDate: Date;

    /** 创建时间 */
    createTime: number;

    /** 更新日期 */
    updateDate: Date;

    /** 更新时间 */
    updateTime: number;

    /** 创建用户 */
    createUserSign: number;

    /** 更新用户 */
    updateUserSign: number;

    /** 创建动作标识 */
    createActionId: string;

    /** 更新动作标识 */
    updateActionId: string;

    /** 数据所有者 */
    dataOwner: number;

    /** 团队成员 */
    teamMembers: string;

    /** 数据所属组织 */
    organization: string;

    /** 指派类型 */
    assignedType: emAssignedType;

    /** 指派目标 */
    assigned: string;

    /** 报表名称 */
    name: string;

    /** 是否启用 */
    activated: emYesNo;


    /** 报表簿-项目集合 */
    reportBookItems: IReportBookItems;


}

/** 报表簿-项目 */
export interface IReportBookItem extends IBOSimpleLine {

    /** 对象编号 */
    objectKey: number;
    /** 对象行号 */
    lineId: number;
    /** 对象类型 */
    objectCode: string;
    /** 实例号 */
    logInst: number;
    /** 数据源 */
    dataSource: string;
    /** 创建日期 */
    createDate: Date;
    /** 创建时间 */
    createTime: number;
    /** 更新日期 */
    updateDate: Date;
    /** 更新时间 */
    updateTime: number;
    /** 创建用户 */
    createUserSign: number;
    /** 更新用户 */
    updateUserSign: number;
    /** 创建动作标识 */
    createActionId: string;
    /** 更新动作标识 */
    updateActionId: string;
    /** 报表编号 */
    report: number;
    /** 项目名称 */
    name: string;
}

/** 报表簿-项目 集合 */
export interface IReportBookItems extends IBusinessObjects<IReportBookItem, IReportBook> {

    /** 创建并添加子项 */
    create(): IReportBookItem;
}

