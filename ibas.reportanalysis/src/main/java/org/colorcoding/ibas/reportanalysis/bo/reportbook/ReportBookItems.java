package org.colorcoding.ibas.reportanalysis.bo.reportbook;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.reportanalysis.MyConsts;

/**
 * 报表簿-项目 集合
 */
@XmlType(name = ReportBookItems.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlSeeAlso({ ReportBookItem.class })
public class ReportBookItems extends BusinessObjects<IReportBookItem, IReportBook> implements IReportBookItems {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "ReportBookItems";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -3905084987785161334L;

	/**
	 * 构造方法
	 */
	public ReportBookItems() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public ReportBookItems(IReportBook parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return ReportBookItem.class;
	}

	/**
	 * 创建报表簿-项目
	 * 
	 * @return 报表簿-项目
	 */
	public IReportBookItem create() {
		IReportBookItem item = new ReportBookItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IReportBookItem item) {
		super.afterAddItem(item);
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
	}
}
