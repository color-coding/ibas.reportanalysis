package org.colorcoding.ibas.reportanalysis.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

/**
 * 报表类型
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emReportType {
	/**
	 * 系统报表
	 */
	@Value("R")
	REPORT,
	/**
	 * 服务报表
	 */
	@Value("S")
	SERVICE,
	/**
	 * 报表文件
	 */
	@Value("F")
	FILE,
	/**
	 * 第三方应用
	 */
	@Value("A")
	THIRD_APP,
}
