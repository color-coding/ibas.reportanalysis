/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as toolsApps from "../../bsapp/tools/index";
import * as toolsViews from "./tools/index";

/**
 * 视图导航
 */
export default class Navigation extends ibas.ViewNavigation {

    /**
     * 创建实例
     * @param id 应用id
     */
    protected newView(id: string): ibas.IView {
        let view: ibas.IView = null;
        switch (id) {
            case toolsApps.ReportImportApp.APPLICATION_ID:
                view = new toolsViews.ReportImportView();
                break;
            default:
                break;
        }
        return view;
    }
}
