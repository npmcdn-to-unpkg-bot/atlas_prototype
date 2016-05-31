(function () {
    angular
        .module('atlas')
        .component('dpDetail', {
            templateUrl: 'components/detail/detail.html',
            controller: dpDetailController,
            controllerAs: 'vm'
        });

    dpDetailController.$inject = ['store', 'ACTIONS'];

    function dpDetailController (store, ACTIONS) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            var state = store.getState();

            vm.detail = state.detail;
        }

        vm.openStraatbeeld = function (straatbeeldId) {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: straatbeeldId
            });
        };
    }
})();