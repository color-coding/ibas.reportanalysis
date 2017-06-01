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

} from "../Datas";

/** BOE报表 */
export interface IBOEReport extends IBusinessObject {

    /** 编号 */
    id: number;

    /** 唯一标识 */
    sign: string;

    /** 报表名称 */
    name: string;

    /** 报表描述 */
    description: string;

    /** 报表类型 */
    category: string;

    /** 报表路径 */
    path: string;

    /** 报表组别 */
    group: string;

    /** 报表地址 */
    url: string;

    /** 报表服务地址 */
    server: string;

}

