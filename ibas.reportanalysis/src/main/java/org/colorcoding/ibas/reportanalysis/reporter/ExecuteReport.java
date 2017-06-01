package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.data.emReportType;

public class ExecuteReport {

	public static ExecuteReport create(IReport boItem) {
		ExecuteReport exeReport = new ExecuteReport();
		exeReport.setId(String.valueOf(boItem.getObjectKey()));
		exeReport.setName(boItem.getName());
		exeReport.setCategory(boItem.getCategory());
		exeReport.setGroup(boItem.getGroup());
		ArrayList<ExecuteReportParameter> parameters = new ArrayList<>();
		// 报表中的参数
		parameters.addAll(ExecuteReportParameter.create(boItem));
		// 参数
		for (IReportParameter item : boItem.getReportParameters()) {
			parameters.add(ExecuteReportParameter.create(item));
		}
		exeReport.setParameters(parameters);
		return exeReport;
	}

	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private emReportType category;

	public emReportType getCategory() {
		return category;
	}

	public void setCategory(emReportType category) {
		this.category = category;
	}

	private String group;

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	private ArrayList<ExecuteReportParameter> parameters;

	public ArrayList<ExecuteReportParameter> getParameters() {
		if (this.parameters == null) {
			this.parameters = new ArrayList<ExecuteReportParameter>();
		}
		return parameters;
	}

	public void setParameters(ArrayList<ExecuteReportParameter> parameters) {
		this.parameters = parameters;
	}

	@Override
	public String toString() {
		return String.format("{report: %s}", this.getName() != null ? this.getName() : this.getId());
	}
}
