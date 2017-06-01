/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import {
} from "../api/index";
import {
    IReport, BO_CODE_REPORT, emReportType
} from "../3rdparty/reportanalysis/index";

/** 数据转换者 */
export class DataConverter4boe extends ibas.DataConverter4j {

    /** 创建业务对象转换者 */
    protected createConverter(): ibas.BOConverter {
        return new BOConverter4boe;
    }
}

/** 业务对象转换者 */
class BOConverter4boe extends ibas.BOConverter {

    /**
     * 自定义解析
     * @param data 远程数据
     * @returns 本地数据
     */
    protected customParsing(data: any): ibas.IBusinessObject {
        return data;
    }

    /**
     * 转换数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 转换的值
     */
    protected convertData(boName: string, property: string, value: any): any {
        return super.convertData(boName, property, value);
    }

    /**
     * 解析数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 解析的值
     */
    protected parsingData(boName: string, property: string, value: any): any {
        return super.parsingData(boName, property, value);
    }
}
/** 转换 */
export module transforms {
    /** 转换报表 */
    export function toReport(boe: bo.BOEReport): IReport {
        let report: IReport = ibas.boFactory.create<IReport>(BO_CODE_REPORT);
        report.name = boe.name;
        report.group = boe.group;
        report.server = boe.server;
        report.activated = ibas.emYesNo.YES;
        report.category = emReportType.BOE;
        report.address = boe.url;
        return report;
    }

}