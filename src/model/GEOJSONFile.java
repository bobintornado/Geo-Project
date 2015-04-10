package model;

import java.util.Date;

import org.json.simple.JSONObject;

import system.Config;
import system.Key;

public class GEOJSONFile {
	private long id;
	private String name;
	private String url;
	private Date date;
	
	public GEOJSONFile(){}
	
	public GEOJSONFile(String name, String url){
		this.name = name;
		this.url = url;
		this.date = new Date();
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	public JSONObject toJson(){
		JSONObject returnJson = new JSONObject();
		
		returnJson.put(Key.ID, this.id);
		returnJson.put(Key.NAME, this.name);
		returnJson.put(Key.URL, this.url);
		returnJson.put(Key.DATE, Config.SDF.format(this.date));
		
		return returnJson;
	}
}
