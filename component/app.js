angular.module('geoApp', [])
    .factory('DataList', function() {
        // calling method goes there
        var DataList = [{
            Name: 'HDB',
            URL: 'url',
            Date: 'update_on'
        }, {
            Name: 'Clinics',
            URL: 'url',
            Date: 'update_on'
        }, {
            Name: 'Screen Center',
            URL: 'url',
            Date: 'update_on'
        }, {
            Name: 'Elderly Care',
            URL: 'url',
            Date: 'update_on'
        }]
        return DataList;
    })
    .controller('detailsController', ['$scope', function($scope) {

        $scope.features_in_check = {};
        $scope.buffer_radius = 200;

        $scope.add_feature = function(feature) {
            var id = feature.properties.OBJECTID;
            $scope.features_in_check[id] = feature;
            $scope.$apply();
        };
        $scope.remove_feature = function(feature) {
            var id = feature.properties.OBJECTID;
            delete $scope.features_in_check[id];
            $scope.$apply();
        };

        var clinics_options = {
            pointToLayer: function(feature, latlng) {
                mk = L.circleMarker(latlng);

                // var centerLatLng = map.getCenter(); // get map center
                var pointC = map.latLngToContainerPoint(latlng); // convert to containerpoint (pixels)
                var pointX = [pointC.x + 1, pointC.y]; // add one pixel to x
                var pointY = [pointC.x, pointC.y + 1]; // add one pixel to y

                // convert containerpoints to latlng's
                var latLngC = map.containerPointToLatLng(pointC);
                var latLngX = map.containerPointToLatLng(pointX);
                var latLngY = map.containerPointToLatLng(pointY);

                var distanceX = latLngC.distanceTo(latLngX); // calculate distance between c and x (latitude)
                var distanceY = latLngC.distanceTo(latLngY); // calculate distance between c and y (longitude)

                var pixels = buffer_radius / distanceY;

                // Difficulty in finding pixel per meters
                mk.setRadius(pixels);

                mk.on('mouseover', function() {
                    $scope.add_feature(feature);
                    console.log('mouseover');
                });

                mk.on('mouseout', function() {
                    $scope.remove_feature(feature);
                    console.log('mouseout');
                });

                return mk;
            }
        };

        // Adding MOH_CHAS_CLINICS with circle marker option
        MOH_CHAS_CLINICS_layer = L.geoJson(MOH_CHAS_CLINICS, clinics_options);
        map.addLayer(MOH_CHAS_CLINICS_layer);
        // Add Scale
        L.control.scale().addTo(map);

        // Re-plot points (for every single feature)
        map.on('zoomend', function() {
            // remove existing layer
            map.removeLayer(MOH_CHAS_CLINICS_layer);
            // add in new
            MOH_CHAS_CLINICS_layer = L.geoJson(MOH_CHAS_CLINICS, clinics_options);
            map.addLayer(MOH_CHAS_CLINICS_layer);
            // Side effect distance must be known before 
            // otherwise too slow
        });
    }])
    .controller('KDEController', ['$scope', 'DataList', function($scope, DataList) {
        $scope.list = DataList;
    }])
    .controller('LController', ['$scope', 'DataList', function($scope, DataList) {
        $scope.list = DataList;
    }])
    .controller('BufferController', ['$scope', 'DataList', function($scope, DataList) {
        $scope.list = DataList;
    }]);

// Move this to some where better
$('body').addClass('loaded');