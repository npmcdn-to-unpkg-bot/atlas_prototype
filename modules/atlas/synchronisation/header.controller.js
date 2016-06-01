(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('AtlasHeader', AtlasHeaderController);

    AtlasHeaderController.$inject = ['store'];

    function AtlasHeaderController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(update);

        function update () {
            var state = store.getState();

            vm.query = state.search && state.search.query;
        }
    }
})();