package org.colorcoding.ibas.reportanalysis.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

/**
 * 报表参数类型
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emReportParameterType {
	/**
	 * 自由文本
	 */
	@Value("TXT")
	TEXT,
	/**
	 * 日期
	 */
	@Value("DATE")
	DATETIME,
	/**
	 * 系统变量
	 */
	@Value("SYS")
	SYSTEM,

	/**
	 * 范围值
	 */
	@Value("RANG")
	RANGE,

	/**
	 * 预置值
	 */
	@Value("SET")
	PRESET,

	/**
	 * 选择列表
	 */
	@Value("CHS")
	CHOOSE_LIST,
}
