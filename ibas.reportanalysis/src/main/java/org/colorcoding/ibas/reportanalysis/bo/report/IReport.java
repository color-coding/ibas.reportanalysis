package org.colorcoding.ibas.reportanalysis.bo.report;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.reportanalysis.data.emReportType;

/**
 * 报表 接口
 * 
 */
public interface IReport extends IBOSimple {

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	Integer getObjectKey();

	/**
	 * 设置-对象编号
	 * 
	 * @param value
	 *            值
	 */
	void setObjectKey(Integer value);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-对象类型
	 * 
	 * @param value
	 *            值
	 */
	void setObjectCode(String value);

	/**
	 * 获取-实例号
	 * 
	 * @return 值
	 */
	Integer getLogInst();

	/**
	 * 设置-实例号
	 * 
	 * @param value
	 *            值
	 */
	void setLogInst(Integer value);

	/**
	 * 获取-服务系列
	 * 
	 * @return 值
	 */
	Integer getSeries();

	/**
	 * 设置-服务系列
	 * 
	 * @param value
	 *            值
	 */
	void setSeries(Integer value);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	DateTime getCreateDate();

	/**
	 * 设置-创建日期
	 * 
	 * @param value
	 *            值
	 */
	void setCreateDate(DateTime value);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	Short getCreateTime();

	/**
	 * 设置-创建时间
	 * 
	 * @param value
	 *            值
	 */
	void setCreateTime(Short value);

	/**
	 * 获取-更新日期
	 * 
	 * @return 值
	 */
	DateTime getUpdateDate();

	/**
	 * 设置-更新日期
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateDate(DateTime value);

	/**
	 * 获取-更新时间
	 * 
	 * @return 值
	 */
	Short getUpdateTime();

	/**
	 * 设置-更新时间
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateTime(Short value);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	Integer getCreateUserSign();

	/**
	 * 设置-创建用户
	 * 
	 * @param value
	 *            值
	 */
	void setCreateUserSign(Integer value);

	/**
	 * 获取-更新用户
	 * 
	 * @return 值
	 */
	Integer getUpdateUserSign();

	/**
	 * 设置-更新用户
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateUserSign(Integer value);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	String getCreateActionId();

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value
	 *            值
	 */
	void setCreateActionId(String value);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	String getUpdateActionId();

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateActionId(String value);

	/**
	 * 获取-数据所有者
	 * 
	 * @return 值
	 */
	Integer getDataOwner();

	/**
	 * 设置-数据所有者
	 * 
	 * @param value
	 *            值
	 */
	void setDataOwner(Integer value);

	/**
	 * 获取-团队成员
	 * 
	 * @return 值
	 */
	String getTeamMembers();

	/**
	 * 设置-团队成员
	 * 
	 * @param value
	 *            值
	 */
	void setTeamMembers(String value);

	/**
	 * 获取-数据所属组织
	 * 
	 * @return 值
	 */
	String getOrganization();

	/**
	 * 设置-数据所属组织
	 * 
	 * @param value
	 *            值
	 */
	void setOrganization(String value);

	/**
	 * 获取-报表名称
	 * 
	 * @return 值
	 */
	String getName();

	/**
	 * 设置-报表名称
	 * 
	 * @param value
	 *            值
	 */
	void setName(String value);

	/**
	 * 获取-是否启用
	 * 
	 * @return 值
	 */
	emYesNo getActivated();

	/**
	 * 设置-是否启用
	 * 
	 * @param value
	 *            值
	 */
	void setActivated(emYesNo value);

	/**
	 * 获取-报表类型
	 * 
	 * @return 值
	 */
	emReportType getCategory();

	/**
	 * 设置-报表类型
	 * 
	 * @param value
	 *            值
	 */
	void setCategory(emReportType value);

	/**
	 * 获取-报表组别
	 * 
	 * @return 值
	 */
	String getGroup();

	/**
	 * 设置-报表组别
	 * 
	 * @param value
	 *            值
	 */
	void setGroup(String value);

	/**
	 * 获取-关联的业务对象
	 * 
	 * @return 值
	 */
	String getBOCode();

	/**
	 * 设置-关联的业务对象
	 * 
	 * @param value
	 *            值
	 */
	void setBOCode(String value);

	/**
	 * 获取-关联的应用
	 * 
	 * @return 值
	 */
	String getApplicationId();

	/**
	 * 设置-关联的应用
	 * 
	 * @param value
	 *            值
	 */
	void setApplicationId(String value);

	/**
	 * 获取-关联的报表
	 * 
	 * @return 值
	 */
	String getAssociatedReport();

	/**
	 * 设置-关联的报表
	 * 
	 * @param value
	 *            值
	 */
	void setAssociatedReport(String value);

	/**
	 * 获取-查询语句
	 * 
	 * @return 值
	 */
	String getSqlString();

	/**
	 * 设置-查询语句
	 * 
	 * @param value
	 *            值
	 */
	void setSqlString(String value);

	/**
	 * 获取-服务器名称
	 * 
	 * @return 值
	 */
	String getServer();

	/**
	 * 设置-服务器名称
	 * 
	 * @param value
	 *            值
	 */
	void setServer(String value);

	/**
	 * 获取-用户名
	 * 
	 * @return 值
	 */
	String getUser();

	/**
	 * 设置-用户名
	 * 
	 * @param value
	 *            值
	 */
	void setUser(String value);

	/**
	 * 获取-密码
	 * 
	 * @return 值
	 */
	String getPassword();

	/**
	 * 设置-密码
	 * 
	 * @param value
	 *            值
	 */
	void setPassword(String value);

	/**
	 * 获取-报表地址
	 * 
	 * @return 值
	 */
	String getAddress();

	/**
	 * 设置-报表地址
	 * 
	 * @param value
	 *            值
	 */
	void setAddress(String value);

	/**
	 * 获取-报表参数集合
	 * 
	 * @return 值
	 */
	IReportParameters getReportParameters();

	/**
	 * 设置-报表参数集合
	 * 
	 * @param value
	 *            值
	 */
	void setReportParameters(IReportParameters value);

}
