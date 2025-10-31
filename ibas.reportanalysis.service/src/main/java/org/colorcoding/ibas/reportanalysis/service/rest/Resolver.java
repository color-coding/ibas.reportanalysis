package org.colorcoding.ibas.reportanalysis.service.rest;

import javax.ws.rs.Produces;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;

import org.colorcoding.ibas.bobas.bo.UserFieldProxy;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.reportanalysis.bo.report.Report;
import org.colorcoding.ibas.reportanalysis.bo.report.ReportRunningLog;
import org.colorcoding.ibas.reportanalysis.bo.reportbook.ReportBook;

/**
 * 序列化解释器
 */
@Provider
@Produces({ "application/json" })
public class Resolver implements ContextResolver<JAXBContext> {

	private static JAXBContext jaxbContext = null;

	public JAXBContext getContext(Class<?> type) {
		try {
			if (jaxbContext == null) {
				jaxbContext = JAXBContext.newInstance(Criteria.class, OperationResult.class, UserFieldProxy.class,
						Report.class, ReportBook.class, ReportRunningLog.class);
			}
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return jaxbContext;
	}

}
