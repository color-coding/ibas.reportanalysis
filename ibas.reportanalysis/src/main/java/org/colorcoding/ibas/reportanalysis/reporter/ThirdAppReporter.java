package org.colorcoding.ibas.reportanalysis.reporter;

import java.util.HashMap;
import java.util.Map;

import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.thirdpartyapp.client.ApplicationClient;
import org.colorcoding.ibas.thirdpartyapp.client.ApplicationClientManager;

/**
 * 第三方应用报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class ThirdAppReporter extends Reporter {

	public static final String PARAMETER_NAME_ADDRESS = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_ADDRESS.getName());
	public static final String PARAMETER_NAME_APPLICATION = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_THIRDPARTYAPP.getName());
	public static final String PARAM_NAME_REPORT = "Report";

	public String getAddress() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_ADDRESS);
	}

	public String getApplication() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_APPLICATION);
	}

	@Override
	public IDataTable run() throws ReporterException {
		String application = this.getApplication();
		if (application == null || application.isEmpty()) {
			throw new ReporterException(I18N.prop("msg_ra_invaild_third_party_app"));
		}
		ApplicationClient client = ApplicationClientManager.newInstance().create(application);
		if (client == null) {
			throw new ReporterException(I18N.prop("msg_ra_invaild_third_party_app"));
		}
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put(PARAM_NAME_REPORT, this.getAddress());
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (item.getName() == null) {
					continue;
				}
				if (PARAMETER_NAME_APPLICATION.equalsIgnoreCase(item.getName())) {
					continue;
				}
				if (PARAMETER_NAME_ADDRESS.equalsIgnoreCase(item.getName())) {
					continue;
				}
				if (item.getValue() == null) {
					continue;
				}
				params.put(item.getName(), item.getValue());
			}
			IOperationResult<IDataTable> opRslt = client.execute("runReport", params);
			if (opRslt.getError() != null) {
				throw new ReporterException(opRslt.getError());
			}
			if (opRslt.getResultObjects().size() == 0) {
				throw new ReporterException(I18N.prop("msg_ra_invaild_reponse_data"));
			}
			return opRslt.getResultObjects().firstOrDefault();
		} catch (Exception e) {
			throw new ReporterException(e);
		}
	}

}
