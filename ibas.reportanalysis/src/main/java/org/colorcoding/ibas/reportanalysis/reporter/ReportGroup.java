package org.colorcoding.ibas.reportanalysis.reporter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ReportGroup", namespace = MyConfiguration.NAMESPACE_REPORTER)
public class ReportGroup extends Serializable {

	private static final long serialVersionUID = 5648690702888716667L;

	private String id;

	@XmlElement(name = "Id")
	public final String getId() {
		return id;
	}

	public final void setId(String id) {
		this.id = id;
	}

	private String parentId;

	@XmlElement(name = "ParentId")
	public final String getParentId() {
		return parentId;
	}

	public final void setParentId(String parentId) {
		this.parentId = parentId;
	}

	private String name;

	@XmlElement(name = "Name")
	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	private String remarks;

	@XmlElement(name = "Remarks")
	public final String getRemarks() {
		return remarks;
	}

	public final void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String toString() {
		return String.format("{group: %s}", this.getName());
	}
}
