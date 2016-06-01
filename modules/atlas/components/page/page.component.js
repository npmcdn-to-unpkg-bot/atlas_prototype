(function () {
    angular
        .module('atlas')
        .component('dpPage', {
            templateUrl: 'modules/atlas/components/page/page.html',
            controller: dpPageController,
            controllerAs: 'vm'
        });

    dpPageController.$inject = ['store'];

    function dpPageController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            var state = store.getState();

            vm.query = state.query;
            vm.page = state.page;
        }
    }
})();