package org.colorcoding.ibas.reportanalysis.reporter;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.Properties;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Files;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.file.FileItem;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.repository.FileRepository;
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
	public static final String PARAM_NAME_REPORT_NAME = "ReportName";
	public static final String PARAM_NAME_REPORT_FILE = "ReportFile";
	public static final String URL_HEAD_FILE = "file://";

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
			Properties params = new Properties();
			params.put(PARAM_NAME_REPORT, this.getAddress());
			if (this.getAddress() != null && this.getAddress().startsWith(URL_HEAD_FILE)) {
				// 获取文件地址
				try (FileRepository fileRepository = new FileRepository()) {
					fileRepository.setRepositoryFolder(MyConfiguration.getDocumetsFolder());
					fileRepository.setGroupingFiles(MyConfiguration
							.getConfigValue(MyConfiguration.CONFIG_ITEM_FILE_REPOSITORY_GROUPING_FILES, true));
					Criteria criteria = new Criteria();
					ICondition condition = criteria.getConditions().create();
					condition.setAlias(FileRepository.CONDITION_ALIAS_FILE_NAME);
					condition.setValue(this.getAddress().substring(URL_HEAD_FILE.length()));
					IOperationResult<FileItem> opRsltFile = fileRepository.fetch(criteria);
					if (opRsltFile.getError() != null) {
						throw opRsltFile.getError();
					}
					if (opRsltFile.getResultObjects().isEmpty()) {
						throw new FileNotFoundException(this.getAddress());
					}
					for (FileItem fileItem : opRsltFile.getResultObjects()) {
						File file = Files.valueOf(MyConfiguration.getTempFolder(), this.getId(), fileItem.getName());
						if (file.getParentFile().mkdirs()) {
							try (FileOutputStream outputStream = new FileOutputStream(file)) {
								fileItem.writeTo(outputStream);
								outputStream.flush();
							}
							params.put(PARAM_NAME_REPORT_FILE, file);
							Logger.log(MessageLevel.DEBUG, "%s: write file [%s] to [%s].", application,
									fileItem.getName(), file.getPath());
						}
					}
				}
			}
			params.put(PARAM_NAME_REPORT_NAME, this.getReport().getName());
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
		} finally {
			// 清理临时目录
			File file = Files.valueOf(MyConfiguration.getTempFolder(), this.getId());
			if (file.exists() && file.canWrite()) {
				file.delete();
			}
		}
	}

}
