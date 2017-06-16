package org.colorcoding.ibas.reportanalysis.reporter;

import java.util.Iterator;

import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.SqlQuery;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.IKeyText;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.repository.BORepository4DbReadonly;
import org.colorcoding.ibas.bobas.repository.IBORepository4DbReadonly;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 系统报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class ReportReporter extends Reporter {
	/**
	 * 参数名，查询
	 */
	public static final String PARAMETER_NAME_SQL = "${SqlString}";

	@Override
	public IDataTable run() throws ReportException {
		ExecuteReportParameter sqlParameter = this.getReport().getParameters()
				.firstOrDefault(c -> PARAMETER_NAME_SQL.equalsIgnoreCase(c.getName()));
		if (sqlParameter == null || sqlParameter.getValue() == null || sqlParameter.getValue().isEmpty()) {
			throw new ReportException(i18n.prop("msg_ra_invaild_report_query",
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
		IBORepository4DbReadonly boRepository = new BORepository4DbReadonly("Master");
		IOperationResult<IDataTable> opRslt = boRepository.query(new SqlQuery(sqlString, true, false));
		if (opRslt.getError() != null) {
			throw new ReportException(opRslt.getError());
		}
		if (opRslt.getResultCode() != 0) {
			throw new ReportException(opRslt.getMessage());
		}
		return opRslt.getResultObjects().firstOrDefault();
	}

}
