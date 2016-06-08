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

    AtlasDetailController.$inject = ['ACTIONS'];

    function AtlasDetailController (ACTIONS) {
        var vm = this;

        vm.openStraatbeeld = function (straatbeeldId) {
            vm.store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: straatbeeldId
            });
        };
    }
})();