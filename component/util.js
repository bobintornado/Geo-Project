// C should be expressed in whatever scale unit you're interested in (miles, meters, feet, smoots, whatever)
// Since the earth is actually ellipsoidal, there will be a slight error in this calculation. 
// But it's very slight. (0.3% maximum error)
// A better distance calculation could be used
// Consult prof
// S=C*cos(y)/2^(z+8)

Global_D3_data = {};

osm_pixel_per_km = function(latitude, zoomlevel, circumference) {
    circumference = circumference || 6372.7982;
    return circumference * Math.cos(latitude) / (2 ^ (zoomlevel + 8));
};

L_function = function() {
    console.log('running L function');
    console.log('Should start spinning here');

    var target_file = $('input[name=data-option]:checked', '#l_form').val();
    var function_url = "/GEO/RequestRServlet?f=l&source="

    // For testing
    var theUrl = function_url.concat(target_file);

    // Can't use local file?!
    // var dropboxUrl = "http://localhost:8080/GEO/RequestRServlet?f=l&source="+data.link;
    var dropboxUrl = "http://localhost:8080/GEO/RequestRServlet?f=l&source=https://dl.dropboxusercontent.com/u/39327697/MOH_CHAS_CLINICS_raw.js";


    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('data get');
            Global_D3_data = jQuery.parseJSON(xmlhttp.responseText);
            plot_L_result();
        }
    };
    xmlhttp.open("GET", dropboxUrl, true);
    xmlhttp.send();
};

plot_L_result = function() {
    // Use to plot results
    // format data first
    var format_data = []
    
    for (var key in Global_D3_data) {
        if (Global_D3_data.hasOwnProperty(key)) {
            var array = [key];
            array = array.concat(Global_D3_data[key]);
            format_data.push(array);
        };
    };

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: format_data
        }
    });
};
