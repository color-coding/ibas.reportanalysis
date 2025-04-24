package org.colorcoding.ibas.reportanalysis.reporter;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Base64;
import java.util.Base64.Encoder;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.Result;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationFactory;
import org.colorcoding.ibas.bobas.serialization.SerializerManager;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.xml.sax.InputSource;

/**
 * 文件报表者
 * 
 * @author Niuren.Zhu
 *
 */
public class RemoteReporter extends Reporter {

	protected static final String MSG_REPORTER_CONNECT_URL = "reporter: connect [%s].";
	protected static final String MSG_REPORTER_CONNECTED = "reporter: connected [%s] and got data [%s].";
	public static final String PARAMETER_NAME_URL = "${Url}";
	public static final String PARAMETER_NAME_SERVER = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_SERVER.getName());
	public static final String PARAMETER_NAME_USER = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_USER.getName());
	public static final String PARAMETER_NAME_PASSWORD = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_PASSWORD.getName());
	public static final String PARAMETER_NAME_ADDRESS = String.format(MyConfiguration.VARIABLE_NAMING_TEMPLATE,
			Report.PROPERTY_ADDRESS.getName());
	/**
	 * 忽视证书HostName
	 */
	private static HostnameVerifier ignoreHostnameVerifier = new HostnameVerifier() {
		public boolean verify(String s, SSLSession sslsession) {
			return true;
		}
	};

	/**
	 * 忽视证书
	 */
	private static TrustManager ignoreCertificationTrustManger = new X509TrustManager() {
		private X509Certificate[] certificates;

		public void checkClientTrusted(X509Certificate certificates[], String authType) throws CertificateException {
			if (this.certificates == null) {
				this.certificates = certificates;
			}
		}

		public void checkServerTrusted(X509Certificate[] ax509certificate, String s) throws CertificateException {
			if (this.certificates == null) {
				this.certificates = ax509certificate;
			}
		}

		public X509Certificate[] getAcceptedIssuers() {
			return null;
		}
	};

	public String getServer() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_SERVER);
	}

	public String getUser() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_USER);
	}

	public String getPassword() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_PASSWORD);
	}

	public String getAddress() throws ReporterException {
		return this.getParameterValue(PARAMETER_NAME_ADDRESS);
	}

	protected String getAuthorization(String user, String password) throws UnsupportedEncodingException {
		if (user == null) {
			user = "";
		}
		if (password == null) {
			password = "";
		}
		Encoder encoder = Base64.getEncoder();
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("Basic");
		stringBuilder.append(" ");
		stringBuilder
				.append(new String(encoder.encode(String.format("%s:%s", user, password).getBytes("utf-8")), "utf-8"));
		return stringBuilder.toString();
	}

	protected URLConnection openConnection(URL url)
			throws IOException, NoSuchAlgorithmException, NoSuchProviderException, KeyManagementException {
		if (url.getProtocol().equalsIgnoreCase("https")) {
			HttpsURLConnection.setDefaultHostnameVerifier(ignoreHostnameVerifier);
			HttpsURLConnection httpsConnection = (HttpsURLConnection) url.openConnection();
			// Prepare SSL Context
			TrustManager[] tm = { ignoreCertificationTrustManger };
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();
			httpsConnection.setSSLSocketFactory(ssf);
			return httpsConnection;
		} else {
			return url.openConnection();
		}
	}

	@Override
	protected IDataTable run() throws ReporterException {
		try {
			// 创建连接地址
			String value = this.getServer();
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(value);
			if (value != null && !value.endsWith("/")) {
				stringBuilder.append("/");
			}
			stringBuilder.append("runReport");
			// 创建报表数据
			ReportData reportData = new ReportData();
			reportData.setName(this.getReport().getName());
			reportData.setId(this.getAddress());
			ArrayList<ReportDataParameter> parameters = new ArrayList<>();
			for (ExecuteReportParameter item : this.getReport().getParameters()) {
				if (item.getName().equalsIgnoreCase(PARAMETER_NAME_SERVER)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_USER)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_PASSWORD)
						|| item.getName().equalsIgnoreCase(PARAMETER_NAME_ADDRESS)) {
					// 跳过已使用变量
					continue;
				}
				parameters.add(new ReportDataParameter(item.getName(), item.getValue()));
			}
			reportData.setParameters(parameters.toArray(new ReportDataParameter[] {}));
			// 连接远程服务
			URL url = new URL(stringBuilder.toString());
			Logger.log(MessageLevel.DEBUG, MSG_REPORTER_CONNECT_URL, url.toString());
			URLConnection connection = this.openConnection(url);
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("content-Type", "application/json; charset=utf-8");
			connection.setRequestProperty("charset", "utf-8");
			connection.setRequestProperty("accept-charset", "utf-8");
			connection.setRequestProperty("authorization", this.getAuthorization(this.getUser(), this.getPassword()));
			connection.setDoOutput(true);
			connection.setDoInput(true);
			connection.setUseCaches(false);
			// 处理请求
			SerializerManager serializerManager = SerializationFactory.createManager();
			try (OutputStream outputStream = connection.getOutputStream()) {
				ISerializer serializer = serializerManager.create(SerializerManager.TYPE_JSON);
				serializer.serialize(reportData, outputStream);
				outputStream.flush();
			}
			// 处理返回
			try (InputStreamReader streamReader = new InputStreamReader(connection.getInputStream(), "utf-8")) {
				ISerializer serializer = serializerManager.create(SerializerManager.TYPE_JSON);
				Object data = serializer.deserialize(new InputSource(streamReader), OperationResult.class,
						OperationMessage.class, Result.class, String.class, DataTable.class);
				if (data instanceof OperationResult) {
					OperationResult<?> operationResult = (OperationResult<?>) data;
					data = operationResult.getResultObjects().firstOrDefault();
					if (data instanceof DataTable) {
						IDataTable dataTable = (DataTable) data;
						if (dataTable != null) {
							dataTable.setName(this.getReport().getId());
							dataTable.setDescription(this.getReport().getName());
						}
						return dataTable;
					} else if (operationResult.getResultCode() != 0) {
						throw new ReporterException(
								operationResult.getMessage() != null ? operationResult.getMessage() : "Unknown");
					}
				}
			}
			throw new ReporterException(I18N.prop("msg_ra_invaild_reponse_data"));
		} catch (ReporterException e) {
			throw e;
		} catch (Exception e) {
			throw new ReporterException(e);
		}
	}
}
