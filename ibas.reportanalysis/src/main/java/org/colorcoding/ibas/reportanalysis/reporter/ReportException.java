package org.colorcoding.ibas.reportanalysis.reporter;

public class ReportException extends Exception {

	private static final long serialVersionUID = -4609064523149013915L;

	public ReportException() {
		super();
	}

	public ReportException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
	}

	public ReportException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public ReportException(String arg0) {
		super(arg0);
	}

	public ReportException(Throwable arg0) {
		super(arg0);
	}

}
