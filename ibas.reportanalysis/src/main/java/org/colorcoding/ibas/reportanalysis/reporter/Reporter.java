package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.IDataTableColumn;
import org.colorcoding.ibas.bobas.data.IDataTableRow;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.i18n.i18n;

public abstract class Reporter implements IReporter {

	private ExecuteReport report;

	protected final ExecuteReport getReport() {
		return report;
	}

	private final void setReport(ExecuteReport report) {
		this.report = report;
	}

	protected String getParameterValue(String name) throws ReportException {
		if (this.getReport() != null) {
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (name.equalsIgnoreCase(item.getName())) {
					return item.getValue();
				}
			}
		}
		throw new ReportException(i18n.prop("msg_ra_not_found_report_parameter", name));
	}

	/**
	 * 运行报表
	 * 
	 * @param report
	 *            用户报表
	 * @return
	 * @throws Exception
	 */
	public IDataTable run(ExecuteReport report) throws ReportException {
		this.setReport(report);
		return this.run();
	}

	/**
	 * 创建键值表
	 * 
	 * @param values
	 * @return
	 */
	protected IDataTable create(KeyText[] values) {
		IDataTable table = new DataTable();
		if (values != null) {
			for (KeyText item : values) {
				IDataTableColumn columnKey = table.getColumns().create();
				columnKey.setName("Key");
				columnKey.setDataType(String.class);
				IDataTableColumn columnValue = table.getColumns().create();
				columnValue.setName("Value");
				columnValue.setDataType(String.class);
				IDataTableRow row = table.getRows().create();
				row.setValue(columnKey, item.key);
				row.setValue(columnValue, item.text);
			}
		}
		return table;
	}

	protected abstract IDataTable run() throws ReportException;
}
