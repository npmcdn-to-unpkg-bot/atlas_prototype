(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['applicationState'];

    function HeaderController (applicationState) {
        var vm = this;

        vm.store = applicationState.getStore();

        vm.store.subscribe(update);
        update();

        function update () {
            var state = vm.store.getState();

            vm.query = state.search && state.search.query;
        }
    }
})();