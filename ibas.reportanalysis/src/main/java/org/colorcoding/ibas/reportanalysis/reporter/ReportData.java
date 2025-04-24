package org.colorcoding.ibas.reportanalysis.reporter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ReportData", namespace = MyConfiguration.NAMESPACE_REPORTER)
@XmlRootElement(name = "ReportData", namespace = MyConfiguration.NAMESPACE_REPORTER)
public class ReportData extends Serializable {

	private static final long serialVersionUID = 6533257932826812748L;

	private String id;

	@XmlElement(name = "Id")
	public final String getId() {
		return id;
	}

	public final void setId(String id) {
		this.id = id;
	}

	private String name;

	@XmlElement(name = "Name")
	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	private String group;

	@XmlElement(name = "Group")
	public final String getGroup() {
		return group;
	}

	public final void setGroup(String group) {
		this.group = group;
	}

	private String remarks;

	@XmlElement(name = "Remarks")
	public final String getRemarks() {
		return remarks;
	}

	public final void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@XmlElementWrapper(name = "Parameters")
	@XmlElement(name = "Parameter", type = ReportDataParameter.class)
	private ReportDataParameter[] parameters;

	public final ReportDataParameter[] getParameters() {
		return parameters;
	}

	public final void setParameters(ReportDataParameter[] parameters) {
		this.parameters = parameters;
	}

	public String toString() {
		return String.format("{report: %s}", this.getName());
	}
}
