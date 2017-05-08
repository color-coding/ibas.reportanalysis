package org.colorcoding.ibas.reportanalysis.repository;

import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.messages.MessageLevel;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.bobas.organization.IOrganizationManager;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.organization.fantasy.OrganizationManager;
import org.colorcoding.ibas.bobas.ownership.PermissionGroup;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.IReportBook;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.ReportBook;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReport;
import org.colorcoding.ibas.reportanalysis.reporter.IReporter;
import org.colorcoding.ibas.reportanalysis.reporter.ReporterFacotry;

/**
 * ReportAnalysis仓库
 */
@PermissionGroup("ReportAnalysis")
public class BORepositoryReportAnalysis extends BORepositoryServiceApplication
		implements IBORepositoryReportAnalysisSvc, IBORepositoryReportAnalysisApp {

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
	public OperationResult<UserReport> fetchUserReports(String user, String token) {
		OperationResult<UserReport> opRslt = new OperationResult<UserReport>();
		try {
			this.setUserToken(token);
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(Report.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			// 自己的查询
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(Report.PROPERTY_DATAOWNER.getName());
			condition.setValue(this.getCurrentUser().getId());
			// 所属角色的查询
			IOrganizationManager manager = OrganizationFactory.create().createManager();
			if (manager instanceof OrganizationManager) {
				OrganizationManager ifManager = (OrganizationManager) manager;
				for (String role : ifManager.getUserRoles(this.getCurrentUser())) {
					condition = criteria.getConditions().create();
					condition.setRelationship(ConditionRelationship.OR);
					condition.setAlias(Report.PROPERTY_GROUP.getName());
					condition.setValue(role);
				}
			}
			condition.setBracketClose(1);
			IOperationResult<Report> opRsltFetch = this.fetchReport(criteria, token);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			for (Report boItem : opRsltFetch.getResultObjects()) {
				UserReport uReport = UserReport.create(boItem);
				boolean has = false;
				for (UserReport uItem : opRslt.getResultObjects()) {
					if (uItem.getId().equals(uReport.getId())) {
						has = true;
						break;
					}
				}
				if (!has) {
					// 已存在不再添加
					opRslt.addResultObjects(uReport);
				}
			}
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	/**
	 * 查询-用户报表
	 * 
	 * @param user
	 *            用户
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public IOperationResult<UserReport> fetchUserReports(String user) {
		return this.fetchUserReports(user);
	}

	public static final String MSG_USER_RUN_REPORT = "report: user [%s] runs report [%s - %s].";

	/**
	 * 运行-用户报表
	 * 
	 * @param report
	 *            用户报表
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<DataTable> runUserReport(UserReport report, String token) {
		OperationResult<DataTable> opRslt = new OperationResult<DataTable>();
		try {
			this.setUserToken(token);
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(Report.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition = criteria.getConditions().create();
			condition.setAlias(Report.PROPERTY_OBJECTKEY.getName());
			condition.setValue(report.getId());
			IOperationResult<Report> opRsltFetch = this.fetchReport(criteria, token);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			Report boReport = opRsltFetch.getResultObjects().firstOrDefault();
			if (boReport == null) {
				throw new Exception(i18n.prop("msg_ra_not_found_report",
						report.getName() != null ? report.getName() : report.getId()));
			}
			RuntimeLog.log(MessageLevel.DEBUG, MSG_USER_RUN_REPORT, this.getCurrentUser().getId(),
					boReport.getObjectKey(), boReport.getName());
			ReporterFacotry facotry = ReporterFacotry.create();
			IReporter reporter = facotry.create(report);
			opRslt.addResultObjects(reporter.run(boReport));
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	/**
	 * 运行-用户报表
	 * 
	 * @param report
	 *            用户报表
	 * @return 操作结果
	 */
	public IOperationResult<DataTable> runUserReport(UserReport report) {
		return this.runUserReport(report, this.getUserToken());
	}

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
	public OperationResult<Report> fetchReport(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Report.class);
	}

	/**
	 * 查询-报表（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IReport> fetchReport(ICriteria criteria) {
		return new OperationResult<IReport>(this.fetchReport(criteria, this.getUserToken()));
	}

	/**
	 * 保存-报表
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Report> saveReport(Report bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-报表（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IReport> saveReport(IReport bo) {
		return new OperationResult<IReport>(this.saveReport((Report) bo, this.getUserToken()));
	}

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
	public OperationResult<ReportBook> fetchReportBook(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ReportBook.class);
	}

	/**
	 * 查询-报表簿（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IReportBook> fetchReportBook(ICriteria criteria) {
		return new OperationResult<IReportBook>(this.fetchReportBook(criteria, this.getUserToken()));
	}

	/**
	 * 保存-报表簿
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ReportBook> saveReportBook(ReportBook bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-报表簿（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IReportBook> saveReportBook(IReportBook bo) {
		return new OperationResult<IReportBook>(this.saveReportBook((ReportBook) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
}
