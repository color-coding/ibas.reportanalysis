/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import * as ibas4j from "./DataDeclarations.d";
import {
} from "../api/index";

/** 数据转换者 */
export class DataConverter4ra extends ibas.DataConverter4j {

    /** 创建业务对象转换者 */
    protected createConverter(): ibas.BOConverter {
        return new BOConverter4ra;
    }

    /**
     * 转换业务对象数据
     * @param data 本地类型
     * @param sign 特殊标记
     * @returns 目标类型
     */
    convert(data: any, sign: string): any {
        if (ibas.objects.instanceOf(data, bo.UserReport)) {
            let newData: bo.UserReport = data;
            let parameters: Array<ibas4j.UserReportParameter> = [];
            for (let item of newData.parameters) {
                parameters.push(this.convert(item, sign));
            }
            let remote: ibas4j.UserReport = {
                type: data.constructor.name,
                Id: newData.id,
                Name: newData.name,
                Group: newData.group,
                Category: ibas.enums.toString(bo.emReportType, newData.category),
                Parameters: parameters
            };
            return remote;
        } else if (ibas.objects.instanceOf(data, bo.UserReportParameter)) {
            let newData: bo.UserReportParameter = data;
            let remote: ibas4j.UserReportParameter = {
                type: data.constructor.name,
                Name: newData.name,
                Category: ibas.enums.toString(bo.emReportParameterType, newData.category),
                Description: newData.description,
                Value: newData.value
            };
            return remote;
        } else {
            return super.convert(data, sign);
        }
    }
    /**
     * 解析业务对象数据
     * @param data 目标类型
     * @param sign 特殊标记
     * @returns 本地类型
     */
    parsing(data: any, sign: string): any {
        if (data.type === bo.UserReport.name) {
            let remote: ibas4j.UserReport = data;
            let newData: bo.UserReport = new bo.UserReport();
            newData.id = remote.Id;
            newData.name = remote.Name;
            newData.group = remote.Group;
            newData.category = ibas.enums.valueOf(bo.emReportType, remote.Category);
            for (let item of remote.Parameters) {
                item.type = bo.UserReportParameter.name;
                newData.parameters.add(this.parsing(item, null));
            }
            return newData;
        } else if (data.type === bo.UserReportParameter.name) {
            let remote: ibas4j.UserReportParameter = data;
            let newData: bo.UserReportParameter = new bo.UserReportParameter();
            newData.name = remote.Name;
            newData.category = ibas.enums.valueOf(bo.emReportParameterType, remote.Category);
            newData.description = remote.Description;
            newData.value = remote.Value;
            return newData;
        } else {
            return super.parsing(data, sign);
        }
    }
}

/** 业务对象转换者 */
class BOConverter4ra extends ibas.BOConverter {

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
        if (boName === bo.Report.name) {
            if (property === bo.Report.PROPERTY_CATEGORY_NAME) {
                return ibas.enums.toString(bo.emReportType, value);
            }
        } else if (boName === bo.ReportParameter.name) {
            if (property === bo.ReportParameter.PROPERTY_CATEGORY_NAME) {
                return ibas.enums.toString(bo.emReportParameterType, value);
            }
        } else if (boName === bo.ReportBook.name) {
            if (property === bo.ReportBook.PROPERTY_ASSIGNEDTYPE_NAME) {
                return ibas.enums.toString(bo.emAssignedType, value);
            }
        }
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

        if (boName === bo.Report.name) {
            if (property === bo.Report.PROPERTY_CATEGORY_NAME) {
                return ibas.enums.valueOf(bo.emReportType, value);
            }
        } else if (boName === bo.ReportParameter.name) {
            if (property === bo.ReportParameter.PROPERTY_CATEGORY_NAME) {
                return ibas.enums.valueOf(bo.emReportParameterType, value);
            }
        } else if (boName === bo.ReportBook.name) {
            if (property === bo.ReportBook.PROPERTY_ASSIGNEDTYPE_NAME) {
                return ibas.enums.valueOf(bo.emAssignedType, value);
            }
        }
        return super.parsingData(boName, property, value);
    }
}
