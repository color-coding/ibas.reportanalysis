package org.colorcoding.ibas.businessobjectsenterprise;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.boe.bo.BOEFolder;
import org.colorcoding.ibas.boe.bo.BOEReport;
import org.colorcoding.ibas.boe.repository.BOEException;
import org.colorcoding.ibas.boe.repository.BOEService;

import com.crystaldecisions.sdk.exception.SDKException;

import junit.framework.TestCase;

public class testBOEService extends TestCase {

	public void testToken() throws SDKException, BOEException {
		BOEService service = new BOEService();
		service.setAddress("192.168.0.43");
		service.logon("administrator", "Aa123456");
		System.out.println(String.format("token: %s", service.getToken()));
	}

	public void testFetchFolder() throws Exception {
		BOEService service = new BOEService();
		service.setAddress("192.168.0.43");
		service.logon("administrator", "Aa123456");
		ICriteria criteria = new Criteria();
		IOperationResult<BOEFolder> opRslt = service.fetchFolder(criteria);
		if (opRslt.getError() != null) {
			throw opRslt.getError();
		}
		for (BOEFolder item : opRslt.getResultObjects()) {
			System.out.println(String.format("%s %s %s", item.getId(), item.getName(), item.getParentId()));
		}
	}

	public void testFetchReport() throws Exception {
		BOEService service = new BOEService();
		service.setAddress("192.168.0.43");
		service.logon("administrator", "Aa123456");
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(BOEService.CRITERIA_CONDITION_ALIAS_PARENT_ID);
		condition.setOperation(ConditionOperation.NOT_EQUAL);
		condition.setValue(0);
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.OR);
		condition.setAlias(BOEService.CRITERIA_CONDITION_ALIAS_PARENT_ID);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(0);

		IOperationResult<BOEReport> opRslt = service.fetchReport(criteria);
		if (opRslt.getError() != null) {
			throw opRslt.getError();
		}
		for (BOEReport item : opRslt.getResultObjects()) {
			System.out.println(String.format("%s|%s, %s", item.getId(), item.getName(), item.getPath()));
		}

	}
}