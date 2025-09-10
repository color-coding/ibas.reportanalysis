package org.colorcoding.ibas.reportanalysis.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.bo.report.ReportRunningLog;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.ReportBook;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReport;
import org.colorcoding.ibas.reportanalysis.repository.BORepositoryReportAnalysis;

/**
 * ReportAnalysis 数据服务JSON
 */
@Path("data")
public class DataService extends BORepositoryReportAnalysis {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户报表
	 * 
	 * @param user  用户
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserReports")
	public OperationResult<UserReport> fetchUserReports(@QueryParam("user") String user,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchUserReports(user, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 运行-用户报表
	 * 
	 * @param report 用户报表
	 * @param token  口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("runUserReport")
	public OperationResult<DataTable> runUserReport(UserReport report,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.runUserReport(report, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReport")
	public OperationResult<Report> fetchReport(Criteria criteria, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.fetchReport(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-报表
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveReport")
	public OperationResult<Report> saveReport(Report bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveReport(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表簿
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReportBook")
	public OperationResult<ReportBook> fetchReportBook(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchReportBook(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-报表簿
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveReportBook")
	public OperationResult<ReportBook> saveReportBook(ReportBook bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveReportBook(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表运行日志
	 * @param criteria 查询
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReportRunningLog")
	public OperationResult<ReportRunningLog> fetchReportRunningLog(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchReportRunningLog(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-报表运行日志
	 * @param bo 对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveReportRunningLog")
	public OperationResult<ReportRunningLog> saveReportRunningLog(ReportRunningLog bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveReportRunningLog(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//

}
