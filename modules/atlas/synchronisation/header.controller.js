(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('AtlasHeaderController', AtlasHeaderController);

    AtlasHeaderController.$inject = ['store'];

    function AtlasHeaderController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(updateState);
        updateState();

        function updateState () {
            var state = store.getState();

            vm.query = state.search && state.search.query;
        }
    }
})();