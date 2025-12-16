package org.colorcoding.ibas.reportanalysis.bo.report;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.IBOCustomKey;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 系统报表
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = SystemReport.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = SystemReport.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class SystemReport extends Report implements IBOCustomKey {

	private static final long serialVersionUID = 7584259362650748151L;

	public static final String BUSINESS_OBJECT_NAME = "SystemReport";

	@Override
	public final void setObjectKey(Integer value) {
		// 仅支持小于0的值
		if (value != null && Integer.compare(value, 0) < 0) {
			super.setObjectKey(value);
		}
	}

	public IBusinessLogicContract[] getContracts() {
		return new IBusinessLogicContract[] {};
	}
}
