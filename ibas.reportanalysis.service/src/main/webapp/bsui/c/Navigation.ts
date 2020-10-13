/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../index.d.ts" />
/// <reference path="../Component.d.ts" />
/// <reference path="../Component.ts" />
/// <reference path="./report/index.ts" />
/// <reference path="./tools/index.ts" />
/// <reference path="./users/index.ts" />
/// <reference path="./reportbook/index.ts" />
namespace reportanalysis {
    export namespace ui {
        /**
         * 视图导航
         */
        export class Navigation extends ibas.ViewNavigation {
            /**
             * 创建实例
             * @param id 应用id
             */
            protected newView(id: string): ibas.IView {
                let view: ibas.IView = null;
                switch (id) {
                    case app.ReportListApp.APPLICATION_ID:
                        view = new c.ReportListView();
                        break;
                    case app.ReportChooseApp.APPLICATION_ID:
                        view = new c.ReportChooseView();
                        break;
                    case app.ReportEditApp.APPLICATION_ID:
                        view = new c.ReportEditView();
                        break;
                    case app.ReportBookListApp.APPLICATION_ID:
                        view = new c.ReportBookListView();
                        break;
                    case app.ReportBookChooseApp.APPLICATION_ID:
                        view = new c.ReportBookChooseView();
                        break;
                    case app.ReportBookEditApp.APPLICATION_ID:
                        view = new c.ReportBookEditView();
                        break;
                    case app.UserReportPageApp.APPLICATION_ID:
                        view = new c.UserReportPageView();
                        break;
                    case app.ReportViewerApp.APPLICATION_ID:
                        view = new c.ReportViewView();
                        break;
                    case app.ReportTabViewerApp.APPLICATION_ID:
                        view = new c.ReportTabViewView();
                        break;
                    case app.ReportDataChooseApp.APPLICATION_ID:
                        view = new c.ReportDataChooseView();
                        break;
                    case app.ReportDataService.APPLICATION_ID:
                        view = new c.ReporDataServiceView();
                        break;
                    case app.ReportImportApp.APPLICATION_ID:
                        view = new c.ReportImportView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}