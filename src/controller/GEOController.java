package controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;

import javax.net.ssl.HttpsURLConnection;

import model.GEOJSONFile;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import persistance.GEOJSONFileDAO;
import system.Key;
import system.Message;
import system.Value;

public class GEOController {
	
	public static JSONObject storeNewJsonFile(JSONObject inputJson){
		JSONObject returnJson = new JSONObject();
		
		try{
			String name = (String) inputJson.get(Key.NAME);
			String url = (String) inputJson.get(Key.URL);
			
			GEOJSONFile geoJson = new GEOJSONFile(name, url);
			
			GEOJSONFileDAO.addGEOJSONFile(geoJson);
			
			returnJson.put(Key.STATUS, Value.SUCCESS);
			returnJson.put(Key.MESSAGE, geoJson.toJson());
		}catch(Exception e){
			e.printStackTrace();
			returnJson.put(Key.STATUS, Value.FAIL);
			returnJson.put(Key.MESSAGE, e.toString());
		}
		
		return returnJson;
	}
	
	public static JSONObject deleteGEOJSONFile(JSONObject inputJson){
		JSONObject returnJson = new JSONObject();
		
		try{
			long id = (long) inputJson.get(Key.ID);
			GEOJSONFile geoJsonFile = GEOJSONFileDAO.getGEOJSONFileById(id);
			GEOJSONFileDAO.deleteGEOJSONFile(geoJsonFile);
			
			returnJson.put(Key.STATUS, Value.SUCCESS);
			returnJson.put(Key.MESSAGE, Message.SUCCESS);
		}catch(Exception e){
			e.printStackTrace();
			returnJson.put(Key.STATUS, Value.FAIL);
			returnJson.put(Key.MESSAGE, e.toString());
		}
		
		return returnJson;
	}
	
	public static JSONObject getAllGEOJSONFiles(){
		JSONObject returnJson = new JSONObject();
		
		try{
			ArrayList<GEOJSONFile> geoJsonFiles = GEOJSONFileDAO.getAllGEOJSONFiles();
			
			JSONArray geoJsonArr = new JSONArray();
			
			for(GEOJSONFile g: geoJsonFiles){
				geoJsonArr.add(g.toJson());
			}
			
			returnJson.put(Key.STATUS, Value.SUCCESS);
			returnJson.put(Key.MESSAGE, geoJsonArr);
		}catch(Exception e){
			e.printStackTrace();
			returnJson.put(Key.STATUS, Value.FAIL);
			returnJson.put(Key.MESSAGE, e.toString());
		}
		
		return returnJson;
	}
	
	
	public static String sendGet(String url) throws Exception {
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 
		// optional default is GET
		con.setRequestMethod("GET");
 
		//add request header
		//con.setRequestProperty("User-Agent", USER_AGENT);
 
		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);
 
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();
 
		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
 
		//print result
		System.out.println(response.toString());
		return response.toString();
	}
	
	public static String sendPost(String url, String urlParameters) throws Exception {
		URL obj = new URL(url);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();
 
		//add reuqest header
		con.setRequestMethod("POST");
		//con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
 
		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(urlParameters);
		wr.flush();
		wr.close();
 
		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + urlParameters);
		System.out.println("Response Code : " + responseCode);
 
		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();
 
		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
 
		//print result
		System.out.println(response.toString());
		return response.toString();
	}
	
	
}
