/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    /** 模块-标识 */
    export const CONSOLE_ID: string = "0dda2ecb-af63-4a3d-b087-aa3dda8179b4";
    /** 模块-名称 */
    export const CONSOLE_NAME: string = "ReportAnalysis";
    /** 模块-版本 */
    export const CONSOLE_VERSION: string = "0.1.0";

    export namespace config {
        /**
         * 获取此模块配置
         * @param key 配置项
         * @param defalut 默认值
         */
        export function get<T>(key: string, defalut?: T): T {
            return ibas.config.get(ibas.strings.format("{0}|{1}", CONSOLE_ID, key), defalut);
        }
    }
    export namespace bo {
        /** 业务仓库名称 */
        export const BO_REPOSITORY_REPORTANALYSIS: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
        /** 业务对象编码-报表 */
        export const BO_CODE_REPORT: string = "${Company}_RA_REPORT";
        /** 业务对象编码-报表簿 */
        export const BO_CODE_REPORTBOOK: string = "${Company}_RA_RPTBOOK";
        /** 业务对象编码-报表结果 */
        export const BO_CODE_REPORTRESULT: string = "${Company}_RA_RPTRESULT";
        /**
         * 报表类型
         */
        export enum emReportType {
            /** 系统报表 */
            REPORT,
            /** 服务报表 */
            SERVICE,
            /** 报表文件 */
            FILE,
            /** 第三方应用 */
            THIRD_APP,
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
            /** 预置值 */
            PRESET,
            /** 选择服务 */
            CHOOSE_LIST
        }
        /**
         * 分配类型
         */
        export enum emAssignedType {
            /** 用户 */
            USER,
            /** 角色 */
            ROLE,
            /** 全部 */
            ALL,
        }
    }

    export namespace app {
        /** 报表数据服务契约 */
        export interface IReportDataServiceContract extends ibas.IServiceContract {
            /** 标题 */
            title?: string;
            /** 使用的报表查询 */
            criteria: ibas.ICriteria | ibas.ICondition[];
        }
        /** 报表数据服务代理 */
        export class ReportDataServiceProxy extends ibas.ServiceProxy<IReportDataServiceContract> {

        }
    }
}