package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.reportanalysis.data.emReportType;

public class ReporterFactory {

	public static IReporter create(ExecuteReport report) {
		if (report.getCategory() == emReportType.REPORT) {
			return new SystemReporter();
		} else if (report.getCategory() == emReportType.SERVICE) {
			return new RemoteReporter();
		} else if (report.getCategory() == emReportType.FILE) {
			return new FileReporter();
		} else if (report.getCategory() == emReportType.THIRD_APP) {
			return new ThirdAppReporter();
		}
		return null;
	}
}
