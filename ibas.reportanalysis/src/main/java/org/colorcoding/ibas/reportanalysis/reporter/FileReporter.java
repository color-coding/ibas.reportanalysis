package org.colorcoding.ibas.reportanalysis.reporter;

import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;

/**
 * 文件报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class FileReporter extends Reporter {

	public static final String PARAMETER_NAME_URL = "${Url}";
	public static final String PARAMETER_NAME_ADDRESS = "${Address}";

	public String getAddress() throws ReportException {
		return this.getParameterValue(PARAMETER_NAME_ADDRESS);
	}

	@Override
	protected IDataTable run() throws ReportException {
		try {
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(this.getAddress());
			int length = stringBuilder.length();
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (item.getCategory() == emReportParameterType.PRESET
						&& (item.getName().equalsIgnoreCase(PARAMETER_NAME_ADDRESS)
								|| item.getName().equalsIgnoreCase(PARAMETER_NAME_URL))) {
					// 跳过已使用变量
					continue;
				}
				if (length == stringBuilder.length()) {
					stringBuilder.append("?");
				} else {
					stringBuilder.append("&");
				}
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
