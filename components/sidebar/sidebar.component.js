(function () {
    angular
        .module('atlas')
        .component('dpSidebar', {
            templateUrl: 'components/sidebar/sidebar.html',
            controller: dpSidebarController,
            controllerAs: 'vm'
        });

    dpSidebarController.$inject = ['store'];

    function dpSidebarController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            var state = store.getState();

            if (state.query) {
                vm.include = 'search-results';
            } else if (state.detail) {
                vm.include = 'detail';
            } else if (state.page) {
                vm.include = 'page';
            } else if (state.straatbeeld) {
                vm.include = 'straatbeeld';
            }
        }
    }
})();