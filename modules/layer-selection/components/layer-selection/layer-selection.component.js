(function () {
    'use strict';

    angular
        .module('atlasLayerSelection')
        .component('atlasLayerSelection', {
            bindings: {
                baseLayer: '@',
                overlays: '=',
                zoom: '=',
                store: '='
            },
            templateUrl: 'modules/layer-selection/layer-selection.html',
            controller: AtlasLayerSelectionController,
            controllerAs: 'vm'
        });

    AtlasLayerSelectionController.$inject = ['ACTIONS'];

    function AtlasLayerSelectionController (ACTIONS) {
        var vm = this;

        vm.setBaseLayer = function (baseLayer) {
            vm.store.dispatch({
                type: ACTIONS.MAP_SET_BASELAYER,
                payload: baseLayer
            });
        };

        vm.addOverlay = function (overlay) {
            vm.store.dispatch({
                type: ACTIONS.MAP_ADD_OVERLAY,
                payload: overlay
            });
        };

        vm.removeOverlay = function (overlay) {
            vm.store.dispatch({
                type: ACTIONS.MAP_REMOVE_OVERLAY,
                payload: overlay
            });
        };

        vm.hideLayers = function () {
            vm.store.dispatch({
                type: ACTIONS.HIDE_LAYER_SELECTION
            });
        };
    }
})();