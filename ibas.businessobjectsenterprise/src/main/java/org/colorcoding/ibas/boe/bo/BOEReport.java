package org.colorcoding.ibas.boe.bo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.boe.MyConsts;

/**
 * 获取-BOE报表
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BOEReport", namespace = MyConsts.NAMESPACE_BO)
public class BOEReport implements IBOEReport {

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
	 * 属性名称-唯一标识
	 */
	private static final String PROPERTY_SIGN_NAME = "Sign";
	private String sign;

	@XmlElement(name = PROPERTY_SIGN_NAME)
	public final String getSign() {
		return sign;
	}

	public final void setSign(String sign) {
		this.sign = sign;
	}

	/**
	 * 属性名称-报表名称
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

	/**
	 * 属性名称-报表描述
	 */
	private static final String PROPERTY_DESCRIPTION_NAME = "Description";
	private String description;

	@XmlElement(name = PROPERTY_DESCRIPTION_NAME)
	public final String getDescription() {
		return description;
	}

	public final void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 属性名称-报表类型
	 */
	private static final String PROPERTY_CATEGORY_NAME = "Category";
	private String category;

	@XmlElement(name = PROPERTY_CATEGORY_NAME)
	public final String getCategory() {
		return category;
	}

	public final void setCategory(String category) {
		this.category = category;
	}

	/**
	 * 属性名称-报表路径
	 */
	private static final String PROPERTY_PATH_NAME = "Path";
	private String path;

	@XmlElement(name = PROPERTY_PATH_NAME)
	public final String getPath() {
		return path;
	}

	public final void setPath(String path) {
		this.path = path;
	}

	/**
	 * 属性名称-报表组别
	 */
	private static final String PROPERTY_GROUP_NAME = "Group";
	private String group;

	@XmlElement(name = PROPERTY_GROUP_NAME)
	public final String getGroup() {
		return group;
	}

	public final void setGroup(String group) {
		this.group = group;
	}

	/**
	 * 属性名称-报表地址
	 */
	private static final String PROPERTY_URL_NAME = "Url";
	private String url;

	@XmlElement(name = PROPERTY_URL_NAME)
	public final String getUrl() {
		return url;
	}

	public final void setUrl(String url) {
		this.url = url;
	}

	/**
	 * 属性名称-报表服务地址
	 */
	private static final String PROPERTY_SERVER_NAME = "Server";
	private String server;

	@XmlElement(name = PROPERTY_SERVER_NAME)
	public final String getServer() {
		return server;
	}

	public final void setServer(String server) {
		this.server = server;
	}

	public String toString() {
		return String.format("{report: %s|%s}", this.getId(), this.getName());
	}
}
