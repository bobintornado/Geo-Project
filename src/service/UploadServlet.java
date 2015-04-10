package service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.simple.JSONObject;

import system.Config;
import system.Key;
import system.Message;
import system.Value;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

/**
 * Servlet implementation class UploadServlet
 */
@WebServlet("/UploadServlet")
public class UploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UploadServlet() {
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
		response.addHeader("Access-Control-Allow-Origin", "*");
		PrintWriter out = response.getWriter();
		JSONObject returnJson = new JSONObject();
		
		String contextRoot = getServletContext().getRealPath("/");
		response.setContentType("text/html;charset=UTF-8");
		
		try{
			JSONObject input = (JSONObject)Config.JPARSER.parse(request.getParameter(Key.INPUTKEY));
			System.out.println("input: " + input.toJSONString());
			
			boolean isMultipart = ServletFileUpload.isMultipartContent(request);
			if(isMultipart){
				ServletFileUpload upload = new ServletFileUpload();
				
				try{
					FileItemIterator iter = upload.getItemIterator(request);
					while(iter.hasNext()){
						FileItemStream item = iter.next();
						try{
							String fieldName = item.getFieldName();
							if(fieldName.equals(Key.FILE)){
								String dateString = Config.SDF.format(new Date());
								
								String uploadDirectory = (String)input.get(Key.UPLOADDIRECTORY);
								String folderName = (String)input.get(Key.FOLDERNAME);
								String fileName = item.getName();
								String contentType = item.getContentType();
								
								boolean useOpenShift = false;
								//File DIR
								String fileDir = "";
								String urlDir = "";
								if(useOpenShift){
									File newDir = new File(System.getenv("OPENSHIFT_DATA_DIR") + uploadDirectory);
									if(!newDir.exists()){
										boolean result = newDir.mkdir();
										if(result){
											//success
										}else{
											returnJson.put(Key.STATUS, Value.FAIL);
											returnJson.put(Key.MESSAGE, Message.DIRNOTEXIST);
											return;
										}
									}
									File newFolder = new File(System.getenv("OPENSHIFT_DATA_DIR") + uploadDirectory+"/"+folderName);
									
									if(!newFolder.exists()){
										boolean result = newFolder.mkdir();
										if(result){
											//success
										}else{
											returnJson.put(Key.STATUS, Value.FAIL);
											returnJson.put(Key.MESSAGE, Message.FOLDERNOTEXIST);
											return;
										}
									}
									
									fileDir = System.getenv("OPENSHIFT_DATA_DIR") + uploadDirectory+"/"+folderName+File.separator+folderName+dateString+fileName;
									urlDir = "/static/"+uploadDirectory+"/"+folderName+File.separator+folderName+dateString+fileName;
									
								}else{
									File newDir = new File(contextRoot+uploadDirectory);
									if(!newDir.exists()){
										boolean result = newDir.mkdir();
										if(result){
											//success
										}else{
											returnJson.put(Key.STATUS, Value.FAIL);
											returnJson.put(Key.MESSAGE, Message.DIRNOTEXIST);
											return;
										}
									}
									File newFolder = new File(contextRoot+uploadDirectory+"/"+folderName);
									
									if(!newFolder.exists()){
										boolean result = newFolder.mkdir();
										if(result){
											//success
										}else{
											returnJson.put(Key.STATUS, Value.FAIL);
											returnJson.put(Key.MESSAGE, Message.FOLDERNOTEXIST);
											return;
										}
									}
									
									fileDir = contextRoot+uploadDirectory+"/"+folderName+File.separator+folderName+dateString+fileName;
									urlDir = "/"+Config.ROOT+"/"+uploadDirectory+"/"+folderName+File.separator+folderName+dateString+fileName;
								}
								
								boolean correctFileType = false;
								
								if(input.containsKey(Key.FILETYPE)){
									String[] fileTypes = ((String)input.get(Key.FILETYPE)).split(",");
									for(int i = 0; i < fileTypes.length; i++){
										if(contentType.toLowerCase().contains(fileTypes[i])){
											correctFileType = true;
											break;
										}
									}
								}else{
									correctFileType = true;
								}
								
								if(correctFileType){
									InputStream stream = item.openStream();
									
									if(item.isFormField()){
										// Do not process file out put stream
										// it is not a file but a form field
										// this could happen when there is a form within a form
										// I don't know, just guess~~ HA HA!
									}else{
										OutputStream os = new FileOutputStream(new File(fileDir));
										int sizeInt = 0;
										int restrictSize = 0;
										
										if(contentType.contains(Key.IMAGE)){
											restrictSize = Value.FILESIZESMALL;
										}else{
											restrictSize = Value.FILESIZEBIG;
										}
										
										boolean isTooLarge = false;
										int read = 0;
										byte[] bytes = new byte[1024];
										try{
											while((read = stream.read(bytes))!= -1){
												os.write(bytes, 0, read);
												if(sizeInt > restrictSize){
													// return message file cannot exceed 2Mb!
													isTooLarge = true;
													break;
												}
												sizeInt ++;
											}
											if(isTooLarge){
												// Delete failed file!
												// return exceed 2Mb!
												stream.close();
												os.close();
												File file = new File(fileDir);
												
												if(file.delete()){
													// clear failed file!
													returnJson.put(Key.STATUS, Value.FAIL);
													returnJson.put(Key.MESSAGE, Message.FILETOOLARGE1);
												}else{
													// failed file clear error!
													returnJson.put(Key.STATUS, Value.FAIL);
													returnJson.put(Key.MESSAGE, Message.FILETOOLARGE2);
												}
											}else{
												// success
												File toS3File = new File(fileDir);
												AWSCredentials credentials = new BasicAWSCredentials(Config.ACCESSKEY, Config.SECRETKEY);
												AmazonS3 s3client = new AmazonS3Client(credentials);
												
												try {
													PutObjectRequest por = new PutObjectRequest(Config.BUKETNAME, Config.S3ROOT+urlDir, toS3File);
													por.withCannedAcl(CannedAccessControlList.PublicRead);
													s3client.putObject(por);
													
													toS3File.delete();
													
													returnJson.put(Key.STATUS, Value.SUCCESS);
													//returnJson.put(Key.FILEDIR, fileDir);
													returnJson.put(Key.FILEURL, Config.S3URL + Config.BUKETNAME + "/" + Config.S3ROOT + urlDir);
												} catch (AmazonServiceException ase) {
													returnJson.put(Key.STATUS, Value.FAIL);
													returnJson.put(Key.MESSAGE, this.getServletName() + Message.SEP + ase);
													ase.printStackTrace();
												} catch (AmazonClientException ace) {
													returnJson.put(Key.STATUS, Value.FAIL);
													returnJson.put(Key.MESSAGE, this.getServletName() + Message.SEP + ace);
													ace.printStackTrace();
												}
											}
										}catch(Exception e){
											returnJson.put(Key.STATUS, Value.FAIL);
											returnJson.put(Key.MESSAGE, this.getServletName() + Message.SEP + e);
											e.printStackTrace();
										}
									}
								}else{
									returnJson.put(Key.STATUS, Value.FAIL);
									returnJson.put(Key.MESSAGE, (String)input.get(Key.FILETYPE));
								}
							}else{
								// handle other form fields
							}
						}catch(Exception e){
							returnJson.put(Key.STATUS, Value.FAIL);
							returnJson.put(Key.MESSAGE, this.getServletName()+ Message.SEP + e);
							e.printStackTrace();
						}
					}
				}catch(Exception e){
					returnJson.put(Key.STATUS, Value.FAIL);
					returnJson.put(Key.MESSAGE, this.getServletName() + Message.SEP + e);
					e.printStackTrace();
				}
			}else{
				returnJson.put(Key.STATUS, Value.FAIL);
				returnJson.put(Key.MESSAGE, Message.NOUPLOADREQUEST);
			}
		}catch(Exception e){
			returnJson.put(Key.STATUS, Value.FAIL);
			returnJson.put(Key.MESSAGE, this.getServletName() + Message.SEP + e);
			e.printStackTrace();
		}
		out.println(returnJson.toJSONString());
	}

}
