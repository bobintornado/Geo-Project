
/**
 *
 * BYQ Javascript
 * 
 * */
function uploadGeoJson(id){
	var fd = new FormData(document.getElementById(id+"Form"));
	$.ajax({
		url : 'http://54.200.37.207:8080/GEO/UploadServlet?json={"fileType":"js,json,geojson,text","uploadDirectory":"geo","folderName":"geojson"}',
		type : "POST",
		data : fd,
		dataType : 'json',
		processData : false,
		contentType : false,
		error : function(err) {
			console.log(err);
			alert("uploadGeoJson: check ajax!");
		},
		success : function(data) {
			console.log(data);
			var status = data["status"];
			var message = data["message"];
			if (status == 0) {
				alert(message);
			} else {
				var fileUrl = data["fileUrl"];
				$("#"+id).val(fileUrl);
			}
		}
	});
}

function submitGEOJson(){
	var fileName = $("#fileName").val();
	var fileUrl = $("#geoJson").val();
	
	var input = {};
	input.name = fileName;
	input.url = fileUrl;
	
	var inputJson = JSON.stringify(input);
	inputJson = encodeURIComponent(inputJson);
	
	$.ajax({
		url : 'http://54.200.37.207:8080/GEO/UploadGEOJSONFile?json='+inputJson,
		type : 'GET',
		dataType : 'json',
		error : function(err){
			console.log(err);
			alert("submitGEOJson: check ajax!");
		},
		success : function(data){
			console.log(data);
			var status = data.status;
			var message = data.message;
			
			if(status == 1){
				getAllGEOJsons();
			}else{
				alert(message);
			}
			
			$("#fileName").val('');
			$("#geoJson").val('');
		}
	});
}

function getAllGEOJsons(){
	$.ajax({
		url : 'http://54.200.37.207:8080/GEO/GetAllGEOJSONFiles',
		type : 'GET',
		dataType : 'json',
		error : function(err){
			console.log(err);
			alert("getAllGEOJsons: check ajax!");
		},
		success : function(data){
			console.log(data);
			var status = data.status;
			var message = data.message;
			if(status == 1){
				var geoJsons = message;
				var geoJsonsHtml = '';
				for(var o in geoJsons){
					var geoJson = geoJsons[o];
					var tmpId = geoJson.id;
					var tmpName = geoJson.name;
					var tmpUrl = geoJson.url;
					var tmpDate = geoJson.date;
					
					geoJsonsHtml += '\
						<tr>\
							<th>'+tmpId+'</th>\
							<th>'+tmpName+'</th>\
							<th class="tableUrl">'+tmpUrl+'</th>\
							<th>'+tmpDate+'</th>\
							<th><button class="btn btn-danger btn-xs" onclick="deleteJsonFile('+tmpId+')"><i class="glyphicon glyphicon-trash"></i></button></th>\
						</tr>';
				}
				$("#geoJsons").html(geoJsonsHtml);
				console.log(geoJsons);
			}else{
				alert(message);
			}
		}
	});
}

function deleteJsonFile(id){
	var go = confirm("Are you sure to delete GEOJson(id = "+id+")?");
	
	if(go){
		var input = {};
		input.id = id;
		
		var inputJson = JSON.stringify(input);
		inputJson = encodeURIComponent(inputJson);
		
		$.ajax({
			url : 'http://54.200.37.207:8080/GEO/DeleteGeoJSONFile?json='+inputJson,
			type : 'GET',
			dataType : 'json',
			error : function(err){
				console.log(err);
				alert("deleteJsonFile: check ajax!");
			},
			success : function(data){
				console.log(data);
				var status = data.status;
				var message = data.message;
				
				if(status == 1){
					getAllGEOJsons();
				}else{
					alert(message);
				}
			}
		});
	}
};
