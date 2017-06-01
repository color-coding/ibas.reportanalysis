package org.colorcoding.ibas.boe.bo;

/**
 * BOE报表 接口
 * 
 */
public interface IBOEReport {

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
	 * 获取-唯一标识
	 * 
	 * @return 值
	 */
	String getSign();

	/**
	 * 设置-唯一标识
	 * 
	 * @param value
	 *            值
	 */
	void setSign(String value);

	/**
	 * 获取-报表名称
	 * 
	 * @return 值
	 */
	String getName();

	/**
	 * 设置-报表名称
	 * 
	 * @param value
	 *            值
	 */
	void setName(String value);

	/**
	 * 获取-报表描述
	 * 
	 * @return 值
	 */
	String getDescription();

	/**
	 * 设置-报表描述
	 * 
	 * @param value
	 *            值
	 */
	void setDescription(String value);

	/**
	 * 获取-报表类型
	 * 
	 * @return 值
	 */
	String getCategory();

	/**
	 * 设置-报表类型
	 * 
	 * @param value
	 *            值
	 */
	void setCategory(String value);

	/**
	 * 获取-报表路径
	 * 
	 * @return 值
	 */
	String getPath();

	/**
	 * 设置-报表路径
	 * 
	 * @param value
	 *            值
	 */
	void setPath(String value);

	/**
	 * 获取-报表组别
	 * 
	 * @return 值
	 */
	String getGroup();

	/**
	 * 设置-报表组别
	 * 
	 * @param value
	 *            值
	 */
	void setGroup(String value);

	/**
	 * 获取-报表服务地址
	 * 
	 * @return 值
	 */
	String getServer();

	/**
	 * 设置-报表服务地址
	 * 
	 * @param value
	 *            值
	 */
	void setServer(String value);

	/**
	 * 获取-报表地址
	 * 
	 * @return 值
	 */
	String getUrl();

	/**
	 * 设置-报表地址
	 * 
	 * @param value
	 *            值
	 */
	void setUrl(String value);
}
