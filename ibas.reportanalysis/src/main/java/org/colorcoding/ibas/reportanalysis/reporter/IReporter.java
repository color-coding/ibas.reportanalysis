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
	 * 获取-ID
	 * @return
	 */
	String getId();

	/**
	 * 获取-是否追踪
	 * @return
	 */
	boolean isTraced();

	/**
	 * 设置-是否追踪
	 */
	void setTraced(boolean value);

	/**
	 * 获取-工作目录
	 * @return
	 */
	String getWorkFolder();

	/**
	 * 设置-工作目录
	 */
	void setWorkFolder(String value);

	/**
	 * 获取-运行报表的人
	 * @return
	 */
	String getRunner();

	/**
	 * 设置-运行报表的人
	 */
	void setRunner(String value);

	/**
	 * 运行报表
	 * 
	 * @param report
	 *            用户报表
	 * @return
	 * @throws Exception
	 */
	IDataTable run(ExecuteReport report) throws ReporterException;
}
