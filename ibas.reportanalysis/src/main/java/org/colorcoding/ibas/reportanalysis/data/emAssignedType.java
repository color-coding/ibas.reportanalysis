package org.colorcoding.ibas.reportanalysis.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

/**
 * 报表分配类型
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
