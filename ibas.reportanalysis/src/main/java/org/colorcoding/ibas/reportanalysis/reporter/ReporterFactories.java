package org.colorcoding.ibas.reportanalysis.reporter;

import java.util.ArrayList;
import java.util.List;

import org.colorcoding.ibas.bobas.messages.MessageLevel;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.reportanalysis.MyConfiguration;

public final class ReporterFactories {

	public static final String MSG_REGISTER_REPORTER_FACTORY = "reporter: register report factory [%s].";
	public static final String MSG_NOT_FOUND_REPORTER = "reporter: not found [%s|%s]'s reporter.";

	private static ReporterFactories instance;

	private ReporterFactories() {

	}

	public static ReporterFactories create() {
		if (instance == null) {
			synchronized (ReporterFactories.class) {
				if (instance == null) {
					instance = new ReporterFactories();
					instance.init();
				}
			}
		}
		return instance;
	}

	protected void init() {
		String factories = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_REPORTER_FACTORIES);
		if (factories != null && factories.length() > 0) {
			for (String item : factories.split(";")) {
				if (item != null && item.length() > 0) {
					try {
						Class<?> type = Class.forName(item);
						if (type != null && ReporterFactory.class.isAssignableFrom(type)) {
							Object factory = type.newInstance();
							if (factory instanceof ReporterFactory) {
								this.getFactories().add((ReporterFactory) factory);
								RuntimeLog.log(MessageLevel.DEBUG, MSG_REGISTER_REPORTER_FACTORY, type.getName());
							}
						}
					} catch (Exception e) {
						RuntimeLog.log(e);
					}
				}
			}
		}
		this.getFactories().add(new ReporterFactory());
	}

	private List<ReporterFactory> factories;

	public final List<ReporterFactory> getFactories() {
		if (this.factories == null) {
			this.factories = new ArrayList<>();
		}
		return factories;
	}

	public IReporter create(ExecuteReport report) {
		IReporter reporter = null;
		try {
			for (ReporterFactory factory : this.getFactories()) {
				reporter = factory.create(report);
				if (reporter != null) {
					return reporter;
				}
			}
		} catch (Exception e) {
			RuntimeLog.log(e);
		}
		if (reporter == null) {
			RuntimeLog.log(MessageLevel.DEBUG, MSG_NOT_FOUND_REPORTER,
					report.getName() != null ? report.getName() : report.getId(), report.getCategory());
		}
		return reporter;
	}
}