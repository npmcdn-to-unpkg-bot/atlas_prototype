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
        'store',
        'ACTIONS',
        'api',
        'endpointParser',
        'geometry',
        'geojson'
    ];

    function AtlasDetailController (
        $scope,
        store,
        ACTIONS,
        api,
        endpointParser,
        geometry,
        geojson) {

        var vm = this;

        $scope.$watch('vm.endpoint', function (endpoint) {
            api.getByUrl(endpoint).then(function (data) {
                vm.apiData = {
                    results: data
                };

                vm.location = null;

                vm.includeSrc = endpointParser.getTemplateUrl(endpoint);

                geometry.getGeoJSON(endpoint).then(function (geometry) {
                    vm.location = geojson.getCenter(geometry);

                    store.dispatch({
                        type: ACTIONS.SHOW_DETAIL,
                        payload: geometry
                    });
                });
            });
        });
    }
})();