package org.colorcoding.ibas.reportanalysis.reporter;

import java.util.List;

import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;
import org.colorcoding.ibas.reportanalysis.data.emReportType;

public class ExecuteReportParameter {

	public static ExecuteReportParameter create(IReportParameter boItem) {
		ExecuteReportParameter reportParameter = new ExecuteReportParameter();
		reportParameter.setName(boItem.getName());
		reportParameter.setCategory(boItem.getCategory());
		reportParameter.setDescription(boItem.getDescription());
		reportParameter.setValue(boItem.getValue());
		return reportParameter;
	}

	public static List<ExecuteReportParameter> create(IReport bo) {
		ExecuteReportParameter parameter = null;
		ArrayList<ExecuteReportParameter> parameters = new ArrayList<>();
		if (bo.getServer() != null && bo.getServer().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter
					.setName(String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_SERVER.getName()));
			parameter.setCategory(emReportParameterType.PRESET);
			parameter.setValue(bo.getServer());
			parameters.add(parameter);
		}
		if (bo.getUser() != null && bo.getUser().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter.setName(String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_USER.getName()));
			parameter.setCategory(emReportParameterType.PRESET);
			parameter.setValue(bo.getUser());
			parameters.add(parameter);
		}
		if (bo.getPassword() != null && bo.getPassword().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter.setName(
					String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_PASSWORD.getName()));
			parameter.setCategory(emReportParameterType.PRESET);
			parameter.setValue(bo.getPassword());
			parameters.add(parameter);
		}
		if (bo.getAddress() != null && bo.getAddress().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter.setName(
					String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_ADDRESS.getName()));
			parameter.setCategory(emReportParameterType.PRESET);
			parameter.setValue(bo.getAddress());
			parameters.add(parameter);
		}
		if (bo.getCategory() == emReportType.REPORT) {
			// 系统报表
			if (bo.getSqlString() != null && bo.getSqlString().length() > 0) {
				parameter = new ExecuteReportParameter();
				parameter.setName(
						String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_SQLSTRING.getName()));
				parameter.setCategory(emReportParameterType.PRESET);
				parameter.setValue(bo.getSqlString());
				parameters.add(parameter);
			}
		}
		return parameters;
	}

	/**
	 * 参数名称
	 */
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 参数类型
	 */
	private emReportParameterType category;

	public emReportParameterType getCategory() {
		return category;
	}

	public void setCategory(emReportParameterType category) {
		this.category = category;
	}

	/**
	 * 参数说明
	 */
	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 参数值
	 */
	private String value;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return String.format("{report parameter: %s}", this.getName());
	}
}
