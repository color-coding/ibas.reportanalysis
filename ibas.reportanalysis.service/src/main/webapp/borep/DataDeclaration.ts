/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

namespace reportanalysis {
    export namespace bo {
        export namespace ibas4j {
            /** ibas的java端数据声明 */

            /** 操作消息 */
            export interface IDataDeclaration {
                /** 数据类型 */
                type: string;
            }
            /** 用户报表 */
            export interface IUserReport extends IDataDeclaration {
                /** 标识 */
                Id: string;
                /** 名称 */
                Name: string;
                /** 类型 */
                Category: string;
                /** 组 */
                Group: string;
                /** 结果形式 */
                ResultMethod: string;
                /** 报表参数 */
                Parameters: IUserReportParameter[];
            }
            /** 用户报表参数 */
            export interface IUserReportParameter extends IDataDeclaration {
                /** 参数名称 */
                Name: string;
                /** 参数类型 */
                Category: string;
                /** 参数说明 */
                Description: string;
                /** 参数值 */
                Value: string;
            }
            /** 报表数据 */
            export interface IReportData extends IDataDeclaration {
                /** 标识 */
                Id: string;
                /** 名称 */
                Name: string;
                /** 组 */
                Group: string;
                /** 备注 */
                Remarks: string;
                /** 参数 */
                Parameters: IReportDataParameter[];
            }
            /** 报表参数 */
            export interface IReportDataParameter extends IDataDeclaration {
                /** 名称 */
                Name: string;
                /** 值 */
                Value: string;
            }
            /** 报表数据 */
            export interface IReportGroup extends IDataDeclaration {
                /** 父项标识 */
                ParentId: string;
                /** 标识 */
                Id: string;
                /** 名称 */
                Name: string;
                /** 备注 */
                Remarks: string;
            }
            /** 报表参数 */
            export interface IKeyText extends IDataDeclaration {
                /** 名称 */
                Key: string;
                /** 值 */
                Value: string;
            }
            /** 报表参数 */
            export interface IReportLog extends IDataDeclaration {
                /** 标识 */
                Id: string;
                /** 报表标识 */
                ReportId: string;
                /** 报表名称 */
                ReportName: string;
                /** 工作目录 */
                WorkFolder: string;
                /** 运行者 */
                Runner: string;
                /** 备注 */
                Remarks: string;
                /** 开始时间 */
                BeginTime: number;
                /** 完成时间 */
                FinishTime: number;
                /** 内容 */
                Content: string;
                /** 参数 */
                Parameters: IKeyText[];
            }
        }
    }
}