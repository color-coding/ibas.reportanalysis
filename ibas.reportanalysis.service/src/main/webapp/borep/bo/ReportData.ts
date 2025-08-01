/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace bo {
        /** 报表数据 */
        export class ReportData {
            /** 标识 */
            id: string;
            /** 名称 */
            name: string;
            /** 组 */
            group: string;
            /** 备注 */
            remarks: string;
            /** 参数 */
            parameters: ReportDataParameter[];
        }
        /** 报表参数 */
        export class ReportDataParameter {
            /** 名称 */
            name: string;
            /** 值 */
            value: string;
        }
        /** 报表组 */
        export class ReportGroup {
            /** 父项标识 */
            parentId: string;
            /** 标识 */
            id: string;
            /** 名称 */
            name: string;
            /** 备注 */
            remarks: string;
        }
        /** 报表数据日志 */
        export class ReportLog {
            /** 标识 */
            id: string;
            /** 报表标识 */
            reportId: string;
            /** 报表名称 */
            reportName: string;
            /** 工作目录 */
            workFolder: string;
            /** 运行者 */
            runner: string;
            /** 开始时间 */
            beginTime: Date;
            /** 完成时间 */
            finishTime: Date;
            /** 内容 */
            content: string;
            /** 备注 */
            remarks: string;
            /** 参数 */
            parameters: ibas.KeyText[];
        }
    }
}