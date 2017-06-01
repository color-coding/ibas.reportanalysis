package org.colorcoding.ibas.reportanalysis.bo.users;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;
import org.colorcoding.ibas.reportanalysis.data.emReportType;

/**
 * 用户报表
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserReport")
@XmlRootElement(name = "UserReport")
public class UserReport {

	public static final String PARAMETER_NAME_ASSOCIATED_REPORT = "${Report}";

	public static UserReport create(IReport boItem) {
		UserReport userReport = new UserReport();
		userReport.setId(String.valueOf(boItem.getObjectKey()));
		userReport.setName(boItem.getName());
		userReport.setCategory(boItem.getCategory());
		userReport.setGroup(boItem.getGroup());
		ArrayList<UserReportParameter> parameters = new ArrayList<>();
		// 参数
		if (boItem.getAssociatedReport() != null) {
			UserReportParameter parameter = new UserReportParameter();
			parameter.setName(PARAMETER_NAME_ASSOCIATED_REPORT);
			parameter.setCategory(emReportParameterType.PRESET);
			parameter.setValue(boItem.getAssociatedReport());
			parameters.add(parameter);
		}
		for (IReportParameter item : boItem.getReportParameters()) {
			parameters.add(UserReportParameter.create(item));
		}
		userReport.setParameters(parameters.toArray(new UserReportParameter[] {}));
		return userReport;
	}

	@XmlElement(name = "Id")
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@XmlElement(name = "Name")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@XmlElement(name = "Category")
	private emReportType category;

	public emReportType getCategory() {
		return category;
	}

	public void setCategory(emReportType category) {
		this.category = category;
	}

	@XmlElement(name = "Group")
	private String group;

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	@XmlElement(name = "Parameters")
	private UserReportParameter[] parameters;

	public UserReportParameter[] getParameters() {
		return parameters;
	}

	public void setParameters(UserReportParameter[] parameters) {
		this.parameters = parameters;
	}

	@Override
	public String toString() {
		return String.format("{report: %s}", this.getName() != null ? this.getName() : this.getId());
	}
}
