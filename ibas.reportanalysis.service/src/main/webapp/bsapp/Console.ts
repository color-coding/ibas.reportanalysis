/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../borep/index.ts" />
/// <reference path="./report/index.ts" />
/// <reference path="./reportbook/index.ts" />
/// <reference path="./tools/index.ts" />
/// <reference path="./users/index.ts" />
namespace reportanalysis {
    export namespace app {
        /** 属性-导航 */
        const PROPERTY_NAVIGATION: symbol = Symbol("navigation");
        /** 模块控制台 */
        export class Console extends ibas.ModuleConsole {
            /** 构造函数 */
            constructor() {
                super();
                this.id = CONSOLE_ID;
                this.name = CONSOLE_NAME;
                this.version = CONSOLE_VERSION;
                this.copyright = ibas.i18n.prop("shell_license");
            }
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation {
                return this[PROPERTY_NAVIGATION];
            }
            /** 初始化 */
            protected registers(): void {
                // 注册功能
                this.register(new ReportFunc());
                this.register(new ReportBookFunc());
                this.register(new ReportImportFunc());
                // 注册服务应用
                this.register(new ReportChooseServiceMapping());
                this.register(new ReportBookChooseServiceMapping());
                this.register(new ReportDataServiceMapping());
                this.register(new ReportResultServiceMapping());
                // 注册常驻应用

            }
            /** 运行 */
            run(): void {
                // 加载语言-框架默认
                ibas.i18n.load([
                    this.rootUrl + "resources/languages/reportanalysis.json",
                    this.rootUrl + "resources/languages/bos.json"
                ], () => {
                    // 设置资源属性
                    this.description = ibas.i18n.prop(this.name.toLowerCase());
                    this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
                    // 先加载ui导航
                    let uiModules: string[] = [];
                    if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)) {
                        if (this.plantform === ibas.emPlantform.PHONE) {
                            // 使用m类型视图
                            uiModules.push("index.ui.m");
                        }
                    }
                    // 默认使用视图
                    if (uiModules.length === 0) {
                        // 使用c类型视图
                        uiModules.push("index.ui.c");
                    }
                    // 加载视图库
                    this.loadUI(uiModules, (ui) => {
                        // 设置导航
                        this[PROPERTY_NAVIGATION] = new ui.Navigation();
                        // 调用初始化
                        this.initialize();
                    });
                    // 保留基类方法
                    super.run();
                });
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
            /** 模块-版本 */
            static CONSOLE_VERSION: string = "0.1.0";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ConsoleUsers.CONSOLE_ID;
                this.name = ConsoleUsers.CONSOLE_NAME;
                this.version = ConsoleUsers.CONSOLE_VERSION;
                this.copyright = ibas.i18n.prop("shell_license");
            }
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation {
                return this[PROPERTY_NAVIGATION];
            }
            /** 初始化 */
            protected registers(): void {
                // 不在使用此处注册
            }
            /** 运行 */
            run(): void {
                // 加载语言-框架默认
                ibas.i18n.load([
                    this.rootUrl + "resources/languages/reportanalysis.json",
                    this.rootUrl + "resources/languages/bos.json"
                ], () => {
                    // 设置资源属性
                    this.description = ibas.i18n.prop(this.name.toLowerCase());
                    this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
                    // 先加载ui导航
                    let uiModules: string[] = [];
                    if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)) {
                        if (this.plantform === ibas.emPlantform.PHONE) {
                            // 使用m类型视图
                            uiModules.push("index.ui.m");
                        }
                    }
                    // 默认使用视图
                    if (uiModules.length === 0) {
                        // 使用c类型视图
                        uiModules.push("index.ui.c");
                    }
                    // 加载视图库
                    this.loadUI(uiModules, (ui) => {
                        // 设置导航
                        this[PROPERTY_NAVIGATION] = new ui.Navigation();
                        // 调用初始化
                        if (!config.get(CONFIG_ITEM_DISABLE_REPORT_FUNCTIONS, true)) {
                            // 加载用户报表
                            let boRepository: bo.BORepositoryReportAnalysis = new bo.BORepositoryReportAnalysis();
                            boRepository.fetchUserReports({
                                user: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE),
                                onCompleted: (opRslt: ibas.IOperationResult<bo.UserReport>) => {
                                    if (opRslt.resultCode !== 0) {
                                        ibas.logger.log(ibas.emMessageLevel.ERROR, opRslt.message);
                                    }
                                    this.register(new BOReportServiceMapping());
                                    this.register(new UserReportPageFunc());
                                    for (let item of opRslt.resultObjects) {
                                        this.register(new UserReportBookFunc(item));
                                    }
                                    // 通知初始化完成
                                    this.fireInitialized();
                                }
                            });
                        } else {
                            // 不加载用户报表菜单
                            this.register(new BOReportServiceMapping());
                            this.register(new UserReportPageFunc());
                            // 通知初始化完成
                            this.fireInitialized();
                        }
                    });
                    // 保留基类方法
                    super.run();
                });
            }
            /** 设置报表仓库地址 */
            setRepository(address: string): boolean {
                address = ibas.urls.normalize(address);
                let repositoryName: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
                let configName: string = ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS, repositoryName);
                ibas.config.set(configName, address);
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "repository: register [{0}]'s default address [{1}].", repositoryName, address);
                return super.setRepository(address);
            }
        }
    }
}