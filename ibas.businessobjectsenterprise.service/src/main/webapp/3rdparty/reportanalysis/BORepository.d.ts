/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    FetchCaller,
    SaveCaller,
    MethodCaller,
    IOperationResult
} from "ibas/index";
import * as bo from "./bo/index"

/** ReportAnalysis 业务仓库 */
export interface IBORepositoryReportAnalysis {
    /**
     * 查询 报表
     * @param fetcher 查询者
     */
    fetchReport(fetcher: FetchCaller<bo.IReport>);
    /**
     * 保存 报表
     * @param saver 保存者
     */
    saveReport(saver: SaveCaller<bo.IReport>);
    /**
     * 查询 报表簿
     * @param fetcher 查询者
     */
    fetchReportBook(fetcher: FetchCaller<bo.IReportBook>);
    /**
     * 保存 报表簿
     * @param saver 保存者
     */
    saveReportBook(saver: SaveCaller<bo.IReportBook>);
}

/**
 * 用户相关调用者
 */
export interface UserMethodsCaller<P> extends MethodCaller {
    /** 用户 */
    user: string;
    /** 平台 */
    platform?: string;
    /**
     * 调用完成
     * @param opRslt 结果
     */
    onCompleted(opRslt: IOperationResult<P>): void;
}