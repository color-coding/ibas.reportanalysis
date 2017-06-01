package org.colorcoding.ibas.boe.bo;

/**
 * BOE文件夹 接口
 * 
 */
public interface IBOEFolder {

	/**
	 * 获取-编号
	 * 
	 * @return 值
	 */
	int getId();

	/**
	 * 设置-编号
	 * 
	 * @param value
	 *            值
	 */
	void setId(int value);

	/**
	 * 获取-父项编号
	 * 
	 * @return 值
	 */
	int getParentId();

	/**
	 * 设置-父项编号
	 * 
	 * @param value
	 *            值
	 */
	void setParentId(int value);

	/**
	 * 获取-文件夹名称
	 * 
	 * @return 值
	 */
	String getName();

	/**
	 * 设置-文件夹名称
	 * 
	 * @param value
	 *            值
	 */
	void setName(String value);

}
