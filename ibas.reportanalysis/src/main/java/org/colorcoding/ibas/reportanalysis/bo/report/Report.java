package org.colorcoding.ibas.reportanalysis.bo.report;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.MyConsts;
import org.colorcoding.ibas.reportanalysis.data.emReportType;

/**
 * 获取-报表
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Report.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlRootElement(name = Report.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@BOCode(Report.BUSINESS_OBJECT_CODE)
public class Report extends BusinessObject<Report> implements IReport, IDataOwnership {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 4230743963766512965L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Report.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_RA_ORPT";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_RA_REPORT";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "Report";

	/**
	 * 属性名称-对象编号
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 对象编号 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-对象编号
	 * 
	 * @param value
	 *            值
	 */
	public final void setObjectKey(Integer value) {
		this.setProperty(PROPERTY_OBJECTKEY, value);
	}

	/**
	 * 属性名称-对象类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 对象类型 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-对象类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-实例号
	 */
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	 * 实例号 属性
	 */
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-实例号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	 * 设置-实例号
	 * 
	 * @param value
	 *            值
	 */
	public final void setLogInst(Integer value) {
		this.setProperty(PROPERTY_LOGINST, value);
	}

	/**
	 * 属性名称-服务系列
	 */
	private static final String PROPERTY_SERIES_NAME = "Series";

	/**
	 * 服务系列 属性
	 */
	@DbField(name = "Series", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_SERIES = registerProperty(PROPERTY_SERIES_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-服务系列
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIES_NAME)
	public final Integer getSeries() {
		return this.getProperty(PROPERTY_SERIES);
	}

	/**
	 * 设置-服务系列
	 * 
	 * @param value
	 *            值
	 */
	public final void setSeries(Integer value) {
		this.setProperty(PROPERTY_SERIES, value);
	}

	/**
	 * 属性名称-数据源
	 */
	private static final String PROPERTY_DATASOURCE_NAME = "DataSource";

	/**
	 * 数据源 属性
	 */
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_DATASOURCE = registerProperty(PROPERTY_DATASOURCE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DATASOURCE_NAME)
	public final String getDataSource() {
		return this.getProperty(PROPERTY_DATASOURCE);
	}

	/**
	 * 设置-数据源
	 * 
	 * @param value
	 *            值
	 */
	public final void setDataSource(String value) {
		this.setProperty(PROPERTY_DATASOURCE, value);
	}

	/**
	 * 属性名称-创建日期
	 */
	private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

	/**
	 * 创建日期 属性
	 */
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_CREATEDATE = registerProperty(PROPERTY_CREATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEDATE_NAME)
	public final DateTime getCreateDate() {
		return this.getProperty(PROPERTY_CREATEDATE);
	}

	/**
	 * 设置-创建日期
	 * 
	 * @param value
	 *            值
	 */
	public final void setCreateDate(DateTime value) {
		this.setProperty(PROPERTY_CREATEDATE, value);
	}

	/**
	 * 属性名称-创建时间
	 */
	private static final String PROPERTY_CREATETIME_NAME = "CreateTime";

	/**
	 * 创建时间 属性
	 */
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_CREATETIME = registerProperty(PROPERTY_CREATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATETIME_NAME)
	public final Short getCreateTime() {
		return this.getProperty(PROPERTY_CREATETIME);
	}

	/**
	 * 设置-创建时间
	 * 
	 * @param value
	 *            值
	 */
	public final void setCreateTime(Short value) {
		this.setProperty(PROPERTY_CREATETIME, value);
	}

	/**
	 * 属性名称-更新日期
	 */
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	 * 更新日期 属性
	 */
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-更新日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	 * 设置-更新日期
	 * 
	 * @param value
	 *            值
	 */
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	 * 属性名称-更新时间
	 */
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	 * 更新时间 属性
	 */
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-更新时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	 * 设置-更新时间
	 * 
	 * @param value
	 *            值
	 */
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
	}

	/**
	 * 属性名称-创建用户
	 */
	private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

	/**
	 * 创建用户 属性
	 */
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_CREATEUSERSIGN = registerProperty(PROPERTY_CREATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEUSERSIGN_NAME)
	public final Integer getCreateUserSign() {
		return this.getProperty(PROPERTY_CREATEUSERSIGN);
	}

	/**
	 * 设置-创建用户
	 * 
	 * @param value
	 *            值
	 */
	public final void setCreateUserSign(Integer value) {
		this.setProperty(PROPERTY_CREATEUSERSIGN, value);
	}

	/**
	 * 属性名称-更新用户
	 */
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	 * 更新用户 属性
	 */
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-更新用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	 * 设置-更新用户
	 * 
	 * @param value
	 *            值
	 */
	public final void setUpdateUserSign(Integer value) {
		this.setProperty(PROPERTY_UPDATEUSERSIGN, value);
	}

	/**
	 * 属性名称-创建动作标识
	 */
	private static final String PROPERTY_CREATEACTIONID_NAME = "CreateActionId";

	/**
	 * 创建动作标识 属性
	 */
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CREATEACTIONID = registerProperty(PROPERTY_CREATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEACTIONID_NAME)
	public final String getCreateActionId() {
		return this.getProperty(PROPERTY_CREATEACTIONID);
	}

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value
	 *            值
	 */
	public final void setCreateActionId(String value) {
		this.setProperty(PROPERTY_CREATEACTIONID, value);
	}

	/**
	 * 属性名称-更新动作标识
	 */
	private static final String PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";

	/**
	 * 更新动作标识 属性
	 */
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_UPDATEACTIONID = registerProperty(PROPERTY_UPDATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEACTIONID_NAME)
	public final String getUpdateActionId() {
		return this.getProperty(PROPERTY_UPDATEACTIONID);
	}

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value
	 *            值
	 */
	public final void setUpdateActionId(String value) {
		this.setProperty(PROPERTY_UPDATEACTIONID, value);
	}

	/**
	 * 属性名称-数据所有者
	 */
	private static final String PROPERTY_DATAOWNER_NAME = "DataOwner";

	/**
	 * 数据所有者 属性
	 */
	@DbField(name = "DataOwner", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_DATAOWNER = registerProperty(PROPERTY_DATAOWNER_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-数据所有者
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DATAOWNER_NAME)
	public final Integer getDataOwner() {
		return this.getProperty(PROPERTY_DATAOWNER);
	}

	/**
	 * 设置-数据所有者
	 * 
	 * @param value
	 *            值
	 */
	public final void setDataOwner(Integer value) {
		this.setProperty(PROPERTY_DATAOWNER, value);
	}

	/**
	 * 属性名称-团队成员
	 */
	private static final String PROPERTY_TEAMMEMBERS_NAME = "TeamMembers";

	/**
	 * 团队成员 属性
	 */
	@DbField(name = "TeamMembers", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_TEAMMEMBERS = registerProperty(PROPERTY_TEAMMEMBERS_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-团队成员
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TEAMMEMBERS_NAME)
	public final String getTeamMembers() {
		return this.getProperty(PROPERTY_TEAMMEMBERS);
	}

	/**
	 * 设置-团队成员
	 * 
	 * @param value
	 *            值
	 */
	public final void setTeamMembers(String value) {
		this.setProperty(PROPERTY_TEAMMEMBERS, value);
	}

	/**
	 * 属性名称-数据所属组织
	 */
	private static final String PROPERTY_ORGANIZATION_NAME = "Organization";

	/**
	 * 数据所属组织 属性
	 */
	@DbField(name = "OrgCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ORGANIZATION = registerProperty(PROPERTY_ORGANIZATION_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-数据所属组织
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ORGANIZATION_NAME)
	public final String getOrganization() {
		return this.getProperty(PROPERTY_ORGANIZATION);
	}

	/**
	 * 设置-数据所属组织
	 * 
	 * @param value
	 *            值
	 */
	public final void setOrganization(String value) {
		this.setProperty(PROPERTY_ORGANIZATION, value);
	}

	/**
	 * 属性名称-报表名称
	 */
	private static final String PROPERTY_NAME_NAME = "Name";

	/**
	 * 报表名称 属性
	 */
	@DbField(name = "Name", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_NAME = registerProperty(PROPERTY_NAME_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-报表名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_NAME_NAME)
	public final String getName() {
		return this.getProperty(PROPERTY_NAME);
	}

	/**
	 * 设置-报表名称
	 * 
	 * @param value
	 *            值
	 */
	public final void setName(String value) {
		this.setProperty(PROPERTY_NAME, value);
	}

	/**
	 * 属性名称-是否启用
	 */
	private static final String PROPERTY_ACTIVATED_NAME = "Activated";

	/**
	 * 是否启用 属性
	 */
	@DbField(name = "Activated", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_ACTIVATED = registerProperty(PROPERTY_ACTIVATED_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-是否启用
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ACTIVATED_NAME)
	public final emYesNo getActivated() {
		return this.getProperty(PROPERTY_ACTIVATED);
	}

	/**
	 * 设置-是否启用
	 * 
	 * @param value
	 *            值
	 */
	public final void setActivated(emYesNo value) {
		this.setProperty(PROPERTY_ACTIVATED, value);
	}

	/**
	 * 属性名称-报表类型
	 */
	private static final String PROPERTY_CATEGORY_NAME = "Category";

	/**
	 * 报表类型 属性
	 */
	@DbField(name = "Category", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emReportType> PROPERTY_CATEGORY = registerProperty(PROPERTY_CATEGORY_NAME,
			emReportType.class, MY_CLASS);

	/**
	 * 获取-报表类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CATEGORY_NAME)
	public final emReportType getCategory() {
		return this.getProperty(PROPERTY_CATEGORY);
	}

	/**
	 * 设置-报表类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setCategory(emReportType value) {
		this.setProperty(PROPERTY_CATEGORY, value);
	}

	/**
	 * 属性名称-报表组别
	 */
	private static final String PROPERTY_GROUP_NAME = "Group";

	/**
	 * 报表组别 属性
	 */
	@DbField(name = "Group", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_GROUP = registerProperty(PROPERTY_GROUP_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-报表组别
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_GROUP_NAME)
	public final String getGroup() {
		return this.getProperty(PROPERTY_GROUP);
	}

	/**
	 * 设置-报表组别
	 * 
	 * @param value
	 *            值
	 */
	public final void setGroup(String value) {
		this.setProperty(PROPERTY_GROUP, value);
	}

	/**
	 * 属性名称-关联的业务对象
	 */
	private static final String PROPERTY_BOCODE_NAME = "BOCode";

	/**
	 * 关联的业务对象 属性
	 */
	@DbField(name = "BOCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_BOCODE = registerProperty(PROPERTY_BOCODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-关联的业务对象
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BOCODE_NAME)
	public final String getBOCode() {
		return this.getProperty(PROPERTY_BOCODE);
	}

	/**
	 * 设置-关联的业务对象
	 * 
	 * @param value
	 *            值
	 */
	public final void setBOCode(String value) {
		this.setProperty(PROPERTY_BOCODE, value);
	}

	/**
	 * 属性名称-关联的应用
	 */
	private static final String PROPERTY_APPLICATIONID_NAME = "ApplicationId";

	/**
	 * 关联的应用 属性
	 */
	@DbField(name = "AppId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_APPLICATIONID = registerProperty(PROPERTY_APPLICATIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-关联的应用
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_APPLICATIONID_NAME)
	public final String getApplicationId() {
		return this.getProperty(PROPERTY_APPLICATIONID);
	}

	/**
	 * 设置-关联的应用
	 * 
	 * @param value
	 *            值
	 */
	public final void setApplicationId(String value) {
		this.setProperty(PROPERTY_APPLICATIONID, value);
	}

	/**
	 * 属性名称-关联的报表
	 */
	private static final String PROPERTY_ASSOCIATEDREPORT_NAME = "AssociatedReport";

	/**
	 * 关联的报表 属性
	 */
	@DbField(name = "Associated", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ASSOCIATEDREPORT = registerProperty(
			PROPERTY_ASSOCIATEDREPORT_NAME, String.class, MY_CLASS);

	/**
	 * 获取-关联的报表
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ASSOCIATEDREPORT_NAME)
	public final String getAssociatedReport() {
		return this.getProperty(PROPERTY_ASSOCIATEDREPORT);
	}

	/**
	 * 设置-关联的报表
	 * 
	 * @param value
	 *            值
	 */
	public final void setAssociatedReport(String value) {
		this.setProperty(PROPERTY_ASSOCIATEDREPORT, value);
	}

	/**
	 * 属性名称-查询语句
	 */
	private static final String PROPERTY_SQLSTRING_NAME = "SqlString";

	/**
	 * 查询语句 属性
	 */
	@DbField(name = "SqlString", type = DbFieldType.MEMO, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_SQLSTRING = registerProperty(PROPERTY_SQLSTRING_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-查询语句
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SQLSTRING_NAME)
	public final String getSqlString() {
		return this.getProperty(PROPERTY_SQLSTRING);
	}

	/**
	 * 设置-查询语句
	 * 
	 * @param value
	 *            值
	 */
	public final void setSqlString(String value) {
		this.setProperty(PROPERTY_SQLSTRING, value);
	}

	/**
	 * 属性名称-服务器名称
	 */
	private static final String PROPERTY_SERVER_NAME = "Server";

	/**
	 * 服务器名称 属性
	 */
	@DbField(name = "Server", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_SERVER = registerProperty(PROPERTY_SERVER_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-服务器名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERVER_NAME)
	public final String getServer() {
		return this.getProperty(PROPERTY_SERVER);
	}

	/**
	 * 设置-服务器名称
	 * 
	 * @param value
	 *            值
	 */
	public final void setServer(String value) {
		this.setProperty(PROPERTY_SERVER, value);
	}

	/**
	 * 属性名称-用户名
	 */
	private static final String PROPERTY_USER_NAME = "User";

	/**
	 * 用户名 属性
	 */
	@DbField(name = "User", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_USER = registerProperty(PROPERTY_USER_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-用户名
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_USER_NAME)
	public final String getUser() {
		return this.getProperty(PROPERTY_USER);
	}

	/**
	 * 设置-用户名
	 * 
	 * @param value
	 *            值
	 */
	public final void setUser(String value) {
		this.setProperty(PROPERTY_USER, value);
	}

	/**
	 * 属性名称-密码
	 */
	private static final String PROPERTY_PASSWORD_NAME = "Password";

	/**
	 * 密码 属性
	 */
	@DbField(name = "Password", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_PASSWORD = registerProperty(PROPERTY_PASSWORD_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-密码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PASSWORD_NAME)
	public final String getPassword() {
		return this.getProperty(PROPERTY_PASSWORD);
	}

	/**
	 * 设置-密码
	 * 
	 * @param value
	 *            值
	 */
	public final void setPassword(String value) {
		this.setProperty(PROPERTY_PASSWORD, value);
	}

	/**
	 * 属性名称-报表地址
	 */
	private static final String PROPERTY_ADDRESS_NAME = "Address";

	/**
	 * 报表地址 属性
	 */
	@DbField(name = "Address", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ADDRESS = registerProperty(PROPERTY_ADDRESS_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-报表地址
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ADDRESS_NAME)
	public final String getAddress() {
		return this.getProperty(PROPERTY_ADDRESS);
	}

	/**
	 * 设置-报表地址
	 * 
	 * @param value
	 *            值
	 */
	public final void setAddress(String value) {
		this.setProperty(PROPERTY_ADDRESS, value);
	}

	/**
	 * 属性名称-报表参数
	 */
	private static final String PROPERTY_REPORTPARAMETERS_NAME = "ReportParameters";

	/**
	 * 报表参数的集合属性
	 * 
	 */
	public static final IPropertyInfo<IReportParameters> PROPERTY_REPORTPARAMETERS = registerProperty(
			PROPERTY_REPORTPARAMETERS_NAME, IReportParameters.class, MY_CLASS);

	/**
	 * 获取-报表参数集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_REPORTPARAMETERS_NAME)
	@XmlElement(name = ReportParameter.BUSINESS_OBJECT_NAME, type = ReportParameter.class)
	public final IReportParameters getReportParameters() {
		return this.getProperty(PROPERTY_REPORTPARAMETERS);
	}

	/**
	 * 设置-报表参数集合
	 * 
	 * @param value
	 *            值
	 */
	public final void setReportParameters(IReportParameters value) {
		this.setProperty(PROPERTY_REPORTPARAMETERS, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setReportParameters(new ReportParameters(this));
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));

	}

}
