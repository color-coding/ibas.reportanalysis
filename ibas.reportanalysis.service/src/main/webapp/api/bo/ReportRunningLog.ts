/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace bo {
        /** 报表运行日志 */
        export interface IReportRunningLog extends ibas.IBOSimple {
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
            /** 编号 */
            sign: string;
            /** 报表 */
            report: number;
            /** 报表名称 */
            reportName: string;
            /** 运行人 */
            runner: string;
            /** 开始日期 */
            startDate: Date;
            /** 开始时间 */
            startTime: number;
            /** 结束日期 */
            endDate: Date;
            /** 结束时间 */
            endTime: number;
            /** 参数文件 */
            parameterFile: string;
            /** 结果文件 */
            resultFile: string;
            /** 备注 */
            remarks: string;

        }


    }
}
