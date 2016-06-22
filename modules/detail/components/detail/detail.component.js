(function () {
    angular
        .module('atlasDetail')
        .component('atlasDetail', {
            bindings: {
                uri: '@',
                isLoading: '='
            },
            templateUrl: 'modules/detail/components/detail/detail.html',
            controller: AtlasDetailController,
            controllerAs: 'vm'
        });

    AtlasDetailController.$inject = ['store', 'ACTIONS'];

    function AtlasDetailController (store, ACTIONS) {
        var vm = this;

        vm.openStraatbeeld = function (straatbeeldId) {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: straatbeeldId
            });
        };
    }
})();