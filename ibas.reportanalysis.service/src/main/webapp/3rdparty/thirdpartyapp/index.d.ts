/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    /** 模块-标识 */
    const CONSOLE_ID: string;
    /** 模块-名称 */
    const CONSOLE_NAME: string;
    /** 模块-版本 */
    const CONSOLE_VERSION: string;
    namespace config {
        /**
         * 获取此模块配置
         * @param key 配置项
         * @param defalut 默认值
         */
        function get<T>(key: string, defalut?: T): T;
    }
    namespace bo {
        /** 业务仓库名称 */
        const BO_REPOSITORY_THIRDPARTYAPP: string;
        /** 业务对象编码-应用 */
        const BO_CODE_APPLICATION: string;
        /** 业务对象编码-用户映射 */
        const BO_CODE_USERMAPPING: string;
        /** 业务对象编码-应用配置 */
        const BO_CODE_APPLICATIONCONFIG: string;
        enum emConfigItemCategory {
            /**
             * 文本
             */
            TEXT = 0,
            /**
             * 密码
             */
            PASSWORD = 1,
            /**
             * 文件
             */
            FILE = 2
        }
    }
    namespace app {
        /** 应用设置服务契约 */
        interface IApplicationSettingContract extends ibas.IServiceContract {
            /** 应用 */
            application: string;
            /** 用户 */
            user?: number | string;
        }
        /** 应用设置服务代理 */
        class ApplicationSettingServiceProxy extends ibas.ServiceProxy<IApplicationSettingContract> {
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 应用 */
        interface IApplication extends ibas.IBOMasterData {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 类别 */
            category: string;
            /** 配置 */
            config: string;
            /** 图片 */
            picture: string;
            /** 设置 */
            settings: string;
            /** 备注 */
            remarks: string;
            /** 对象编号 */
            docEntry: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 数据源 */
            dataSource: string;
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 应用配置 */
        interface IApplicationConfig extends ibas.IBOMasterData {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 分组 */
            group: string;
            /** 备注 */
            remarks: string;
            /** 对象编号 */
            docEntry: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 数据源 */
            dataSource: string;
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 应用配置-项目集合 */
            applicationConfigItems: IApplicationConfigItems;
        }
        /** 应用配置-项目 集合 */
        interface IApplicationConfigItems extends ibas.IBusinessObjects<IApplicationConfigItem> {
            /** 创建并添加子项 */
            create(): IApplicationConfigItem;
        }
        /** 应用配置-项目 */
        interface IApplicationConfigItem extends ibas.IBOMasterDataLine {
            /** 编码 */
            code: string;
            /** 行号 */
            lineId: number;
            /** 类型 */
            objectCode: string;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 版本 */
            logInst: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 名称 */
            name: string;
            /** 描述 */
            description: string;
            /** 类别 */
            category: emConfigItemCategory;
            /** 值 */
            value: string;
            /** 用户的 */
            forUser: ibas.emYesNo;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 用户映射 */
        interface IUserMapping extends ibas.IBOSimple {
            /** 应用 */
            application: string;
            /** 用户 */
            user: string;
            /** 应用账户 */
            account: string;
            /** 访问数据 */
            accessData: string;
            /** 备注 */
            remarks: string;
            /** 对象编号 */
            objectKey: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 业务仓库 */
        interface IBORepositoryThirdPartyApp extends ibas.IBORepositoryApplication {
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 应用
             * @param fetcher 查询者
             */
            fetchApplication(fetcher: ibas.IFetchCaller<bo.IApplication>): void;
            /**
             * 保存 应用
             * @param saver 保存者
             */
            saveApplication(saver: ibas.ISaveCaller<bo.IApplication>): void;
            /**
             * 查询 应用配置
             * @param fetcher 查询者
             */
            fetchApplicationConfig(fetcher: ibas.IFetchCaller<bo.IApplicationConfig>): void;
            /**
             * 保存 应用配置
             * @param saver 保存者
             */
            saveApplicationConfig(saver: ibas.ISaveCaller<bo.IApplicationConfig>): void;
            /**
             * 查询 用户映射
             * @param fetcher 查询者
             */
            fetchUserMapping(fetcher: ibas.IFetchCaller<bo.IUserMapping>): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 应用 */
        class Application extends ibas.BOMasterData<Application> implements IApplication {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编码 */
            get code(): string;
            /** 设置-编码 */
            set code(value: string);
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            get name(): string;
            /** 设置-名称 */
            set name(value: string);
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            get activated(): ibas.emYesNo;
            /** 设置-激活 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-类别 */
            static PROPERTY_CATEGORY_NAME: string;
            /** 获取-类别 */
            get category(): string;
            /** 设置-类别 */
            set category(value: string);
            /** 映射的属性名称-配置 */
            static PROPERTY_CONFIG_NAME: string;
            /** 获取-配置 */
            get config(): string;
            /** 设置-配置 */
            set config(value: string);
            /** 映射的属性名称-图片 */
            static PROPERTY_PICTURE_NAME: string;
            /** 获取-图片 */
            get picture(): string;
            /** 设置-图片 */
            set picture(value: string);
            /** 映射的属性名称-设置 */
            static PROPERTY_SETTINGS_NAME: string;
            /** 获取-设置 */
            get settings(): string;
            /** 设置-设置 */
            set settings(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string;
            /** 获取-对象编号 */
            get docEntry(): number;
            /** 设置-对象编号 */
            set docEntry(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
            set objectCode(value: string);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            get updateDate(): Date;
            /** 设置-修改日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            get updateTime(): number;
            /** 设置-修改时间 */
            set updateTime(value: number);
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
            set logInst(value: number);
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            get series(): number;
            /** 设置-服务系列 */
            set series(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            get updateUserSign(): number;
            /** 设置-修改用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 初始化数据 */
            protected init(): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 应用配置 */
        class ApplicationConfig extends ibas.BOMasterData<ApplicationConfig> implements IApplicationConfig {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编码 */
            get code(): string;
            /** 设置-编码 */
            set code(value: string);
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            get name(): string;
            /** 设置-名称 */
            set name(value: string);
            /** 映射的属性名称-分组 */
            static PROPERTY_GROUP_NAME: string;
            /** 获取-分组 */
            get group(): string;
            /** 设置-分组 */
            set group(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string;
            /** 获取-对象编号 */
            get docEntry(): number;
            /** 设置-对象编号 */
            set docEntry(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
            set objectCode(value: string);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            get updateDate(): Date;
            /** 设置-修改日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            get updateTime(): number;
            /** 设置-修改时间 */
            set updateTime(value: number);
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
            set logInst(value: number);
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            get series(): number;
            /** 设置-服务系列 */
            set series(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            get updateUserSign(): number;
            /** 设置-修改用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 映射的属性名称-应用配置-项目集合 */
            static PROPERTY_APPLICATIONCONFIGITEMS_NAME: string;
            /** 获取-应用配置-项目集合 */
            get applicationConfigItems(): ApplicationConfigItems;
            /** 设置-应用配置-项目集合 */
            set applicationConfigItems(value: ApplicationConfigItems);
            /** 初始化数据 */
            protected init(): void;
        }
        /** 应用配置-项目 集合 */
        class ApplicationConfigItems extends ibas.BusinessObjects<ApplicationConfigItem, ApplicationConfig> implements IApplicationConfigItems {
            /** 创建并添加子项 */
            create(): ApplicationConfigItem;
        }
        /** 应用配置-项目 */
        class ApplicationConfigItem extends ibas.BOMasterDataLine<ApplicationConfigItem> implements IApplicationConfigItem {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编码 */
            get code(): string;
            /** 设置-编码 */
            set code(value: string);
            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string;
            /** 获取-行号 */
            get lineId(): number;
            /** 设置-行号 */
            set lineId(value: number);
            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-类型 */
            get objectCode(): string;
            /** 设置-类型 */
            set objectCode(value: string);
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            get updateDate(): Date;
            /** 设置-修改日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            get updateTime(): number;
            /** 设置-修改时间 */
            set updateTime(value: number);
            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-版本 */
            get logInst(): number;
            /** 设置-版本 */
            set logInst(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            get updateUserSign(): number;
            /** 设置-修改用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            get name(): string;
            /** 设置-名称 */
            set name(value: string);
            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string;
            /** 获取-描述 */
            get description(): string;
            /** 设置-描述 */
            set description(value: string);
            /** 映射的属性名称-类别 */
            static PROPERTY_CATEGORY_NAME: string;
            /** 获取-类别 */
            get category(): emConfigItemCategory;
            /** 设置-类别 */
            set category(value: emConfigItemCategory);
            /** 映射的属性名称-值 */
            static PROPERTY_VALUE_NAME: string;
            /** 获取-值 */
            get value(): string;
            /** 设置-值 */
            set value(value: string);
            /** 映射的属性名称-用户的 */
            static PROPERTY_FORUSER_NAME: string;
            /** 获取-用户的 */
            get forUser(): ibas.emYesNo;
            /** 设置-用户的 */
            set forUser(value: ibas.emYesNo);
            /** 初始化数据 */
            protected init(): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 用户映射 */
        class UserMapping extends ibas.BOSimple<UserMapping> implements IUserMapping {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-应用 */
            static PROPERTY_APPLICATION_NAME: string;
            /** 获取-应用 */
            get application(): string;
            /** 设置-应用 */
            set application(value: string);
            /** 映射的属性名称-用户 */
            static PROPERTY_USER_NAME: string;
            /** 获取-用户 */
            get user(): string;
            /** 设置-用户 */
            set user(value: string);
            /** 映射的属性名称-应用账户 */
            static PROPERTY_ACCOUNT_NAME: string;
            /** 获取-应用账户 */
            get account(): string;
            /** 设置-应用账户 */
            set account(value: string);
            /** 映射的属性名称-访问数据 */
            static PROPERTY_ACCESSDATA_NAME: string;
            /** 获取-访问数据 */
            get accessData(): string;
            /** 设置-访问数据 */
            set accessData(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            get objectKey(): number;
            /** 设置-对象编号 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
            set objectCode(value: string);
            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号 */
            get logInst(): number;
            /** 设置-实例号 */
            set logInst(value: number);
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            get series(): number;
            /** 设置-服务系列 */
            set series(value: number);
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-更新日期 */
            get updateDate(): Date;
            /** 设置-更新日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-更新时间 */
            get updateTime(): number;
            /** 设置-更新时间 */
            set updateTime(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-更新用户 */
            get updateUserSign(): number;
            /** 设置-更新用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 初始化数据 */
            protected init(): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 用户应用 */
        class UserApplication {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 地址 */
            url: string;
            /** 用户 */
            user: string;
        }
        /** 应用设置 */
        class ApplicationSetting extends ibas.Bindable {
            /** 名称 */
            get name(): string;
            set name(value: string);
            /** 组 */
            get group(): string;
            set group(value: string);
            /** 描述 */
            get description(): string;
            set description(value: string);
            /** 子项 */
            get settingItems(): ibas.IList<ApplicationSettingItem>;
            set settingItems(value: ibas.IList<ApplicationSettingItem>);
        }
        /** 应用设置项目 */
        class ApplicationSettingItem extends ibas.Bindable {
            /** 名称 */
            get name(): string;
            set name(value: string);
            /** 类型 */
            get category(): emConfigItemCategory;
            set category(value: emConfigItemCategory);
            /** 描述 */
            get description(): string;
            set description(value: string);
            /** 值 */
            get value(): string | Blob;
            set value(value: string | Blob);
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 数据转换者 */
        class DataConverter extends ibas.DataConverter4j {
            /** 创建业务对象转换者 */
            protected createConverter(): ibas.BOConverter;
            /**
             * 解析业务对象数据
             * @param data 目标类型
             * @param sign 特殊标记
             * @returns 本地类型
             */
            parsing(data: any, sign: string): any;
        }
        /** 模块业务对象工厂 */
        const boFactory: ibas.BOFactory;
        namespace ibas4j {
            /** ibas的java端数据声明 */
            /** 操作消息 */
            interface IDataDeclaration {
                /** 数据类型 */
                type: string;
            }
            /** 用户应用 */
            interface IUserApplication extends IDataDeclaration {
                /** 编码 */
                Code: string;
                /** 名称 */
                Name: string;
                /** 地址 */
                Url: string;
                /** 用户 */
                User: string;
            }
            /** 应用设置 */
            interface IApplicationSetting extends IDataDeclaration {
                /** 名称 */
                Name: string;
                /** 组 */
                Group: string;
                /** 描述 */
                Description: string;
                /** 设置项目 */
                SettingItems: ibas.IList<IApplicationSettingItem>;
            }
            /** 应用设置项目 */
            interface IApplicationSettingItem extends IDataDeclaration {
                /** 名称 */
                Name: string;
                /** 类型 */
                Category: string;
                /** 描述 */
                Description: string;
                /** 值 */
                Value: string;
            }
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
        /** 业务对象仓库 */
        class BORepositoryThirdPartyApp extends ibas.BORepositoryApplication implements IBORepositoryThirdPartyApp {
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter;
            /**
             * 获取地址
             */
            toUrl(filename: string): string;
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 应用
             * @param fetcher 查询者
             */
            fetchApplication(fetcher: ibas.IFetchCaller<bo.Application>): void;
            /**
             * 保存 应用
             * @param saver 保存者
             */
            saveApplication(saver: ibas.ISaveCaller<bo.Application>): void;
            /**
             * 查询 应用配置
             * @param fetcher 查询者
             */
            fetchApplicationConfig(fetcher: ibas.IFetchCaller<bo.ApplicationConfig>): void;
            /**
             * 保存 应用配置
             * @param saver 保存者
             */
            saveApplicationConfig(saver: ibas.ISaveCaller<bo.ApplicationConfig>): void;
            /**
             * 查询 用户应用
             * @param caller 查询者
             */
            fetchUserApplications(caller: IUserMethodsCaller<bo.UserApplication>): void;
            /**
             * 保存 应用配置
             * @param caller 查询者
             */
            saveApplicationSetting(caller: IApplicationSettingSaver): void;
            /**
             * 查询 应用配置
             * @param caller 查询者
             */
            fetchApplicationSetting(caller: IApplicationSettingFetcher): void;
            /**
             * 移除 用户应用配置
             * @param caller 查询者
             */
            removeApplicationSetting(caller: IApplicationSettingRemover): void;
            /**
             * 查询 用户映射
             * @param fetcher 查询者
             */
            fetchUserMapping(fetcher: ibas.IFetchCaller<bo.UserMapping>): void;
        }
        /**
         * 用户相关调用者
         */
        interface IUserMethodsCaller<P> extends ibas.IMethodCaller<P> {
            /** 用户 */
            user: string;
            /** 平台 */
            platform?: string;
        }
        /**
         * 应用配置保存者
         */
        interface IApplicationSettingSaver extends ibas.IMethodCaller<ApplicationSetting> {
            /** 应用 */
            application: string;
            /** 用户 */
            user?: string;
            /** 提交数据 */
            formData: FormData;
        }
        /**
         * 应用配置查询者
         */
        interface IApplicationSettingFetcher extends ibas.IMethodCaller<ApplicationSetting> {
            /** 应用 */
            application: string;
            /** 用户 */
            user?: string;
        }
        /**
         * 应用配置查询者
         */
        interface IApplicationSettingRemover extends ibas.IMethodCaller<void> {
            /** 应用 */
            application: string;
            /** 用户 */
            user: string;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace bo {
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        class ApplicationFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID: string;
            /** 功能名称 */
            static FUNCTION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 列表应用-应用 */
        class ApplicationListApp extends ibas.BOListApplication<IApplicationListView, bo.Application> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.Application): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Application): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Application | bo.Application[]): void;
            private applicationConfig;
        }
        /** 视图-应用 */
        interface IApplicationListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Application[]): void;
            /** 应用配置 */
            applicationConfigEvent: Function;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 选择应用-应用 */
        class ApplicationChooseApp extends ibas.BOChooseService<IApplicationChooseView, bo.Application> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
        }
        /** 视图-应用 */
        interface IApplicationChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Application[]): void;
        }
        /** 应用选择服务映射 */
        class ApplicationChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.Application>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 编辑应用-应用 */
        class ApplicationEditApp extends ibas.BOEditApplication<IApplicationEditView, bo.Application> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            run(): void;
            run(data: bo.Application): void;
            /** 保存数据 */
            protected saveData(formData?: FormData): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseApplicationConfig;
            /** 上传图片事件 */
            private uploadPicture;
        }
        /** 视图-应用 */
        interface IApplicationEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showApplication(data: bo.Application): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择应用配置 */
            chooseApplicationConfigEvent: Function;
            /** 显示可用配置 */
            showApplicationSettingItems(datas: bo.ApplicationSettingItem[]): void;
            /** 上传图片事件 */
            uploadPictureEvent: Function;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        class ApplicationConfigFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID: string;
            /** 功能名称 */
            static FUNCTION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 列表应用-应用配置 */
        class ApplicationConfigListApp extends ibas.BOListApplication<IApplicationConfigListView, bo.ApplicationConfig> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.ApplicationConfig): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.ApplicationConfig): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.ApplicationConfig | bo.ApplicationConfig[]): void;
        }
        /** 视图-应用配置 */
        interface IApplicationConfigListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.ApplicationConfig[]): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 选择应用-应用配置 */
        class ApplicationConfigChooseApp extends ibas.BOChooseService<IApplicationConfigChooseView, bo.ApplicationConfig> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
        }
        /** 视图-应用配置 */
        interface IApplicationConfigChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.ApplicationConfig[]): void;
        }
        /** 应用配置选择服务映射 */
        class ApplicationConfigChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.ApplicationConfig>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 编辑应用-应用配置 */
        class ApplicationConfigEditApp extends ibas.BOEditApplication<IApplicationConfigEditView, bo.ApplicationConfig> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            run(): void;
            run(data: bo.ApplicationConfig): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 添加应用配置-项目事件 */
            protected addApplicationConfigItem(): void;
            /** 删除应用配置-项目事件 */
            protected removeApplicationConfigItem(items: bo.ApplicationConfigItem[]): void;
        }
        /** 视图-应用配置 */
        interface IApplicationConfigEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showApplicationConfig(data: bo.ApplicationConfig): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加应用配置-项目事件 */
            addApplicationConfigItemEvent: Function;
            /** 删除应用配置-项目事件 */
            removeApplicationConfigItemEvent: Function;
            /** 显示数据-应用配置-项目 */
            showApplicationConfigItems(datas: bo.ApplicationConfigItem[]): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        class UserMappingFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID: string;
            /** 功能名称 */
            static FUNCTION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        class MappingData {
            constructor(mapping: bo.UserMapping, app: bo.Application);
            app: bo.Application;
            mapping: bo.UserMapping;
        }
        /** 列表应用-用户映射 */
        class UserMappingListApp extends ibas.BOListApplication<IUserMappingListView, initialfantasy.bo.User> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
            private appMaps;
            /** 查看数据，参数：目标数据 */
            protected viewData(data: initialfantasy.bo.User | string): void;
            private connectApplication;
            private disconnectApplication;
        }
        /** 视图-用户映射 */
        interface IUserMappingListView extends ibas.IBOListView {
            /** 显示数据 */
            showData(datas: initialfantasy.bo.User[]): void;
            /** 显示数据 */
            showUserMappings(datas: MappingData[]): void;
            /** 连接应用事件 */
            connectApplicationEvent: Function;
            /** 断开应用事件 */
            disconnectApplicationEvent: Function;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /**
         * 用户应用功能
         */
        class UserApplicationFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID_PREFIX: string;
            /** 构造函数 */
            constructor(application: bo.UserApplication);
            private application;
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 应用-用户应用 */
        class UserApplicationApp extends ibas.Application<IUserApplicationView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            application: bo.UserApplication;
            /** 运行 */
            run(): void;
        }
        /** 视图-用户应用 */
        interface IUserApplicationView extends ibas.IUrlView {
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 应用设置-应用 */
        class ApplicationSettingService extends ibas.ServiceWithResultApplication<IApplicationSettingServiceView, IApplicationSettingContract, bo.ApplicationSetting> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            protected applicationSetting: bo.ApplicationSetting;
            protected user: initialfantasy.bo.User;
            protected runService(contract: IApplicationSettingContract): void;
            private saveData;
        }
        /** 视图-应用 */
        interface IApplicationSettingServiceView extends ibas.IView {
            /** 保存事件 */
            saveDataEvent: Function;
            /** 显示配置 */
            showSetting(data: bo.ApplicationSetting): void;
            /** 显示配置内容 */
            showSettingItems(datas: bo.ApplicationSettingItem[]): void;
        }
        /** 应用配置选择服务映射 */
        class ApplicationSettingServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace thirdpartyapp {
    namespace app {
        /** 模块控制台 */
        class Console extends ibas.ModuleConsole {
            /** 构造函数 */
            constructor();
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation;
            /** 初始化 */
            protected registers(): void;
            /** 运行 */
            run(): void;
        }
        /** 模块控制台 */
        class ConsoleUsers extends ibas.ModuleConsole {
            /** 模块-标识 */
            static CONSOLE_ID: string;
            /** 模块-名称 */
            static CONSOLE_NAME: string;
            /** 模块-版本 */
            static CONSOLE_VERSION: string;
            /** 构造函数 */
            constructor();
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation;
            /** 初始化 */
            protected registers(): void;
            /** 运行 */
            run(): void;
            /** 设置仓库地址 */
            setRepository(address: string): boolean;
        }
    }
}
