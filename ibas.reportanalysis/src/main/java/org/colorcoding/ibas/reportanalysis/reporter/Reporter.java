package org.colorcoding.ibas.reportanalysis.reporter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.Properties;
import java.util.UUID;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializerFactory;
import org.colorcoding.ibas.bobas.serialization.SerializerManager;

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
					params.put(item.getName(), item.getValue());
				}
				try (FileOutputStream outputStream = new FileOutputStream(new File(workFolder, "Params.properties"))) {
					try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, "utf-8")) {
						params.store(writer, String.format("create by %s", this.getRunner()));
						writer.flush();
					}
					outputStream.flush();
				}
			} catch (Exception e) {
				Logger.log(e);
			}
		}
		IDataTable dataTable = this.run();
		if (this.isTraced() && dataTable != null) {
			// 记录运行结果（文件创建时间为结束时间）
			try {
				try (FileOutputStream outputStream = new FileOutputStream(new File(workFolder, "ReportData.json"))) {
					try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, "utf-8")) {
						ISerializer<?> serializer = SerializerFactory.create().createManager()
								.create(SerializerManager.TYPE_JSON);
						serializer.serialize(dataTable, outputStream, false);
						writer.flush();
					}
					outputStream.flush();
				}
			} catch (Exception e) {
				Logger.log(e);
			}
		}
		return dataTable;
	}

	protected abstract IDataTable run() throws ReporterException;
}
