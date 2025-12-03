/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace bo {
        /** ReportAnalysis 业务仓库 */
        export class BORepositoryReportAnalysis extends ibas.BORepositoryApplication implements IBORepositoryReportAnalysis {
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter {
                return new DataConverter;
            }
            /** 获取报表地址 */
            toUrl(report: bo.Report): string;
            /** 获取文件地址 */
            toUrl(file: string): string;
            toUrl(): string {
                if (ibas.objects.instanceOf(arguments[0], bo.Report)) {
                    return this.toUrl(arguments[0].address);
                } else if (typeof arguments[0] === "string") {
                    if (ibas.strings.isWith(arguments[0], ".../", undefined)) {
                        return ibas.urls.normalize(arguments[0]);
                    } else {
                        if (!this.address.endsWith("/")) { this.address += "/"; }
                        let value: string = arguments[0];
                        if (ibas.strings.isWith(value, "file://", undefined)) {
                            value = value.substring("file://".length);
                        }
                        let url: string = this.address.replace("/services/rest/data/", "/services/rest/file/");
                        url += value;
                        url += url.indexOf("?") >= 0 ? "&" : "?";
                        url += ibas.strings.format("token={0}", ibas.tokens.content(this.token));
                        return encodeURI(url);
                    }
                } else {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "urls"));
                }
            }
            /**
             * 上传报表文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryUploadAjax = new ibas.FileRepositoryUploadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.upload("upload", caller);
            }
            /**
             * 读取报表文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryDownloadAjax = new ibas.FileRepositoryDownloadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.download("download", caller);
            }
            /**
             * 查询用户报表
             * @param ibas.IListener 用户检索监听者
             */
            fetchUserReports(caller: IUserMethodsCaller<bo.UserReport>): void {
                let boRepository: ibas.BORepositoryAjax = new ibas.BORepositoryAjax();
                boRepository.address = this.address;
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                if (ibas.objects.isNull(boRepository)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "remoteRepository"));
                }
                let method: string =
                    ibas.strings.format("fetchUserReports?user={0}&token={1}",
                        caller.user, ibas.tokens.content(this.token));
                boRepository.callRemoteMethod(method, undefined, (opRslt) => {
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                });
            }
            /**
             * 运行用户报表
             * @param ibas.IListener 用户检索监听者
             */
            runUserReport(caller: IRunUserReportCaller): void {
                let boRepository: ibas.BORepositoryAjax = new ibas.BORepositoryAjax();
                boRepository.address = this.address;
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                if (ibas.objects.isNull(boRepository)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "remoteRepository"));
                }
                let method: string =
                    ibas.strings.format("runUserReport?token={0}", ibas.tokens.content(this.token));
                let data: string = JSON.stringify(this.createConverter().convert(caller.report, method));
                boRepository.callRemoteMethod(method, data, (opRslt) => {
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                });
            }
            /**
             * 查询 报表
             * @param fetcher 查询者
             */
            fetchReport(fetcher: ibas.IFetchCaller<bo.Report>): void {
                super.fetch(bo.Report.name, fetcher);
            }
            /**
             * 保存 报表
             * @param saver 保存者
             */
            saveReport(saver: ibas.ISaveCaller<bo.Report>): void {
                super.save(bo.Report.name, saver);
            }
            /**
             * 查询 报表簿
             * @param fetcher 查询者
             */
            fetchReportBook(fetcher: ibas.IFetchCaller<bo.ReportBook>): void {
                super.fetch(bo.ReportBook.name, fetcher);
            }
            /**
             * 保存 报表簿
             * @param saver 保存者
             */
            saveReportBook(saver: ibas.ISaveCaller<bo.ReportBook>): void {
                super.save(bo.ReportBook.name, saver);
            }
            /**
             * 查询 报表运行日志
             * @param fetcher 查询者
             */
            fetchReportRunningLog(fetcher: ibas.IFetchCaller<bo.ReportRunningLog>): void {
                super.fetch(bo.ReportRunningLog.name, fetcher);
            }
        }

        /**
         * 用户相关调用者
         */
        export interface IRunUserReportCaller extends ibas.IMethodCaller<ibas.DataTable> {
            /** 用户 */
            report: bo.UserReport;
        }
        /** 远程报表服务 */
        export class RemoteReporterService extends ibas.BORepositoryApplication {
            get token(): string {
                return super.token;
            }
            set token(value: string) {
                // 跳过基类调用报错
                if (!ibas.objects.isNull(value)) {
                    throw new Error("please using setToken.");
                }
                super.token = value;
            }
            setToken(user: string, password: string): void {
                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                builder.append(ibas.HTTP_HEADER_TOKEN_AUTHORIZATION);
                builder.append("Basic ");
                builder.append(window.btoa(ibas.strings.format("{0}:{1}", user, password)));
                super.token = builder.toString();
            }
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter {
                return new DataConverter;
            }
            /**
             * 查询 报表数据
             * @param fetcher 查询者
             */
            fetchReportData(fetcher: ibas.IFetchCaller<bo.ReportData>): void {
                super.fetch(bo.ReportData.name, fetcher);
            }
            /**
             * 查询 报表组
             * @param fetcher 查询者
             */
            fetchReportGroup(fetcher: ibas.IFetchCaller<bo.ReportGroup>): void {
                super.fetch(bo.ReportGroup.name, fetcher);
            }
        }
    }
}