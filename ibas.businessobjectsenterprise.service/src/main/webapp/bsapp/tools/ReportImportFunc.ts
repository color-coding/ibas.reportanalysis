/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import {  ReportImportApp } from "./ReportImportApp";

export class ReportImportFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "50c10c17-145d-486e-9b8c-8acbe93b50f0";
    /** 功能名称 */
    static FUNCTION_NAME = "businessobjectsenterprise_func_report_import";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ReportImportFunc.FUNCTION_ID;
        this.name = ReportImportFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: ReportImportApp = new ReportImportApp();
        app.navigation = this.navigation;
        return app;
    }
}
