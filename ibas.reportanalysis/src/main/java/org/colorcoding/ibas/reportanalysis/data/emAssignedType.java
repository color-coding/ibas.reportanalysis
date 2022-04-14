package org.colorcoding.ibas.reportanalysis.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 报表分配类型
 * 
 * @author Niuren.Zhu
 *
 */
public enum emAssignedType {
	/**
	 * 用户
	 */
	@Value("U")
	USER,
	/**
	 * 角色
	 */
	@Value("R")
	ROLE,
	/**
	 * 全部
	 */
	@Value("A")
	ALL,
}
