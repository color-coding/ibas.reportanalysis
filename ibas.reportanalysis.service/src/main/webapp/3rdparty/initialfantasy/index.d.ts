/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace initialfantasy {
    /** 模块-标识 */
    const CONSOLE_ID: string;
    /** 模块-名称 */
    const CONSOLE_NAME: string;
    /** 模块-版本 */
    const CONSOLE_VERSION: string;
    /** 配置值-组织方式 */
    const CONFIG_VALUE_ORGANIZATION_WAY: string;
    /** 配置值-数据权限方式 */
    const CONFIG_VALUE_OWNERSHIP_WAY: string;
    namespace config {
        /** 配置值-用户密码过期天数 */
        const CONFIG_VALUE_USER_PASSWORD_EXPIRATION_DAYS: string;
        /**
         * 获取此模块配置
         * @param key 配置项
         * @param defalut 默认值
         */
        function get<T>(key: string, defalut?: T): T;
    }
    namespace bo {
        /** 业务仓库名称 */
        const BO_REPOSITORY_INITIALFANTASY: string;
        /** 业务对象编码-应用程序配置 */
        const BO_CODE_APPLICATIONCONFIG: string;
        /** 业务对象编码-应用程序元素 */
        const BO_CODE_APPLICATIONELEMENT: string;
        /** 业务对象编码-应用程序模块 */
        const BO_CODE_APPLICATIONMODULE: string;
        /** 业务对象编码-应用程序平台 */
        const BO_CODE_APPLICATIONPLATFORM: string;
        /** 业务对象编码-业务对象检索条件 */
        const BO_CODE_BOCRITERIA: string;
        /** 业务对象编码-业务对象筛选 */
        const BO_CODE_BOFILTERING: string;
        /** 业务对象编码-组织 */
        const BO_CODE_ORGANIZATION: string;
        /** 业务对象编码-系统权限 */
        const BO_CODE_PRIVILEGE: string;
        /** 业务对象编码-用户 */
        const BO_CODE_USER: string;
        /** 业务对象编码-业务对象信息 */
        const BO_CODE_BOINFORMATION: string;
        /** 业务对象编码-业务对象属性 */
        const BO_CODE_BOPROPERTY: string;
        /** 业务对象编码-系统变量 */
        const BO_CODE_SYSTEM_VARIABLE: string;
        /** 业务对象编码-系统配置 */
        const BO_CODE_SYSTEM_CONFIG: string;
        /** 业务对象编码-用户角色（默认与组织相同） */
        const BO_CODE_ROLE: string;
        /** 业务对象编码-身份 */
        const BO_CODE_IDENTITY: string;
        /** 业务对象编码-用户身份 */
        const BO_CODE_USERIDENTITY: string;
        /** 业务对象编码-身份权限 */
        const BO_CODE_IDENTITYPRIVILEGE: string;
        /** 业务对象编码-业务对象属性设置 */
        const BO_CODE_BOPROPERTYSETTING: string;
        /** 业务对象编码-应用程序配置-身份 */
        const BO_CODE_APPLICATIONCONFIGIDENTITY: string;
        /** 业务对象编码-业务对象属性值 */
        const BO_CODE_BOPROPERTY_VALUE: string;
        /** 业务对象编码-业务对象关系 */
        const BO_CODE_BORELATIONSHIP: string;
        /** 业务对象编码-重组功能 */
        const BO_CODE_REFUNCTION: string;
        /**
         * 分配类型
         */
        enum emAssignedType {
            /** 用户 */
            USER = 0,
            /** 角色 */
            ROLE = 1,
            /** 全部 */
            ALL = 2
        }
        /**
         * 筛选类型
         */
        enum emFilteringType {
            /** 不可用的 */
            UNAVAILABLE = 0,
            /** 可用的 */
            AVAILABLE = 1
        }
        /**
         * 元素类型
         */
        enum emElementType {
            /** 模块 */
            MODULE = 0,
            /** 功能 */
            FUNCTION = 1,
            /** 应用 */
            APPLICATION = 2,
            /** 服务 */
            SERVICE = 3,
            /** 其他 */
            OTHER = 4
        }
        /**
         * 筛选种类
         */
        enum emFilteringCategory {
            /** 读取 */
            READ = 0,
            /** 保存 */
            SAVE = 1,
            /** 新建 */
            CREATE = 2,
            /** 更新 */
            UPDATE = 3,
            /** 删除 */
            DELETE = 4
        }
        /** 分配-角色 */
        interface IRole {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
        }
        /** 比较操作 */
        enum emConditionOperation {
            /** 等于(=) */
            EQUAL = 0,
            /** 大于(>) */
            GRATER_THAN = 1,
            /** 小于(<) */
            LESS_THAN = 2,
            /** 大于等于(>=) */
            GRATER_EQUAL = 3,
            /** 小于等于(<=) */
            LESS_EQUAL = 4,
            /** 不等于(<>) */
            NOT_EQUAL = 5,
            /** 开始于 */
            BEGIN_WITH = 6,
            /** 不是开始于 */
            NOT_BEGIN_WITH = 7,
            /** 结束于 */
            END_WITH = 8,
            /** 不是结束于 */
            NOT_END_WITH = 9,
            /** 包括 */
            CONTAIN = 10,
            /** 不包含 */
            NOT_CONTAIN = 11
        }
        /** 比较关系 */
        enum emConditionRelationship {
            /** 无 */
            NONE = 0,
            /** 并且 */
            AND = 1,
            /** 或者 */
            OR = 2
        }
        enum emSearchedValue {
            /** 默认值 */
            DEFAULT = 0,
            /** 否 */
            NO = 1,
            /** 是 */
            YES = 2
        }
        enum emAuthorisedValue {
            /** 默认值 */
            DEFAULT = 0,
            /** 完全 */
            ALL = 1,
            /** 只读 */
            READ = 2,
            /** 没有 */
            NONE = 3
        }
        /** 配置种类 */
        enum emConfigCategory {
            /** 服务端 */
            SERVER = 0,
            /** 客户端 */
            CLIENT = 1,
            /** 全部 */
            ALL = 2
        }
        enum emRequiredValue {
            /** 默认值 */
            DEFAULT = 0,
            /** 否 */
            NO = 1,
            /** 是 */
            YES = 2
        }
    }
    namespace app {
        /** 身份权限配置契约 */
        interface IIdentityPrivilegeConfigContract extends ibas.IServiceContract {
            /** 平台 */
            platform: ibas.emPlantform | string | bo.IApplicationPlatform;
            /** 角色 */
            role: string | bo.IRole;
            /** 角色权限 */
            privileges?: bo.IPrivilege[];
        }
        /** 身份权限配置服务代理 */
        class IdentityPrivilegeConfigServiceProxy extends ibas.ServiceProxy<IIdentityPrivilegeConfigContract> {
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序配置 */
        interface IApplicationConfig extends ibas.IBOSimple {
            /** 配置组 */
            configGroup: string;
            /** 配置项 */
            configKey: string;
            /** 配置说明 */
            configDescription: string;
            /** 配置值 */
            configValue: string;
            /** 种类 */
            category: emConfigCategory;
            /** 设置 */
            settings: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 对象键值 */
            objectKey: number;
            /** 对象类型 */
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
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 实例号（版本） */
            logInst: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序配置-身份 */
        interface IApplicationConfigIdentity extends ibas.IBOSimple {
            /** 角色标识 */
            roleCode: string;
            /** 身份标识 */
            identityCode: string;
            /** 配置组 */
            configGroup: string;
            /** 配置项 */
            configKey: string;
            /** 配置值 */
            configValue: string;
            /** 对象键值 */
            objectKey: number;
            /** 对象类型 */
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
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 实例号（版本） */
            logInst: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序元素 */
        interface IApplicationElement extends ibas.IBOSimple {
            /** 模块标识 */
            moduleId: string;
            /** 元素标识 */
            elementId: string;
            /** 元素名称 */
            elementName: string;
            /** 元素类型 */
            elementType: emElementType;
            /** 对象键值 */
            objectKey: number;
            /** 对象类型 */
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
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 实例号（版本） */
            logInst: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序模块 */
        interface IApplicationModule extends ibas.IBOSimple {
            /** 模块标识 */
            moduleId: string;
            /** 平台标识 */
            platformId: string;
            /** 模块名称 */
            moduleName: string;
            /** 模块类别 */
            moduleCategory: string;
            /** 模块入口 */
            moduleEntry: string;
            /** 是否可用 */
            activated: ibas.emYesNo;
            /** 对象键值 */
            objectKey: number;
            /** 对象类型 */
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
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 实例号（版本） */
            logInst: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序平台 */
        interface IApplicationPlatform extends ibas.IBOSimple {
            /** 平台标识 */
            platformId: string;
            /** 平台编码 */
            platformCode: string;
            /** 平台描述 */
            platformDescription: string;
            /** 是否可用 */
            activated: ibas.emYesNo;
            /** 对象键值 */
            objectKey: number;
            /** 对象类型 */
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
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 实例号（版本） */
            logInst: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象检索条件 */
        interface IBOCriteria extends ibas.IBOSimple {
            /** 应用标识 */
            applicationId: string;
            /** 检索名称 */
            name: string;
            /** 指派类型 */
            assignedType: emAssignedType;
            /** 指派目标 */
            assigned: string;
            /** 激活的 */
            activated: ibas.emYesNo;
            /** 查询数据 */
            data: string;
            /** 顺序 */
            order: number;
            /** 编号 */
            objectKey: number;
            /** 类型 */
            objectCode: string;
            /** 实例号（版本） */
            logInst: number;
            /** 编号系列 */
            series: number;
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
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 数据所属组织 */
            organization: string;
            /** 备注 */
            remarks: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象筛选 */
        interface IBOFiltering extends ibas.IBOSimple {
            /** 角色标识 */
            roleCode: string;
            /** 对象类型 */
            boCode: string;
            /** 类别 */
            category: emFilteringCategory;
            /** 激活的 */
            activated: ibas.emYesNo;
            /** 筛选类型 */
            filteringType: emFilteringType;
            /** 名称 */
            name: string;
            /** 编号 */
            objectKey: number;
            /** 类型 */
            objectCode: string;
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
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
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
            /** 备注 */
            remarks: string;
            /** 业务对象筛选-条件集合 */
            boFilteringConditions: IBOFilteringConditions;
        }
        /** 业务对象筛选-条件 */
        interface IBOFilteringCondition extends ibas.IBOSimpleLine {
            /** 编号 */
            objectKey: number;
            /** 类型 */
            objectCode: string;
            /** 行号 */
            lineId: number;
            /** 显示顺序 */
            visOrder: number;
            /** 实例号（版本） */
            logInst: number;
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
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 取值属性 */
            propertyName: string;
            /** 比较的值 */
            conditionValue: string;
            /** 比较的方法 */
            operation: emConditionOperation;
            /** 与上一个条件的关系 */
            relationship: emConditionRelationship;
            /** 开括号数 */
            bracketOpen: number;
            /** 闭括号数 */
            bracketClose: number;
            /** 备注 */
            remarks: string;
        }
        /** 业务对象筛选-条件 集合 */
        interface IBOFilteringConditions extends ibas.IBusinessObjects<IBOFilteringCondition> {
            /** 创建并添加子项 */
            create(): IBOFilteringCondition;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象信息 */
        interface IBOInformation extends ibas.IBusinessObject {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 描述 */
            description: string;
            /** 映射（表） */
            mapped: string;
            /** 对象类型 */
            objectType: string;
            /** 开启修改日志 */
            modified: ibas.emYesNo;
            /** 业务对象属性信息集合 */
            boPropertyInformations: IBOPropertyInformations;
        }
        /** 业务对象属性信息 */
        interface IBOPropertyInformation extends ibas.IBusinessObject {
            /** 编码 */
            code: string;
            /** 属性名称 */
            property: string;
            /** 映射（字段） */
            mapped: string;
            /** 描述 */
            description: string;
            /** 数据类型 */
            dataType: string;
            /** 编辑类型 */
            editType: string;
            /** 编辑大小 */
            editSize: number;
            /** 检索的 */
            searched: ibas.emYesNo;
            /** 系统的 */
            systemed: ibas.emYesNo;
            /** 链接的对象 */
            linkedObject: string;
            /** 值选择方式 */
            valueChooseType: string;
            /** 触发属性 */
            triggerByProperty: string;
            /** 业务对象属性值集合 */
            boPropertyValues: IBOPropertyValues;
        }
        /** 业务对象属性信息 集合 */
        interface IBOPropertyInformations extends ibas.IBusinessObjects<IBOPropertyInformation> {
            /** 创建并添加子项 */
            create(): IBOPropertyInformation;
        }
        /** 业务对象属性信息 */
        interface IBOPropertyValue extends ibas.IBusinessObject {
            /** 编码 */
            code: string;
            /** 属性名称 */
            property: string;
            /** 值 */
            value: string;
            /** 描述 */
            description: string;
            /** 默认值 */
            default: ibas.emYesNo;
            /** 显示顺序 */
            visOrder: number;
        }
        /** 业务对象属性信息 集合 */
        interface IBOPropertyValues extends ibas.IBusinessObjects<IBOPropertyValue> {
            /** 创建并添加子项 */
            create(): IBOPropertyValue;
        }
        /** 业务对象关系 */
        interface IBORelationship extends ibas.IBusinessObject {
            /** 编码 */
            code: string;
            /** 目标对象 */
            target: string;
            /** 关系 */
            relation: string;
            /** 关联的属性 */
            associatedProperty: string;
            /** 描述 */
            description: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 组织 */
        interface IOrganization extends ibas.IBOMasterData, ibas.IBOUserFields {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 类别 */
            category: string;
            /** 组 */
            grouped: ibas.emYesNo;
            /** 父项 */
            parent: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
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
            /** 数据所有者 */
            dataOwner: number;
            /** 备注 */
            remarks: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 系统权限 */
        interface IPrivilege extends ibas.IBOSimple {
            /** 角色标识 */
            roleCode: string;
            /** 平台标识 */
            platformId: string;
            /** 模块标识 */
            moduleId: string;
            /** 目标标识 */
            target: string;
            /** 是否可用 */
            activated: ibas.emYesNo;
            /** 权限类型 */
            authoriseValue: ibas.emAuthoriseType;
            /** 自动运行 */
            automatic: ibas.emYesNo;
            /** 对象编号 */
            objectKey: number;
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
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 用户 */
        interface IUser extends ibas.IBOMasterData, ibas.IBOUserFields {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 用户密码 */
            password: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 超级用户 */
            super: ibas.emYesNo;
            /** 电子邮件地址 */
            mail: string;
            /** 电话号码 */
            phone: string;
            /** 类别 */
            category: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 密码修改日期 */
            lastPwdSetDate: Date;
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
            /** 审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
            /** 备注 */
            remarks: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 身份 */
        interface IIdentity extends ibas.IBOMasterData {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
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
declare namespace initialfantasy {
    namespace bo {
        /** 用户身份 */
        interface IUserIdentity extends ibas.IBOSimple {
            /** 用户 */
            user: string;
            /** 位置 */
            position: number;
            /** 身份 */
            identity: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 备注 */
            remarks: string;
            /** 对象编号 */
            objectKey: number;
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
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 身份权限 */
        interface IIdentityPrivilege extends ibas.IBOSimple {
            /** 角色标识 */
            roleCode: string;
            /** 平台标识 */
            platformId: string;
            /** 模块标识 */
            moduleId: string;
            /** 目标标识 */
            target: string;
            /** 是否可用 */
            activated: ibas.emYesNo;
            /** 身份标识 */
            identityCode: string;
            /** 权限类型 */
            authoriseValue: ibas.emAuthoriseType;
            /** 自动运行 */
            automatic: ibas.emYesNo;
            /** 对象编号 */
            objectKey: number;
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
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象属性设置 */
        interface IBOPropertySetting extends ibas.IBOSimple {
            /** 对象 */
            boCode: string;
            /** 属性 */
            propertyCode: string;
            /** 身份 */
            identityCode: string;
            /** 位置 */
            position: number;
            /** 检索的 */
            searched: emSearchedValue;
            /** 权限 */
            authorised: emAuthorisedValue;
            /** 必填的 */
            required: emRequiredValue;
            /** 对象编号 */
            objectKey: number;
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
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 宽度 */
            width: string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象日志 */
        interface IBOLogst extends ibas.IBusinessObject {
            /** 类型 */
            boCode: string;
            /** 主键值 */
            boKeys: string;
            /** 实例号 */
            logInst: number;
            /** 修改用户 */
            modifyUser: number;
            /** 修改日期 */
            modifyDate: Date;
            /** 修改时间 */
            modifyTime: number;
            /** 事务标识 */
            transationId: string;
            /** 动机 */
            cause: string;
            /** 内容 */
            content: string | object;
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
declare namespace initialfantasy {
    namespace bo {
        /** 重组功能 */
        interface IRefunction extends ibas.IBOSimple {
            /** 名称 */
            name: string;
            /** 指派类型 */
            assignedType: emAssignedType;
            /** 指派目标 */
            assigned: string;
            /** 激活的 */
            activated: ibas.emYesNo;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 对象编号 */
            objectKey: number;
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
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 备注 */
            remarks: string;
            /** 重组功能-项目集合 */
            refunctionItems: IRefunctionItems;
        }
        /** 重组功能-项目 集合 */
        interface IRefunctionItems extends ibas.IBusinessObjects<IRefunctionItem> {
            /** 创建并添加子项 */
            create(): IRefunctionItem;
        }
        /** 重组功能-项目 */
        interface IRefunctionItem extends ibas.IBOSimpleLine {
            /** 编号 */
            objectKey: number;
            /** 类型 */
            objectCode: string;
            /** 行号 */
            lineId: number;
            /** 显示顺序 */
            visOrder: number;
            /** 实例号（版本） */
            logInst: number;
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
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 父项 */
            parent: number;
            /** 功能 */
            function: string;
            /** 描述 */
            description: string;
            /** 图片 */
            image: string;
            /** 备注 */
            remarks: string;
            /** 重组功能-项目集合 */
            refunctionItems: IRefunctionItems;
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
declare namespace initialfantasy {
    namespace bo {
        /** InitialFantasy 业务仓库 */
        interface IBORepositoryInitialFantasy extends ibas.IBORepositoryApplication {
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
             * 查询 应用程序配置
             * @param fetcher 查询者
             */
            fetchApplicationConfig(fetcher: ibas.IFetchCaller<bo.IApplicationConfig>): void;
            /**
             * 保存 应用程序配置
             * @param saver 保存者
             */
            saveApplicationConfig(saver: ibas.ISaveCaller<bo.IApplicationConfig>): void;
            /**
             * 查询 应用程序元素
             * @param fetcher 查询者
             */
            fetchApplicationElement(fetcher: ibas.IFetchCaller<bo.IApplicationElement>): void;
            /**
             * 保存 应用程序元素
             * @param saver 保存者
             */
            saveApplicationElement(saver: ibas.ISaveCaller<bo.IApplicationElement>): void;
            /**
             * 查询 应用程序模块
             * @param fetcher 查询者
             */
            fetchApplicationModule(fetcher: ibas.IFetchCaller<bo.IApplicationModule>): void;
            /**
             * 保存 应用程序模块
             * @param saver 保存者
             */
            saveApplicationModule(saver: ibas.ISaveCaller<bo.IApplicationModule>): void;
            /**
             * 查询 应用程序平台
             * @param fetcher 查询者
             */
            fetchApplicationPlatform(fetcher: ibas.IFetchCaller<bo.IApplicationPlatform>): void;
            /**
             * 保存 应用程序平台
             * @param saver 保存者
             */
            saveApplicationPlatform(saver: ibas.ISaveCaller<bo.IApplicationPlatform>): void;
            /**
             * 查询 业务对象检索条件
             * @param fetcher 查询者
             */
            fetchBOCriteria(fetcher: ibas.IFetchCaller<bo.IBOCriteria>): void;
            /**
             * 保存 业务对象检索条件
             * @param saver 保存者
             */
            saveBOCriteria(saver: ibas.ISaveCaller<bo.IBOCriteria>): void;
            /**
             * 查询 业务对象筛选
             * @param fetcher 查询者
             */
            fetchBOFiltering(fetcher: ibas.IFetchCaller<bo.IBOFiltering>): void;
            /**
             * 保存 业务对象筛选
             * @param saver 保存者
             */
            saveBOFiltering(saver: ibas.ISaveCaller<bo.IBOFiltering>): void;
            /**
             * 查询 组织
             * @param fetcher 查询者
             */
            fetchOrganization(fetcher: ibas.IFetchCaller<bo.IOrganization>): void;
            /**
             * 保存 组织
             * @param saver 保存者
             */
            saveOrganization(saver: ibas.ISaveCaller<bo.IOrganization>): void;
            /**
             * 查询 角色
             * @param fetcher 查询者
             */
            fetchRole(fetcher: ibas.IFetchCaller<bo.IRole>): void;
            /**
             * 查询 系统权限
             * @param fetcher 查询者
             */
            fetchPrivilege(fetcher: ibas.IFetchCaller<bo.IPrivilege>): void;
            /**
             * 保存 系统权限
             * @param saver 保存者
             */
            savePrivilege(saver: ibas.ISaveCaller<bo.IPrivilege>): void;
            /**
             * 查询 用户
             * @param fetcher 查询者
             */
            fetchUser(fetcher: ibas.IFetchCaller<bo.IUser>): void;
            /**
             * 保存 用户
             * @param saver 保存者
             */
            saveUser(saver: ibas.ISaveCaller<bo.IUser>): void;
            /**
             * 查询 业务对象信息
             * @param fetcher 查询者
             */
            fetchBOInformation(fetcher: ibas.IFetchCaller<bo.IBOInformation>): void;
            /**
             * 保存 业务对象信息
             * @param saver 保存者
             */
            saveBOInformation(saver: ibas.ISaveCaller<bo.IBOInformation>): void;
            /**
             * 查询 身份
             * @param fetcher 查询者
             */
            fetchIdentity(fetcher: ibas.IFetchCaller<bo.IIdentity>): void;
            /**
             * 保存 身份
             * @param saver 保存者
             */
            saveIdentity(saver: ibas.ISaveCaller<bo.IIdentity>): void;
            /**
             * 查询 用户身份
             * @param fetcher 查询者
             */
            fetchUserIdentity(fetcher: ibas.IFetchCaller<bo.IUserIdentity>): void;
            /**
             * 保存 用户身份
             * @param saver 保存者
             */
            saveUserIdentity(saver: ibas.ISaveCaller<bo.IUserIdentity>): void;
            /**
             * 查询 身份权限
             * @param fetcher 查询者
             */
            fetchIdentityPrivilege(fetcher: ibas.IFetchCaller<bo.IIdentityPrivilege>): void;
            /**
             * 保存 身份权限
             * @param saver 保存者
             */
            saveIdentityPrivilege(saver: ibas.ISaveCaller<bo.IIdentityPrivilege>): void;
            /**
             * 查询 业务对象属性设置
             * @param fetcher 查询者
             */
            fetchBOPropertySetting(fetcher: ibas.IFetchCaller<bo.IBOPropertySetting>): void;
            /**
             * 保存 业务对象属性设置
             * @param saver 保存者
             */
            saveBOPropertySetting(saver: ibas.ISaveCaller<bo.IBOPropertySetting>): void;
            /**
             * 查询 应用程序配置-身份
             * @param fetcher 查询者
             */
            fetchApplicationConfigIdentity(fetcher: ibas.IFetchCaller<bo.IApplicationConfigIdentity>): void;
            /**
             * 保存 应用程序配置-身份
             * @param saver 保存者
             */
            saveApplicationConfigIdentity(saver: ibas.ISaveCaller<bo.IApplicationConfigIdentity>): void;
            /**
             * 查询 重组功能
             * @param fetcher 查询者
             */
            fetchRefunction(fetcher: ibas.IFetchCaller<bo.IRefunction>): void;
            /**
             * 保存 重组功能
             * @param saver 保存者
             */
            saveRefunction(saver: ibas.ISaveCaller<bo.IRefunction>): void;
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序配置 */
        class ApplicationConfig extends ibas.BOSimple<ApplicationConfig> implements IApplicationConfig {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-配置组 */
            static PROPERTY_CONFIGGROUP_NAME: string;
            /** 获取-配置组 */
            get configGroup(): string;
            /** 设置-配置组 */
            set configGroup(value: string);
            /** 映射的属性名称-配置项 */
            static PROPERTY_CONFIGKEY_NAME: string;
            /** 获取-配置项 */
            get configKey(): string;
            /** 设置-配置项 */
            set configKey(value: string);
            /** 映射的属性名称-配置说明 */
            static PROPERTY_CONFIGDESCRIPTION_NAME: string;
            /** 获取-配置说明 */
            get configDescription(): string;
            /** 设置-配置说明 */
            set configDescription(value: string);
            /** 映射的属性名称-配置值 */
            static PROPERTY_CONFIGVALUE_NAME: string;
            /** 获取-配置值 */
            get configValue(): string;
            /** 设置-配置值 */
            set configValue(value: string);
            /** 映射的属性名称-种类 */
            static PROPERTY_CATEGORY_NAME: string;
            /** 获取-种类 */
            get category(): emConfigCategory;
            /** 设置-种类 */
            set category(value: emConfigCategory);
            /** 映射的属性名称-设置 */
            static PROPERTY_SETTINGS_NAME: string;
            /** 获取-设置 */
            get settings(): string;
            /** 设置-设置 */
            set settings(value: string);
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            get activated(): ibas.emYesNo;
            /** 设置-激活 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-对象键值 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象键值 */
            get objectKey(): number;
            /** 设置-对象键值 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
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
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序配置-身份 */
        class ApplicationConfigIdentity extends ibas.BOSimple<ApplicationConfigIdentity> implements IApplicationConfigIdentity {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-角色标识 */
            static PROPERTY_ROLECODE_NAME: string;
            /** 获取-角色标识 */
            get roleCode(): string;
            /** 设置-角色标识 */
            set roleCode(value: string);
            /** 映射的属性名称-身份标识 */
            static PROPERTY_IDENTITYCODE_NAME: string;
            /** 获取-身份标识 */
            get identityCode(): string;
            /** 设置-身份标识 */
            set identityCode(value: string);
            /** 映射的属性名称-配置组 */
            static PROPERTY_CONFIGGROUP_NAME: string;
            /** 获取-配置组 */
            get configGroup(): string;
            /** 设置-配置组 */
            set configGroup(value: string);
            /** 映射的属性名称-配置项 */
            static PROPERTY_CONFIGKEY_NAME: string;
            /** 获取-配置项 */
            get configKey(): string;
            /** 设置-配置项 */
            set configKey(value: string);
            /** 映射的属性名称-配置值 */
            static PROPERTY_CONFIGVALUE_NAME: string;
            /** 获取-配置值 */
            get configValue(): string;
            /** 设置-配置值 */
            set configValue(value: string);
            /** 映射的属性名称-对象键值 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象键值 */
            get objectKey(): number;
            /** 设置-对象键值 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
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
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序元素 */
        class ApplicationElement extends ibas.BOSimple<ApplicationElement> implements IApplicationElement {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-模块标识 */
            static PROPERTY_MODULEID_NAME: string;
            /** 获取-模块标识 */
            get moduleId(): string;
            /** 设置-模块标识 */
            set moduleId(value: string);
            /** 映射的属性名称-元素标识 */
            static PROPERTY_ELEMENTID_NAME: string;
            /** 获取-元素标识 */
            get elementId(): string;
            /** 设置-元素标识 */
            set elementId(value: string);
            /** 映射的属性名称-元素名称 */
            static PROPERTY_ELEMENTNAME_NAME: string;
            /** 获取-元素名称 */
            get elementName(): string;
            /** 设置-元素名称 */
            set elementName(value: string);
            /** 映射的属性名称-元素类型 */
            static PROPERTY_ELEMENTTYPE_NAME: string;
            /** 获取-元素类型 */
            get elementType(): emElementType;
            /** 设置-元素类型 */
            set elementType(value: emElementType);
            /** 映射的属性名称-对象键值 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象键值 */
            get objectKey(): number;
            /** 设置-对象键值 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
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
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序模块 */
        class ApplicationModule extends ibas.BOSimple<ApplicationModule> implements IApplicationModule {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-模块标识 */
            static PROPERTY_MODULEID_NAME: string;
            /** 获取-模块标识 */
            get moduleId(): string;
            /** 设置-模块标识 */
            set moduleId(value: string);
            /** 映射的属性名称-平台标识 */
            static PROPERTY_PLATFORMID_NAME: string;
            /** 获取-平台标识 */
            get platformId(): string;
            /** 设置-平台标识 */
            set platformId(value: string);
            /** 映射的属性名称-模块名称 */
            static PROPERTY_MODULENAME_NAME: string;
            /** 获取-模块名称 */
            get moduleName(): string;
            /** 设置-模块名称 */
            set moduleName(value: string);
            /** 映射的属性名称-模块类别 */
            static PROPERTY_MODULECATEGORY_NAME: string;
            /** 获取-模块类别 */
            get moduleCategory(): string;
            /** 设置-模块类别 */
            set moduleCategory(value: string);
            /** 映射的属性名称-模块入口 */
            static PROPERTY_MODULEENTRY_NAME: string;
            /** 获取-模块入口 */
            get moduleEntry(): string;
            /** 设置-模块入口 */
            set moduleEntry(value: string);
            /** 映射的属性名称-是否可用 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-是否可用 */
            get activated(): ibas.emYesNo;
            /** 设置-是否可用 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-对象键值 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象键值 */
            get objectKey(): number;
            /** 设置-对象键值 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
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
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
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
declare namespace initialfantasy {
    namespace bo {
        /** 应用程序平台 */
        class ApplicationPlatform extends ibas.BOSimple<ApplicationPlatform> implements IApplicationPlatform {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-平台标识 */
            static PROPERTY_PLATFORMID_NAME: string;
            /** 获取-平台标识 */
            get platformId(): string;
            /** 设置-平台标识 */
            set platformId(value: string);
            /** 映射的属性名称-平台编码 */
            static PROPERTY_PLATFORMCODE_NAME: string;
            /** 获取-平台编码 */
            get platformCode(): string;
            /** 设置-平台编码 */
            set platformCode(value: string);
            /** 映射的属性名称-平台描述 */
            static PROPERTY_PLATFORMDESCRIPTION_NAME: string;
            /** 获取-平台描述 */
            get platformDescription(): string;
            /** 设置-平台描述 */
            set platformDescription(value: string);
            /** 映射的属性名称-是否可用 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-是否可用 */
            get activated(): ibas.emYesNo;
            /** 设置-是否可用 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-对象键值 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象键值 */
            get objectKey(): number;
            /** 设置-对象键值 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
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
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象检索条件 */
        class BOCriteria extends ibas.BOSimple<BOCriteria> implements IBOCriteria {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-应用标识 */
            static PROPERTY_APPLICATIONID_NAME: string;
            /** 获取-应用标识 */
            get applicationId(): string;
            /** 设置-应用标识 */
            set applicationId(value: string);
            /** 映射的属性名称-检索名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-检索名称 */
            get name(): string;
            /** 设置-检索名称 */
            set name(value: string);
            /** 映射的属性名称-指派类型 */
            static PROPERTY_ASSIGNEDTYPE_NAME: string;
            /** 获取-指派类型 */
            get assignedType(): emAssignedType;
            /** 设置-指派类型 */
            set assignedType(value: emAssignedType);
            /** 映射的属性名称-指派目标 */
            static PROPERTY_ASSIGNED_NAME: string;
            /** 获取-指派目标 */
            get assigned(): string;
            /** 设置-指派目标 */
            set assigned(value: string);
            /** 映射的属性名称-激活的 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活的 */
            get activated(): ibas.emYesNo;
            /** 设置-激活的 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-查询数据 */
            static PROPERTY_DATA_NAME: string;
            /** 获取-查询数据 */
            get data(): string;
            /** 设置-查询数据 */
            set data(value: string);
            /** 映射的属性名称-顺序 */
            static PROPERTY_ORDER_NAME: string;
            /** 获取-顺序 */
            get order(): number;
            /** 设置-顺序 */
            set order(value: number);
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-编号 */
            get objectKey(): number;
            /** 设置-编号 */
            set objectKey(value: number);
            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-类型 */
            get objectCode(): string;
            /** 设置-类型 */
            set objectCode(value: string);
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
            set logInst(value: number);
            /** 映射的属性名称-编号系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-编号系列 */
            get series(): number;
            /** 设置-编号系列 */
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
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            get organization(): string;
            /** 设置-数据所属组织 */
            set organization(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            protected onPropertyChanged(name: string): void;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象筛选 */
        class BOFiltering extends ibas.BOSimple<BOFiltering> implements IBOFiltering {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-角色标识 */
            static PROPERTY_ROLECODE_NAME: string;
            /** 获取-角色标识 */
            get roleCode(): string;
            /** 设置-角色标识 */
            set roleCode(value: string);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_BOCODE_NAME: string;
            /** 获取-对象类型 */
            get boCode(): string;
            /** 设置-对象类型 */
            set boCode(value: string);
            /** 映射的属性名称-类别 */
            static PROPERTY_CATEGORY_NAME: string;
            /** 获取-类别 */
            get category(): emFilteringCategory;
            /** 设置-类别 */
            set category(value: emFilteringCategory);
            /** 映射的属性名称-激活的 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活的 */
            get activated(): ibas.emYesNo;
            /** 设置-激活的 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-筛选类型 */
            static PROPERTY_FILTERINGTYPE_NAME: string;
            /** 获取-筛选类型 */
            get filteringType(): emFilteringType;
            /** 设置-筛选类型 */
            set filteringType(value: emFilteringType);
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            get name(): string;
            /** 设置-名称 */
            set name(value: string);
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-编号 */
            get objectKey(): number;
            /** 设置-编号 */
            set objectKey(value: number);
            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-类型 */
            get objectCode(): string;
            /** 设置-类型 */
            set objectCode(value: string);
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
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            get dataOwner(): number;
            /** 设置-数据所有者 */
            set dataOwner(value: number);
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            get organization(): string;
            /** 设置-数据所属组织 */
            set organization(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-业务对象筛选-条件集合 */
            static PROPERTY_BOFILTERINGCONDITIONS_NAME: string;
            /** 获取-业务对象筛选-条件集合 */
            get boFilteringConditions(): BOFilteringConditions;
            /** 设置-业务对象筛选-条件集合 */
            set boFilteringConditions(value: BOFilteringConditions);
            /** 初始化数据 */
            protected init(): void;
        }
        /** 业务对象筛选-条件 */
        class BOFilteringCondition extends ibas.BOSimpleLine<BOFilteringCondition> implements IBOFilteringCondition {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-编号 */
            get objectKey(): number;
            /** 设置-编号 */
            set objectKey(value: number);
            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-类型 */
            get objectCode(): string;
            /** 设置-类型 */
            set objectCode(value: string);
            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string;
            /** 获取-行号 */
            get lineId(): number;
            /** 设置-行号 */
            set lineId(value: number);
            /** 映射的属性名称-显示顺序 */
            static PROPERTY_VISORDER_NAME: string;
            /** 获取-显示顺序 */
            get visOrder(): number;
            /** 设置-显示顺序 */
            set visOrder(value: number);
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
            set logInst(value: number);
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
            /** 映射的属性名称-取值属性 */
            static PROPERTY_PROPERTYNAME_NAME: string;
            /** 获取-取值属性 */
            get propertyName(): string;
            /** 设置-取值属性 */
            set propertyName(value: string);
            /** 映射的属性名称-比较的值 */
            static PROPERTY_CONDITIONVALUE_NAME: string;
            /** 获取-比较的值 */
            get conditionValue(): string;
            /** 设置-比较的值 */
            set conditionValue(value: string);
            /** 映射的属性名称-比较的方法 */
            static PROPERTY_OPERATION_NAME: string;
            /** 获取-比较的方法 */
            get operation(): emConditionOperation;
            /** 设置-比较的方法 */
            set operation(value: emConditionOperation);
            /** 映射的属性名称-与上一个条件的关系 */
            static PROPERTY_RELATIONSHIP_NAME: string;
            /** 获取-与上一个条件的关系 */
            get relationship(): emConditionRelationship;
            /** 设置-与上一个条件的关系 */
            set relationship(value: emConditionRelationship);
            /** 映射的属性名称-开括号数 */
            static PROPERTY_BRACKETOPEN_NAME: string;
            /** 获取-开括号数 */
            get bracketOpen(): number;
            /** 设置-开括号数 */
            set bracketOpen(value: number);
            /** 映射的属性名称-闭括号数 */
            static PROPERTY_BRACKETCLOSE_NAME: string;
            /** 获取-闭括号数 */
            get bracketClose(): number;
            /** 设置-闭括号数 */
            set bracketClose(value: number);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 初始化数据 */
            protected init(): void;
        }
        /** 业务对象筛选-条件 集合 */
        class BOFilteringConditions extends ibas.BusinessObjects<BOFilteringCondition, BOFiltering> implements IBOFilteringConditions {
            /** 创建并添加子项 */
            create(): BOFilteringCondition;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象信息 */
        class BOInformation extends ibas.BusinessObject<BOInformation> implements IBOInformation {
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
            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string;
            /** 获取-描述 */
            get description(): string;
            /** 设置-描述 */
            set description(value: string);
            /** 映射的属性名称-映射（表） */
            static PROPERTY_MAPPED_NAME: string;
            /** 获取-映射（表） */
            get mapped(): string;
            /** 设置-映射（表） */
            set mapped(value: string);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTTYPE_NAME: string;
            /** 获取-对象类型 */
            get objectType(): string;
            /** 设置-对象类型 */
            set objectType(value: string);
            /** 映射的属性名称-开启修改日志 */
            static PROPERTY_MODIFIED_NAME: string;
            /** 获取-开启修改日志 */
            get modified(): ibas.emYesNo;
            /** 设置-开启修改日志 */
            set modified(value: ibas.emYesNo);
            /** 映射的属性名称-业务对象属性信息集合 */
            static PROPERTY_BOPROPERTYINFORMATIONS_NAME: string;
            /** 获取-业务对象属性信息集合 */
            get boPropertyInformations(): BOPropertyInformations;
            /** 设置-业务对象属性信息集合 */
            set boPropertyInformations(value: BOPropertyInformations);
            /** 字符串 */
            toString(): string;
            /** 获取查询 */
            criteria(): ibas.ICriteria;
            /** 初始化数据 */
            protected init(): void;
        }
        /** 业务对象属性信息 */
        class BOPropertyInformation extends ibas.BusinessObject<BOPropertyInformation> implements IBOPropertyInformation {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编码 */
            get code(): string;
            /** 设置-编码 */
            set code(value: string);
            /** 映射的属性名称-属性名称 */
            static PROPERTY_PROPERTY_NAME: string;
            /** 获取-属性名称 */
            get property(): string;
            /** 设置-属性名称 */
            set property(value: string);
            /** 映射的属性名称-映射（字段） */
            static PROPERTY_MAPPED_NAME: string;
            /** 获取-映射（字段） */
            get mapped(): string;
            /** 设置-映射（字段） */
            set mapped(value: string);
            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string;
            /** 获取-描述 */
            get description(): string;
            /** 设置-描述 */
            set description(value: string);
            /** 映射的属性名称-数据类型 */
            static PROPERTY_DATATYPE_NAME: string;
            /** 获取-数据类型 */
            get dataType(): string;
            /** 设置-数据类型 */
            set dataType(value: string);
            /** 映射的属性名称-编辑类型 */
            static PROPERTY_EDITTYPE_NAME: string;
            /** 获取-编辑类型 */
            get editType(): string;
            /** 设置-编辑类型 */
            set editType(value: string);
            /** 映射的属性名称-编辑大小 */
            static PROPERTY_EDITSIZE_NAME: string;
            /** 获取-编辑大小 */
            get editSize(): number;
            /** 设置-编辑大小 */
            set editSize(value: number);
            /** 映射的属性名称-检索的 */
            static PROPERTY_SEARCHED_NAME: string;
            /** 获取-检索的 */
            get searched(): ibas.emYesNo;
            /** 设置-检索的 */
            set searched(value: ibas.emYesNo);
            /** 映射的属性名称-系统的 */
            static PROPERTY_SYSTEMED_NAME: string;
            /** 获取-系统的 */
            get systemed(): ibas.emYesNo;
            /** 设置-系统的 */
            set systemed(value: ibas.emYesNo);
            /** 映射的属性名称-链接的对象 */
            static PROPERTY_LINKEDOBJECT_NAME: string;
            /** 获取-链接的对象 */
            get linkedObject(): string;
            /** 设置-链接的对象 */
            set linkedObject(value: string);
            /** 映射的属性名称-值选择方式 */
            static PROPERTY_VALUECHOOSETYPE_NAME: string;
            /** 获取-值选择方式 */
            get valueChooseType(): string;
            /** 设置-值选择方式 */
            set valueChooseType(value: string);
            /** 映射的属性名称-触发属性 */
            static PROPERTY_TRIGGERBYPROPERTY_NAME: string;
            /** 获取-触发属性 */
            get triggerByProperty(): string;
            /** 设置-触发属性 */
            set triggerByProperty(value: string);
            /** 映射的属性名称-业务对象属性值集合 */
            static PROPERTY_BOPROPERTYVALUES_NAME: string;
            /** 获取-业务对象属性信息集合 */
            get boPropertyValues(): BOPropertyValues;
            /** 设置-业务对象属性值集合 */
            set boPropertyValues(value: BOPropertyValues);
            /** 字符串 */
            toString(): string;
            /** 获取查询 */
            criteria(): ibas.ICriteria;
            /** 初始化数据 */
            protected init(): void;
        }
        /** 业务对象属性信息 集合 */
        class BOPropertyInformations extends ibas.BusinessObjects<BOPropertyInformation, BOInformation> implements IBOPropertyInformations {
            /** 创建并添加子项 */
            create(): BOPropertyInformation;
        }
        /** 业务对象属性值 */
        class BOPropertyValue extends ibas.BusinessObject<BOPropertyValue> implements IBOPropertyValue {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编码 */
            get code(): string;
            /** 设置-编码 */
            set code(value: string);
            /** 映射的属性名称-属性名称 */
            static PROPERTY_PROPERTY_NAME: string;
            /** 获取-属性名称 */
            get property(): string;
            /** 设置-属性名称 */
            set property(value: string);
            /** 映射的属性名称-值 */
            static PROPERTY_VALUE_NAME: string;
            /** 获取-值 */
            get value(): string;
            /** 设置-值 */
            set value(value: string);
            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string;
            /** 获取-描述 */
            get description(): string;
            /** 设置-描述 */
            set description(value: string);
            /** 映射的属性名称-默认值 */
            static PROPERTY_DEFAULT_NAME: string;
            /** 获取-默认值 */
            get default(): ibas.emYesNo;
            /** 设置-默认值 */
            set default(value: ibas.emYesNo);
            /** 映射的属性名称-显示顺序 */
            static PROPERTY_VISORDER_NAME: string;
            /** 获取-显示顺序 */
            get visOrder(): number;
            /** 设置-显示顺序 */
            set visOrder(value: number);
            /** 字符串 */
            toString(): string;
            /** 获取查询 */
            criteria(): ibas.ICriteria;
            /** 初始化数据 */
            protected init(): void;
        }
        /** 业务对象属性信息 集合 */
        class BOPropertyValues extends ibas.BusinessObjects<BOPropertyValue, BOPropertyInformation> implements IBOPropertyValues {
            /** 创建并添加子项 */
            create(): BOPropertyValue;
            /** 子项属性改变时 */
            protected onItemPropertyChanged(item: BOPropertyValue, name: string): void;
        }
        /** 业务对象关系 */
        class BORelationship extends ibas.BusinessObject<BORelationship> implements IBORelationship {
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
            /** 映射的属性名称-目标对象 */
            static PROPERTY_TARGET_NAME: string;
            /** 获取-目标对象 */
            get target(): string;
            /** 设置-目标对象 */
            set target(value: string);
            /** 映射的属性名称-关系 */
            static PROPERTY_RELATION_NAME: string;
            /** 获取-关系 */
            get relation(): string;
            /** 设置-关系 */
            set relation(value: string);
            /** 映射的属性名称-关联的属性 */
            static PROPERTY_ASSOCIATEDPROPERTY_NAME: string;
            /** 获取-关联的属性 */
            get associatedProperty(): string;
            /** 设置-关联的属性 */
            set associatedProperty(value: string);
            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string;
            /** 获取-描述 */
            get description(): string;
            /** 设置-描述 */
            set description(value: string);
            /** 初始化数据 */
            protected init(): void;
            /** 字符串 */
            toString(): string;
            /** 获取查询 */
            criteria(): ibas.ICriteria;
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象编号方式 */
        class BONumbering extends ibas.BusinessObject<BONumbering> {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象编码 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象编码 */
            get objectCode(): string;
            /** 设置-对象编码 */
            set objectCode(value: string);
            /** 映射的属性名称-自动序号 */
            static PROPERTY_AUTOKEY_NAME: string;
            /** 获取-自动序号 */
            get autoKey(): number;
            /** 设置-自动序号 */
            set autoKey(value: number);
            /** 字符串 */
            toString(): string;
            /** 获取查询 */
            criteria(): ibas.ICriteria;
            /** 初始化数据 */
            protected init(): void;
        }
        /** 业务对象序列编号方式 */
        class BOSeriesNumbering extends ibas.BusinessObject<BOSeriesNumbering> {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象编码 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象编码 */
            get objectCode(): string;
            /** 设置-对象编码 */
            set objectCode(value: string);
            /** 映射的属性名称-序列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-序列 */
            get series(): number;
            /** 设置-序列 */
            set series(value: number);
            /** 映射的属性名称-序列名称 */
            static PROPERTY_SERIESNAME_NAME: string;
            /** 获取-序列名称 */
            get seriesName(): string;
            /** 设置-序列名称 */
            set seriesName(value: string);
            /** 映射的属性名称-下一个序号 */
            static PROPERTY_NEXTNUMBER_NAME: string;
            /** 获取-下一个序号 */
            get nextNumber(): number;
            /** 设置-下一个序号 */
            set nextNumber(value: number);
            /** 映射的属性名称-已锁定 */
            static PROPERTY_LOCKED_NAME: string;
            /** 获取-已锁定 */
            get locked(): ibas.emYesNo;
            /** 设置-已锁定 */
            set locked(value: ibas.emYesNo);
            /** 映射的属性名称-模板 */
            static PROPERTY_TEMPLATE_NAME: string;
            /** 获取-模板 */
            get template(): string;
            /** 设置-模板 */
            set template(value: string);
            /** 字符串 */
            toString(): string;
            /** 获取查询 */
            criteria(): ibas.ICriteria;
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
declare namespace initialfantasy {
    namespace bo {
        /** 组织 */
        class Organization extends ibas.BOMasterData<Organization> implements IOrganization {
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
            /** 映射的属性名称-组 */
            static PROPERTY_GROUPED_NAME: string;
            /** 获取-组 */
            get grouped(): ibas.emYesNo;
            /** 设置-组 */
            set grouped(value: ibas.emYesNo);
            /** 映射的属性名称-父项 */
            static PROPERTY_PARENT_NAME: string;
            /** 获取-父项 */
            get parent(): string;
            /** 设置-父项 */
            set parent(value: string);
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            get validDate(): Date;
            /** 设置-生效日期 */
            set validDate(value: Date);
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            get invalidDate(): Date;
            /** 设置-失效日期 */
            set invalidDate(value: Date);
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
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            get dataOwner(): number;
            /** 设置-数据所有者 */
            set dataOwner(value: number);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
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
declare namespace initialfantasy {
    namespace bo {
        /** 系统权限 */
        class Privilege extends ibas.BOSimple<Privilege> implements IPrivilege {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-角色标识 */
            static PROPERTY_ROLECODE_NAME: string;
            /** 获取-角色标识 */
            get roleCode(): string;
            /** 设置-角色标识 */
            set roleCode(value: string);
            /** 映射的属性名称-平台标识 */
            static PROPERTY_PLATFORMID_NAME: string;
            /** 获取-平台标识 */
            get platformId(): string;
            /** 设置-平台标识 */
            set platformId(value: string);
            /** 映射的属性名称-模块标识 */
            static PROPERTY_MODULEID_NAME: string;
            /** 获取-模块标识 */
            get moduleId(): string;
            /** 设置-模块标识 */
            set moduleId(value: string);
            /** 映射的属性名称-目标标识 */
            static PROPERTY_TARGET_NAME: string;
            /** 获取-目标标识 */
            get target(): string;
            /** 设置-目标标识 */
            set target(value: string);
            /** 映射的属性名称-是否可用 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-是否可用 */
            get activated(): ibas.emYesNo;
            /** 设置-是否可用 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-权限类型 */
            static PROPERTY_AUTHORISEVALUE_NAME: string;
            /** 获取-权限类型 */
            get authoriseValue(): ibas.emAuthoriseType;
            /** 设置-权限类型 */
            set authoriseValue(value: ibas.emAuthoriseType);
            /** 映射的属性名称-自动运行 */
            static PROPERTY_AUTOMATIC_NAME: string;
            /** 获取-自动运行 */
            get automatic(): ibas.emYesNo;
            /** 设置-自动运行 */
            set automatic(value: ibas.emYesNo);
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
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
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
declare namespace initialfantasy {
    namespace bo {
        /** 用户 */
        class User extends ibas.BOMasterData<User> implements IUser {
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
            /** 映射的属性名称-用户密码 */
            static PROPERTY_PASSWORD_NAME: string;
            /** 获取-用户密码 */
            get password(): string;
            /** 设置-用户密码 */
            set password(value: string);
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            get activated(): ibas.emYesNo;
            /** 设置-激活 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-超级用户 */
            static PROPERTY_SUPER_NAME: string;
            /** 获取-超级用户 */
            get super(): ibas.emYesNo;
            /** 设置-超级用户 */
            set super(value: ibas.emYesNo);
            /** 映射的属性名称-电子邮件地址 */
            static PROPERTY_MAIL_NAME: string;
            /** 获取-电子邮件地址 */
            get mail(): string;
            /** 设置-电子邮件地址 */
            set mail(value: string);
            /** 映射的属性名称-电话号码 */
            static PROPERTY_PHONE_NAME: string;
            /** 获取-电话号码 */
            get phone(): string;
            /** 设置-电话号码 */
            set phone(value: string);
            /** 映射的属性名称-类别 */
            static PROPERTY_CATEGORY_NAME: string;
            /** 获取-类别 */
            get category(): string;
            /** 设置-类别 */
            set category(value: string);
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            get validDate(): Date;
            /** 设置-生效日期 */
            set validDate(value: Date);
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            get invalidDate(): Date;
            /** 设置-失效日期 */
            set invalidDate(value: Date);
            /** 映射的属性名称-密码修改日期 */
            static PROPERTY_LASTPWDSETDATE_NAME: string;
            /** 获取-密码修改日期 */
            get lastPwdSetDate(): Date;
            /** 设置-密码修改日期 */
            set lastPwdSetDate(value: Date);
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
            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string;
            /** 获取-审批状态 */
            get approvalStatus(): ibas.emApprovalStatus;
            /** 设置-审批状态 */
            set approvalStatus(value: ibas.emApprovalStatus);
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            get dataOwner(): number;
            /** 设置-数据所有者 */
            set dataOwner(value: number);
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            get organization(): string;
            /** 设置-数据所属组织 */
            set organization(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
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
declare namespace initialfantasy {
    namespace bo {
        /** 身份 */
        class Identity extends ibas.BOMasterData<Identity> implements IIdentity {
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
declare namespace initialfantasy {
    namespace bo {
        /** 用户身份 */
        class UserIdentity extends ibas.BOSimple<UserIdentity> implements IUserIdentity {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-用户 */
            static PROPERTY_USER_NAME: string;
            /** 获取-用户 */
            get user(): string;
            /** 设置-用户 */
            set user(value: string);
            /** 映射的属性名称-位置 */
            static PROPERTY_POSITION_NAME: string;
            /** 获取-位置 */
            get position(): number;
            /** 设置-位置 */
            set position(value: number);
            /** 映射的属性名称-身份 */
            static PROPERTY_IDENTITY_NAME: string;
            /** 获取-身份 */
            get identity(): string;
            /** 设置-身份 */
            set identity(value: string);
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            get validDate(): Date;
            /** 设置-生效日期 */
            set validDate(value: Date);
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            get invalidDate(): Date;
            /** 设置-失效日期 */
            set invalidDate(value: Date);
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
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
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
        /** 用户身份 集合 */
        class UserIdentities extends ibas.BusinessObjectsBase<UserIdentity> {
            /** 创建并添加子项 */
            create(): UserIdentity;
            /**
             * 添加项目后
             * @param item 项目
             */
            protected afterAdd(item: UserIdentity): void;
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
declare namespace initialfantasy {
    namespace bo {
        /** 身份权限 */
        class IdentityPrivilege extends ibas.BOSimple<IdentityPrivilege> implements IIdentityPrivilege {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-角色标识 */
            static PROPERTY_ROLECODE_NAME: string;
            /** 获取-角色标识 */
            get roleCode(): string;
            /** 设置-角色标识 */
            set roleCode(value: string);
            /** 映射的属性名称-平台标识 */
            static PROPERTY_PLATFORMID_NAME: string;
            /** 获取-平台标识 */
            get platformId(): string;
            /** 设置-平台标识 */
            set platformId(value: string);
            /** 映射的属性名称-模块标识 */
            static PROPERTY_MODULEID_NAME: string;
            /** 获取-模块标识 */
            get moduleId(): string;
            /** 设置-模块标识 */
            set moduleId(value: string);
            /** 映射的属性名称-目标标识 */
            static PROPERTY_TARGET_NAME: string;
            /** 获取-目标标识 */
            get target(): string;
            /** 设置-目标标识 */
            set target(value: string);
            /** 映射的属性名称-是否可用 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-是否可用 */
            get activated(): ibas.emYesNo;
            /** 设置-是否可用 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-身份标识 */
            static PROPERTY_IDENTITYCODE_NAME: string;
            /** 获取-身份标识 */
            get identityCode(): string;
            /** 设置-身份标识 */
            set identityCode(value: string);
            /** 映射的属性名称-权限类型 */
            static PROPERTY_AUTHORISEVALUE_NAME: string;
            /** 获取-权限类型 */
            get authoriseValue(): ibas.emAuthoriseType;
            /** 设置-权限类型 */
            set authoriseValue(value: ibas.emAuthoriseType);
            /** 映射的属性名称-自动运行 */
            static PROPERTY_AUTOMATIC_NAME: string;
            /** 获取-自动运行 */
            get automatic(): ibas.emYesNo;
            /** 设置-自动运行 */
            set automatic(value: ibas.emYesNo);
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
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象属性设置 */
        class BOPropertySetting extends ibas.BOSimple<BOPropertySetting> implements IBOPropertySetting {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象 */
            static PROPERTY_BOCODE_NAME: string;
            /** 获取-对象 */
            get boCode(): string;
            /** 设置-对象 */
            set boCode(value: string);
            /** 映射的属性名称-属性 */
            static PROPERTY_PROPERTYCODE_NAME: string;
            /** 获取-属性 */
            get propertyCode(): string;
            /** 设置-属性 */
            set propertyCode(value: string);
            /** 映射的属性名称-身份 */
            static PROPERTY_IDENTITYCODE_NAME: string;
            /** 获取-身份 */
            get identityCode(): string;
            /** 设置-身份 */
            set identityCode(value: string);
            /** 映射的属性名称-位置 */
            static PROPERTY_POSITION_NAME: string;
            /** 获取-位置 */
            get position(): number;
            /** 设置-位置 */
            set position(value: number);
            /** 映射的属性名称-检索的 */
            static PROPERTY_SEARCHED_NAME: string;
            /** 获取-检索的 */
            get searched(): emSearchedValue;
            /** 设置-检索的 */
            set searched(value: emSearchedValue);
            /** 映射的属性名称-权限 */
            static PROPERTY_AUTHORISED_NAME: string;
            /** 获取-权限 */
            get authorised(): emAuthorisedValue;
            /** 设置-权限 */
            set authorised(value: emAuthorisedValue);
            /** 映射的属性名称-必填 */
            static PROPERTY_REQUIRED_NAME: string;
            /** 获取-必填 */
            get required(): emRequiredValue;
            /** 设置-必填 */
            set required(value: emRequiredValue);
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
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
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
            /** 映射的属性名称-宽度 */
            static PROPERTY_WIDTH_NAME: string;
            /** 获取-宽度 */
            get width(): string;
            /** 设置-宽度 */
            set width(value: string);
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
declare namespace initialfantasy {
    namespace bo {
        /** 业务对象日志 */
        class BOLogst extends ibas.BusinessObject<BOLogst> implements IBOLogst {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-类型 */
            static PROPERTY_BOCODE_NAME: string;
            /** 获取-类型 */
            get boCode(): string;
            /** 设置-类型 */
            set boCode(value: string);
            /** 映射的属性名称-主键值 */
            static PROPERTY_BOKEYS_NAME: string;
            /** 获取-主键值 */
            get boKeys(): string;
            /** 设置-主键值 */
            set boKeys(value: string);
            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号 */
            get logInst(): number;
            /** 设置-实例号 */
            set logInst(value: number);
            /** 映射的属性名称-修改用户 */
            static PROPERTY_MODIFYUSER_NAME: string;
            /** 获取-修改用户 */
            get modifyUser(): number;
            /** 设置-修改用户 */
            set modifyUser(value: number);
            /** 映射的属性名称-修改日期 */
            static PROPERTY_MODIFYDATE_NAME: string;
            /** 获取-修改日期 */
            get modifyDate(): Date;
            /** 设置-修改日期 */
            set modifyDate(value: Date);
            /** 映射的属性名称-修改时间 */
            static PROPERTY_MODIFYTIME_NAME: string;
            /** 获取-修改时间 */
            get modifyTime(): number;
            /** 设置-修改时间 */
            set modifyTime(value: number);
            /** 映射的属性名称-事务标识 */
            static PROPERTY_TRANSATIONID_NAME: string;
            /** 获取-事务标识 */
            get transationId(): string;
            /** 设置-事务标识 */
            set transationId(value: string);
            /** 映射的属性名称-动机 */
            static PROPERTY_CAUSE_NAME: string;
            /** 获取-动机 */
            get cause(): string;
            /** 设置-动机 */
            set cause(value: string);
            /** 映射的属性名称-内容 */
            static PROPERTY_CONTENT_NAME: string;
            /** 获取-内容 */
            get content(): string | object;
            /** 设置-内容 */
            set content(value: string | object);
            /** 初始化数据 */
            protected init(): void;
            criteria(): ibas.ICriteria;
            toString(): string;
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
declare namespace initialfantasy {
    namespace bo {
        /** 重组功能 */
        class Refunction extends ibas.BOSimple<Refunction> implements IRefunction {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            get name(): string;
            /** 设置-名称 */
            set name(value: string);
            /** 映射的属性名称-指派类型 */
            static PROPERTY_ASSIGNEDTYPE_NAME: string;
            /** 获取-指派类型 */
            get assignedType(): emAssignedType;
            /** 设置-指派类型 */
            set assignedType(value: emAssignedType);
            /** 映射的属性名称-指派目标 */
            static PROPERTY_ASSIGNED_NAME: string;
            /** 获取-指派目标 */
            get assigned(): string;
            /** 设置-指派目标 */
            set assigned(value: string);
            /** 映射的属性名称-激活的 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活的 */
            get activated(): ibas.emYesNo;
            /** 设置-激活的 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            get validDate(): Date;
            /** 设置-生效日期 */
            set validDate(value: Date);
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            get invalidDate(): Date;
            /** 设置-失效日期 */
            set invalidDate(value: Date);
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
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
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
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-重组功能-项目集合 */
            static PROPERTY_REFUNCTIONITEMS_NAME: string;
            /** 获取-重组功能-项目集合 */
            get refunctionItems(): RefunctionItems;
            /** 设置-重组功能-项目集合 */
            set refunctionItems(value: RefunctionItems);
            /** 初始化数据 */
            protected init(): void;
        }
        /** 重组功能-项目 集合 */
        class RefunctionItems extends ibas.BusinessObjects<RefunctionItem, Refunction | RefunctionItem> implements IRefunctionItems {
            /** 创建并添加子项 */
            create(): RefunctionItem;
            protected afterAdd(item: RefunctionItem): void;
        }
        /** 重组功能-项目 */
        class RefunctionItem extends ibas.BOSimpleLine<RefunctionItem> implements IRefunctionItem {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-编号 */
            get objectKey(): number;
            /** 设置-编号 */
            set objectKey(value: number);
            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-类型 */
            get objectCode(): string;
            /** 设置-类型 */
            set objectCode(value: string);
            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string;
            /** 获取-行号 */
            get lineId(): number;
            /** 设置-行号 */
            set lineId(value: number);
            /** 映射的属性名称-显示顺序 */
            static PROPERTY_VISORDER_NAME: string;
            /** 获取-显示顺序 */
            get visOrder(): number;
            /** 设置-显示顺序 */
            set visOrder(value: number);
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            get logInst(): number;
            /** 设置-实例号（版本） */
            set logInst(value: number);
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
            /** 映射的属性名称-父项 */
            static PROPERTY_PARENT_NAME: string;
            /** 获取-父项 */
            get parent(): number;
            /** 设置-父项 */
            set parent(value: number);
            /** 映射的属性名称-功能 */
            static PROPERTY_FUNCTION_NAME: string;
            /** 获取-功能 */
            get function(): string;
            /** 设置-功能 */
            set function(value: string);
            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string;
            /** 获取-描述 */
            get description(): string;
            /** 设置-描述 */
            set description(value: string);
            /** 映射的属性名称-图片 */
            static PROPERTY_IMAGE_NAME: string;
            /** 获取-图片 */
            get image(): string;
            /** 设置-图片 */
            set image(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-重组功能-项目集合 */
            static PROPERTY_REFUNCTIONITEMS_NAME: string;
            /** 获取-重组功能-项目集合 */
            get refunctionItems(): RefunctionItems;
            /** 设置-重组功能-项目集合 */
            set refunctionItems(value: RefunctionItems);
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
declare namespace initialfantasy {
    namespace bo {
        /** 数据转换者 */
        class DataConverter extends ibas.DataConverter4j {
            /** 创建业务对象转换者 */
            protected createConverter(): ibas.BOConverter;
        }
        /** 模块业务对象工厂 */
        const boFactory: ibas.BOFactory;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace initialfantasy {
    namespace bo {
        /** <%Domain.Name%> 业务仓库 */
        class BORepositoryInitialFantasy extends ibas.BORepositoryApplication implements IBORepositoryInitialFantasy {
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter;
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
             * 查询 应用程序配置
             * @param fetcher 查询者
             */
            fetchApplicationConfig(fetcher: ibas.IFetchCaller<bo.ApplicationConfig>): void;
            /**
             * 保存 应用程序配置
             * @param saver 保存者
             */
            saveApplicationConfig(saver: ibas.ISaveCaller<bo.ApplicationConfig>): void;
            /**
             * 查询 应用程序元素
             * @param fetcher 查询者
             */
            fetchApplicationElement(fetcher: ibas.IFetchCaller<bo.ApplicationElement>): void;
            /**
             * 保存 应用程序元素
             * @param saver 保存者
             */
            saveApplicationElement(saver: ibas.ISaveCaller<bo.ApplicationElement>): void;
            /**
             * 查询 应用程序模块
             * @param fetcher 查询者
             */
            fetchApplicationModule(fetcher: ibas.IFetchCaller<bo.ApplicationModule>): void;
            /**
             * 保存 应用程序模块
             * @param saver 保存者
             */
            saveApplicationModule(saver: ibas.ISaveCaller<bo.ApplicationModule>): void;
            /**
             * 查询 应用程序平台
             * @param fetcher 查询者
             */
            fetchApplicationPlatform(fetcher: ibas.IFetchCaller<bo.ApplicationPlatform>): void;
            /**
             * 保存 应用程序平台
             * @param saver 保存者
             */
            saveApplicationPlatform(saver: ibas.ISaveCaller<bo.ApplicationPlatform>): void;
            /**
             * 查询 业务对象检索条件
             * @param fetcher 查询者
             */
            fetchBOCriteria(fetcher: ibas.IFetchCaller<bo.BOCriteria>): void;
            /**
             * 保存 业务对象检索条件
             * @param saver 保存者
             */
            saveBOCriteria(saver: ibas.ISaveCaller<bo.BOCriteria>): void;
            /**
             * 查询 业务对象筛选
             * @param fetcher 查询者
             */
            fetchBOFiltering(fetcher: ibas.IFetchCaller<bo.BOFiltering>): void;
            /**
             * 保存 业务对象筛选
             * @param saver 保存者
             */
            saveBOFiltering(saver: ibas.ISaveCaller<bo.BOFiltering>): void;
            /**
             * 查询 组织
             * @param fetcher 查询者
             */
            fetchOrganization(fetcher: ibas.IFetchCaller<bo.Organization>): void;
            /**
             * 保存 组织
             * @param saver 保存者
             */
            saveOrganization(saver: ibas.ISaveCaller<bo.Organization>): void;
            /**
             * 查询 角色
             * @param fetcher 查询者
             */
            fetchRole(fetcher: ibas.IFetchCaller<IRole>): void;
            /**
             * 查询 系统权限
             * @param fetcher 查询者
             */
            fetchPrivilege(fetcher: ibas.IFetchCaller<bo.Privilege>): void;
            /**
             * 保存 系统权限
             * @param saver 保存者
             */
            savePrivilege(saver: ibas.ISaveCaller<bo.Privilege>): void;
            /**
             * 查询 用户
             * @param fetcher 查询者
             */
            fetchUser(fetcher: ibas.IFetchCaller<bo.User>): void;
            /**
             * 保存 用户
             * @param saver 保存者
             */
            saveUser(saver: ibas.ISaveCaller<bo.User>): void;
            /**
             * 查询 业务对象信息
             * @param fetcher 查询者
             */
            fetchBOInformation(fetcher: ibas.IFetchCaller<bo.BOInformation>): void;
            /**
             * 保存 业务对象信息
             * @param saver 保存者
             */
            saveBOInformation(saver: ibas.ISaveCaller<bo.BOInformation>): void;
            /**
             * 查询 业务对象编号方式
             * @param fetcher 查询者
             */
            fetchBONumbering(fetcher: ibas.IFetchCaller<bo.BONumbering>): void;
            /**
             * 查询 业务对象序列编号方式
             * @param fetcher 查询者
             */
            fetchBOSeriesNumbering(fetcher: ibas.IFetchCaller<bo.BOSeriesNumbering>): void;
            /**
             * 保存 业务对象序列编号方式
             * @param saver 保存者
             */
            saveBOSeriesNumbering(saver: ibas.ISaveCaller<bo.BOSeriesNumbering>): void;
            /**
             * 查询 身份
             * @param fetcher 查询者
             */
            fetchIdentity(fetcher: ibas.IFetchCaller<bo.Identity>): void;
            /**
             * 保存 身份
             * @param saver 保存者
             */
            saveIdentity(saver: ibas.ISaveCaller<bo.Identity>): void;
            /**
             * 查询 用户身份
             * @param fetcher 查询者
             */
            fetchUserIdentity(fetcher: ibas.IFetchCaller<bo.UserIdentity>): void;
            /**
             * 保存 用户身份
             * @param saver 保存者
             */
            saveUserIdentity(saver: ibas.ISaveCaller<bo.UserIdentity>): void;
            /**
             * 查询 身份权限
             * @param fetcher 查询者
             */
            fetchIdentityPrivilege(fetcher: ibas.IFetchCaller<bo.IdentityPrivilege>): void;
            /**
             * 保存 身份权限
             * @param saver 保存者
             */
            saveIdentityPrivilege(saver: ibas.ISaveCaller<bo.IdentityPrivilege>): void;
            /**
             * 查询 业务对象属性设置
             * @param fetcher 查询者
             */
            fetchBOPropertySetting(fetcher: ibas.IFetchCaller<bo.BOPropertySetting>): void;
            /**
             * 保存 业务对象属性设置
             * @param saver 保存者
             */
            saveBOPropertySetting(saver: ibas.ISaveCaller<bo.BOPropertySetting>): void;
            /**
             * 查询 应用程序配置-身份
             * @param fetcher 查询者
             */
            fetchApplicationConfigIdentity(fetcher: ibas.IFetchCaller<bo.ApplicationConfigIdentity>): void;
            /**
             * 保存 应用程序配置-身份
             * @param saver 保存者
             */
            saveApplicationConfigIdentity(saver: ibas.ISaveCaller<bo.ApplicationConfigIdentity>): void;
            /**
             * 查询 业务对象日志
             * @param fetcher 查询者
             */
            fetchBOLogst(fetcher: ibas.IFetchCaller<bo.BOLogst>): void;
            /**
             * 查询 业务对象关系
             * @param fetcher 查询者
             */
            fetchBORelationship(fetcher: ibas.IFetchCaller<bo.BORelationship>): void;
            /**
             * 查询 重组功能
             * @param fetcher 查询者
             */
            fetchRefunction(fetcher: ibas.IFetchCaller<bo.Refunction>): void;
            /**
             * 保存 重组功能
             * @param saver 保存者
             */
            saveRefunction(saver: ibas.ISaveCaller<bo.Refunction>): void;
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
declare namespace initialfantasy {
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
declare namespace initialfantasy {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-应用程序配置 */
        class ApplicationConfigListApp extends ibas.Application<IApplicationConfigListView> {
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
            private configGroups;
            private editConfigItem;
            private changeConfigGroup;
            private fetchIdentityConfig;
            private copyConfigValues;
            private doCopyConfigValues;
            private save;
            private viewUserConfigs;
        }
        class ConfigGroup {
            constructor();
            constructor(code: string, name: string, icon?: string);
            code: string;
            name: string;
            icon: string;
        }
        abstract class ConfigItem extends ibas.Bindable {
            abstract readonly group: string;
            abstract readonly key: string;
            abstract readonly description: string;
            abstract readonly settings: string;
            abstract readonly category: bo.emConfigCategory;
            abstract value: string;
        }
        class ConfigItemOrigin extends ConfigItem {
            constructor(data: bo.IApplicationConfig);
            get data(): bo.IApplicationConfig;
            get group(): string;
            get key(): string;
            get description(): string;
            get category(): bo.emConfigCategory;
            get settings(): string;
            get value(): string;
            set value(value: string);
        }
        class ConfigItemIdentity extends ConfigItem {
            constructor(data: bo.IApplicationConfig, extra: bo.IApplicationConfigIdentity);
            get data(): bo.IApplicationConfig;
            get extra(): bo.IApplicationConfigIdentity;
            get group(): string;
            get key(): string;
            get description(): string;
            get category(): bo.emConfigCategory;
            get settings(): string;
            get roleCode(): string;
            set roleCode(value: string);
            get identityCode(): string;
            set identityCode(value: string);
            get value(): string;
            set value(value: string);
        }
        /** 视图-应用程序配置 */
        interface IApplicationConfigListView extends ibas.IView {
            /** 显示配置组 */
            showConfigGroups(datas: ConfigGroup[]): void;
            /** 改变配置组 */
            changeConfigGroupEvent: Function;
            /** 改变角色身份：参数1，角色；参数2，身份 */
            changeRoleIdentityEvent: Function;
            /** 显示配置值 */
            showConfigValues(values: ConfigItem[]): void;
            /** 保存 */
            saveEvent: Function;
            /** 编辑配置项目 */
            editConfigItemEvent: Function;
            /** 赋值配置项目值 */
            copyConfigValuesEvent: Function;
            /** 身份 */
            identity: string;
            /** 角色 */
            role: string;
            /** 预览用户配置项目值 */
            viewUserConfigsEvent: Function;
            /** 显示用户配置值 */
            showUserConfigs(values: shell.bo.IUserConfig[], user: bo.IUser): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 编辑应用-应用程序配置 */
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
        }
        /** 视图-应用程序配置 */
        interface IApplicationConfigEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showApplicationConfig(data: bo.ApplicationConfig): void;
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
declare namespace initialfantasy {
    namespace app {
        class ApplicationElementFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-应用程序元素 */
        class ApplicationElementListApp extends ibas.BOListApplication<IApplicationElementListView, bo.ApplicationElement> {
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
            protected viewData(data: bo.ApplicationElement): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.ApplicationElement): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.ApplicationElement | bo.ApplicationElement[]): void;
            private registerElements;
            /** 应用程序平台 */
            private applicationPlatform;
            /** 应用程序平台 */
            private applicationModule;
        }
        /** 视图-应用程序元素 */
        interface IApplicationElementListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 应用程序平台 */
            applicationPlatformEvent: Function;
            /** 应用程序模块 */
            applicationModuleEvent: Function;
            /** 显示数据 */
            showData(datas: bo.ApplicationElement[]): void;
            /** 注册元素 */
            registerElementsEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        /** 选择应用-应用程序元素 */
        class ApplicationElementChooseApp extends ibas.BOChooseService<IApplicationElementChooseView, bo.ApplicationElement> {
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
        /** 视图-应用程序元素 */
        interface IApplicationElementChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.ApplicationElement[]): void;
        }
        /** 应用程序元素选择服务映射 */
        class ApplicationElementChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.ApplicationElement>;
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
declare namespace initialfantasy {
    namespace app {
        /** 编辑应用-应用程序元素 */
        class ApplicationElementEditApp extends ibas.BOEditApplication<IApplicationElementEditView, bo.ApplicationElement> {
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
            run(data: bo.ApplicationElement): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
        }
        /** 视图-应用程序元素 */
        interface IApplicationElementEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showApplicationElement(data: bo.ApplicationElement): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-应用程序模块 */
        class ApplicationModuleChooseApp extends ibas.BOChooseService<IApplicationModuleChooseView, bo.ApplicationModule> {
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
        /** 视图-应用程序模块 */
        interface IApplicationModuleChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.ApplicationModule[]): void;
        }
        /** 应用程序模块选择服务映射 */
        class ApplicationModuleChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.ApplicationModule>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-应用程序模块 */
        class ApplicationModuleEditApp extends ibas.BOEditApplication<IApplicationModuleEditView, bo.ApplicationModule> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.ApplicationModule): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
        }
        /** 视图-应用程序模块 */
        interface IApplicationModuleEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showApplicationModule(data: bo.ApplicationModule): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        class ApplicationModuleFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-应用程序模块 */
        class ApplicationModuleListApp extends ibas.BOListApplication<IApplicationModuleListView, bo.ApplicationModule> {
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
            protected viewData(data: bo.ApplicationModule): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.ApplicationModule): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.ApplicationModule | bo.ApplicationModule[]): void;
        }
        /** 视图-应用程序模块 */
        interface IApplicationModuleListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.ApplicationModule[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-应用程序平台 */
        class ApplicationPlatformChooseApp extends ibas.BOChooseService<IApplicationPlatformChooseView, bo.ApplicationPlatform> {
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
        /** 视图-应用程序平台 */
        interface IApplicationPlatformChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.ApplicationPlatform[]): void;
        }
        /** 应用程序平台选择服务映射 */
        class ApplicationPlatformChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.ApplicationPlatform>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-应用程序平台 */
        class ApplicationPlatformEditApp extends ibas.BOEditApplication<IApplicationPlatformEditView, bo.ApplicationPlatform> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.ApplicationPlatform): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
        }
        /** 视图-应用程序平台 */
        interface IApplicationPlatformEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showApplicationPlatform(data: bo.ApplicationPlatform): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        class ApplicationPlatformFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-应用程序平台 */
        class ApplicationPlatformListApp extends ibas.BOListApplication<IApplicationPlatformListView, bo.ApplicationPlatform> {
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
            protected viewData(data: bo.ApplicationPlatform): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.ApplicationPlatform): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.ApplicationPlatform | bo.ApplicationPlatform[]): void;
        }
        /** 视图-应用程序平台 */
        interface IApplicationPlatformListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.ApplicationPlatform[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象检索条件 */
        class BOCriteriaChooseApp extends ibas.BOChooseService<IBOCriteriaChooseView, bo.BOCriteria> {
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
        /** 视图-业务对象检索条件 */
        interface IBOCriteriaChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.BOCriteria[]): void;
        }
        /** 业务对象检索条件选择服务映射 */
        class BOCriteriaChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.BOCriteria>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象检索条件 */
        class BOCriteriaEditApp extends ibas.BOEditApplication<IBOCriteriaEditView, bo.BOCriteria> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.BOCriteria): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 选择业务对象编码 */
            private chooseBusinessObject;
            /** 选择用户或角色 */
            private chooseRoleUser;
            /** 编辑查询 */
            private editCriteria;
        }
        /** 视图-业务对象检索条件 */
        interface IBOCriteriaEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showBOCriteria(data: bo.BOCriteria): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择查询目标 */
            chooseBusinessObjectEvent: Function;
            /** 选择用户或角色 */
            chooseRoleUserEvent: Function;
            /** 编辑查询 */
            editCriteriaEvent: Function;
            /** 编辑目标名称 */
            target: string;
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
declare namespace initialfantasy {
    namespace app {
        class BOCriteriaFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-业务对象检索条件 */
        class BOCriteriaListApp extends ibas.BOListApplication<IBOCriteriaListView, bo.BOCriteria> {
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
            protected viewData(data: bo.BOCriteria): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BOCriteria): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.BOCriteria | bo.BOCriteria[]): void;
        }
        /** 视图-业务对象检索条件 */
        interface IBOCriteriaListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BOCriteria[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象筛选 */
        class BOFilteringChooseApp extends ibas.BOChooseService<IBOFilteringChooseView, bo.BOFiltering> {
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
        /** 视图-业务对象筛选 */
        interface IBOFilteringChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.BOFiltering[]): void;
        }
        /** 业务对象筛选选择服务映射 */
        class BOFilteringChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.BOFiltering>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象筛选 */
        class BOFilteringEditApp extends ibas.BOEditApplication<IBOFilteringEditView, bo.BOFiltering> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.BOFiltering): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 添加业务对象筛选-条件事件 */
            addBOFilteringCondition(): void;
            /** 删除业务对象筛选-条件事件 */
            removeBOFilteringCondition(items: bo.BOFilteringCondition[]): void;
            /** 选择角色标识 */
            private chooseRole;
            /** 选择业务对象标识 */
            private chooseBusinessObject;
        }
        /** 视图-业务对象筛选 */
        interface IBOFilteringEditView extends ibas.IBOEditView {
            /** 选择角色事件 */
            chooseRoleEvent: Function;
            /** 选择业务对象事件 */
            chooseBusinessObjectEvent: Function;
            /** 显示数据 */
            showBOFiltering(data: bo.BOFiltering): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加业务对象筛选-条件事件 */
            addBOFilteringConditionEvent: Function;
            /** 删除业务对象筛选-条件事件 */
            removeBOFilteringConditionEvent: Function;
            /** 显示数据 */
            showBOFilteringConditions(datas: bo.BOFilteringCondition[]): void;
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
declare namespace initialfantasy {
    namespace app {
        class BOFilteringFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-业务对象筛选 */
        class BOFilteringListApp extends ibas.BOListApplication<IBOFilteringListView, bo.BOFiltering> {
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
            protected viewData(data: bo.BOFiltering): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BOFiltering): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.BOFiltering | bo.BOFiltering[]): void;
        }
        /** 视图-业务对象筛选 */
        interface IBOFilteringListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BOFiltering[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象信息 */
        class BOInformationChooseApp extends ibas.BOChooseService<IBOInformationChooseView, bo.BOInformation> {
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
        /** 视图-业务对象信息 */
        interface IBOInformationChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.BOInformation[]): void;
        }
        /** 业务对象信息选择服务映射 */
        class BOInformationChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.BOInformation>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象信息 */
        class BOInformationEditApp extends ibas.BOEditApplication<IBOInformationEditView, bo.BOInformation> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.BOInformation): void;
            run(data: ibas.ICriteria): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 添加业务对象属性信息事件 */
            addBOPropertyInformation(): void;
            /** 删除业务对象属性信息事件 */
            removeBOPropertyInformation(items: bo.BOPropertyInformation[]): void;
            private editBOPropertyInformationData;
            /** 编辑属性值事件 */
            editBOPropertyInformation(item: bo.BOPropertyInformation): void;
            /** 添加属性值事件 */
            addBOPropertyValue(): void;
            /** 删除属性值事件 */
            removeBOPropertyValue(items: bo.BOPropertyValue[]): void;
            private boNumbering;
            private chooseLinkedObject;
            private showBORelationship;
            protected editBOInformation(data: bo.BOPropertyInformation): void;
        }
        /** 视图-业务对象信息 */
        interface IBOInformationEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showBOInformation(data: bo.BOInformation): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加业务对象属性信息事件 */
            addBOPropertyInformationEvent: Function;
            /** 删除业务对象属性信息事件 */
            removeBOPropertyInformationEvent: Function;
            /** 显示数据 */
            showBOPropertyInformations(datas: bo.BOPropertyInformation[]): void;
            /** 编辑业务对象属性信息 */
            editBOPropertyInformationEvent: Function;
            /** 添加业务对象属性值事件 */
            addBOPropertyValueEvent: Function;
            /** 删除业务对象属性值事件 */
            removeBOPropertyValueEvent: Function;
            /** 显示数据 */
            showBOPropertyValues(datas: bo.BOPropertyValue[]): void;
            /** 业务对象编号 */
            boNumberingEvent: Function;
            /** 选择链接的对象事件 */
            chooseLinkedObjectEvent: Function;
            /** 显示对象关系事件 */
            showBORelationshipEvent: Function;
            /** 显示对象关系 */
            showBORelationships(datas: bo.BORelationship[]): void;
            /** 编辑业务对象信息 */
            editBOInformationEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        class BOInformationFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-业务对象信息 */
        class BOInformationListApp extends ibas.BOListApplication<IBOInformationListView, bo.BOInformation> {
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
            protected viewData(data: bo.BOInformation): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BOInformation): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.BOInformation | bo.BOInformation[]): void;
            private boNumbering;
        }
        /** 视图-业务对象信息 */
        interface IBOInformationListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 业务对象编号 */
            boNumberingEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BOInformation[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象信息 */
        class BOPropertyChooseApp extends ibas.BOChooseService<IBOPropertyChooseView, bo.IBOPropertyInformation> {
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
        /** 视图-业务对象信息 */
        interface IBOPropertyChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.IBOPropertyInformation[]): void;
        }
        /** 业务对象信息选择服务映射 */
        class BOPropertyChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.IBOPropertyInformation>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-业务对象信息 */
        class BOPropertyValueChooseApp extends ibas.BOChooseService<IBOPropertyValueChooseView, bo.IBOPropertyValue> {
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
        /** 视图-业务对象信息 */
        interface IBOPropertyValueChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.IBOPropertyValue[]): void;
        }
        /** 业务对象信息选择服务映射 */
        class BOPropertyValueChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.IBOPropertyValue>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 编辑应用-业务对象编号方式 */
        class BONumberingEditApp extends ibas.Application<IBONumberingEditView> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.BONumbering): void;
            run(boCode: string): void;
            /** 待编辑的数据 */
            protected editData: bo.BONumbering;
            /** 保存数据 */
            protected saveBOSeriesNumbering(data: bo.BOSeriesNumbering | bo.BOSeriesNumbering[]): void;
            /** 查询数据 */
            protected fetchBOSeriesNumbering(): void;
        }
        /** 视图-业务对象编号方式 */
        interface IBONumberingEditView extends ibas.IBOView {
            /** 显示数据 */
            showBONumbering(data: bo.BONumbering): void;
            /** 保存系列编号方式 */
            saveBOSeriesNumberingEvent: Function;
            /** 显示数据 */
            showBOSeriesNumbering(datas: bo.BOSeriesNumbering[]): void;
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
declare namespace initialfantasy {
    namespace app {
        class BONumberingFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-业务对象编号方式 */
        class BONumberingListApp extends ibas.Application<IBONumberingListView> {
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
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BONumbering): void;
        }
        /** 视图-业务对象编号方式 */
        interface IBONumberingListView extends ibas.IBOQueryView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BONumbering[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-组织 */
        class OrganizationChooseApp extends ibas.BOChooseService<IOrganizationChooseView, bo.Organization> {
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
        /** 视图-组织 */
        interface IOrganizationChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Organization[]): void;
        }
        /** 组织选择服务映射 */
        class OrganizationChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Organization>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-组织 */
        class OrganizationEditApp extends ibas.BOEditApplication<IOrganizationEditView, bo.Organization> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Organization): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseParent;
        }
        /** 视图-组织 */
        interface IOrganizationEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showOrganization(data: bo.Organization): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择父项资源事件 */
            chooseParentEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        class OrganizationFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-组织 */
        class OrganizationListApp extends ibas.BOListApplication<IOrganizationListView, bo.Organization> {
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
            protected viewData(data: bo.Organization): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Organization): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Organization | bo.Organization[]): void;
        }
        /** 视图-组织 */
        interface IOrganizationListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Organization[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 查看应用-组织 */
        class OrganizationViewApp extends ibas.BOViewService<IOrganizationViewView, bo.Organization> {
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
            /** 编辑数据，参数：目标数据 */
            protected editData(): void;
            run(): void;
            run(data: bo.Organization): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void;
        }
        /** 视图-组织 */
        interface IOrganizationViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showOrganization(data: bo.Organization): void;
            /** 显示数据子项 */
            showChildOrganizations(datas: bo.Organization[]): void;
        }
        /** 组织连接服务映射 */
        class OrganizationLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOLinkService;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-系统权限 */
        class PrivilegeChooseApp extends ibas.BOChooseService<IPrivilegeChooseView, bo.Privilege> {
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
        /** 视图-系统权限 */
        interface IPrivilegeChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Privilege[]): void;
        }
        /** 系统权限选择服务映射 */
        class PrivilegeChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Privilege>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-系统权限 */
        class PrivilegeEditApp extends ibas.BOEditApplication<IPrivilegeEditView, bo.Privilege> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Privilege): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 选择角色标识 */
            private chooseRole;
            /** 选择平台标识 */
            private choosePlatform;
            /** 选择模块标识 */
            private chooseModule;
            /** 选择目标标识 */
            private chooseTarget;
        }
        /** 视图-系统权限 */
        interface IPrivilegeEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showPrivilege(data: bo.Privilege): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择角色标识 */
            chooseRoleEvent: Function;
            /** 选择平台标识 */
            choosePlatformEvent: Function;
            /** 选择模块标识 */
            chooseModuleEvent: Function;
            /** 选择目标标识 */
            chooseTargetEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        class PrivilegeFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-系统权限 */
        class PrivilegeListApp extends ibas.BOListApplication<IPrivilegeListView, bo.Privilege> {
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
            protected viewData(data: bo.Privilege): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Privilege): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Privilege | bo.Privilege[]): void;
        }
        /** 视图-系统权限 */
        interface IPrivilegeListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Privilege[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-系统权限配置 */
        class PrivilegeConfigApp extends ibas.Application<IPrivilegeConfigView> {
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
            /** 查询数据 */
            private fetchRoles;
            private privileges;
            /** 查询数据 */
            private fetchPrivileges;
            /** 保存数据 */
            private savePrivileges;
            /** 复制权限  */
            private copyPrivileges;
            /** 删除权限 */
            private deletePrivileges;
            /** 编辑身份权限 */
            private editIdentityPrivileges;
            private editRefunctions;
        }
        /** 视图-系统权限 */
        interface IPrivilegeConfigView extends ibas.IView {
            /** 查询角色 */
            fetchRolesEvent: Function;
            /** 查询权限  */
            fetchPrivilegesEvent: Function;
            /** 保存权限 */
            savePrivilegesEvent: Function;
            /** 删除权限 */
            deletePrivilegesEvent: Function;
            /** 复制权限  */
            copyPrivilegesEvent: Function;
            /** 显示角色 */
            showRoles(datas: bo.IRole[]): void;
            /** 显示权限 */
            showPrivileges(datas: Privilege[]): void;
            /** 显示平台 */
            showPlatforms(datas: bo.ApplicationPlatform[]): void;
            /** 编辑身份权限  */
            editIdentityPrivilegesEvent: Function;
            /** 编辑重组功能 */
            editRefunctionsEvent: Function;
        }
        /** 系统权限 */
        class Privilege extends ibas.Bindable {
            constructor(data: bo.Privilege, type: bo.emElementType);
            registerListener(listener: ibas.IPropertyChangedListener): void;
            removeListener(listener: ibas.IPropertyChangedListener): void;
            removeListener(id: string): void;
            removeListener(): void;
            data: bo.Privilege;
            type: bo.emElementType;
            get isDirty(): boolean;
            get roleCode(): string;
            set roleCode(value: string);
            get platformId(): string;
            set platformId(value: string);
            get moduleId(): string;
            set moduleId(value: string);
            get target(): string;
            set target(value: string);
            get activated(): ibas.emYesNo;
            set activated(value: ibas.emYesNo);
            get authoriseValue(): ibas.emAuthoriseType;
            set authoriseValue(value: ibas.emAuthoriseType);
            get automatic(): ibas.emYesNo;
            set automatic(value: ibas.emYesNo);
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-身份权限配置 */
        class IdentityPrivilegeConfigApp extends ibas.ServiceApplication<IIdentityPrivilegeConfigView, IIdentityPrivilegeConfigContract> {
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
            /** 运行服务 */
            protected runService(contract: IIdentityPrivilegeConfigContract): void;
            show(): void;
            /** 查询数据 */
            protected fetchIdentities(criteria: ibas.ICriteria): void;
            private oRole;
            private oPlatform;
            private oPrivileges;
            private oIdentityPrivileges;
            /** 查询数据 */
            private fetchIdentityPrivileges;
            /** 保存数据 */
            private saveIdentityPrivileges;
            /** 复制身份权限  */
            private copyIdentityPrivileges;
            /** 删除权限 */
            private deleteIdentityPrivileges;
        }
        /** 视图-身份权限 */
        interface IIdentityPrivilegeConfigView extends ibas.IView {
            /** 显示平台 */
            showPlatform(data: bo.IApplicationPlatform): void;
            /** 显示角色 */
            showRole(data: bo.IRole): void;
            /** 查询身份  */
            fetchIdentitiesEvent: Function;
            /** 显示身份 */
            showIdentities(datas: bo.IIdentity[]): void;
            /** 查询身份权限  */
            fetchIdentityPrivilegesEvent: Function;
            /** 显示身份权限 */
            showIdentityPrivileges(datas: IdentityPrivilege[]): void;
            /** 保存身份权限 */
            saveIdentityPrivilegesEvent: Function;
            /** 删除身份权限 */
            deleteIdentityPrivilegesEvent: Function;
            /** 复制身份权限  */
            copyIdentityPrivilegesEvent: Function;
        }
        /** 身份权限 */
        class IdentityPrivilege extends ibas.Bindable {
            constructor(data: bo.IdentityPrivilege, type: bo.emElementType);
            registerListener(listener: ibas.IPropertyChangedListener): void;
            removeListener(listener: ibas.IPropertyChangedListener): void;
            removeListener(id: string): void;
            removeListener(): void;
            data: bo.IdentityPrivilege;
            type: bo.emElementType;
            original: ibas.emAuthoriseType;
            get isDirty(): boolean;
            get roleCode(): string;
            set roleCode(value: string);
            get platformId(): string;
            set platformId(value: string);
            get identityCode(): string;
            set identityCode(value: string);
            get moduleId(): string;
            set moduleId(value: string);
            get target(): string;
            set target(value: string);
            get activated(): ibas.emYesNo;
            set activated(value: ibas.emYesNo);
            get authoriseValue(): ibas.emAuthoriseType;
            set authoriseValue(value: ibas.emAuthoriseType);
            get automatic(): ibas.emYesNo;
            set automatic(value: ibas.emYesNo);
        }
        /** 身份权限服务映射 */
        class IdentityPrivilegeConfigServiceMapping extends ibas.ServiceMapping {
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
declare namespace initialfantasy {
    namespace app {
        class ModuleProxy extends ibas.Element {
            constructor();
            version: string;
            copyright: string;
            icon: string;
            elements: FunctionProxy[];
        }
        class FunctionProxy extends ibas.Element implements ibas.IFunction {
            constructor();
            assigned: boolean;
        }
        /** 编辑应用-重组功能 */
        class RefunctionEditApp extends ibas.Application<IRefunctionEditView> {
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
            run(data?: bo.Refunction, modules?: app.ModuleProxy[]): void;
            protected editData: bo.Refunction;
            protected modules: ibas.ArrayList<app.ModuleProxy>;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 添加重组功能-项目事件 */
            protected addRefunctionItem(target?: ModuleProxy | FunctionProxy, parent?: bo.RefunctionItem): void;
            /** 删除重组功能-项目事件 */
            protected removeRefunctionItem(item: bo.RefunctionItem, parent?: bo.RefunctionItems): void;
            /** 关闭视图 */
            close(): void;
        }
        /** 视图-重组功能 */
        interface IRefunctionEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showRefunction(data: bo.Refunction): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加重组功能-项目事件 */
            addRefunctionItemEvent: Function;
            /** 删除重组功能-项目事件 */
            removeRefunctionItemEvent: Function;
            /** 显示数据-重组功能-项目 */
            showRefunctionItems(datas: bo.RefunctionItem[]): void;
            /** 显示数据-模块功能 */
            showFunctions(datas: app.ModuleProxy[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-系统配置 */
        class ConfigChooseApp extends ibas.BOChooseService<IConfigChooseView, ibas.KeyValue> {
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
        /** 视图-系统权限 */
        interface IConfigChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: ibas.KeyValue[]): void;
        }
        /** 系统权限选择服务映射 */
        class ConfigChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<ibas.KeyValue>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 查询编辑服务 */
        class CriteriaEditorService extends ibas.ServiceWithResultApplication<ICriteriaEditorView, ibas.ICriteriaEditorServiceContract, ibas.ICriteria> {
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
            /** 运行服务 */
            protected runService(contract: ibas.ICriteriaEditorServiceContract): void;
            private editData;
            /** 可用的条件字段 */
            private aliases;
            private addCondition;
            private removeCondition;
            private confirm;
        }
        /** 视图-查询编辑服务 */
        interface ICriteriaEditorView extends ibas.IView {
            /** 显示目标 */
            showTarget(target: string, aliaes: ibas.KeyText[]): void;
            /** 显示查询条件 */
            showConditions(datas: ibas.ICondition[]): void;
            /** 添加查询条件 */
            addConditionEvent: Function;
            /** 移出查询 */
            removeConditionEvent: Function;
            /** 确定 */
            confirmEvent: Function;
        }
        /** 查询编辑服务映射 */
        class CriteriaEditorServiceMapping extends ibas.ServiceMapping {
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
declare namespace initialfantasy {
    namespace app {
        /** 角色选择服务（用组织实现） */
        class RoleChooseApp extends OrganizationChooseApp {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            protected fetchData(criteria: ibas.ICriteria): void;
        }
        /** 角色选择服务映射 */
        class RoleChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.IRole>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-系统变量 */
        class VariableChooseApp extends ibas.BOChooseService<IVariableChooseView, ibas.KeyValue> {
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
        /** 视图-系统权限 */
        interface IVariableChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: ibas.KeyValue[]): void;
        }
        /** 系统权限选择服务映射 */
        class VariableChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<ibas.KeyValue>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 单据流程服务 */
        export class DocumentProcessService extends ibas.ServiceApplication<IDocumentProcessServiceView, ibas.IBOServiceContract> {
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
            protected runService(contract: ibas.IBOServiceContract): void;
            protected documentRepository: DocumentRepository;
            protected originData: DocumentChain;
            protected chainData(origin: DocumentChain, onCompleted: () => void): void;
        }
        interface IFetchCallerEx extends ibas.IFetchCaller<ibas.IBODocument> {
            type: any;
        }
        interface IFetchSourceCaller extends ibas.IMethodCaller<ibas.IBODocument> {
            origin: DocumentChain;
            onCompleted(opRslt: ibas.IOperationResult<ibas.IBODocument>, childOrigin?: DocumentChain): void;
        }
        interface IFetchTargetCaller extends ibas.IMethodCaller<ibas.IBODocument> {
            origin: DocumentChain;
            onCompleted(opRslt: ibas.IOperationResult<ibas.IBODocument>, childOrigin?: DocumentChain): void;
        }
        class DocumentRepository {
            constructor();
            init(onCompleted: (error?: Error) => void): void;
            protected getRepository(boType: any): any;
            fetch(fetcher: IFetchCallerEx): void;
            protected boShipMap: ibas.IList<bo.IBORelationship>;
            fetchSources(fetcher: IFetchSourceCaller): void;
            fetchTargets(fetcher: IFetchTargetCaller): void;
            protected fetchDatas(criterias: ibas.ICriteria[], onCompleted: (opRslt: ibas.IOperationResult<ibas.IBODocument>, childOrigin?: DocumentChain) => void, origin: DocumentChain): void;
        }
        export class DocumentChain {
            constructor(data?: ibas.IBODocument);
            data: ibas.IBODocument;
            sources: ibas.IList<DocumentChain>;
            targets: ibas.IList<DocumentChain>;
        }
        /** 视图-单据流程 */
        export interface IDocumentProcessServiceView extends ibas.IView {
            /** 显示数据 */
            showDocumentChain(data: DocumentChain): void;
        }
        /** 单据流程服务映射 */
        export class DocumentProcessServiceMapping extends ibas.ServiceMapping {
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract>;
        }
        export {};
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-更改用户配置 */
        class ChangeUserProfileApp extends ibas.Application<IChangeUserProfileView> implements ibas.IService<ibas.IServiceCaller<ibas.IServiceContract>> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 运行 */
            run(user?: bo.User | string | number | ibas.IServiceCaller<ibas.IServiceContract>): void;
            private user;
            private fetchUser;
            private saveUser;
        }
        /** 视图-更改用户配置 */
        interface IChangeUserProfileView extends ibas.IView {
            /** 显示用户信息 */
            showUser(user: bo.User): void;
            /** 保存用户事件 */
            saveUserEvent: Function;
        }
        /** 用户选择服务映射 */
        class ChangeUserProfileMapping extends ibas.ServiceMapping {
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-用户 */
        class UserChooseApp extends ibas.BOChooseService<IUserChooseView, bo.User> {
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
        /** 视图-用户 */
        interface IUserChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.User[]): void;
        }
        /** 用户选择服务映射 */
        class UserChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.User>>;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-用户 */
        class UserEditApp extends ibas.BOEditApplication<IUserEditView, bo.User> {
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
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.User): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 选择组织标识 */
            private chooseOrganization;
            protected editUserIdentity(): void;
        }
        /** 视图-用户 */
        interface IUserEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showUser(data: bo.User): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择组织 */
            chooseOrganizationEvent: Function;
            /** 编辑用户身份 */
            editUserIdentityEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        class UserFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-用户 */
        class UserListApp extends ibas.BOListApplication<IUserListView, bo.User> {
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
            protected viewData(data: bo.User): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.User): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.User | bo.User[]): void;
            private userIdentity;
        }
        /** 视图-用户 */
        interface IUserListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.User[]): void;
            /** 用户身份事件 */
            userIdentityEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        /** 常驻应用-用户配置 */
        class UserProfileApp extends ibas.ResidentApplication<IUserProfileView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            private user;
            private fetchUser;
            private editUser;
            protected barShowed(): void;
        }
        /** 视图-用户配置 */
        interface IUserProfileView extends ibas.IResidentView {
            /** 显示用户信息 */
            showUser(user: bo.User): void;
            /** 编辑用户 */
            editUserEvent: Function;
        }
        class UserProfileApplicationMapping extends ibas.ResidentApplicationMapping {
            /** 构造函数 */
            constructor();
            create(): ibas.ResidentApplication<ibas.IResidentView>;
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
declare namespace initialfantasy {
    namespace app {
        /** 查看应用-用户 */
        class UserViewApp extends ibas.BOViewService<IUserViewView, bo.User> {
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
            /** 编辑数据，参数：目标数据 */
            protected editData(): void;
            run(): void;
            run(data: bo.User): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void;
        }
        /** 视图-用户 */
        interface IUserViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showUser(data: bo.User): void;
        }
        /** 用户连接服务映射 */
        class UserLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOLinkService;
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
declare namespace initialfantasy {
    namespace app {
        /** 应用-用户身份 */
        class UserIdentityApp extends ibas.Application<IUserIdentityView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            run(user?: bo.User): void;
            private user;
            private identities;
            protected removeUserIdentity(data: bo.UserIdentity | bo.UserIdentity[]): void;
            protected addUserIdentity(caller?: bo.UserIdentity): void;
            protected saveUserIdentity(beSaveds: bo.UserIdentity[]): void;
            /** 关闭视图 */
            close(): void;
        }
        /** 视图-物料替代 */
        interface IUserIdentityView extends ibas.IView {
            /** 保存数据事件 */
            saveIdentityEvent: Function;
            /** 添加数据事件 */
            addIdentityEvent: Function;
            /** 移除数据事件 */
            removeIdentityEvent: Function;
            /** 显示数据 */
            showIdentities(datas: bo.UserIdentity[]): void;
            /** 显示数据 */
            showUsers(data: bo.User): void;
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
declare namespace initialfantasy {
    namespace app {
        class IdentityFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-身份 */
        class IdentityListApp extends ibas.BOListApplication<IIdentityListView, bo.Identity> {
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
            protected viewData(data: bo.Identity): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Identity): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Identity | bo.Identity[]): void;
        }
        /** 视图-身份 */
        interface IIdentityListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Identity[]): void;
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
declare namespace initialfantasy {
    namespace app {
        /** 选择应用-身份 */
        class IdentityChooseApp extends ibas.BOChooseService<IIdentityChooseView, bo.Identity> {
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
        /** 视图-身份 */
        interface IIdentityChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Identity[]): void;
        }
        /** 身份选择服务映射 */
        class IdentityChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.Identity>;
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
declare namespace initialfantasy {
    namespace app {
        /** 编辑应用-身份 */
        class IdentityEditApp extends ibas.BOEditApplication<IIdentityEditView, bo.Identity> {
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
            run(data: bo.Identity): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
        }
        /** 视图-身份 */
        interface IIdentityEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showIdentity(data: bo.Identity): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        class UserIdentityFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-用户身份 */
        class UserIdentityListApp extends ibas.BOListApplication<IUserIdentityListView, bo.UserIdentity> {
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
            protected viewData(data: bo.UserIdentity): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.UserIdentity): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.UserIdentity | bo.UserIdentity[]): void;
            private identity;
        }
        /** 视图-用户身份 */
        interface IUserIdentityListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.UserIdentity[]): void;
            /** 身份事件 */
            identityEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        /** 选择应用-用户身份 */
        class UserIdentityChooseApp extends ibas.BOChooseService<IUserIdentityChooseView, bo.UserIdentity> {
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
        /** 视图-用户身份 */
        interface IUserIdentityChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.UserIdentity[]): void;
        }
        /** 用户身份选择服务映射 */
        class UserIdentityChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.UserIdentity>;
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
declare namespace initialfantasy {
    namespace app {
        /** 编辑应用-用户身份 */
        class UserIdentityEditApp extends ibas.BOEditApplication<IUserIdentityEditView, bo.UserIdentity> {
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
            run(data: bo.UserIdentity): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseUser;
            private chooseIdentity;
        }
        /** 视图-用户身份 */
        interface IUserIdentityEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showUserIdentity(data: bo.UserIdentity): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择用户事件 */
            chooseUserEvent: Function;
            /** 选择身份事件 */
            chooseIdentityEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-业务对象日志 */
        class BOLogstListApp extends ibas.BOListApplication<IBOLogstListView, bo.BOLogst> {
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
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.BOLogst): void;
        }
        /** 视图-业务对象日志 */
        interface IBOLogstListView extends ibas.IBOListView {
            /** 删除数据 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BOLogst[]): void;
            /** 查看数据 */
            viewDataEvent: Function;
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
declare namespace initialfantasy {
    namespace app {
        /** 查看应用-业务对象日志 */
        class BOLogstViewApp extends ibas.Application<IBOLogstViewView> {
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
            private datas;
            run(data?: bo.BOLogst | bo.BOLogst[]): void;
            onViewShowed: () => void;
            private template;
        }
        /** 视图-业务对象日志 */
        interface IBOLogstViewView extends ibas.IBOViewView {
            /** 绘制窗体 */
            drawView(template: outs.BOType): void;
            /** 显示数据 */
            showData(datas: object[]): void;
        }
        namespace outs {
            function template(datas: object[], boInfos: ibas.IList<bo.BOInformation>): BOType;
            class BOType {
                code: string;
                name: string;
                description: string;
                properties: ibas.IList<BOTypeProperty>;
            }
            abstract class BOTypeProperty {
                name: string;
                description: string;
                type: any;
            }
            class BOTypePropertyString extends BOTypeProperty {
                get type(): any;
            }
            class BOTypePropertyDecimal extends BOTypeProperty {
                get type(): any;
            }
            class BOTypePropertyNumeric extends BOTypeProperty {
                get type(): any;
            }
            class BOTypePropertyDate extends BOTypeProperty {
                get type(): any;
            }
            class BOTypePropertyTime extends BOTypeProperty {
                get type(): any;
            }
            class BOTypePropertyObject extends BOTypeProperty {
                type: BOType;
            }
            class BOTypePropertyArray extends BOTypeProperty {
                type: BOType;
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
declare namespace initialfantasy {
    namespace app {
        /** 业务对象日志服务 */
        class BOLogstService extends ibas.ServiceApplication<IBOLogstServiceView, ibas.IBOServiceContract> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 运行服务 */
            runService(contract: ibas.IBOServiceContract): void;
            /** 关联的数据 */
            private bo;
            private viewData;
        }
        /** 业务对象日志服务-视图 */
        interface IBOLogstServiceView extends ibas.IView {
            /** 显示关联对象 */
            showBusinessObject(bo: ibas.IBusinessObject): void;
            /** 显示已存在日志 */
            showLogsts(datas: bo.BOLogst[]): void;
            /** 查看数据 */
            viewDataEvent: Function;
        }
        /** 业务对象日志服务映射 */
        class BOLogstServiceMapping extends ibas.ServiceMapping {
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
declare namespace initialfantasy {
    namespace app {
        class BOPropertySettingFunc extends ibas.ModuleFunction {
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
declare namespace initialfantasy {
    namespace app {
        /** 列表应用-业务对象属性设置 */
        class BOPropertySettingConfigApp extends ibas.BOQueryApplication<IBOPropertySettingConfigView> {
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
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            private propertySettings;
            private selectedBusinessObject;
            private fetchSettings;
            private editBusinessObject;
            private saveSettings;
            private deleteSettings;
            private copySettings;
        }
        /** 视图-业务对象属性设置 */
        interface IBOPropertySettingConfigView extends ibas.IBOQueryView {
            /** 选择业务对象信息，参数：编辑对象 */
            selectedBusinessObjectEvent: Function;
            /** 编辑业务对象信息 */
            editBusinessObjectEvent: Function;
            /** 显示业务对象信息 */
            showBusinessObjects(datas: bo.BOInformation[]): void;
            /** 保存设置 */
            saveSettingsEvent: Function;
            /** 删除设置 */
            deleteSettingsEvent: Function;
            /** 复制设置 */
            copySettingsEvent: Function;
            /** 显示对象属性设置 */
            showPropertySettings(datas: PropertySetting[]): void;
            /** 身份 */
            identity: string;
        }
        class PropertySetting extends ibas.Bindable {
            constructor(property: bo.BOPropertyInformation, setting: bo.BOPropertySetting);
            property: bo.BOPropertyInformation;
            setting: bo.BOPropertySetting;
            isDirty: boolean;
            get propertyCode(): string;
            get propertyName(): string;
            get propertyAlias(): string;
            get dataType(): string;
            get editType(): string;
            get editSize(): number;
            get systemed(): ibas.emYesNo;
            get searched(): bo.emSearchedValue;
            set searched(value: bo.emSearchedValue);
            get authorised(): bo.emAuthorisedValue;
            set authorised(value: bo.emAuthorisedValue);
            get position(): number;
            set position(value: number);
            get width(): string;
            set width(value: string);
            get required(): bo.emRequiredValue;
            set required(value: bo.emRequiredValue);
            protected firePropertyChanged(property: string): void;
            delete(): void;
            reset(setting?: bo.BOPropertySetting): void;
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
declare namespace initialfantasy {
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
        class ConsolePhone extends Console {
            /** 初始化 */
            protected registers(): void;
        }
    }
}
