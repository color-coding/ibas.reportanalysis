package org.colorcoding.ibas.reportanalysis.reporter;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;
import org.colorcoding.ibas.reportanalysis.data.emReportType;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ExecuteReportParameter", namespace = MyConfiguration.NAMESPACE_REPORTER)
public class ExecuteReportParameter extends Serializable {

	private static final long serialVersionUID = -2179335121340797893L;

	public static ExecuteReportParameter create(IReportParameter boItem) {
		ExecuteReportParameter reportParameter = new ExecuteReportParameter();
		reportParameter.setName(boItem.getName());
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
			parameter.setValue(bo.getServer());
			parameters.add(parameter);
		}
		if (bo.getUser() != null && bo.getUser().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter.setName(String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_USER.getName()));
			parameter.setValue(bo.getUser());
			parameters.add(parameter);
		}
		if (bo.getPassword() != null && bo.getPassword().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter.setName(
					String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_PASSWORD.getName()));
			parameter.setValue(bo.getPassword());
			parameters.add(parameter);
		}
		if (bo.getAddress() != null && bo.getAddress().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter.setName(
					String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_ADDRESS.getName()));
			parameter.setValue(bo.getAddress());
			parameters.add(parameter);
		}
		if (bo.getThirdPartyApp() != null && bo.getThirdPartyApp().length() > 0) {
			parameter = new ExecuteReportParameter();
			parameter.setName(
					String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_THIRDPARTYAPP.getName()));
			parameter.setValue(bo.getThirdPartyApp());
			parameters.add(parameter);
		}
		if (bo.getCategory() == emReportType.REPORT) {
			// 系统报表
			if (bo.getSqlString() != null && bo.getSqlString().length() > 0) {
				parameter = new ExecuteReportParameter();
				parameter.setName(
						String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE, Report.PROPERTY_SQLSTRING.getName()));
				parameter.setValue(bo.getSqlString());
				parameters.add(parameter);
			}
		}
		return parameters;
	}

	@XmlElement(name = "Category")
	private emReportParameterType category;

	public emReportParameterType getCategory() {
		return category;
	}

	public void setCategory(emReportParameterType category) {
		this.category = category;
	}

	@XmlElement(name = "Name")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@XmlElement(name = "Value")
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
