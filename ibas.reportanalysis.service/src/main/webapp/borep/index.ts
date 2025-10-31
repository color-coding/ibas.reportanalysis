/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../api/index.ts" />
/// <reference path="./bo/Report.ts" />
/// <reference path="./bo/ReportBook.ts" />
/// <reference path="./bo/ReportData.ts" />
/// <reference path="./bo/UserReport.ts" />
/// <reference path="./bo/ReportRunningLog.ts" />
/// <reference path="./DataConverter.ts" />
/// <reference path="./BORepository.ts" />

namespace reportanalysis {
    export namespace bo {
        // 注册业务对象仓库到工厂
        boFactory.register(BO_REPOSITORY_REPORTANALYSIS, BORepositoryReportAnalysis);
        // 注册业务对象到工厂
        boFactory.register(UserReport);
        boFactory.register(UserReportParameter);
        boFactory.register(Report.BUSINESS_OBJECT_CODE, Report);
        boFactory.register(ReportBook.BUSINESS_OBJECT_CODE, ReportBook);
        boFactory.register(ReportRunningLog.BUSINESS_OBJECT_CODE, ReportRunningLog);
    }
}