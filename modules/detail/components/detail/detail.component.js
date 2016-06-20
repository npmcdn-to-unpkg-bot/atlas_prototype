(function () {
    angular
        .module('atlasDetail')
        .component('atlasDetail', {
            bindings: {
                uri: '@',
                isLoading: '=',
                store: '='
            },
            templateUrl: 'modules/detail/components/detail/detail.html',
            controller: AtlasDetailController,
            controllerAs: 'vm'
        });

    AtlasDetailController.$inject = ['ACTIONS', 'api'];

    function AtlasDetailController (ACTIONS, api) {
        var vm = this;

        console.log(vm.uri);

            api.getByUri(vm.uri).then(function (apiData) {
                vm.api_data = apiData;

                vm.store.dispatch({
                    type: ACTIONS.SHOW_DETAIL,
                    payload: {
                        location: [52.378086874951386, 4.922568081008677],
                        highlight: vm.api_data.geometrie
                    }
                });
            });

        vm.openStraatbeeld = function (straatbeeldId) {
            vm.store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: straatbeeldId
            });
        };
    }
})();