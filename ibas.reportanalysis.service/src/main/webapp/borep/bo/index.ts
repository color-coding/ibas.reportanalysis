/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 模块索引文件，此文件集中导出类
export * from "../../api/Datas";
export * from "./Report";
export * from "./ReportBook";
export * from "./UserReport";

// 注册业务对象到工厂
import * as ibas from "ibas/index";
import { Report } from "./Report";
ibas.boFactory.register(Report.BUSINESS_OBJECT_CODE, Report);
import { ReportBook } from "./ReportBook";
ibas.boFactory.register(ReportBook.BUSINESS_OBJECT_CODE, ReportBook);
import { UserReport, UserReportParameter } from "./UserReport";
ibas.boFactory.register(UserReport);
ibas.boFactory.register(UserReportParameter);

