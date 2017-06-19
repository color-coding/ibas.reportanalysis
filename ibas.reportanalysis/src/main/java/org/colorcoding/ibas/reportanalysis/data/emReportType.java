package org.colorcoding.ibas.reportanalysis.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 报表类型
 * 
 * @author Niuren.Zhu
 *
 */
public enum emReportType {
	/**
	 * 系统报表
	 */
	@Value("R")
	REPORT,
	/**
	 * 报表服务
	 */
	@Value("B")
	BOE,
	/**
	 * 绩效指标
	 */
	@Value("K")
	KPI,
	/**
	 * 报表文件
	 */
	@Value("F")
	FILE,
}
