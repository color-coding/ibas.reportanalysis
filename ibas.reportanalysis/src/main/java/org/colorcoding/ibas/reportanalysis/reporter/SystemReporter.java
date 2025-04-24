package org.colorcoding.ibas.reportanalysis.reporter;

import java.util.Iterator;

import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.IKeyText;
import org.colorcoding.ibas.bobas.db.DbTransaction;
import org.colorcoding.ibas.bobas.db.SqlStatement;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.repository.BORepositoryService;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;

/**
 * 系统报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class SystemReporter extends Reporter {

	public static final String PARAMETER_NAME_SQL = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_SQLSTRING.getName());

	@Override
	public IDataTable run() throws ReporterException {
		ExecuteReportParameter sqlParameter = this.getReport().getParameters()
				.firstOrDefault(c -> PARAMETER_NAME_SQL.equalsIgnoreCase(c.getName()));
		if (sqlParameter == null || sqlParameter.getValue() == null || sqlParameter.getValue().isEmpty()) {
			throw new ReporterException(I18N.prop("msg_ra_invaild_report_query",
					this.getReport().getName() != null ? this.getReport().getName() : this.getReport().getId()));
		}
		// 替换变量
		String sqlString = MyConfiguration.applyVariables(sqlParameter.getValue(), new Iterator<IKeyText>() {
			Iterator<ExecuteReportParameter> iterator = getReport().getParameters().iterator();

			@Override
			public IKeyText next() {
				ExecuteReportParameter parameter = iterator.next();
				return new IKeyText() {

					@Override
					public void setText(String arg0) {
					}

					@Override
					public void setKey(String arg0) {
					}

					@Override
					public String getText() {
						return parameter.getValue();
					}

					@Override
					public String getKey() {
						return parameter.getName();
					}

					@Override
					public String toString() {
						return String.format("{keyText: %s %s}", this.getKey(), this.getText());
					}
				};
			}

			@Override
			public boolean hasNext() {
				return iterator.hasNext();
			}
		});
		// 执行语句
		try (ReportRepository boRepository = new ReportRepository()) {
			IOperationResult<IDataTable> opRslt = boRepository.query(new SqlStatement(sqlString));
			if (opRslt.getError() != null) {
				throw new ReporterException(opRslt.getError());
			}
			if (opRslt.getResultCode() != 0) {
				throw new ReporterException(opRslt.getMessage());
			}
			IDataTable dataTable = opRslt.getResultObjects().firstOrDefault();
			if (dataTable != null) {
				dataTable.setName(this.getReport().getId());
				dataTable.setDescription(this.getReport().getName());
			}
			return dataTable;
		}
	}

	private class ReportRepository extends BORepositoryService {

		public IOperationResult<IDataTable> query(SqlStatement sqlStatement) {
			try {
				if (this.getTransaction() == null) {
					this.connect();
				}
				if (this.getTransaction() instanceof DbTransaction) {
					DbTransaction transaction = (DbTransaction) this.getTransaction();
					return new OperationResult<IDataTable>().addResultObjects(transaction.fetch(sqlStatement));
				} else {
					return new OperationResult<>();
				}
			} catch (Exception e) {
				return new OperationResult<>(e);
			}
		}

	}

}
