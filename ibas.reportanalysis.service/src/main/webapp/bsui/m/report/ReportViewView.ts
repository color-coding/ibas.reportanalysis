/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../c/report/index.ts" />
namespace reportanalysis {
    export namespace ui {
        export namespace m {
            /**
             * 视图-Report
             */
            export class ReportViewerView extends c.ReportViewerView {
                draw(): any {
                    let page: any = super.draw();
                    if (page instanceof sap.m.Page) {
                        page.setShowFooter(false);
                    }
                    return page;
                }
            }
        }
    }
}