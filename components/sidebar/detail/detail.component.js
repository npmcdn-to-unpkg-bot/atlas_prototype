(function () {
    angular
        .module('atlas')
        .component('dpDetail', {
            templateUrl: 'components/sidebar/detail/detail.html',
            controller: dpDetailController,
            controllerAs: 'vm'
        });

    dpDetailController.$inject = ['store', 'api'];

    function dpDetailController (store, api) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            vm.uri = store.getState().detail;

            api.fetchDetail(vm.uri).then(function (data) {
                console.log(data);
            });
        }

        vm.openStraatbeeld = function (straatbeeldId) {
            store.dispatch({
                type: 'GO_TO_STRAATBEELD',
                id: straatbeeldId,
                heading: 90
            });
        };
    }
})();