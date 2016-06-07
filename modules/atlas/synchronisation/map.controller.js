(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('dpMapController', dpMapController);

    dpMapController.$inject = ['store'];

    function dpMapController (store) {
        var vm = this;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState(),
                markers = [];

            if (state.search && state.search.location) {
                markers.push({
                    type: ''
                })
            }

            vm.map = state.map;

        }
    }
})();