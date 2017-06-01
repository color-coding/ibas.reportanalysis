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
    IOperationMessages,
} from "ibas/index";
import * as bo from "./bo/index"

/** BusinessObjectsEnterprise 业务仓库 */
export interface IBORepositoryBusinessObjectsEnterprise {
	/**
	 * 用户登录
	 * @param caller 调用者
	 */
    connect(caller: ConnectCaller): void;
    /**
     * 查询 BOE文件夹
     * @param fetcher 查询者
     */
    fetchFolder(fetcher: FetchCaller<bo.IBOEFolder>);

    /**
     * 查询 BOE报表
     * @param fetcher 查询者
     */
    fetchReport(fetcher: FetchCaller<bo.IBOEReport>);

}
/**
 * 登录调用者
 */
export interface ConnectCaller extends MethodCaller {
    /** 用户 */
    user: string;
    /** 密码 */
    password: string;
    /**
     * 调用完成
     * @param opRslt 结果
     */
    onCompleted(opRslt: IOperationMessages);
}