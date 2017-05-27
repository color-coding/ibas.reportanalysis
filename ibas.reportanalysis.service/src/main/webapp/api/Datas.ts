/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/** 业务仓库名称 */
export const BO_REPOSITORY_REPORTANALYSIS: string = "BORepositoryReportAnalysis";
/** 业务对象编码-报表 */
export const BO_CODE_REPORT: string = "${Company}_RA_REPORT";
/** 业务对象编码-报表簿 */
export const BO_CODE_REPORTBOOK: string = "${Company}_RA_RPTBOOK";
/** 业务仓库名称 */
export const BO_REPOSITORY_INITIALFANTASY: string = "BORepositoryInitialFantasy";
/** 业务对象编码-应用程序功能 */
export const BO_CODE_APPLICATIONFUNCTION: string = "${Company}_SYS_FUNCTION";
/** 业务对象编码-应用程序模块 */
export const BO_CODE_APPLICATIONMODULE: string = "${Company}_SYS_MODULE";
/** 业务对象编码-应用程序平台 */
export const BO_CODE_APPLICATIONPLATFORM: string = "${Company}_SYS_PLATFORM";
/** 业务对象编码-审批请求 */
export const BO_CODE_APPROVALREQUEST: string = "${Company}_AP_APPROVALREQU";
/** 业务对象编码-审批模板 */
export const BO_CODE_APPROVALTEMPLATE: string = "${Company}_AP_APPROVALTPLT";
/** 业务对象编码-业务对象检索条件 */
export const BO_CODE_BOCRITERIA: string = "${Company}_SYS_BOCRITERIA";
/** 业务对象编码-业务对象筛选 */
export const BO_CODE_BOFILTERING: string = "${Company}_SYS_BOFILTERING";
/** 业务对象编码-组织 */
export const BO_CODE_ORGANIZATION: string = "${Company}_SYS_ORGANIZATION";
/** 业务对象编码-组织-结构 */
export const BO_CODE_ORGANIZATIONALSTRUCTURE: string = "${Company}_SYS_ORG_STRUCTURE";
/** 业务对象编码-数据权限 */
export const BO_CODE_OWNERSHIP: string = "${Company}_SYS_OWNERSHIP";
/** 业务对象编码-系统权限 */
export const BO_CODE_PRIVILEGE: string = "${Company}_SYS_PRIVILEGE";
/** 业务对象编码-角色 */
export const BO_CODE_ROLE: string = "${Company}_SYS_ROLE";
/** 业务对象编码-用户 */
export const BO_CODE_USER: string = "${Company}_SYS_USER";
/**
 * 报表类型
 */
export enum emReportType {
    /** 系统报表 */
    REPORT,
    /** 报表服务 */
    BOE,
    /** 绩效指标 */
    KPI
}
/**
 * 报表参数类型
 */
export enum emReportParameterType {
    /** 自由文本 */
    TEXT,
    /** 日期 */
    DATETIME,
    /** 系统变量 */
    SYSTEM,
    /** 范围值 */
    RANGE,
    /** 查询结果 */
    SQL,
    /** 预置值 */
    PRESET
}
/**
 * 分配类型
 */
export enum emAssignedType {
    /** 用户 */
    USER,
    /** 角色 */
    ROLE,
}