package org.colorcoding.ibas.boe.bo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.boe.MyConsts;

/**
 * 获取-BOE文件夹
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BOEFolder", namespace = MyConsts.NAMESPACE_BO)
public class BOEFolder implements IBOEFolder {

	/**
	 * 属性名称-编号
	 */
	private static final String PROPERTY_ID_NAME = "Id";

	private int id;

	@XmlElement(name = PROPERTY_ID_NAME)
	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	/**
	 * 属性名称-父项编号
	 */
	private static final String PROPERTY_PARENTID_NAME = "ParentId";
	private int parentId;

	@XmlElement(name = PROPERTY_PARENTID_NAME)
	public final int getParentId() {
		return parentId;
	}

	public final void setParentId(int parentId) {
		this.parentId = parentId;
	}

	/**
	 * 属性名称-文件夹名称
	 */
	private static final String PROPERTY_NAME_NAME = "Name";
	private String name;

	@XmlElement(name = PROPERTY_NAME_NAME)
	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	public String toString() {
		return String.format("{folder: %s|%s}", this.getId(), this.getName());
	}
}
