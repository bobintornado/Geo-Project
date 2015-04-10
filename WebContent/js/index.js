$(document).ready(function(){
	
	
});

function assistInput(){
	$(".leaflet-control-geocoder-form input[type='text']").val($("#mySearch").val());
}

function assistFind(){
	$(".leaflet-control-geocoder-form input[type='submit']").trigger("click");
}

function myClickBtn(id){
	if($(id).hasClass('my-btn-active')){
		$(id).removeClass('my-btn-active');
	}else{
		$(id).addClass('my-btn-active');
	}
}