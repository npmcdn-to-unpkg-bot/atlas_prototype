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
        '$q',
        'ACTIONS',
        'api',
        'endpointParser',
        'location',
        'store',
        'wgs84RdConverter'
    ];

    function AtlasDetailController ($scope, $q, ACTIONS, api, endpointParser, location, store, wgs84RdConverter) {

        var vm = this;
        vm.apiData = {};

        $scope.$watch('vm.endpoint', function(newValue) {
            api.getByUrl(newValue).then(function (data) {
                //koppel data aan de scope
                vm.apiData.results = data;

                //koppel de goede template op basis van het endpoint
                vm.templateUrl = endpointParser.parseEndpoint(newValue).templateUrl;

                //trap de actie show_detail af als alle api informatie binnen is
                getCoordinates(data).then(function(coordinates){
                    store.dispatch({
                        type: ACTIONS.SHOW_DETAIL,
                        payload: {
                            location: coordinates,
                            highlight: vm.apiData.geometrie || null
                        }
                    });
                });
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