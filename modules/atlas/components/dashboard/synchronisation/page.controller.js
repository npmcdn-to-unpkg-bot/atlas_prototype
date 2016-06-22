(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('PageController', PageController);

    PageController.$inject = ['applicationState'];

    function PageController (applicationState) {
        var vm = this;

        vm.store = applicationState.getStore();

        vm.store.subscribe(update);
        update();

        function update () {
            var state = vm.store.getState();

            vm.pageName = state.page;
        }
    }
})();