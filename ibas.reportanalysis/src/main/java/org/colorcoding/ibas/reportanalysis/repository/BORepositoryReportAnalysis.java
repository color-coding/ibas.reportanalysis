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
import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.IReportBook;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.IReportBookItem;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.ReportBook;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReport;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReportParameter;
import org.colorcoding.ibas.reportanalysis.data.emAssignedType;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;
import org.colorcoding.ibas.reportanalysis.reporter.ExecuteReport;
import org.colorcoding.ibas.reportanalysis.reporter.ExecuteReportParameter;
import org.colorcoding.ibas.reportanalysis.reporter.IReporter;
import org.colorcoding.ibas.reportanalysis.reporter.ReporterFactories;

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
			condition.setAlias(ReportBook.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			// 自己的查询
			condition = criteria.getConditions().create();
			condition.setBracketOpen(2);
			condition.setAlias(ReportBook.PROPERTY_ASSIGNEDTYPE.getName());
			condition.setValue(emAssignedType.USER);
			condition = criteria.getConditions().create();
			condition.setAlias(ReportBook.PROPERTY_ASSIGNED.getName());
			condition.setValue(user);
			condition.setBracketClose(1);
			// 所属角色的查询
			IOrganizationManager manager = OrganizationFactory.create().createManager();
			if (manager instanceof OrganizationManager) {
				OrganizationManager ifManager = (OrganizationManager) manager;
				for (String role : ifManager.getUserRoles(this.getCurrentUser())) {
					condition = criteria.getConditions().create();
					condition.setRelationship(ConditionRelationship.OR);
					condition.setBracketOpen(1);
					condition.setAlias(ReportBook.PROPERTY_ASSIGNEDTYPE.getName());
					condition.setValue(emAssignedType.ROLE);
					condition = criteria.getConditions().create();
					condition.setAlias(ReportBook.PROPERTY_ASSIGNED.getName());
					condition.setValue(role);
					condition.setBracketClose(1);
				}
			}
			condition.setBracketClose(2);
			IOperationResult<ReportBook> opRsltBook = this.fetchReportBook(criteria, token);
			if (opRsltBook.getError() != null) {
				throw opRsltBook.getError();
			}
			if (opRsltBook.getResultCode() != 0) {
				throw new Exception(opRsltBook.getMessage());
			}
			ArrayList<IReportBookItem> bookItems = new ArrayList<>();
			// 获取报表项目列表，并去重
			for (IReportBook rptItem : opRsltBook.getResultObjects()) {
				for (IReportBookItem bkItem : rptItem.getReportBookItems()) {
					if (bookItems.firstOrDefault(item -> item.getReport().equals(bkItem.getReport())) == null) {
						bookItems.add(bkItem);
					}
				}
			}
			if (bookItems.size() > 0) {
				// 配置了报表簿项目，则查询对应报表
				criteria = new Criteria();
				condition = criteria.getConditions().create();
				condition.setAlias(ReportBook.PROPERTY_ACTIVATED.getName());
				condition.setValue(emYesNo.YES);
				for (IReportBookItem item : bookItems) {
					condition = criteria.getConditions().create();
					condition.setRelationship(ConditionRelationship.OR);
					condition.setAlias(ReportBook.PROPERTY_OBJECTKEY.getName());
					condition.setValue(item.getReport());
					if (criteria.getConditions().size() == 2) {
						// 第一个报表查询加括号
						condition.setBracketOpen(1);
						condition.setRelationship(ConditionRelationship.AND);
					}
				}
				if (criteria.getConditions().size() > 1) {
					// 存在报表查询，则加关闭括号
					condition.setBracketClose(1);
				}
				// 查询报表
				IOperationResult<Report> opRsltRpt = this.fetchReport(criteria, token);
				if (opRsltRpt.getError() != null) {
					throw opRsltRpt.getError();
				}
				if (opRsltRpt.getResultCode() != 0) {
					throw new Exception(opRsltRpt.getMessage());
				}
				// 创建用户报表
				for (Report rptItem : opRsltRpt.getResultObjects()) {
					opRslt.addResultObjects(UserReport.create(rptItem));
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
			ExecuteReport exeReport = ExecuteReport.create(boReport);
			// 传递参数
			for (ExecuteReportParameter rnItem : exeReport.getParameters()) {
				if (rnItem.getCategory() == emReportParameterType.PRESET) {
					continue;
				}
				for (UserReportParameter usItem : report.getParameters()) {
					if (rnItem.getName().equals(usItem.getName())) {
						rnItem.setValue(usItem.getValue());
					}
				}
			}
			IReporter reporter = ReporterFactories.create().create(exeReport);
			if (reporter == null) {
				throw new Exception(i18n.prop("msg_ra_not_allowed_run_report",
						report.getName() != null ? report.getName() : report.getId()));
			}
			RuntimeLog.log(MessageLevel.DEBUG, MSG_USER_RUN_REPORT, this.getCurrentUser().getId(),
					boReport.getObjectKey(), boReport.getName());
			// 运行报表
			opRslt.addResultObjects(reporter.run(exeReport));
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
