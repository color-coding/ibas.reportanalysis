/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { IReportViewer } from "./Report.d";
import { ReportViewApp, ReportTabViewApp } from "./ReportViewApp";
import { BOEReportViewApp, BOEReportTabViewApp } from "./BOEReportViewApp";

/** 报表查看工厂 */
class ReportFactory {
    /** 创建查看者 */
    createViewer(report: bo.UserReport): IReportViewer {
        if (!ibas.objects.isNull(report)) {
            if (report.category === bo.emReportType.REPORT) {
                return new ReportViewApp();
            } else if (report.category === bo.emReportType.BOE) {
                return new BOEReportViewApp();
            }
        }
        throw new Error(
            ibas.i18n.prop("reportanalysis_report_not_support_view",
                report.name, ibas.enums.describe(bo.emReportType, report.category)));
    }
    /** 创建查看者 */
    createTabViewer(report: bo.UserReport): IReportViewer {
        if (!ibas.objects.isNull(report)) {
            if (report.category === bo.emReportType.REPORT) {
                return new ReportTabViewApp();
            } else if (report.category === bo.emReportType.BOE) {
                return new BOEReportTabViewApp();
            }
        }
        throw new Error(
            ibas.i18n.prop("reportanalysis_report_not_support_view",
                report.name, ibas.enums.describe(bo.emReportType, report.category)));
    }

}
/** 报表工厂实例 */
export const reportFactory: ReportFactory = new ReportFactory();