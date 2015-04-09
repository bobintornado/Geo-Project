// Start Spinning

map = L.map('map').setView([1.3569, 103.7779], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var center_marker_option = {
    pointToLayer: function(feature, latlng) {
        mk = L.circleMarker(latlng, {
            color: "#0B0B61"
        });
        mk.setRadius(1.5);
        return mk;
    }
};

var center_marker_option_red = {
    pointToLayer: function(feature, latlng) {
        mk = L.circleMarker(latlng, {
            color: "#FF0000"
        });
        mk.setRadius(5);
        return mk;
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.NAME);
    }
};

// eldercare_array = [];
// L.geoJson(ELDERCARE, {
//     coordsToLatLng: function(array) {
//         eldercare_array.push(L.latLng(array));
//     }
// });

// clinics_array = [];
// L.geoJson(MOH_CHAS_CLINICS, {
//     coordsToLatLng: function(array) {
//         clinics_array.push(L.latLng(array));
//     }
// });

// for (var i = 0; i < MOH_CHAS_CLINICS.features.length; i++) {
//     console.log(MOH_CHAS_CLINICS.features[i].inRange);
// };

// Adding MOH_CHAS_CLINICS
// L.geoJson(MOH_CHAS_CLINICS, center_marker_option).addTo(map);

// L.geoJson(ELDERCARE, center_marker_option_red).addTo(map);


// clinics_raw_array = [];
// L.geoJson(MOH_CHAS_CLINICS, {
//     coordsToLatLng: function(array) {
//     	var a = [];
//     	a[0] = array[1];
//     	a[1] = array[0];
//         clinics_raw_array.push(a);
//     }
// });
// unknown heatmap approach
// var heat = L.heatLayer(clinics_raw_array, {
//     radius: 40,
//     blur: 10,
//     maxZoom: 17,
// }).addTo(map);
L.control.scale().addTo(map);