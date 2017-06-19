package org.colorcoding.ibas.boe.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.boe.repository.BOEService;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;
import org.colorcoding.ibas.reportanalysis.reporter.ExecuteReportParameter;
import org.colorcoding.ibas.reportanalysis.reporter.ReportException;
import org.colorcoding.ibas.reportanalysis.reporter.Reporter;

public class BOEReporter extends Reporter {

	public static final String PARAMETER_NAME_USER = "${User}";
	public static final String PARAMETER_NAME_PASSWORD = "${Password}";
	public static final String PARAMETER_NAME_ADDRESS = "${Address}";
	public static final String PARAMETER_NAME_URL = "${Url}";
	public static final String PARAMETER_NAME_TOKEN = "${Token}";
	public static final String PARAMETER_NAME_SERVER = "${Server}";

	public String getServer() throws ReportException {
		return this.getParameterValue(PARAMETER_NAME_SERVER);
	}

	public String getUser() throws ReportException {
		return this.getParameterValue(PARAMETER_NAME_USER);
	}

	public String getPassword() throws ReportException {
		return this.getParameterValue(PARAMETER_NAME_PASSWORD);
	}

	public String getAddress() throws ReportException {
		return this.getParameterValue(PARAMETER_NAME_ADDRESS);
	}

	@Override
	protected IDataTable run() throws ReportException {
		try {
			BOEService boeService = new BOEService();
			boeService.setAddress(this.getServer());
			boeService.logon(this.getUser(), this.getPassword());
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(this.getAddress().replace(PARAMETER_NAME_TOKEN, boeService.getToken()));
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (item.getCategory() == emReportParameterType.PRESET
						&& (item.getName().equalsIgnoreCase(PARAMETER_NAME_USER)
								|| item.getName().equalsIgnoreCase(PARAMETER_NAME_PASSWORD)
								|| item.getName().equalsIgnoreCase(PARAMETER_NAME_ADDRESS)
								|| item.getName().equalsIgnoreCase(PARAMETER_NAME_URL)
								|| item.getName().equalsIgnoreCase(PARAMETER_NAME_TOKEN)
								|| item.getName().equalsIgnoreCase(PARAMETER_NAME_SERVER))) {
					// 跳过已使用变量
					continue;
				}
				stringBuilder.append("&");
				stringBuilder.append(item.getName().replace("${", "").replace("}", ""));
				stringBuilder.append("=");
				stringBuilder.append(item.getValue());
			}
			KeyText keyText = new KeyText();
			keyText.setKey(PARAMETER_NAME_URL);
			keyText.setText(stringBuilder.toString());
			return this.create(new KeyText[] { keyText });
		} catch (Exception e) {
			throw new ReportException(e);
		}
	}
}
