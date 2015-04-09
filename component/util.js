// Important global data
Global_D3_data = {};
Global_KDE_data = {};
Global_heat_data = [];
HeatmapLayer = {};

KDE = function(theUrl, usSpinnerService) {
    if (map.hasLayer(HeatmapLayer)) {
        map.removeLayer(HeatmapLayer);
    };
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);

            Global_KDE_data = jQuery.parseJSON(xmlhttp.responseText);

            // y lat, x long, value value
            // Get Max
            var max = 0;
            for (var i = Global_KDE_data['value'].length - 1; i >= 0; i--) {
                if (Global_KDE_data['value'][i] > max) {
                    max = Global_KDE_data['value'][i];
                };
            };
            // format
            for (var i = Global_KDE_data['x'].length - 1; i >= 0; i--) {
                var latlng_point = {
                    'lat': Global_KDE_data['y'][i],
                    'lng': Global_KDE_data['x'][i],
                    'val': Global_KDE_data['value'][i]
                };
                Global_heat_data.push(latlng_point);
            };
            var cfg = {
                // radius should be small ONLY if scaleRadius is true (or small radius is intended)
                // if scaleRadius is false it will be the constant radius used in pixels
                "radius": .006,
                "maxOpacity": .8,
                // scales the radius based on map zoom
                "scaleRadius": true,
                // if set to false the heatmap uses the global maximum for colorization
                // if activated: uses the data maximum within the current map boundaries 
                //   (there will always be a red spot with useLocalExtremas true)
                "useLocalExtrema": true,
                // which field name in your data represents the latitude - default "lat"
                latField: 'lat',
                // which field name in your data represents the longitude - default "lng"
                lngField: 'lng',
                // which field name in your data represents the data value - default "value"
                valueField: 'val'
            };
            HeatmapLayer = new HeatmapOverlay(cfg);

            var formatted_data = {
                max: max,
                data: Global_heat_data
            };
            map.addLayer(HeatmapLayer);
            HeatmapLayer.setData(formatted_data);

            usSpinnerService.stop('spinner');
        }
    };
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.send();
};

plot_L_result = function() {
    // Use to plot results
    // format data first
    var format_data = [];

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
            x: 'r',
            columns: format_data,
            onclick: function(d, element) {
                $('#ds').text($('#Lchoice').val());
                $('#r').text(d.x);
                $('#lkde').modal('show');
            }
        },
        zoom: {
            enabled: true,
            rescale: true
        },
        axis: {
            x: {
                label: 'Meters'
            }
        }
    });
};

// Calculation method
calculate_buffer = function(source, target, buffer_radius) {
    target_array = [];
    L.geoJson(target, {
        coordsToLatLng: function(array) {
            target_array.push(L.latLng(array));
        }
    });

    source_array = [];
    L.geoJson(source, {
        coordsToLatLng: function(array) {
            source_array.push(L.latLng(array));
        }
    });
    for (var i = 0; i < target_array.length; i++) {
        for (var j = 0; j < source_array.length; j++) {
            var d = target_array[i].distanceTo(source_array[j]);
            if (d < buffer_radius) {
                // Update in target in range of defined buffer
                if (source.features[j].inRange == undefined) {
                    source.features[j].inRange = [];
                    source.features[j].inRange.push(target.features[i])
                } else {
                    source.features[j].inRange.push(target.features[i])
                };
            };
        };
    };
    return source;
};

// get Pixels method
getPixels = function(latlng, radius) {
    var pointC = map.latLngToContainerPoint(latlng); // convert to containerpoint (pixels)
    var pointX = [pointC.x + 1, pointC.y]; // add one pixel to x
    var pointY = [pointC.x, pointC.y + 1]; // add one pixel to y

    // convert containerpoints to latlng's
    var latLngC = map.containerPointToLatLng(pointC);
    var latLngX = map.containerPointToLatLng(pointX);
    var latLngY = map.containerPointToLatLng(pointY);

    var distanceX = latLngC.distanceTo(latLngX); // calculate distance between c and x (latitude)
    var distanceY = latLngC.distanceTo(latLngY); // calculate distance between c and y (longitude)

    var pixels = radius / distanceY;
    return pixels;
};