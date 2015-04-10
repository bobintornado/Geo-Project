package system;

import java.text.SimpleDateFormat;

import org.json.simple.parser.JSONParser;

public class Config {
	public static final String SYSTEMADMIN = "admin";
	public static final String SYSTEMKEY = "key";
	public static final String ROOT = "GEO";
	public static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
	public static final JSONParser JPARSER = new JSONParser();
	
	public static final String TIMEZONE = "Singapore";
	
	//Hibernate connection maintainer
	public static final long DELAY = 1000;
	public static final long PERIOD = 25200000;
	
	//aws s3 service
	public static final String ACCESSKEY = "AKIAIAEQIKWNZUFMWEPA";
	public static final String SECRETKEY = "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";
	public static final String BUKETNAME = "symplhrm";
	public static final String S3ROOT = "Sympl";
	public static final String S3URL = "https://s3-ap-southeast-1.amazonaws.com/";
	
	
	
}
