package org.colorcoding.ibas.reportanalysis.reporter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.Properties;
import java.util.UUID;
import java.util.function.Function;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.IDataTableColumn;
import org.colorcoding.ibas.bobas.data.IDataTableRow;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.reportanalysis.bo.report.ReportRunningLog;
import org.colorcoding.ibas.reportanalysis.data.DataConvert;
import org.colorcoding.ibas.reportanalysis.repository.BORepositoryReportAnalysis;

public abstract class Reporter implements IReporter {

	public Reporter() {
		this.setId(UUID.randomUUID().toString());
	}

	private String id;

	public final String getId() {
		return id;
	}

	private final void setId(String id) {
		this.id = id;
	}

	private boolean traced;

	public final boolean isTraced() {
		return traced;
	}

	public final void setTraced(boolean traced) {
		this.traced = traced;
	}

	private String workFolder;

	public final String getWorkFolder() {
		return workFolder;
	}

	public final void setWorkFolder(String workFolder) {
		this.workFolder = workFolder;
	}

	private String runner;

	public final String getRunner() {
		return runner;
	}

	public final void setRunner(String runner) {
		this.runner = runner;
	}

	private ExecuteReport report;

	protected final ExecuteReport getReport() {
		return report;
	}

	private final void setReport(ExecuteReport report) {
		this.report = report;
	}

	protected String getParameterValue(String name) throws ReporterException {
		if (this.getReport() != null) {
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (name.equalsIgnoreCase(item.getName())) {
					return item.getValue();
				}
			}
		}
		throw new ReporterException(I18N.prop("msg_ra_not_found_report_parameter", name));
	}

	/**
	 * 运行报表
	 * 
	 * @param report 用户报表
	 * @return
	 * @throws Exception
	 */
	public IDataTable run(ExecuteReport report) throws ReporterException {
		this.setReport(report);
		ReportRunningLog reportLog = null;
		File workFolder = new File(this.getWorkFolder(), this.getId());
		if (this.isTraced() && this.getReport() != null) {
			// 记录运行参数（文件创建时间为开始时间）
			try {
				if (!workFolder.exists()) {
					workFolder.mkdirs();
				}
				Properties params = new Properties();
				params.put("Report", this.getReport().getId());
				params.put("ReportName", this.getReport().getName());
				params.put("Runner", this.getRunner());
				for (ExecuteReportParameter item : this.getReport().getParameters()) {
					params.put(item.getName(),
							item.getValue() == null ? DataConvert.STRING_VALUE_EMPTY : item.getValue());
				}
				try (FileOutputStream outputStream = new FileOutputStream(new File(workFolder, "Params.properties"))) {
					try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, "utf-8")) {
						params.store(writer, String.format("create by %s", this.getRunner()));
						writer.flush();
					}
					outputStream.flush();
				}
				if (reportLog == null) {
					reportLog = new ReportRunningLog();
					reportLog.setSign(this.getId());
					reportLog.setReport(Integer.valueOf(this.getReport().getId()));
					reportLog.setReportName(this.getReport().getName());
					reportLog.setRunner(this.getRunner());
					if (reportLog.getRunner() != null) {
						StringBuilder builder = new StringBuilder();
						for (int i = reportLog.getRunner().indexOf(":") + 1; i < reportLog.getRunner()
								.indexOf("|"); i++) {
							if (reportLog.getRunner().charAt(i) != ' ') {
								builder.append(reportLog.getRunner().charAt(i));
							}
						}
						if (builder.length() > 0) {
							reportLog.setDataOwner(Integer.valueOf(builder.toString()));
						}
					}
					reportLog.setStartDate(DateTime.getToday());
					reportLog.setStartTime(Short.valueOf(DateTime.getNow().toString("HHmm")));
					reportLog.setParameterFile(String.format("%s/%s", this.getId(), "Params.properties"));
				}
			} catch (Exception e) {
				Logger.log(e);
			}
		}
		IDataTable dataTable = this.run();
		if (this.isTraced() && dataTable != null) {
			// 记录运行结果（文件创建时间为结束时间）
			try {
				/*
				 * try (FileOutputStream outputStream = new FileOutputStream(new
				 * File(workFolder, "ReportData.json"))) { try (OutputStreamWriter writer = new
				 * OutputStreamWriter(outputStream, "utf-8")) { ISerializer<?> serializer =
				 * SerializerFactory.create().createManager()
				 * .create(SerializerManager.TYPE_JSON); serializer.serialize(dataTable,
				 * outputStream, false); writer.flush(); } outputStream.flush(); }
				 */
				try (OutputStreamWriter writer = new OutputStreamWriter(
						new FileOutputStream(new File(workFolder, "ReportData.csv")), StandardCharsets.UTF_8)) {
					Function<Object, String> escapeCsvField = new Function<Object, String>() {

						@Override
						public String apply(Object value) {
							if (value == null)
								return "";
							String sValue = String.valueOf(value);
							// 如果包含逗号、换行或双引号，则用双引号包裹并转义内部引号
							if (sValue.contains(",") || sValue.contains("\"") || sValue.contains("\n")) {
								return "\"" + sValue.replace("\"", "\"\"") + "\"";
							}
							return sValue;

						}

					};
					if (!dataTable.getColumns().isEmpty()) {
						IDataTableColumn column;
						for (int i = 0; i < dataTable.getColumns().size(); i++) {
							column = dataTable.getColumns().get(i);
							if (i > 0) {
								writer.append(",");
							}
							writer.append(!DataConvert.isNullOrEmpty(column.getDescription()) ? column.getDescription()
									: column.getName());
						}
						writer.append("\n");
					}
					if (!dataTable.getRows().isEmpty()) {
						for (IDataTableRow row : dataTable.getRows()) {
							for (int i = 0; i < dataTable.getColumns().size(); i++) {
								if (i > 0) {
									writer.append(",");
								}
								writer.append(escapeCsvField.apply(row.getValue(i)));
							}
							writer.append("\n");
						}
					}
				}
				if (reportLog != null) {
					reportLog.setEndDate(DateTime.getToday());
					reportLog.setEndTime(Short.valueOf(DateTime.getNow().toString("HHmm")));
					reportLog.setResultFile(String.format("%s/%s", this.getId(), "ReportData.csv"));
				}
			} catch (Exception e) {
				Logger.log(e);
			}
		}
		try {
			// 记录运行日志
			if (reportLog != null) {
				BORepositoryReportAnalysis boRepository = new BORepositoryReportAnalysis();
				boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
				boRepository.saveReportRunningLog(reportLog);
			}
		} catch (Exception e) {
			Logger.log(e);
		}
		return dataTable;
	}

	protected abstract IDataTable run() throws ReporterException;
}
