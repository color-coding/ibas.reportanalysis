package org.colorcoding.ibas.boe.repository;

import org.colorcoding.ibas.bobas.bo.BOException;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISqlQuery;
import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.SqlQuery;
import org.colorcoding.ibas.bobas.db.DbAdapterFactory;
import org.colorcoding.ibas.bobas.db.IDbAdapter;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.messages.MessageLevel;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.boe.MyConfiguration;
import org.colorcoding.ibas.boe.bo.BOEFolder;
import org.colorcoding.ibas.boe.bo.BOEReport;
import org.colorcoding.ibas.boe.reporter.BOEReporter;

import com.crystaldecisions.sdk.exception.SDKException;
import com.crystaldecisions.sdk.framework.CrystalEnterprise;
import com.crystaldecisions.sdk.framework.IEnterpriseSession;
import com.crystaldecisions.sdk.occa.infostore.IInfoObject;
import com.crystaldecisions.sdk.occa.infostore.IInfoObjects;
import com.crystaldecisions.sdk.occa.infostore.IInfoStore;
import com.crystaldecisions.sdk.occa.security.ILogonTokenMgr;
import com.crystaldecisions.sdk.plugin.desktop.folder.IFolder;

/**
 * BOE服务
 * 
 * @author Niuren.Zhu
 *
 */
public class BOEService {
	private static final String MSG_USER_LOGON = "boe: user [%s] logon system.";
	private static final String MSG_LOGON_BY_TOKEN = "boe: logon system by token [%s].";
	private static final String MSG_USER_TOKEN = "boe: get token [%s].";
	private static final String MSG_RUN_QUERY = "boe: %s";
	private static final String MSG_FETCH_FOLDER = "boe: fetch folder count [%s].";
	private static final String MSG_FETCH_REPORT = "boe: fetch report count [%s].";
	private static final String DB_TYPE = "SYBASE";
	/**
	 * 查询条件-ID
	 */
	public static final String CRITERIA_CONDITION_ALIAS_ID = "SI_ID";
	/**
	 * 查询条件-父项ID
	 */
	public static final String CRITERIA_CONDITION_ALIAS_PARENT_ID = "SI_PARENTID";
	/**
	 * 查询条件-类型
	 */
	public static final String CRITERIA_CONDITION_ALIAS_KIND = "SI_KIND";
	/**
	 * 查询条件值-类型-文件夹
	 */
	public static final String CRITERIA_CONDITION_VALUE_KIND_FOLDER = IFolder.FOLDER_KIND;

	private String address;

	public final String getAddress() {
		if (this.address == null || this.address.isEmpty()) {
			this.address = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_BOE_SERVER_ADDRESS, "");
		}
		return address;
	}

	public final void setAddress(String address) {
		this.address = address;
	}

	private String viewer;

	public final String getViewer() {
		if (this.viewer == null || this.viewer.isEmpty()) {
			this.viewer = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_BOE_VIEWER_ADDRESS, "");
			if (!this.getAddress().isEmpty() && (this.viewer == null || this.viewer.isEmpty())) {
				this.viewer = String.format("http://%s:8080/BOE/OpenDocument/opendoc/openDocument.jsp",
						this.getAddress());
			}
		}
		return viewer;
	}

	public final void setViewer(String viewer) {
		this.viewer = viewer;
	}

	private String authentication;

	public final String getAuthentication() {
		if (this.authentication == null || this.authentication.isEmpty()) {
			this.setAuthentication("secEnterprise");
		}
		return authentication;
	}

	public final void setAuthentication(String authenticationType) {
		this.authentication = authenticationType;
	}

	private IEnterpriseSession session;

	public final IEnterpriseSession getSession() {
		return session;
	}

	private final void setSession(IEnterpriseSession session) {
		this.session = session;
	}

	public void logon(String user, String password) throws SDKException, BOEException {
		if (this.getSession() != null) {
			this.getSession().logoff();
			this.setSession(null);
		}
		IEnterpriseSession session = CrystalEnterprise.getSessionMgr().logon(user, password, this.getAddress(),
				this.getAuthentication());
		this.setSession(session);
		RuntimeLog.log(MessageLevel.DEBUG, MSG_USER_LOGON, user);
	}

	public void logon(String token) throws SDKException, BOEException {
		if (this.getSession() != null) {
			this.getSession().logoff();
			this.setSession(null);
		}
		this.setSession(CrystalEnterprise.getSessionMgr().logonWithToken(token));
		RuntimeLog.log(MessageLevel.DEBUG, MSG_LOGON_BY_TOKEN, token);
	}

	public String getToken() throws BOEException, SDKException {
		IEnterpriseSession session = this.getSession();
		if (session == null) {
			throw new BOEException(i18n.prop("msg_boe_not_logon_system"));
		}
		ILogonTokenMgr tokenMgr = session.getLogonTokenMgr();
		if (tokenMgr == null) {
			throw new BOEException(i18n.prop("msg_boe_not_found_token_manager"));
		}
		String token = tokenMgr.getDefaultToken();
		RuntimeLog.log(MessageLevel.DEBUG, MSG_USER_TOKEN, token);
		return token;

	}

	/**
	 * 连接
	 * 
	 * @param user
	 *            用户
	 * @param password
	 *            密码
	 * @return 操作消息，userSign为成功口令
	 */
	public OperationMessages connect(String user, String password) {
		OperationMessages opRslt = new OperationMessages();
		try {
			this.logon(user, password);
			opRslt.setUserSign(this.getToken());
		} catch (Exception e) {
			opRslt.setError(e);
			RuntimeLog.log(e);
		}
		return opRslt;
	}

	protected IInfoObject[] query(ISqlQuery sql) throws SDKException {
		ArrayList<IInfoObject> resluts = new ArrayList<>();
		IEnterpriseSession session = this.getSession();
		IInfoStore infoStore = (IInfoStore) session.getService("InfoStore");
		RuntimeLog.log(MessageLevel.DEBUG, MSG_RUN_QUERY, sql.getQueryString());
		IInfoObjects infoObjects = infoStore.query(sql.getQueryString());
		for (Object object : infoObjects) {
			if (object instanceof IInfoObject) {
				IInfoObject infoObject = (IInfoObject) object;
				resluts.add(infoObject);
			}
		}
		return resluts.toArray(new IInfoObject[] {});
	}

	protected void fixed(ICriteria criteria) {
		// 修正查询
		for (ICondition condition : criteria.getConditions()) {
			if (CRITERIA_CONDITION_ALIAS_ID.equalsIgnoreCase(condition.getAlias())
					|| CRITERIA_CONDITION_ALIAS_PARENT_ID.equalsIgnoreCase(condition.getAlias())) {
				condition.setAliasDataType(DbFieldType.NUMERIC);
			}
		}
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
	public OperationResult<BOEFolder> fetchFolder(ICriteria criteria, String token) {
		try {
			this.logon(token);
			return this.fetchFolder(criteria);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	/**
	 * 查询-BOE文件夹
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public OperationResult<BOEFolder> fetchFolder(ICriteria criteria) {
		OperationResult<BOEFolder> operationResult = new OperationResult<>();
		try {
			if (this.getSession() == null) {
				throw new BOException(i18n.prop("msg_boe_not_logon_system"));
			}
			if (criteria == null) {
				criteria = new Criteria();
			}
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("SELECT * FROM");
			stringBuilder.append(" ");
			stringBuilder.append("CI_INFOOBJECTS");
			stringBuilder.append(" ");
			stringBuilder.append("WHERE");
			stringBuilder.append(" ");
			stringBuilder.append(CRITERIA_CONDITION_ALIAS_KIND);
			stringBuilder.append(" ");
			stringBuilder.append("=");
			stringBuilder.append(" ");
			stringBuilder.append("'");
			stringBuilder.append(CRITERIA_CONDITION_VALUE_KIND_FOLDER);
			stringBuilder.append("'");
			// 添加括号
			if (criteria.getConditions().size() > 1) {
				ICondition condition = criteria.getConditions().firstOrDefault();
				condition.setBracketOpen(condition.getBracketOpen() + 1);
				condition = criteria.getConditions().lastOrDefault();
				condition.setBracketClose(condition.getBracketClose() + 1);
			}
			// 修正查询
			this.fixed(criteria);
			IDbAdapter dbAdapter = DbAdapterFactory.create().createAdapter(DB_TYPE);
			ISqlQuery sqlQuery = dbAdapter.createBOAdapter().parseSqlQuery(criteria.getConditions());
			if (sqlQuery.getQueryString() != null && !sqlQuery.getQueryString().isEmpty()) {
				stringBuilder.append(" ");
				stringBuilder.append("AND");
				stringBuilder.append(" ");
				stringBuilder.append(sqlQuery.toString());
			}
			IInfoObject[] infoObjects = this.query(new SqlQuery(stringBuilder.toString()));
			RuntimeLog.log(MessageLevel.DEBUG, MSG_FETCH_FOLDER, infoObjects.length);
			for (IInfoObject infoObject : infoObjects) {
				BOEFolder folder = new BOEFolder();
				folder.setId(infoObject.getID());
				folder.setName(infoObject.getTitle());
				folder.setParentId(infoObject.getParentID());
				operationResult.addResultObjects(folder);
			}
		} catch (Exception e) {
			operationResult = new OperationResult<>(e);
		}
		return operationResult;
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
	public OperationResult<BOEReport> fetchReport(ICriteria criteria, String token) {
		try {
			this.logon(token);
			return this.fetchReport(criteria);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	/**
	 * 查询-BOE报表
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public OperationResult<BOEReport> fetchReport(ICriteria criteria) {
		OperationResult<BOEReport> operationResult = new OperationResult<>();
		try {
			if (this.getSession() == null) {
				throw new BOException(i18n.prop("msg_boe_not_logon_system"));
			}
			if (criteria == null) {
				criteria = new Criteria();
			}
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("SELECT * FROM");
			stringBuilder.append(" ");
			stringBuilder.append("CI_INFOOBJECTS");
			stringBuilder.append(" ");
			stringBuilder.append("WHERE");
			stringBuilder.append(" ");
			stringBuilder.append(CRITERIA_CONDITION_ALIAS_KIND);
			stringBuilder.append(" ");
			stringBuilder.append("!=");
			stringBuilder.append(" ");
			stringBuilder.append("'");
			stringBuilder.append(CRITERIA_CONDITION_VALUE_KIND_FOLDER);
			stringBuilder.append("'");
			// 添加括号
			if (criteria.getConditions().size() > 1) {
				ICondition condition = criteria.getConditions().firstOrDefault();
				condition.setBracketOpen(condition.getBracketOpen() + 1);
				condition = criteria.getConditions().lastOrDefault();
				condition.setBracketClose(condition.getBracketClose() + 1);
			}
			// 修正查询
			this.fixed(criteria);
			IDbAdapter dbAdapter = DbAdapterFactory.create().createAdapter(DB_TYPE);
			ISqlQuery sqlQuery = dbAdapter.createBOAdapter().parseSqlQuery(criteria.getConditions());
			if (sqlQuery.getQueryString() != null && !sqlQuery.getQueryString().isEmpty()) {
				stringBuilder.append(" ");
				stringBuilder.append("AND");
				stringBuilder.append(" ");
				stringBuilder.append(sqlQuery.toString());
			}
			IInfoObject[] infoObjects = this.query(new SqlQuery(stringBuilder.toString()));
			RuntimeLog.log(MessageLevel.DEBUG, MSG_FETCH_REPORT, infoObjects.length);
			for (IInfoObject infoObject : infoObjects) {
				BOEReport report = new BOEReport();
				report.setId(infoObject.getID());
				report.setName(infoObject.getTitle());
				report.setSign(infoObject.getCUID());
				report.setDescription(infoObject.getDescription());
				report.setCategory(infoObject.getProgID());
				report.setGroup(String.valueOf(infoObject.getParentID()));
				// 设置服务地址
				report.setServer(this.getAddress());
				// 设置路径
				StringBuilder path = new StringBuilder();
				try {
					IInfoObject parent = infoObject.getParent();
					path.append("/");
					while (parent != null && CRITERIA_CONDITION_VALUE_KIND_FOLDER.equals(parent.getKind())) {
						path.insert(0, parent.getTitle());
						path.insert(0, "/");
						parent = parent.getParent();
					}
				} catch (Exception e) {
					// 不能获取到父项
				}
				if (path.length() > 0) {
					report.setPath(path.toString());
				}
				// 设置视图查看地址
				StringBuilder url = new StringBuilder();
				url.append(this.getViewer());
				url.append("?");
				url.append("iDocID=");
				url.append(report.getSign());
				url.append("&");
				url.append("sIDType=CUID");
				url.append("&");
				url.append("token=");
				url.append(BOEReporter.PARAMETER_NAME_TOKEN);
				report.setUrl(url.toString());
				operationResult.addResultObjects(report);
			}
		} catch (Exception e) {
			operationResult = new OperationResult<>(e);
		}
		return operationResult;
	}
}
