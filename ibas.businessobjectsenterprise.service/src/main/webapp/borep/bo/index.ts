/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 模块索引文件，此文件集中导出类
export * from "./BOEFolder";
export * from "./BOEReport";

/** 查询条件-ID */
export const CRITERIA_CONDITION_ALIAS_ID: string = "SI_ID";
/** 查询条件-父项ID */
export const CRITERIA_CONDITION_ALIAS_PARENT_ID: string = "SI_PARENTID";
/** 查询条件-类型 */
export const CRITERIA_CONDITION_ALIAS_KIND: string = "SI_KIND";

// 注册业务对象到工厂
import * as ibas from "ibas/index";
import { BOEFolder } from "./BOEFolder";
ibas.boFactory.register(BOEFolder);
import { BOEReport } from "./BOEReport";
ibas.boFactory.register(BOEReport);
