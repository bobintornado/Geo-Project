current_L_source = '';

// for every run. I need clear screen. Means I need to clean up previous action
angular.module('geoApp', ['angularSpinner'])
    .factory('DataList', function($http) {
        // The sole copy to be used by the app
        var _source = [];
        $http.get('/GEO/GetAllGEOJSONFiles')
            .success(function(data) {
                if (data.status == 1) {
                    _source = data.message.slice();
                    // Load finished
                    $('body').addClass('loaded');
                };
            });

        var factory = {
            getPromise: function() {
                var promise = $http.get('/GEO/GetAllGEOJSONFiles');
                return promise;
            },
            update: function() {
                // update private source variable later
            },
            list: function() {
                return _source;
            }
        }
        return factory;
    })
    .controller('DetailsController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {
        $scope.bufferInUse = false;
        $scope.buffer_radius = 0;
        $rootScope.$on('bufferR', function(event, r){
            $scope.buffer_radius = r;
        });

        $scope.features_in_check = {};

        // react to add/remove events
        $rootScope.$on('add_feature', function(event, feature) {
            var id = feature.properties.OBJECTID;
            $scope.features_in_check[id] = feature;
            $scope.$apply();
        });

        $rootScope.$on('remove_feature', function(event, feature) {
            var id = feature.properties.OBJECTID;
            delete $scope.features_in_check[id];
            $scope.$apply();
        });

        $rootScope.$on('BufferOn', function() {
            $scope.bufferInUse = true;
        });

        $scope.remove = function function_name(argument) {
            map.removeLayer(source_layer);
            map.removeLayer(target_layer);
            $scope.bufferInUse = false;
        }
    }])
    .controller('KDEController', ['$scope', 'DataList', '$rootScope', 'usSpinnerService', function($scope, DataList, $rootScope, usSpinnerService) {
        $scope.list = [];
        $scope.choice = {
            url: ''
        };
        $rootScope.$on('KDE', function() {
            $scope.list = DataList.list();
        });
        $scope.radius = {
            value: 0
        };
        $scope.runKDE = function() {
            // Spinner
            usSpinnerService.spin('spinner');
            // remove previous KDE layer
            var theUrl = "/GEO/RequestRServlet?f=kde&r=" + $scope.radius.value + "&source=" + $scope.choice.url;
            KDE(theUrl, usSpinnerService);
        };
    }])
    .controller('LController', ['$scope', 'DataList', '$rootScope', 'usSpinnerService', function($scope, DataList, $rootScope, usSpinnerService) {
        $scope.list = [];
        $scope.choice = {
            url: ''
        };
        // Update on Modal Open
        $rootScope.$on('L Function', function() {
            $scope.list = DataList.list();
        });

        $scope.runL = function() {
            // Concat
            usSpinnerService.spin('spinner');

            // set L name
            for (var i = $scope.list.length - 1; i >= 0; i--) {
                if ($scope.list[i].url == $scope.choice.url) {
                    Current_L_Name = $scope.list[i].name;
                };
            };
            var theUrl = "/GEO/RequestRServlet?f=l&source=" + $scope.choice.url;
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    // functions are in util.js
                    Global_D3_data = jQuery.parseJSON(xmlhttp.responseText);
                    plot_L_result();
                    usSpinnerService.stop('spinner');
                }
            };
            xmlhttp.open("GET", theUrl, true);
            xmlhttp.send();

            // get source URL
            current_L_source = $scope.choice.url;
        };
    }])
    .controller('BufferController', ['$scope', 'DataList', '$rootScope', '$q', '$http', 'usSpinnerService', function($scope, DataList, $rootScope, $q, $http, usSpinnerService) {
        $scope.list = DataList;
        $rootScope.$on('Buffer', function() {
            $scope.list = DataList.list();
        });
        $scope.buffer_config = {
            source: '',
            target: '',
            radius: 0
        };

        $scope.source = {};
        $scope.target = {};

        $scope.runBuffer = function() {
            usSpinnerService.spin('spinner');

            // Set radius
            $rootScope.$emit('bufferR', $scope.buffer_config.radius);

            // remove previous layers
            map.removeLayer(source_layer);
            map.removeLayer(target_layer);

            var source_options = {
                pointToLayer: function(feature, latlng) {
                    // mk = L.circleMarker(latlng);
                    // Difficulty in finding pixel per meters, a bug here
                    // mk.setRadius(getPixels(latlng, $scope.buffer_config.radius));
                    mk = L.circle(latlng, $scope.buffer_config.radius)

                    mk.on('mouseover', function() {
                        $rootScope.$emit('add_feature', feature);
                    });

                    mk.on('mouseout', function() {
                        $rootScope.$emit('remove_feature', feature);
                    });

                    return mk;
                }
            };

            var promises = [];
            promises.push($http.get("/GEO/S3JSONFile?source=" + $scope.buffer_config.source));
            promises.push($http.get("/GEO/S3JSONFile?source=" + $scope.buffer_config.target));
            $q.all(promises).then(function(array) {
                $scope.source = array[0].data;
                $scope.target = array[1].data;
                calculate_buffer($scope.source, $scope.target, $scope.buffer_config.radius);


                source_layer = L.geoJson($scope.source, source_options);
                map.addLayer(source_layer);

                target_layer = L.geoJson($scope.target);
                map.addLayer(target_layer);
                map.on('zoomend', function() {
                    // redraw on zoomend
                    map.removeLayer(source_layer);
                    source_layer = L.geoJson($scope.source, source_options);
                    map.addLayer(source_layer);
                });
                $rootScope.$emit('BufferOn');
                // All done, stop spinning.
                usSpinnerService.stop('spinner');
            });

        };
    }])
    .controller('NavController', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.buttons = [{
            target: '#pattern',
            name: 'KDE'
        }, {
            target: '#analysis',
            name: 'L Function'
        }, {
            target: '#buffer',
            name: 'Buffer'
        }];
        $scope.select = function(name) {
            $rootScope.$emit(name);
        };
    }])
    .controller('LkdeControl', ['$scope', 'usSpinnerService', function($scope, usSpinnerService) {
        $scope.confirm = function() {
            usSpinnerService.spin('spinner');
            var r = $('#r').text();
            var theUrl = "/GEO/RequestRServlet?f=kde&r=" + r + "&source=" + current_L_source;
            KDE(theUrl, usSpinnerService)
        };
    }]);
