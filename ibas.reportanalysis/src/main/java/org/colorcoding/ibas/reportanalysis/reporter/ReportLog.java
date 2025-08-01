package org.colorcoding.ibas.reportanalysis.reporter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ReportLog", namespace = MyConfiguration.NAMESPACE_REPORTER)
@XmlRootElement(name = "ReportLog", namespace = MyConfiguration.NAMESPACE_REPORTER)
public class ReportLog extends Serializable {

	private static final long serialVersionUID = -287801306657043116L;

	private String id;

	@XmlElement(name = "Id")
	public final String getId() {
		return id;
	}

	public final void setId(String id) {
		this.id = id;
	}

	private String reportId;

	@XmlElement(name = "ReportId")
	public final String getReportId() {
		return reportId;
	}

	public final void setReportId(String reportId) {
		this.reportId = reportId;
	}

	private String reportName;

	@XmlElement(name = "ReportName")
	public final String getReportName() {
		return reportName;
	}

	public final void setReportName(String reportName) {
		this.reportName = reportName;
	}

	private String runner;

	@XmlElement(name = "Runner")
	public final String getRunner() {
		return runner;
	}

	public final void setRunner(String runner) {
		this.runner = runner;
	}

	private String remarks;

	@XmlElement(name = "Remarks")
	public final String getRemarks() {
		return remarks;
	}

	public final void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	private String workFolder;

	@XmlElement(name = "WorkFolder")
	public final String getWorkFolder() {
		return workFolder;
	}

	public final void setWorkFolder(String workFolder) {
		this.workFolder = workFolder;
	}

	private Long beginTime;

	@XmlElement(name = "BeginTime")
	public final Long getBeginTime() {
		return beginTime;
	}

	public final void setBeginTime(Long beginTime) {
		this.beginTime = beginTime;
	}

	private Long finishTime;

	@XmlElement(name = "FinishTime")
	public final Long getFinishTime() {
		return finishTime;
	}

	public final void setFinishTime(Long finishTime) {
		this.finishTime = finishTime;
	}

	@XmlElementWrapper(name = "Parameters")
	@XmlElement(name = "Parameter", type = KeyText.class)
	private ArrayList<KeyText> parameters;

	public final List<KeyText> getParameters() {
		if (this.parameters == null) {
			this.parameters = new ArrayList<>();
		}
		return parameters;
	}

	private String content;

	@XmlElement(name = "Content")
	public final String getContent() {
		return content;
	}

	public final void setContent(String content) {
		this.content = content;
	}

}
