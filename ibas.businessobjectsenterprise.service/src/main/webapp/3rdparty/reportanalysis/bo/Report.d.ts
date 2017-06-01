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
    emReportType,
    emReportParameterType,
} from "../Datas";

/** 报表 */
export interface IReport extends IBOSimple {

    /** 对象编号 */
    objectKey: number;

    /** 对象类型 */
    objectCode: string;

    /** 实例号 */
    logInst: number;

    /** 服务系列 */
    series: number;

    /** 数据来源 */
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

    /** 报表名称 */
    name: string;

    /** 是否启用 */
    activated: emYesNo;

    /** 报表类型 */
    category: emReportType;

    /** 报表组别 */
    group: string;

    /** 关联的业务对象 */
    boCode: string;

    /** 关联的应用 */
    applicationId: string;

    /** 关联的报表 */
    associatedReport: number;

    /** 查询语句 */
    sqlString: string;

    /** 服务器名称 */
    server: string;

    /** 用户名 */
    user: string;

    /** 密码 */
    password: string;

    /** 报表地址 */
    address: string;


    /** 报表参数集合 */
    reportParameters: IReportParameters;


}

/** 报表参数 */
export interface IReportParameter extends IBOSimpleLine {

    /** 对象编号 */
    objectKey: number;
    /** 对象行号 */
    lineId: number;
    /** 对象类型 */
    objectCode: string;
    /** 实例号 */
    logInst: number;
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
    /** 参数名称 */
    name: string;
    /** 参数类型 */
    category: emReportParameterType;
    /** 参数说明 */
    description: string;
    /** 参数值 */
    value: string;
}

/** 报表参数 集合 */
export interface IReportParameters extends IBusinessObjects<IReportParameter, IReport> {

    /** 创建并添加子项 */
    create(): IReportParameter;
}

