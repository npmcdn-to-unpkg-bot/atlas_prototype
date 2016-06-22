(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('LayerSelectionController', LayerSelectionController);

    LayerSelectionController.$inject = ['applicationState'];

    function LayerSelectionController (applicationState) {
        var vm = this;

        vm.store = applicationState.getStore();

        vm.store.subscribe(update);
        update();

        function update () {
            var state = vm.store.getState();

            vm.baseLayer = state.map.baseLayer;
            vm.overlays = state.map.overlays;
            vm.zoom = state.map.zoom;
        }
    }
})();