(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['applicationState'];

    function SearchResultsController (applicationState) {
        var vm = this;

        vm.store = applicationState.getStore();

        vm.store.subscribe(update);
        update();

        function update () {
            var state = vm.store.getState();

            vm.query = state.search && state.search.query;
            vm.location = state.search && state.search.location;
        }
    }
})();