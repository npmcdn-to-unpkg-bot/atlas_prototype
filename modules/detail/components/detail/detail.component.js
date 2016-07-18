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

    AtlasDetailController.$inject = ['$scope', 'ACTIONS', 'api', 'endpointParser', 'store'];

    function AtlasDetailController ($scope, ACTIONS, api, endpointParser, store) {

        var vm = this;
        vm.apiData = {};

        $scope.$watch('vm.endpoint', function(newValue) {
            api.getByUrl(newValue).then(function (data) {
                //koppel data aan de scope
                vm.apiData.results = data;

                //koppel de goede template op basis van het endpoint
                vm.templateUrl = endpointParser.parseEndpoint(newValue).templateUrl;

                //trap de actie show_detail af als alle api informatie binnen is
                store.dispatch({
                    type: ACTIONS.SHOW_DETAIL,
                    payload: {
                        //TODO placeholders vervangen voor echte data
                        location: [52.35350778099046, 5.001068568757111],
                        geometry: vm.apiData.results.geometrie || null
                    }
                });
            });
        });

        vm.openStraatbeeld = function (straatbeeldId) {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: straatbeeldId
            });
        };
    }
})();