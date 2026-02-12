package org.colorcoding.ibas.reportanalysis.service.rest;

import javax.ws.rs.Path;

import org.colorcoding.ibas.reportanalysis.MyConfiguration;

@Path("logfile")
public class LogFileService extends FileService {

	public LogFileService() {
		// 设置工作目录
		this.setRepositoryFolder(MyConfiguration.getLogsFolder());
	}

}
