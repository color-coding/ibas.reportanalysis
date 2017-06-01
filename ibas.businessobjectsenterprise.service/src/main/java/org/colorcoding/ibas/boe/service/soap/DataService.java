package org.colorcoding.ibas.boe.service.soap;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.cxf.WebServicePath;
import org.colorcoding.ibas.boe.bo.BOEFolder;
import org.colorcoding.ibas.boe.bo.BOEReport;
import org.colorcoding.ibas.boe.repository.BOEService;

/**
 * BusinessObjectsEnterprise 数据服务JSON
 */
@WebService
@WebServicePath("data")
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
	@WebMethod
	public OperationMessages connect(@WebParam(name = "user") String user,
			@WebParam(name = "password") String password) {
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
	@WebMethod
	public OperationResult<BOEFolder> fetchFolder(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<BOEReport> fetchReport(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchReport(criteria, token);
	}

}
