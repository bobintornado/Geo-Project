var map = L.map('map', { zoomControl:true }).fitBounds([[1.1448301072,103.593366772],[1.4846186163,104.100569313]]);
var hash = new L.Hash(map); //add hashes to html address to easy share locations
var additional_attrib = 'created w. <a href="https://github.com/geolicious/qgis2leaf" target ="_blank">qgis2leaf</a> by <a href="http://www.geolicious.de" target ="_blank">Geolicious</a> & contributors<br>';
var feature_group = new L.featureGroup([]);

var raster_group = new L.LayerGroup([]);

var basemap_0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
	attribution: additional_attrib + '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});	
basemap_0.addTo(map);	

var basemap_1 = L.tileLayer('http://{s}.tile.opencyclemap.org/transport/{z}/{x}/{y}.png', { 
	attribution: additional_attrib + '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});


var layerOrder=new Array();
function pop_SUBZONESVY21(feature, layer) {							
	var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th scope="row">SUBZONE_NO</th><td>' + Autolinker.link(String(feature.properties['SUBZONE_NO'])) + '</td></tr><tr><th scope="row">SUBZONE_N</th><td>' + Autolinker.link(String(feature.properties['SUBZONE_N'])) + '</td></tr><tr><th scope="row">SUBZONE_C</th><td>' + Autolinker.link(String(feature.properties['SUBZONE_C'])) + '</td></tr><tr><th scope="row">CA_IND</th><td>' + Autolinker.link(String(feature.properties['CA_IND'])) + '</td></tr><tr><th scope="row">PLN_AREA_N</th><td>' + Autolinker.link(String(feature.properties['PLN_AREA_N'])) + '</td></tr><tr><th scope="row">PLN_AREA_C</th><td>' + Autolinker.link(String(feature.properties['PLN_AREA_C'])) + '</td></tr><tr><th scope="row">REGION_N</th><td>' + Autolinker.link(String(feature.properties['REGION_N'])) + '</td></tr><tr><th scope="row">REGION_C</th><td>' + Autolinker.link(String(feature.properties['REGION_C'])) + '</td></tr><tr><th scope="row">INC_CRC</th><td>' + Autolinker.link(String(feature.properties['INC_CRC'])) + '</td></tr><tr><th scope="row">FMEL_UPD_D</th><td>' + Autolinker.link(String(feature.properties['FMEL_UPD_D'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr><tr><th scope="row">SHAPE_Leng</th><td>' + Autolinker.link(String(feature.properties['SHAPE_Leng'])) + '</td></tr><tr><th scope="row">SHAPE_Area</th><td>' + Autolinker.link(String(feature.properties['SHAPE_Area'])) + '</td></tr></table>';
	//layer.bindPopup(popupContent);
}
				
var exp_SUBZONESVY21JSON = new L.geoJson(exp_SUBZONESVY21,{
	onEachFeature: pop_SUBZONESVY21,
	style: function (feature) {
		return {fillColor: feature.properties.color_qgis2leaf,
			color: '#000',
			weight: 1,
			opacity: feature.properties.transp_qgis2leaf,
			fillOpacity: feature.properties.transp_qgis2leaf};
		}
});
feature_group.addLayer(exp_SUBZONESVY21JSON);
			
//add comment sign to hide this layer on the map in the initial view.
//exp_SUBZONESVY21JSON.addTo(map);

function pop_ROADSGHHE(feature, layer) {
	var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">ref</th><td>' + Autolinker.link(String(feature.properties['ref'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">oneway</th><td>' + Autolinker.link(String(feature.properties['oneway'])) + '</td></tr><tr><th scope="row">bridge</th><td>' + Autolinker.link(String(feature.properties['bridge'])) + '</td></tr><tr><th scope="row">maxspeed</th><td>' + Autolinker.link(String(feature.properties['maxspeed'])) + '</td></tr></table>';
	//layer.bindPopup(popupContent);
}

var exp_ROADSGHHEJSON = new L.geoJson(exp_ROADSGHHE,{
	onEachFeature: pop_ROADSGHHE,
	style: function (feature) {
		return {
			weight: feature.properties.radius_qgis2leaf,
			color: feature.properties.color_qgis2leaf,
			opacity: feature.properties.transp_qgis2leaf,
			fillOpacity: feature.properties.transp_qgis2leaf
		};
	}
});

feature_group.addLayer(exp_ROADSGHHEJSON);
layerOrder[layerOrder.length] = exp_ROADSGHHEJSON;
for (index = 0; index < layerOrder.length; index++) {
	feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
}

//add comment sign to hide this layer on the map in the initial view.
//exp_ROADSGHHEJSON.addTo(map);

function pop_MRTSVY21(feature, layer) {
	var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}

var exp_MRTSVY21JSON = new L.geoJson(exp_MRTSVY21,{
	onEachFeature: pop_MRTSVY21,
	style: function (feature) {
		return {weight: feature.properties.radius_qgis2leaf,
			color: feature.properties.color_qgis2leaf,
			opacity: feature.properties.transp_qgis2leaf,
			fillOpacity: feature.properties.transp_qgis2leaf
		};
	}
});
feature_group.addLayer(exp_MRTSVY21JSON);

//add comment sign to hide this layer on the map in the initial view.
//exp_MRTSVY21JSON.addTo(map);



function pop_CLINICSVY21(feature, layer) {
	var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th scope="row">HCI_CODE</th><td>' + Autolinker.link(String(feature.properties['HCI_CODE'])) + '</td></tr><tr><th scope="row">HCI_NAME</th><td>' + Autolinker.link(String(feature.properties['HCI_NAME'])) + '</td></tr><tr><th scope="row">LICENCE_TY</th><td>' + Autolinker.link(String(feature.properties['LICENCE_TY'])) + '</td></tr><tr><th scope="row">HCI_TEL</th><td>' + Autolinker.link(String(feature.properties['HCI_TEL'])) + '</td></tr><tr><th scope="row">POSTAL_CD</th><td>' + Autolinker.link(String(feature.properties['POSTAL_CD'])) + '</td></tr><tr><th scope="row">ADDR_TYPE</th><td>' + Autolinker.link(String(feature.properties['ADDR_TYPE'])) + '</td></tr><tr><th scope="row">BLK_HSE_NO</th><td>' + Autolinker.link(String(feature.properties['BLK_HSE_NO'])) + '</td></tr><tr><th scope="row">FLOOR_NO</th><td>' + Autolinker.link(String(feature.properties['FLOOR_NO'])) + '</td></tr><tr><th scope="row">UNIT_NO</th><td>' + Autolinker.link(String(feature.properties['UNIT_NO'])) + '</td></tr><tr><th scope="row">STREET_NAM</th><td>' + Autolinker.link(String(feature.properties['STREET_NAM'])) + '</td></tr><tr><th scope="row">BUILDING_N</th><td>' + Autolinker.link(String(feature.properties['BUILDING_N'])) + '</td></tr><tr><th scope="row">CLINIC_PRO</th><td>' + Autolinker.link(String(feature.properties['CLINIC_PRO'])) + '</td></tr><tr><th scope="row">X_COORDINA</th><td>' + Autolinker.link(String(feature.properties['X_COORDINA'])) + '</td></tr><tr><th scope="row">Y_COORDINA</th><td>' + Autolinker.link(String(feature.properties['Y_COORDINA'])) + '</td></tr><tr><th scope="row">INC_CRC</th><td>' + Autolinker.link(String(feature.properties['INC_CRC'])) + '</td></tr><tr><th scope="row">FMEL_UPD_D</th><td>' + Autolinker.link(String(feature.properties['FMEL_UPD_D'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}
				
var exp_CLINICSVY21JSON = new L.geoJson(exp_CLINICSVY21,{
	onEachFeature: pop_CLINICSVY21,
	pointToLayer: function (feature, latlng) {  
		return L.circleMarker(latlng, {
			radius: feature.properties.radius_qgis2leaf,
			fillColor: feature.properties.color_qgis2leaf,

			color: feature.properties.borderColor_qgis2leaf,
			weight: 1,
			opacity: feature.properties.transp_qgis2leaf,
			fillOpacity: feature.properties.transp_qgis2leaf
		})
	}
});
		
var cluster_groupCLINICSVY21JSON= new L.MarkerClusterGroup({showCoverageOnHover: false});
cluster_groupCLINICSVY21JSON.addLayer(exp_CLINICSVY21JSON);
		
//add comment sign to hide this layer on the map in the initial view.
//cluster_groupCLINICSVY21JSON.addTo(map);

function pop_PHARMACYSVY21(feature, layer) {
	var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th scope="row">POSTAL_COD</th><td>' + Autolinker.link(String(feature.properties['POSTAL_COD'])) + '</td></tr><tr><th scope="row">BUILDING_N</th><td>' + Autolinker.link(String(feature.properties['BUILDING_N'])) + '</td></tr><tr><th scope="row">UNIT_NO</th><td>' + Autolinker.link(String(feature.properties['UNIT_NO'])) + '</td></tr><tr><th scope="row">LEVEL_NO</th><td>' + Autolinker.link(String(feature.properties['LEVEL_NO'])) + '</td></tr><tr><th scope="row">ROAD_NAME</th><td>' + Autolinker.link(String(feature.properties['ROAD_NAME'])) + '</td></tr><tr><th scope="row">HOUSE_BLK_</th><td>' + Autolinker.link(String(feature.properties['HOUSE_BLK_'])) + '</td></tr><tr><th scope="row">PHARMACY_N</th><td>' + Autolinker.link(String(feature.properties['PHARMACY_N'])) + '</td></tr><tr><th scope="row">INC_CRC</th><td>' + Autolinker.link(String(feature.properties['INC_CRC'])) + '</td></tr><tr><th scope="row">FMEL_UPD_D</th><td>' + Autolinker.link(String(feature.properties['FMEL_UPD_D'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}
						
var exp_PHARMACYSVY21JSON = new L.geoJson(exp_PHARMACYSVY21,{
	onEachFeature: pop_PHARMACYSVY21,
	pointToLayer: function (feature, latlng) {  
		return L.circleMarker(latlng, {
			radius: feature.properties.radius_qgis2leaf,
			fillColor: feature.properties.color_qgis2leaf,
			color: feature.properties.borderColor_qgis2leaf,
			weight: 1,
			opacity: feature.properties.transp_qgis2leaf,
			fillOpacity: feature.properties.transp_qgis2leaf
		})
	}
});
feature_group.addLayer(exp_PHARMACYSVY21JSON);

var cluster_groupPHARMACYSVY21JSON= new L.MarkerClusterGroup({showCoverageOnHover: false});
cluster_groupPHARMACYSVY21JSON.addLayer(exp_PHARMACYSVY21JSON);
				
//add comment sign to hide this layer on the map in the initial view.
//cluster_groupPHARMACYSVY21JSON.addTo(map);

function pop_ELDERCARESVY21(feature, layer) {
	var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th scope="row">ADDRESSBLO</th><td>' + Autolinker.link(String(feature.properties['ADDRESSBLO'])) + '</td></tr><tr><th scope="row">ADDRESSBUI</th><td>' + Autolinker.link(String(feature.properties['ADDRESSBUI'])) + '</td></tr><tr><th scope="row">ADDRESSPOS</th><td>' + Autolinker.link(String(feature.properties['ADDRESSPOS'])) + '</td></tr><tr><th scope="row">ADDRESSSTR</th><td>' + Autolinker.link(String(feature.properties['ADDRESSSTR'])) + '</td></tr><tr><th scope="row">ADDRESSTYP</th><td>' + Autolinker.link(String(feature.properties['ADDRESSTYP'])) + '</td></tr><tr><th scope="row">DESCRIPTIO</th><td>' + Autolinker.link(String(feature.properties['DESCRIPTIO'])) + '</td></tr><tr><th scope="row">HYPERLINK</th><td>' + Autolinker.link(String(feature.properties['HYPERLINK'])) + '</td></tr><tr><th scope="row">LANDXADDRE</th><td>' + Autolinker.link(String(feature.properties['LANDXADDRE'])) + '</td></tr><tr><th scope="row">LANDYADDRE</th><td>' + Autolinker.link(String(feature.properties['LANDYADDRE'])) + '</td></tr><tr><th scope="row">NAME</th><td>' + Autolinker.link(String(feature.properties['NAME'])) + '</td></tr><tr><th scope="row">PHOTOURL</th><td>' + Autolinker.link(String(feature.properties['PHOTOURL'])) + '</td></tr><tr><th scope="row">ADDRESSFLO</th><td>' + Autolinker.link(String(feature.properties['ADDRESSFLO'])) + '</td></tr><tr><th scope="row">ADDRESSUNI</th><td>' + Autolinker.link(String(feature.properties['ADDRESSUNI'])) + '</td></tr><tr><th scope="row">INC_CRC</th><td>' + Autolinker.link(String(feature.properties['INC_CRC'])) + '</td></tr><tr><th scope="row">FMEL_UPD_D</th><td>' + Autolinker.link(String(feature.properties['FMEL_UPD_D'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}
						
var exp_ELDERCARESVY21JSON = new L.geoJson(exp_ELDERCARESVY21,{
	onEachFeature: pop_ELDERCARESVY21,
	pointToLayer: function (feature, latlng) {  
		return L.circleMarker(latlng, {
			radius: feature.properties.radius_qgis2leaf,
			fillColor: feature.properties.color_qgis2leaf,

			color: feature.properties.borderColor_qgis2leaf,
			weight: 1,
			opacity: feature.properties.transp_qgis2leaf,
			fillOpacity: feature.properties.transp_qgis2leaf
		})
	}
});
feature_group.addLayer(exp_ELDERCARESVY21JSON);

var cluster_groupELDERCARESVY21JSON= new L.MarkerClusterGroup({showCoverageOnHover: false});
cluster_groupELDERCARESVY21JSON.addLayer(exp_ELDERCARESVY21JSON);

//add comment sign to hide this layer on the map in the initial view.
//cluster_groupELDERCARESVY21JSON.addTo(map);


var title = new L.Control();
title.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this.update();
	return this._div;
};
title.update = function () {
	this._div.innerHTML = '<h2>Assignment 01</h2>Assignment 01'
};
title.addTo(map);
var osmGeocoder = new L.Control.OSMGeocoder({
    collapsed: false,
    position: 'topright',
    text: 'Find!',
});
osmGeocoder.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
div.innerHTML = "<h3>Legend</h3><table></table>";
		return div;
	};
	legend.addTo(map);

var baseMaps = {
	'<font id="map01">MAP01</font>': basemap_0,
	'<font id="map02">MAP02</font>': basemap_1
};

L.control.layers(baseMaps,{"<font id='health01'>CLINICSVY21</font>": cluster_groupCLINICSVY21JSON,"SUBZONESVY21": exp_SUBZONESVY21JSON,"<font id='route01'>ROADSGHHE</font>": exp_ROADSGHHEJSON,"<font id='route02'>MRTSVY21</font>": exp_MRTSVY21JSON,"<font id='health03'>ELDERCARESVY21</font>": cluster_groupELDERCARESVY21JSON,"<font id='health02'>PHARMACYSVY21</font>": cluster_groupPHARMACYSVY21JSON},{collapsed:false}).addTo(map);
	function updateOpacity(value) {
}

L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);

// Options for the Hexbin
var options = {
	// Size of the hexagons
	radius : 12,
	// Default opacity of the hexagons
	opacity: 0.8,
	// Transition duration for animations
	duration: 500,
	// Accessor functions for lat/long
	lng: function(d){
		return d[0];
	},
	lat: function(d){
		return d[1];
	},

	// Value accessor function for deriving the color of the hexagons
	value: function(d){ return d.length; },

	// Override the extent of the value domain
	valueFloor: undefined,
	valueCeil: undefined
};

// Create the hexlayer
var hexLayer = L.hexbinLayer(options).addTo(map);

// Set the colorScale range - colorScale() returns a reference to the scale used to map the color of each hexbin
hexLayer.colorScale().range(['white', 'blue']);


// Random data generators

//var center = [1.1448301072, 103.593366772];
//var latFn = d3.random.normal(center[0], 1);
//var longFn = d3.random.normal(center[1], 1);



function generateData(INPUTS){
	var data = [];
//	for(i=0; i<1000; i++){
//		data.push([longFn(),  latFn()]);
//	}
	
	var list = [];
	
	for(var o in INPUTS){
		var INPUT = INPUTS[o];
		for(var p in INPUT.features){
			var tempFeature = INPUT.features[p];
			list.push(tempFeature);
		}
	}
	
	for(var o in list){
		var tempObj = list[o];
		console.log(tempObj);
		data.push([tempObj.geometry.coordinates[0], tempObj.geometry.coordinates[1]]);
	}
	hexLayer.data(data);
};

function hideControl(){
	$(".info").addClass("sr-only");
	$(".leaflet-control").addClass("sr-only");
}

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function analyseData(){
	L.geoJson(exp_SUBZONESVY21, {style: style}).addTo(map);
}


