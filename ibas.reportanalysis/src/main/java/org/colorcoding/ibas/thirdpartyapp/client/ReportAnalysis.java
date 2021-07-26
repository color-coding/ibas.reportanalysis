package org.colorcoding.ibas.thirdpartyapp.client;

import java.util.Map.Entry;
import java.util.Properties;

import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.data.emReportType;
import org.colorcoding.ibas.reportanalysis.reporter.ExecuteReport;
import org.colorcoding.ibas.reportanalysis.reporter.ExecuteReportParameter;
import org.colorcoding.ibas.reportanalysis.reporter.IReporter;
import org.colorcoding.ibas.reportanalysis.reporter.ReporterFactory;

public class ReportAnalysis extends ApplicationClient {

	/**
	 * 运行命令-运行报表
	 */
	public static final String EXECUT_NAME_RUN_REPORT = "runReport";

	public static final String PARAM_NAME_ADDRESS = "Address";
	public static final String PARAM_NAME_USER = "User";
	public static final String PARAM_NAME_PASSWORD = "Password";
	public static final String PARAM_NAME_REPORT = "Report";

	public String getAddress() {
		return this.paramValue(PARAM_NAME_ADDRESS, "");
	}

	public String getUser() {
		return this.paramValue(PARAM_NAME_USER, "");
	}

	public String getPassword() {
		return this.paramValue(PARAM_NAME_PASSWORD, "");
	}

	@Override
	@SuppressWarnings("unchecked")
	public <P> IOperationResult<P> execute(String instruct, Properties params) throws NotImplementedException {
		if (EXECUT_NAME_RUN_REPORT.equalsIgnoreCase(instruct)) {
			return (IOperationResult<P>) this.runReport(params);
		} else {
			throw new NotImplementedException(instruct);
		}
	}

	@Override
	public User authenticate(Properties params) throws AuthenticationException {
		throw new AuthenticationException(new NotImplementedException());
	}

	protected IOperationResult<IDataTable> runReport(Properties params) {
		try {
			OperationResult<IDataTable> opRslt = new OperationResult<IDataTable>();
			String report = this.paramValue(PARAM_NAME_REPORT, "", params);
			if (report.isEmpty()) {
				throw new ParameterException(PARAM_NAME_REPORT);
			}
			ExecuteReportParameter exeParameter = null;
			ExecuteReport exeReport = new ExecuteReport();
			exeReport.setName(this.getName());
			exeReport.setName(this.getDescription());
			exeReport.setCategory(emReportType.SERVICE);
			// 设置参数-服务器地址
			exeParameter = new ExecuteReportParameter();
			exeParameter
					.setName(String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_SERVER.getName()));
			exeParameter.setValue(this.getAddress());
			exeReport.getParameters().add(exeParameter);
			// 设置参数-用户
			exeParameter = new ExecuteReportParameter();
			exeParameter
					.setName(String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_USER.getName()));
			exeParameter.setValue(this.getUser());
			exeReport.getParameters().add(exeParameter);
			// 设置参数-密码
			exeParameter = new ExecuteReportParameter();
			exeParameter.setName(
					String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_PASSWORD.getName()));
			exeParameter.setValue(this.getPassword());
			exeReport.getParameters().add(exeParameter);
			// 设置参数-报表实例
			exeParameter = new ExecuteReportParameter();
			exeParameter.setName(
					String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_ADDRESS.getName()));
			exeParameter.setValue(report);
			exeReport.getParameters().add(exeParameter);
			// 设置其他参数
			for (Entry<Object, Object> item : params.entrySet()) {
				if (PARAM_NAME_ADDRESS.equalsIgnoreCase(String.valueOf(item.getKey()))) {
					continue;
				}
				if (PARAM_NAME_USER.equalsIgnoreCase(String.valueOf(item.getKey()))) {
					continue;
				}
				if (PARAM_NAME_PASSWORD.equalsIgnoreCase(String.valueOf(item.getKey()))) {
					continue;
				}
				if (PARAM_NAME_REPORT.equalsIgnoreCase(String.valueOf(item.getKey()))) {
					continue;
				}
				exeParameter = new ExecuteReportParameter();
				exeParameter.setName(String.valueOf(item.getKey()));
				exeParameter.setValue(String.valueOf(item.getValue()));
				exeReport.getParameters().add(exeParameter);
			}
			// 创建运行报表
			IReporter reporter = ReporterFactory.create(exeReport);
			if (reporter == null) {
				throw new Exception("Unknown report category");
			}
			return opRslt.addResultObjects(reporter.run(exeReport));
		} catch (Exception e) {
			return new OperationResult<IDataTable>(e);
		}
	}

}
