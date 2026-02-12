package org.colorcoding.ibas.reportanalysis.reporter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.util.Properties;
import java.util.UUID;

import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Files;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.IDataTableColumn;
import org.colorcoding.ibas.bobas.data.IDataTableRow;
import org.colorcoding.ibas.bobas.file.FileData;
import org.colorcoding.ibas.bobas.file.FileItem;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.FileRepository;
import org.colorcoding.ibas.bobas.serialization.writer.CsvWriter;
import org.colorcoding.ibas.reportanalysis.bo.report.ReportRunningLog;
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
		// 记录运行参数（文件创建时间为开始时间）
		if (this.isTraced() && this.getReport() != null) {
			try (FileRepository fileRepository = new FileRepository()) {
				fileRepository.setRepositoryFolder(Files.pathOf(this.getWorkFolder(), this.getId()));
				// 写入参数文件
				Properties params = new Properties();
				params.put("Report", this.getReport().getId());
				params.put("ReportName", this.getReport().getName());
				params.put("Runner", this.getRunner());
				for (ExecuteReportParameter item : this.getReport().getParameters()) {
					params.put(item.getName(), item.getValue() == null ? Strings.VALUE_EMPTY : item.getValue());
				}
				try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();) {
					try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, "utf-8")) {
						params.store(outputStream, String.format("create by %s", this.getRunner()));
						outputStream.flush();
						params = null;
					}
					try (FileData fileData = new FileData(new ByteArrayInputStream(outputStream.toByteArray()))) {
						fileData.setName("Params.properties");
						IOperationResult<FileItem> opRsltFile = fileRepository.save(fileData);
						if (opRsltFile.getError() != null) {
							throw opRsltFile.getError();
						}
					}
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
					reportLog.setStartDate(DateTimes.today());
					reportLog.setStartTime(Short.valueOf(DateTimes.now().toString("HHmm")));
					reportLog.setParameterFile(String.format("%s/%s", this.getId(), "Params.properties"));
				}
			} catch (Exception e) {
				Logger.log(e);
			}
		}
		IDataTable dataTable = this.run();
		// 记录运行结果（文件创建时间为结束时间）
		if (this.isTraced() && dataTable != null) {
			try (FileRepository fileRepository = new FileRepository()) {
				fileRepository.setRepositoryFolder(Files.pathOf(this.getWorkFolder(), this.getId()));
				try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();) {
					CsvWriter writer = new CsvWriter();
					IDataTableColumn column;
					for (int i = 0; i < dataTable.getColumns().size(); i++) {
						column = dataTable.getColumns().get(i);
						if (i > 0) {
							writer.writeDelimiter(outputStream);
						}
						writer.write(outputStream,
								Strings.isNullOrEmpty(column.getDescription()) ? column.getDescription()
										: column.getName());
					}
					writer.writeNewLine(outputStream);
					IDataTableRow row;
					for (int i = 0; i < dataTable.getRows().size(); i++) {
						row = dataTable.getRows().get(i);
						if (i > 0) {
							writer.writeNewLine(outputStream);
						}
						for (int j = 0; j < dataTable.getColumns().size(); j++) {
							if (j > 0) {
								writer.writeDelimiter(outputStream);
							}
							writer.write(outputStream, Strings.valueOf(row.getValue(j)));
						}
					}
					outputStream.flush();
					writer = null;
					column = null;
					row = null;
					try (FileData fileData = new FileData(new ByteArrayInputStream(outputStream.toByteArray()))) {
						fileData.setName("ReportData.csv");
						IOperationResult<FileItem> opRsltFile = fileRepository.save(fileData);
						if (opRsltFile.getError() != null) {
							throw opRsltFile.getError();
						}
					}
				}
				if (reportLog != null) {
					reportLog.setEndDate(DateTimes.today());
					reportLog.setEndTime(Short.valueOf(DateTimes.now().toString("HHmm")));
					reportLog.setResultFile(String.format("%s/%s", this.getId(), "ReportData.csv"));
				}
			} catch (Exception e) {
				Logger.log(e);
			}
		}
		if (reportLog != null) {
			// 记录运行日志
			try (BORepositoryReportAnalysis boRepository = new BORepositoryReportAnalysis()) {
				boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
				boRepository.saveReportRunningLog(reportLog);
			} catch (Exception e) {
				Logger.log(e);
			}
		}
		return dataTable;
	}

	protected abstract IDataTable run() throws ReporterException;
}
