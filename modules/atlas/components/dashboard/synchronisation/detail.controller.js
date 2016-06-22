(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['applicationState'];

    function DetailController (applicationState) {
        var vm = this;

        vm.store = applicationState.getStore();

        vm.store.subscribe(update);
        update();

        function update () {
            var state = vm.store.getState();

            vm.uri = state.detail && state.detail.uri;
            vm.isLoading = state.detail && state.detail.isLoading;
        }
    }
})();