package org.colorcoding.ibas.reportanalysis;

import java.io.File;

import org.colorcoding.ibas.bobas.configuration.ConfigurationFactory;
import org.colorcoding.ibas.bobas.configuration.IConfigurationManager;

/**
 * 我的配置项
 */
public class MyConfiguration extends org.colorcoding.ibas.initialfantasy.MyConfiguration {

	private volatile static IConfigurationManager instance;

	public static IConfigurationManager create() {
		if (instance == null) {
			synchronized (MyConfiguration.class) {
				if (instance == null) {
					instance = ConfigurationFactory.create().createManager();
					instance.setConfigSign(MODULE_ID);
					instance.update();
				}
			}
		}
		return instance;
	}

	public static <P> P getConfigValue(String key, P defaultValue) {
		return create().getConfigValue(key, defaultValue);
	}

	public static String getConfigValue(String key) {
		return create().getConfigValue(key);
	}

	/**
	 * 模块标识
	 */
	public static final String MODULE_ID = "0dda2ecb-af63-4a3d-b087-aa3dda8179b4";

	/**
	 * 命名空间
	 */
	public static final String NAMESPACE_ROOT = "http://colorcoding.org/ibas/reportanalysis/";

	/**
	 * 数据命名空间
	 */
	public static final String NAMESPACE_DATA = NAMESPACE_ROOT + "data";

	/**
	 * 业务对象命名空间
	 */
	public static final String NAMESPACE_BO = NAMESPACE_ROOT + "bo";

	/**
	 * 报表命名空间
	 */
	public static final String NAMESPACE_REPORTER = NAMESPACE_ROOT + "reporter";

	/**
	 * 服务命名空间
	 */
	public static final String NAMESPACE_SERVICE = NAMESPACE_ROOT + "service";
	/**
	 * 配置项目-报表工厂，多个时“;”分隔
	 */
	public final static String CONFIG_ITEM_REPORTER_FACTORIES = "ReporterFactories";

	/**
	 * 获取文档目录
	 * 
	 * @return
	 */
	public static String getDocumetsFolder() {
		return MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_DOCUMENT_FOLDER,
				MyConfiguration.getDataFolder() + File.separator + "reportanalysis_files");
	}

	/**
	 * 获取日志目录
	 * 
	 * @return
	 */
	public static String getLogsFolder() {
		return MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_LOG_FILE_FOLDER,
				MyConfiguration.getDataFolder() + File.separator + "reportanalysis_logs");
	}
}
