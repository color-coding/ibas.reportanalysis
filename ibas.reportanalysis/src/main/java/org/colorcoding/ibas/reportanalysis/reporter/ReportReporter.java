package org.colorcoding.ibas.reportanalysis.reporter;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.SqlQuery;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.repository.BORepository4DbReadonly;
import org.colorcoding.ibas.bobas.repository.IBORepository4DbReadonly;

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
		IBORepository4DbReadonly boRepository = new BORepository4DbReadonly("Master");
		String sqlString = sqlParameter.getValue();
		// 替换变量
		String pattern = "\\$\\{([\\!a-zA-Z].*?)\\}";
		Matcher matcher = Pattern.compile(pattern).matcher(sqlString);
		while (matcher.find()) {
			String vName = matcher.group(0);
			ExecuteReportParameter parameter = this.getReport().getParameters()
					.firstOrDefault(c -> c.getName().equals(vName));
			if (parameter != null) {
				String vValue = parameter.getValue();
				if (vValue != null) {
					sqlString = sqlString.replace(vName, vValue);
				}
			}
		}
		// 检查是否安全
		if (!this.check(sqlString)) {
			throw new ReportException(i18n.prop("msg_ra_invaild_report_query", this.getReport().getName()));
		}
		// 执行语句
		IOperationResult<IDataTable> opRslt = boRepository.query(new SqlQuery(sqlString));
		if (opRslt.getError() != null) {
			throw new ReportException(opRslt.getError());
		}
		if (opRslt.getResultCode() != 0) {
			throw new ReportException(opRslt.getMessage());
		}
		return opRslt.getResultObjects().firstOrDefault();
	}

	protected boolean check(String sql) {
		String reg = "(?:')|(?:--)|(/\\*(?:.|[\\n\\r])*?\\*/)|"
				+ "(\\b(update|delete|insert|trancate|into|ascii|master|drop)\\b)";
		Pattern sqlPattern = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);
		if (sqlPattern.matcher(sql).find()) {
			return false;
		}
		return true;
	}
}
