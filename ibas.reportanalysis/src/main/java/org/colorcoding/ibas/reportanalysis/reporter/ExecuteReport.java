package org.colorcoding.ibas.reportanalysis.reporter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.data.emReportType;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ExecuteReport", namespace = MyConfiguration.NAMESPACE_REPORTER)
@XmlRootElement(name = "ExecuteReport", namespace = MyConfiguration.NAMESPACE_REPORTER)
public class ExecuteReport extends Serializable {

	private static final long serialVersionUID = -1440463650390693985L;

	public static ExecuteReport create(IReport boItem) {
		ExecuteReport exeReport = new ExecuteReport();
		exeReport.setId(String.valueOf(boItem.getObjectKey()));
		exeReport.setName(boItem.getName());
		exeReport.setCategory(boItem.getCategory());
		// 报表中的参数
		exeReport.getParameters().addAll(ExecuteReportParameter.create(boItem));
		// 参数
		for (IReportParameter item : boItem.getReportParameters()) {
			exeReport.getParameters().add(ExecuteReportParameter.create(item));
		}
		return exeReport;
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

	@XmlElementWrapper(name = "Parameters")
	@XmlElement(name = "Parameter", type = ExecuteReportParameter.class)
	private ArrayList<ExecuteReportParameter> parameters;

	public List<ExecuteReportParameter> getParameters() {
		if (this.parameters == null) {
			this.parameters = new ArrayList<ExecuteReportParameter>();
		}
		return parameters;
	}

	@Override
	public String toString() {
		return String.format("{report: %s}", this.getName() != null ? this.getName() : this.getId());
	}
}
