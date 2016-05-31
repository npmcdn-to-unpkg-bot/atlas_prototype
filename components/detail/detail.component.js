(function () {
    angular
        .module('atlas')
        .component('dpDetail', {
            templateUrl: 'components/detail/detail.html',
            controller: dpDetailController,
            controllerAs: 'vm'
        });

    dpDetailController.$inject = ['store'];

    function dpDetailController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            var state = store.getState();

            vm.detail = state.detail;
        }

        vm.openStraatbeeld = function (straatbeeldId) {
            store.dispatch({
                type: 'GO_TO_STRAATBEELD',
                payload: straatbeeldId
            });
        };
    }
})();