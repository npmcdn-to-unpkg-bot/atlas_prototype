(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('AtlasLayerSelectionController', AtlasLayerSelectionController);

    AtlasLayerSelectionController.$inject = ['store'];

    function AtlasLayerSelectionController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(updateState);
        updateState();

        function updateState () {
            var state = store.getState();

            vm.baseLayer = state.map.baseLayer;
            vm.overlays = state.map.overlays;
            vm.zoom = state.map.zoom;

            console.log('in de controller', vm.baseLayer, vm.overlays, vm.zoom);
        }
    }
})();