(function () {
    angular
        .module('atlasDetail')
        .component('atlasDetail', {
            bindings: {
                endpoint: '@',
                isLoading: '='
            },
            templateUrl: 'modules/detail/components/detail/detail.html',
            controller: AtlasDetailController,
            controllerAs: 'vm'
        });

    AtlasDetailController.$inject = [
        '$scope',
        'ACTIONS',
        'api',
        'endpointParser',
        'geometry',
        'store',
        'wgs84RdConverter'
    ];

    function AtlasDetailController ($scope, ACTIONS, api, endpointParser, geometry, store, wgs84RdConverter) {

        var vm = this;
        vm.apiData = {};

        $scope.$watch('vm.endpoint', function(endpoint) {
            api.getByUrl(endpoint).then(function (data) {
                //koppel data aan de scope
                vm.apiData.results = data;

                //koppel de goede template op basis van het endpoint
                vm.templateUrl = endpointParser.parseEndpoint(endpoint).templateUrl;

                //trap de actie show_detail af als alle api informatie binnen is
                geometry.getGeoJSON(endpoint).then(function (geometry) {
                    console.log(geometry);
                });

                /*
                getCoordinates(data).then(function(coordinates){

                    console.log('location', coordinates);
                    console.log('highlight', vm.apiData.geometrie);

                    store.dispatch({
                        type: ACTIONS.SHOW_DETAIL,
                        payload: {
                            location: coordinates,
                            highlight: vm.apiData.geometrie || null
                        }
                    });
                });
                */
            });
        });

        vm.openStraatbeeld = function (straatbeeldId) {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: straatbeeldId
            });
        };

        function getCoordinates(data) {
            return location.getLocation(data).then(function(coordinates){
                var coordinatesWgs84;

                coordinatesWgs84 = wgs84RdConverter.rdToWgs84(coordinates);

                return coordinatesWgs84;
            });
        }
    }
})();