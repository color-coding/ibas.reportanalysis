/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";


export module views {
    export function addReportParameterUIs(form: sap.ui.layout.form.SimpleForm, parameters: bo.UserReportParameter[]): void {
        if (ibas.objects.isNull(parameters) || parameters.length === 0) {
            form.addContent(new sap.m.Title("", {
                text: ibas.i18n.prop("reportanalysis_running_parameters")
            }));
            return;
        }
        form.addContent(new sap.ui.core.Title("", {
            text: ibas.i18n.prop("reportanalysis_running_parameters")
        }));
        for (let item of parameters) {
            if (item.category === bo.emReportParameterType.PRESET) {
                // 预设的不显示
                continue;
            }
            form.addContent(new sap.m.Label("", {
                textAlign: sap.ui.core.TextAlign.Left,
                width: "20%",
                text: ibas.objects.isNull(item.description) ? item.name.replace("\$\{", "").replace("\}", "") : item.description
            }));
            let input: sap.ui.core.Control;
            if (item.category === bo.emReportParameterType.DATETIME) {
                input = new sap.m.DatePicker("", {
                    width: "60%",
                    valueFormat: "yyyy-MM-dd",
                });
                input.bindProperty("value", {
                    path: "{/value}"
                });
            } else {
                input = new sap.m.Input("", {
                    width: "60%",
                });
                input.bindProperty("value", {
                    path: "{/value}"
                });
            }
            input.setModel(new sap.ui.model.json.JSONModel(item));
            form.addContent(input);
        }
    }
}
