package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;

/**
 * 报表者
 * 
 * @author Niuren.Zhu
 *
 */
public interface IReporter {
	/**
	 * 运行报表
	 * 
	 * @param report
	 *            用户报表
	 * @return
	 * @throws Exception
	 */
	IDataTable run(ExecuteReport report) throws ReportException;
}
