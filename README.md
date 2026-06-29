<div align="center">

# IBAS ReportAnalysis

**报表分析模块**

IBAS 系统的报表分析模块，提供报表定义、报表参数、报表簿管理、用户报表配置及报表运行日志等功能，支持系统报表与用户自定义报表。

Report analysis module for the IBAS system — report definition, parameters, report books, user report configuration, and run logging with support for system and user-defined reports.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-1.8+-orange.svg)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.x-red.svg)](https://maven.apache.org/)
[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](pom.xml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-贡献--contributing)

</div>

---

## 📖 目录 | Table of Contents

- [✨ 特性 | Features](#-特性--features)
- [📦 模块结构 | Modules](#-模块结构--modules)
- [🚀 快速开始 | Quick Start](#-快速开始--quick-start)
- [📋 业务对象 | Business Objects](#-业务对象--business-objects)
- [📚 相关项目 | Related Projects](#-相关项目--related-projects)
- [🤝 贡献 | Contributing](#-贡献--contributing)
- [📄 许可证 | License](#-许可证--license)

---

## ✨ 特性 | Features

- **📊 报表定义** — 报表（Report）与系统报表（System Report）定义，支持参数化查询
- **📋 报表参数** — 报表参数（Report Parameter）配置，支持动态参数
- **📑 报表簿** — 报表簿（Report Book）管理，将多个报表组织为集合
- **👤 用户报表** — 用户报表（User Report）与用户报表参数配置
- **📝 运行日志** — 报表运行日志（Report Running Log）记录
- **🔌 REST 服务** — 提供报表执行端点（ReportService）

---

## 📦 模块结构 | Modules

| 模块 | 类型 | 说明 |
|------|------|------|
| `ibas.reportanalysis` | JAR | **核心模块** — 报表业务对象定义、仓储层 |
| `ibas.reportanalysis.service` | WAR | **REST 服务** — Jersey 端点（ReportService、DataService、FileService） |

---

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites

- **JDK** 1.8+
- **Maven** 3.x
- [ibas-framework](https://github.com/color-coding/ibas-framework)（BOBAS 框架）

### 构建 | Build

```bash
# 克隆仓库
git clone https://github.com/color-coding/ibas.reportanalysis.git
cd ibas.reportanalysis

# 编译全部模块
./compile_packages.sh            # Linux / macOS
compile_packages.bat             # Windows

# 编译单个模块
mvn clean package install -Dmaven.test.skip=true -f ibas.reportanalysis/pom.xml

# 运行测试
mvn test -f ibas.reportanalysis/pom.xml

# 部署
./deploy_packages.sh
```

### Maven 依赖

```xml
<dependency>
    <groupId>org.colorcoding.apps</groupId>
    <artifactId>ibas.reportanalysis</artifactId>
    <version>0.2.0</version>
</dependency>
```

---

## 📋 业务对象 | Business Objects

| 业务对象 | 说明 |
|----------|------|
| `Report` / `SystemReport` | 报表与系统报表 |
| `ReportParameter` / `ReportParameters` | 报表参数 |
| `ReportBook` / `ReportBookItem` | 报表簿与报表簿项 |
| `UserReport` / `UserReportParameter` | 用户报表与用户报表参数 |
| `ReportRunningLog` | 报表运行日志 |

---

## 📚 相关项目 | Related Projects

| 项目 | 说明 |
|------|------|
| [ibas-framework](https://github.com/color-coding/ibas-framework) | BOBAS 业务对象框架 |
| [ibas.importexport](https://github.com/color-coding/ibas.importexport) | 数据导入导出模块 |

---

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

---

## 📄 许可证 | License

本项目基于 [Apache License 2.0](LICENSE) 开源。
---

## 🙏 鸣谢 | Thanks

<div align="center">

**[Color-Coding Studio](http://colorcoding.org/)** · 咔啦工作室

</div>
