package org.colorcoding.ibas.reportanalysis.bo.report;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;

/**
* 报表运行日志 接口
* 
*/
public interface IReportRunningLog extends IBOSimple {

	/**
	* 获取-对象编号
	* 
	* @return 值
	*/
	Integer getObjectKey();

	/**
	* 设置-对象编号
	* 
	* @param value 值
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
	* @param value 值
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
	* @param value 值
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
	* @param value 值
	*/
	void setSeries(Integer value);

	/**
	* 获取-数据源
	* 
	* @return 值
	*/
	String getDataSource();

	/**
	* 设置-数据源
	* 
	* @param value 值
	*/
	void setDataSource(String value);

	/**
	* 获取-创建日期
	* 
	* @return 值
	*/
	DateTime getCreateDate();

	/**
	* 设置-创建日期
	* 
	* @param value 值
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
	* @param value 值
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
	* @param value 值
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
	* @param value 值
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
	* @param value 值
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
	* @param value 值
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
	* @param value 值
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
	* @param value 值
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
	* @param value 值
	*/
	void setDataOwner(Integer value);

	/**
	* 获取-编号
	* 
	* @return 值
	*/
	String getSign();

	/**
	* 设置-编号
	* 
	* @param value 值
	*/
	void setSign(String value);

	/**
	* 获取-报表
	* 
	* @return 值
	*/
	Integer getReport();

	/**
	* 设置-报表
	* 
	* @param value 值
	*/
	void setReport(Integer value);

	/**
	* 获取-报表名称
	* 
	* @return 值
	*/
	String getReportName();

	/**
	* 设置-报表名称
	* 
	* @param value 值
	*/
	void setReportName(String value);

	/**
	* 获取-运行人
	* 
	* @return 值
	*/
	String getRunner();

	/**
	* 设置-运行人
	* 
	* @param value 值
	*/
	void setRunner(String value);

	/**
	* 获取-开始日期
	* 
	* @return 值
	*/
	DateTime getStartDate();

	/**
	* 设置-开始日期
	* 
	* @param value 值
	*/
	void setStartDate(DateTime value);

	/**
	* 获取-开始时间
	* 
	* @return 值
	*/
	Short getStartTime();

	/**
	* 设置-开始时间
	* 
	* @param value 值
	*/
	void setStartTime(Short value);

	/**
	* 获取-结束日期
	* 
	* @return 值
	*/
	DateTime getEndDate();

	/**
	* 设置-结束日期
	* 
	* @param value 值
	*/
	void setEndDate(DateTime value);

	/**
	* 获取-结束时间
	* 
	* @return 值
	*/
	Short getEndTime();

	/**
	* 设置-结束时间
	* 
	* @param value 值
	*/
	void setEndTime(Short value);

	/**
	* 获取-参数文件
	* 
	* @return 值
	*/
	String getParameterFile();

	/**
	* 设置-参数文件
	* 
	* @param value 值
	*/
	void setParameterFile(String value);

	/**
	* 获取-结果文件
	* 
	* @return 值
	*/
	String getResultFile();

	/**
	* 设置-结果文件
	* 
	* @param value 值
	*/
	void setResultFile(String value);

	/**
	* 获取-备注
	* 
	* @return 值
	*/
	String getRemarks();

	/**
	* 设置-备注
	* 
	* @param value 值
	*/
	void setRemarks(String value);

}
