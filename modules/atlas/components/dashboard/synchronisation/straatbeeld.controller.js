(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('StraatbeeldController', StraatbeeldController);

    StraatbeeldController.$inject = ['store'];

    function StraatbeeldController (store) {
        var vm = this;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();

            vm.id = state.straatbeeld && state.straatbeeld.id;
            vm.searchLocation = state.straatbeeld && state.straatbeeld.searchLocation;
            vm.date = state.straatbeeld && state.straatbeeld.date;
            vm.camera = state.straatbeeld && state.straatbeeld.camera;
            vm.hotspots = state.straatbeeld && state.straatbeeld.hotspots;
            vm.isLoading = state.straatbeeld && state.straatbeeld.isLoading;
        }
    }
})();