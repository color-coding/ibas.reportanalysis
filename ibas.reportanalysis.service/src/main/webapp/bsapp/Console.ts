/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ReportFunc, ReportChooseServiceMapping } from "./report/index";
import { ReportBookFunc, ReportBookChooseServiceMapping, ReportBookLinkServiceMapping } from "./reportbook/index";
import { UserReportPageFunc, UserReportBookFunc } from "./users/index";
import * as bo from "../borep/bo/index";
import { BORepositoryReportAnalysis } from "../borep/BORepositories";

/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "0dda2ecb-af63-4a3d-b087-aa3dda8179b4";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "ReportAnalysis";
    /** 构造函数 */
    constructor() {
        super();
        this.id = Console.CONSOLE_ID;
        this.name = Console.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 注册功能
        this.register(new ReportFunc());
        this.register(new ReportBookFunc());
        // 注册服务应用
        this.register(new ReportChooseServiceMapping());
        this.register(new ReportBookChooseServiceMapping());
        // 注册常驻应用

    }
    /** 运行 */
    run(): void {
        // 加载语言-框架默认
        ibas.i18n.load(this.rootUrl + "resources/languages/reportanalysis.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/report.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/reportbook.json");
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: this = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}

/** 配置项目-禁用报表功能 */
export const CONFIG_ITEM_DISABLE_REPORT_FUNCTIONS: string = "disableReportFunctions";
/** 模块控制台 */
export class ConsoleUsers extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "0dda2ecb-af63-4a3d-b087-aa3dda8179b5";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "ReportAnalysisUsers";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ConsoleUsers.CONSOLE_ID;
        this.name = ConsoleUsers.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 不在使用此处注册
    }
    /** 运行 */
    run(): void {
        // 加载语言-框架默认
        ibas.i18n.load(this.rootUrl + "resources/languages/reportanalysis.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/report.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/reportbook.json");
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: this = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            if (!ibas.config.get(CONFIG_ITEM_DISABLE_REPORT_FUNCTIONS, false)) {
                // 加载用户报表
                let boRepository: BORepositoryReportAnalysis = new BORepositoryReportAnalysis();
                boRepository.fetchUserReports({
                    user: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE),
                    onCompleted(opRslt: ibas.IOperationResult<bo.UserReport>): void {
                        if (opRslt.resultCode !== 0) {
                            ibas.logger.log(ibas.emMessageLevel.ERROR, opRslt.message);
                        }
                        that.register(new UserReportPageFunc());
                        for (let item of opRslt.resultObjects) {
                            that.register(new UserReportBookFunc(item));
                        }
                        // 通知初始化完成
                        that.fireInitialized();
                    }
                });
            } else {
                // 不加载用户报表菜单
                that.register(new UserReportPageFunc());
                // 通知初始化完成
                that.fireInitialized();
            }
        });
        // 保留基类方法
        super.run();
    }
    /** 设置报表仓库地址 */
    setRepository(address: string): boolean {
        address = ibas.urls.normalize(address);
        let repositoryName: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, Console.CONSOLE_NAME);
        let configName: string = ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS, repositoryName);
        ibas.config.set(configName, address);
        ibas.logger.log(ibas.emMessageLevel.DEBUG, "repository: register [{0}]'s default address [{1}].", repositoryName, address);
        return super.setRepository(address);
    }
}