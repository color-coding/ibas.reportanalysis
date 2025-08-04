package org.colorcoding.ibas.reportanalysis.service.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.repository.FileRepository;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasyShell;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.IReport;
import org.colorcoding.ibas.reportanalysis.bo.report.IReportParameter;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReport;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReportParameter;
import org.colorcoding.ibas.reportanalysis.data.emReportParameterType;
import org.colorcoding.ibas.reportanalysis.data.emReportType;
import org.colorcoding.ibas.reportanalysis.reporter.ReportData;
import org.colorcoding.ibas.reportanalysis.reporter.ReportDataParameter;
import org.colorcoding.ibas.reportanalysis.reporter.ReportGroup;
import org.colorcoding.ibas.reportanalysis.reporter.ReportLog;
import org.colorcoding.ibas.reportanalysis.repository.BORepositoryReportAnalysis;

@Path("data")
public class ReportService {

	protected String token(@Context HttpServletRequest request) throws Exception {
		String encoded = request.getHeader("Authorization");
		if (encoded != null) {
			if (encoded.startsWith("Basic")) {
				Decoder decoder = Base64.getDecoder();
				String info = new String(decoder.decode(encoded.substring(6)), "utf-8");
				if (info != null && info.indexOf(":") > 0) {
					int index = info.indexOf(":");
					String user = info.substring(0, index).trim();
					String password = info.substring(index + 1).trim();
					BORepositoryInitialFantasyShell boRepository = new BORepositoryInitialFantasyShell();
					User sUser = boRepository.userConnect(user, password).getResultObjects().firstOrDefault();
					if (sUser != null) {
						return sUser.getToken();
					}
				}
			} else if (encoded.startsWith("Bearer")) {
				String[] values = encoded.split(" ");
				if (values.length > 1) {
					BORepositoryInitialFantasyShell boRepository = new BORepositoryInitialFantasyShell();
					User sUser = boRepository.tokenConnect(values[values.length - 1]).getResultObjects()
							.firstOrDefault();
					if (sUser != null) {
						return sUser.getToken();
					}
				}
			}
		}
		throw new WebApplicationException(401);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReportGroup")
	public OperationResult<ReportGroup> fetchReportGroup(@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		try {
			this.token(request);
			ReportGroup reportGroup = new ReportGroup();
			reportGroup.setId(String.valueOf(emReportType.REPORT.ordinal()));
			reportGroup.setName(String.valueOf(emReportType.REPORT));
			OperationResult<ReportGroup> operationResult = new OperationResult<>();
			operationResult.addResultObjects(reportGroup);
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReportData")
	public OperationResult<ReportData> fetchReportData(@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		try {
			String token = this.token(request);
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(Report.PROPERTY_CATEGORY.getName());
			condition.setValue(emReportType.REPORT);
			condition = criteria.getConditions().create();
			condition.setAlias(Report.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			BORepositoryReportAnalysis boRepository = new BORepositoryReportAnalysis();
			boRepository.setUserToken(token);
			IOperationResult<IReport> opRsltReport = boRepository.fetchReport(criteria);
			if (opRsltReport.getError() != null) {
				throw opRsltReport.getError();
			}
			OperationResult<ReportData> operationResult = new OperationResult<>();
			for (IReport item : opRsltReport.getResultObjects()) {
				ReportData data = new ReportData();
				data.setId(String.valueOf(item.getObjectKey()));
				data.setName(item.getName());
				data.setGroup(item.getGroup());
				data.setParameters(new ReportDataParameter[item.getReportParameters().size()]);
				for (int i = 0; i < item.getReportParameters().size(); i++) {
					IReportParameter pItem = item.getReportParameters().get(i);
					ReportDataParameter pData = new ReportDataParameter();
					pData.setName(pItem.getName());
					pData.setValue(pItem.getValue());
					data.getParameters()[i] = pData;
				}
				operationResult.addResultObjects(data);
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("runReport")
	public OperationResult<DataTable> runReport(ReportData reportData, @Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		try {
			String token = this.token(request);
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(Report.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition = criteria.getConditions().create();
			condition.setAlias(Report.PROPERTY_OBJECTKEY.getName());
			condition.setValue(reportData.getId());
			BORepositoryReportAnalysis boRepository = new BORepositoryReportAnalysis();
			boRepository.setUserToken(token);
			IOperationResult<IReport> opRsltReport = boRepository.fetchReport(criteria);
			if (opRsltReport.getError() != null) {
				throw opRsltReport.getError();
			}
			IReport report = opRsltReport.getResultObjects().firstOrDefault();
			if (report == null) {
				throw new Exception(I18N.prop("msg_ra_not_found_report", reportData.getId()));
			}
			UserReport userReport = UserReport.create(report);
			if (reportData.getParameters() != null && userReport.getParameters() != null) {
				for (UserReportParameter uItem : userReport.getParameters()) {
					if (uItem.getName() == null) {
						continue;
					}
					if (uItem.getCategory() == emReportParameterType.PRESET) {
						continue;
					}
					for (ReportDataParameter dItem : reportData.getParameters()) {
						if (dItem.getName() == null) {
							continue;
						}
						if (!uItem.getName().equals(dItem.getName())) {
							continue;
						}
						uItem.setValue(dItem.getValue());
						break;
					}
				}
			}
			return (OperationResult<DataTable>) boRepository.runUserReport(userReport);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReportLog")
	public OperationResult<ReportLog> fetchReportLog(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		try {
			token = MyConfiguration.optToken(authorization, token);
			ICondition condition;
			Criteria rptCriteria = new Criteria();
			if (criteria != null) {
				rptCriteria.setResultCount(criteria.getResultCount());
				for (ICondition item : criteria.getConditions()) {
					if (Report.PROPERTY_OBJECTKEY.getName().equalsIgnoreCase(item.getAlias())
							|| Report.class.getSimpleName().equalsIgnoreCase(item.getAlias())) {
						condition = rptCriteria.getConditions().create();
						condition.setAlias(FileRepository.CRITERIA_CONDITION_ALIAS_FOLDER);
						condition.setValue(item.getValue());
					} else {
						rptCriteria.getConditions().add(item);
					}
				}
			}
			condition = rptCriteria.getConditions().create();
			condition.setAlias(FileRepository.CRITERIA_CONDITION_ALIAS_INCLUDE_SUBFOLDER);
			condition.setValue(emYesNo.YES);
			condition = rptCriteria.getConditions().create();
			condition.setAlias(FileRepository.CRITERIA_CONDITION_ALIAS_FILE_NAME);
			condition.setValue("Params.properties");

			ISort sort = rptCriteria.getSorts().create();
			sort.setAlias(FileRepository.CRITERIA_CONDITION_ALIAS_MODIFIED_TIME);
			sort.setSortType(SortType.DESCENDING);

			FileRepository fileRepository = new FileRepository();
			fileRepository.setRepositoryFolder(MyConfiguration.getLogsFolder());

			File file;
			Properties properties;
			OperationResult<ReportLog> operationResult = new OperationResult<ReportLog>();
			for (FileData fileData : fileRepository.fetch(rptCriteria).getResultObjects()) {
				file = new File(fileData.getLocation());
				properties = new Properties();
				try (FileInputStream input = new FileInputStream(file)) {
					try (InputStreamReader reader = new InputStreamReader(input, "utf-8")) {
						properties.load(reader);
					}
				}

				ReportLog reportLog = new ReportLog();
				reportLog.setId(file.getParentFile().getName());
				// reportLog.setWorkFolder(file.getParent().substring(fileRepository.getRepositoryFolder().length()
				// + 1));
				reportLog.setBeginTime(file.lastModified());
				properties.forEach((key, value) -> {
					if ("Report".equalsIgnoreCase(String.valueOf(key))) {
						reportLog.setReportId(String.valueOf(value));
					} else if ("ReportName".equalsIgnoreCase(String.valueOf(key))) {
						reportLog.setReportName(String.valueOf(value));
					} else if ("Runner".equalsIgnoreCase(String.valueOf(key))) {
						reportLog.setRunner(String.valueOf(value));
					} else {
						reportLog.getParameters().add(new KeyText(String.valueOf(key), String.valueOf(value)));
					}
				});
				file = new File(file.getParent(), "ReportData.csv");
				reportLog.setFinishTime(file.lastModified());
				reportLog.setContent(new String(Files.readAllBytes(Paths.get(file.getPath())), "utf-8"));

				operationResult.addResultObjects(reportLog);
				if (criteria.getResultCount() > 0
						&& operationResult.getResultObjects().size() >= criteria.getResultCount()) {
					break;
				}
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}
}
