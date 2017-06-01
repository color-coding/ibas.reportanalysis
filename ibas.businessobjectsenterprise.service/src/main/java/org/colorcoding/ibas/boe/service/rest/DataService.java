package org.colorcoding.ibas.boe.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.boe.bo.BOEFolder;
import org.colorcoding.ibas.boe.bo.BOEReport;
import org.colorcoding.ibas.boe.repository.BOEService;

/**
 * BusinessObjectsEnterprise 数据服务JSON
 */
@Path("data")
public class DataService extends BOEService {
	/**
	 * 连接BOE
	 * 
	 * @param user
	 *            用户
	 * @param password
	 *            密码
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("connect")
	public OperationMessages connect(@QueryParam("user") String user, @QueryParam("password") String password) {
		return super.connect(user, password);
	}

	/**
	 * 查询-BOE文件夹
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchFolder")
	public OperationResult<BOEFolder> fetchFolder(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchFolder(criteria, token);
	}

	/**
	 * 查询-BOE报表
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchReport")
	public OperationResult<BOEReport> fetchReport(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchReport(criteria, token);
	}

}
