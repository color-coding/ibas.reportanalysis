package org.colorcoding.ibas.reportanalysis.service.rest;

import java.math.BigDecimal;

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
import org.colorcoding.ibas.bobas.common.IOperationInformation;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.IDataTableColumn;
import org.colorcoding.ibas.bobas.data.IDataTableRow;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializerFactory;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.bo.report.ReportRunningLog;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.ReportBook;
import org.colorcoding.ibas.reportanalysis.bo.users.UserReport;
import org.colorcoding.ibas.reportanalysis.data.DataConvert;
import org.colorcoding.ibas.reportanalysis.repository.BORepositoryReportAnalysis;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;

/**
 * ReportAnalysis 数据服务JSON
 */
@Path("data")
public class DataService extends BORepositoryReportAnalysis {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户报表
	 * 
	 * @param user  用户
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserReports")
	public OperationResult<UserReport> fetchUserReports(@QueryParam("user") String user,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchUserReports(user, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 运行-用户报表
	 * 
	 * @param report 用户报表
	 * @param token  口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("runUserReport")
	public void runUserReport(UserReport report, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token, @Context HttpServletResponse response) {
		try {
			IOperationResult<DataTable> operationResult = super.runUserReport(report,
					MyConfiguration.optToken(authorization, token));
			response.setContentType("application/json;charset=UTF-8");
			response.setCharacterEncoding("UTF-8");
			if ("DataObject".equalsIgnoreCase(report.getResultMethod())) {
				JsonFactory jsonFactory = new JsonFactory();
				JsonGenerator jsonGenerator = jsonFactory.createGenerator(response.getOutputStream());
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", operationResult.getClass().getSimpleName());
				jsonGenerator.writeStringField("SignID", operationResult.getSignID());
				jsonGenerator.writeStringField("Time", operationResult.getTime().toString(DateTime.FORMAT_DATETIME));
				jsonGenerator.writeNumberField("ResultCode", operationResult.getResultCode());
				jsonGenerator.writeStringField("Message", operationResult.getMessage());

				jsonGenerator.writeArrayFieldStart("Informations");
				for (IOperationInformation data : operationResult.getInformations()) {
					jsonGenerator.writeStartObject();
					jsonGenerator.writeStringField("type", data.getClass().getSimpleName());
					jsonGenerator.writeStringField("Tag", data.getTag());
					jsonGenerator.writeStringField("Name", data.getName());
					jsonGenerator.writeStringField("Content", data.getContent());
					jsonGenerator.writeEndObject();
				}
				jsonGenerator.writeEndArray();

				Object value;
				jsonGenerator.writeArrayFieldStart("ResultObjects");
				for (DataTable table : operationResult.getResultObjects()) {
					for (IDataTableRow row : table.getRows()) {
						jsonGenerator.writeStartObject();
						for (IDataTableColumn column : table.getColumns()) {
							value = row.getValue(column);
							if (value == null) {
								continue;
							}
							if (column.getDataType() == BigDecimal.class) {
								jsonGenerator.writeNumberField(column.getName(), (BigDecimal) value);
							} else if (column.getDataType() == Short.class) {
								jsonGenerator.writeNumberField(column.getName(), (Short) value);
							} else if (column.getDataType() == Integer.class) {
								jsonGenerator.writeNumberField(column.getName(), (Integer) value);
							} else if (column.getDataType() == Float.class) {
								jsonGenerator.writeNumberField(column.getName(), (Float) value);
							} else if (column.getDataType() == Double.class) {
								jsonGenerator.writeNumberField(column.getName(), (Double) value);
							} else if (column.getDataType() == Boolean.class) {
								jsonGenerator.writeBooleanField(column.getName(), (Boolean) value);
							} else if (column.getDataType() == java.sql.Time.class) {
								value = DateTime.valueOf(((java.sql.Time) value).getTime());
								jsonGenerator.writeStringField(column.getName(), value.toString());
							} else if (column.getDataType() == java.sql.Date.class) {
								value = DateTime.valueOf(((java.sql.Date) value).getTime());
								jsonGenerator.writeStringField(column.getName(), value.toString());
							} else if (column.getDataType() == java.sql.Timestamp.class) {
								value = DateTime.valueOf(((java.sql.Timestamp) value).getTime());
								jsonGenerator.writeStringField(column.getName(), value.toString());
							} else {
								jsonGenerator.writeStringField(column.getName(),
										DataConvert.toString(row.getValue(column)));
							}
						}
						jsonGenerator.writeEndObject();
					}
				}
				jsonGenerator.writeEndArray();

				jsonGenerator.writeEndObject();
				jsonGenerator.flush();
				jsonGenerator.close();
			} else {
				ISerializer<?> serializer = SerializerFactory.create().createManager().create("json");
				serializer.serialize(operationResult, response.getOutputStream(), OperationResult.class,
						DataTable.class);
				response.getOutputStream().flush();
			}
		} catch (Exception e) {
			try {
				ISerializer<?> serializer = SerializerFactory.create().createManager().create("json");
				serializer.serialize(new OperationResult<>(e), response.getOutputStream(), OperationResult.class,
						Exception.class);
				response.getOutputStream().flush();
			} catch (Exception e2) {
				throw new WebApplicationException(e2);
			}
		}
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReport")
	public OperationResult<Report> fetchReport(Criteria criteria, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.fetchReport(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-报表
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveReport")
	public OperationResult<Report> saveReport(Report bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveReport(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表簿
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReportBook")
	public OperationResult<ReportBook> fetchReportBook(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchReportBook(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-报表簿
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveReportBook")
	public OperationResult<ReportBook> saveReportBook(ReportBook bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveReportBook(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-报表运行日志
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReportRunningLog")
	public OperationResult<ReportRunningLog> fetchReportRunningLog(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchReportRunningLog(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-报表运行日志
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveReportRunningLog")
	public OperationResult<ReportRunningLog> saveReportRunningLog(ReportRunningLog bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveReportRunningLog(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//

}
