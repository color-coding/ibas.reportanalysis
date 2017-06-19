package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.reportanalysis.data.emReportType;

public class ReporterFactory {

	public IReporter create(ExecuteReport report) {
		if (report.getCategory() == emReportType.REPORT) {
			return new ReportReporter();
		} else if (report.getCategory() == emReportType.KPI) {
			return new KpiReporter();
		} else if (report.getCategory() == emReportType.FILE) {
			return new FileReporter();
		}
		return null;
	}
}
