package org.colorcoding.ibas.boe.reporter;

import org.colorcoding.ibas.reportanalysis.data.emReportType;
import org.colorcoding.ibas.reportanalysis.reporter.ExecuteReport;
import org.colorcoding.ibas.reportanalysis.reporter.IReporter;

public class ReporterFactory extends org.colorcoding.ibas.reportanalysis.reporter.ReporterFactory {

	public IReporter create(ExecuteReport report) {
		if (report.getCategory() == emReportType.BOE) {
			return new BOEReporter();
		}
		return null;
	}
}
