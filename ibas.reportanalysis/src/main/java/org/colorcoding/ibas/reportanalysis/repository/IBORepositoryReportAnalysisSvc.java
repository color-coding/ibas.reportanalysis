package org.colorcoding.ibas.reportanalysis.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.repository.IBORepositorySmartService;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.ReportBook;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReport;

/**
 * ReportAnalysis仓库服务
 */
public interface IBORepositoryReportAnalysisSvc extends IBORepositorySmartService {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户报表
	 * 
	 * @param user
	 *            用户
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<UserReport> fetchUserReports(String user, String token);

	/**
	 * 运行-用户报表
	 * 
	 * @param report
	 *            用户报表
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<DataTable> runUserReport(UserReport report, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Report> fetchReport(ICriteria criteria, String token);

	/**
	 * 保存-报表
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Report> saveReport(Report bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表簿
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<ReportBook> fetchReportBook(ICriteria criteria, String token);

	/**
	 * 保存-报表簿
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<ReportBook> saveReportBook(ReportBook bo, String token);

	// --------------------------------------------------------------------------------------------//

}
