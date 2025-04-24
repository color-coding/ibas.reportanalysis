package org.colorcoding.ibas.reportanalysis.bo.users;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;

/**
 * 用户报表参数
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserReportParameter", namespace = MyConfiguration.NAMESPACE_BO)
public class UserReportParameter extends Serializable {

	private static final long serialVersionUID = -3680479928709656106L;

	public static UserReportParameter create(IReportParameter boItem) {
		UserReportParameter userReportParameter = new UserReportParameter();
		userReportParameter.setName(boItem.getName());
		userReportParameter.setCategory(boItem.getCategory());
		userReportParameter.setDescription(boItem.getDescription());
		userReportParameter.setValue(boItem.getValue());
		return userReportParameter;
	}

	/**
	 * 参数名称
	 */
	@XmlElement(name = "Name")
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
	@XmlElement(name = "Category")
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
	@XmlElement(name = "Description")
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
