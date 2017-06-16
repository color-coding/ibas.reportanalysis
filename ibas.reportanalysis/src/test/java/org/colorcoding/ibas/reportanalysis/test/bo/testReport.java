package org.colorcoding.ibas.reportanalysis.test.bo;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.repository.BORepositoryReportAnalysis;
import org.colorcoding.ibas.reportanalysis.repository.IBORepositoryReportAnalysisApp;

import junit.framework.TestCase;

/**
 * 报表 测试
 * 
 */
public class testReport extends TestCase {
	/**
	 * 获取连接口令
	 */
	String getToken() {
		return "";
	}

	/**
	 * 基本项目测试
	 * 
	 * @throws Exception
	 */
	public void testBasicItems() throws Exception {
		Report bo = new Report();
		// 测试属性赋值

		// 测试报表参数
		IReportParameter reportparameter = bo.getReportParameters().create();
		// 测试属性赋值

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryReportAnalysisApp boRepository = new BORepositoryReportAnalysis();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		// 测试保存
		operationResult = boRepository.saveReport(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		Report boSaved = (Report) operationResult.getResultObjects().firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchReport(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

}
