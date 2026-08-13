package org.colorcoding.ibas.reportanalysis.bo.report;

import java.beans.PropertyChangeEvent;

import jakarta.xml.bind.annotation.XmlSeeAlso;
import jakarta.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

/**
 * 报表参数 集合
 */
@XmlType(name = ReportParameters.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ ReportParameter.class })
public class ReportParameters extends BusinessObjects<IReportParameter, IReport> implements IReportParameters {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "ReportParameters";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 3370934543226162380L;

	/**
	 * 构造方法
	 */
	public ReportParameters() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public ReportParameters(IReport parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return ReportParameter.class;
	}

	/**
	 * 创建报表参数
	 * 
	 * @return 报表参数
	 */
	public IReportParameter create() {
		IReportParameter item = new ReportParameter();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IReportParameter item) {
		super.afterAddItem(item);
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
	}
}
