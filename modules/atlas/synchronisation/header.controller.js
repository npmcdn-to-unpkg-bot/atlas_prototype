(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('AtlasHeaderController', AtlasHeaderController);

    AtlasHeaderController.$inject = ['store'];

    function AtlasHeaderController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(update);

        function update () {
            var state = angular.copy(store.getState());

            vm.query = state.search && state.search.query;
        }
    }
})();