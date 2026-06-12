package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.DataTable;

/**
 * 报表远程服务
 * 
 * @author Niuren.Zhu
 *
 */
public interface IRemoteReporterService {

	/**
	 * 查询报表
	 * 
	 * @param criteria 查询条件
	 * @return 操作结果
	 */
	OperationResult<ReportData> fetchReportData(Criteria criteria);

	/**
	 * 查询报表组
	 * 
	 * @param criteria 查询条件
	 * @return 操作结果
	 */
	OperationResult<ReportGroup> fetchReportGroup(Criteria criteria);

	/**
	 * 运行报表
	 * 
	 * @param report 报表
	 * @return 操作结果
	 */
	OperationResult<DataTable> runReport(ReportData report);
}
