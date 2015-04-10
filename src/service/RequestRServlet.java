package service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import controller.GEOController;
import system.Key;
import system.Value;

/**
 * Servlet implementation class RequestRServlet
 */
@WebServlet("/RequestRServlet")
public class RequestRServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RequestRServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}
	
	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.addHeader("Access-Control-Allow-Origin", "*");
		PrintWriter out = response.getWriter();
		String function = request.getParameter("f");
		String source = request.getParameter("source");
		String r = request.getParameter("r");
		System.out.println(source);
		JSONParser parser = new JSONParser();
		JSONObject returnJson = new JSONObject();
		
		String api = "";
		
		String publicIP = "54.200.37.207";
		
		//String publicIP = "52.74.144.88";
		
		try{
			switch(function){
				case "k":
					api = "http://"+publicIP+"/brew/R-K-Function";
					break;
				case "l":
					api = "http://"+publicIP+"/brew/R-L-Function";
					break;
				case "kde":
					api = "http://"+publicIP+"/brew/R-KDE";
					break;
				default:
					returnJson.put(Key.STATUS, Value.FAIL);
					returnJson.put(Key.MESSAGE, "f value can only be 'l' or 'k'");
			}
			
			if(source.contains("https")){
				source = source.substring(source.indexOf("https")+8);
			}else if(source.contains("http")){
				source = source.substring(source.indexOf("http")+7);
			}
			
			String requestUrl = api+"?n=100&r="+r+"&dir="+source;
			
			String result = GEOController.sendGet(requestUrl);
			
			System.out.println(result);
			
			// select json string
			if(result.contains("{")){
				result = result.substring(result.indexOf("{"));
			}
			
			if(result.contains("<")){
				result = result.substring(0, result.indexOf("<"));
			}
			
			System.out.println(result);
			
			returnJson = (JSONObject) parser.parse(result);
			
		}catch(Exception e){
			e.printStackTrace();
			returnJson.put(Key.STATUS, Value.FAIL);
			returnJson.put(Key.MESSAGE, e);
		}
		
		out.println(returnJson.toJSONString());
	}

}
