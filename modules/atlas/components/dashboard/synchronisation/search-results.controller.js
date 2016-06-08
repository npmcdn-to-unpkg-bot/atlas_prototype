(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ['store'];

    function SearchResultsController (store) {
        var vm = this;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();

            vm.query = state.search && state.search.query;
            vm.location = state.search && state.search.location;
        }
    }
})();