package org.colorcoding.ibas.boe.repository;

public class BOEException extends Exception {
	private static final long serialVersionUID = 6076534647095808482L;

	public BOEException() {
		super();
	}

	public BOEException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
	}

	public BOEException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public BOEException(String arg0) {
		super(arg0);
	}

	public BOEException(Throwable arg0) {
		super(arg0);
	}

}
