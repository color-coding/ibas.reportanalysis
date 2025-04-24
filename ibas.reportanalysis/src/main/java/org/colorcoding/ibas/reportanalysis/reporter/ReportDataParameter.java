package org.colorcoding.ibas.reportanalysis.reporter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ReportDataParameter", namespace = MyConfiguration.NAMESPACE_REPORTER)
public class ReportDataParameter extends Serializable {

	private static final long serialVersionUID = 6722285819786418697L;

	public ReportDataParameter() {
	}

	public ReportDataParameter(String name, String value) {
		this();
		this.setName(name);
		this.setValue(value);
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

	public String toString() {
		return String.format("{parameter: %s}", this.getName());
	}
}
