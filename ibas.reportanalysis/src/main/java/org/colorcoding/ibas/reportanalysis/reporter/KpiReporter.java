package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.KeyText;

/**
 * KPI报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class KpiReporter extends Reporter {
	@Override
	public IDataTable run() throws ReportException {
		KeyText value = new KeyText();
		value.setKey("${Kpi}");
		value.setText("100");
		return this.create(new KeyText[] { value });
	}
}
