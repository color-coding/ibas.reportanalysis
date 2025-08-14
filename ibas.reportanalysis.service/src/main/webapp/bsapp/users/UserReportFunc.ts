/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace app {
        export class UserReportPageFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "c7b448c1-54e0-4b4e-ba15-21dc5b4b96f0";
            /** 功能名称 */
            static FUNCTION_NAME = "reportanalysis_func_user_report_page";
            /** 构造函数 */
            constructor() {
                super();
                this.id = UserReportPageFunc.FUNCTION_ID;
                this.name = UserReportPageFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: UserReportPageApp = new UserReportPageApp();
                app.navigation = this.navigation;
                return app;
            }
        }
        /**
         * 用户报表簿功能
         */
        export class UserReportBookFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID_PREFIX = "3563a3f7-4062-4aab-b456-";
            /** 构造函数 */
            constructor(report: bo.UserReport) {
                super();
                this.report = report;
                this.id = UserReportBookFunc.FUNCTION_ID_PREFIX + ibas.strings.fill(report.id, 12, "0");
                this.name = report.name;
                this.description = report.name;
                this.category = report.group;
            }
            private report: bo.UserReport;
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: ReportViewerApp = new ReportViewerApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.useReport(this.report);
                return app;
            }
        }
    }
}