(function () {
    'use strict';

    angular
        .module('atlasLayerSelection')
        .component('atlasLayerSelection', {
            bindings: {
                activeBaseLayer: '@baseLayer',
                activeOverlays: '=overlays',
                zoom: '='
            },
            templateUrl: 'modules/layer-selection/components/layer-selection/layer-selection.html',
            controller: AtlasLayerSelectionController,
            controllerAs: 'vm'
        });

    AtlasLayerSelectionController.$inject = ['$rootScope', 'BASE_LAYERS', 'OVERLAYS', 'store', 'ACTIONS'];

    function AtlasLayerSelectionController ($rootScope, BASE_LAYERS, OVERLAYS, store, ACTIONS) {
        var vm = this;

        vm.baseLayers = BASE_LAYERS;

        vm.overlays = OVERLAYS.HIERARCHY.map(function (category) {
            category.overlays = category.overlays.map(function (overlaySlug) {
                return {
                    slug: overlaySlug,
                    label: OVERLAYS.SOURCES[overlaySlug].label
                };
            });

            return category;
        });

        vm.setBaseLayer = function (baseLayer) {
            store.dispatch({
                type: ACTIONS.MAP_SET_BASELAYER,
                payload: baseLayer
            });
        };

        vm.isOverlayActive = function (overlay) {
            return vm.activeOverlays.indexOf(overlay) !== -1;
        };

        vm.toggleOverlay = function (overlay) {
            var action;

            if (!vm.isOverlayActive(overlay)) {
                action = ACTIONS.MAP_ADD_OVERLAY;
            } else {
                action = ACTIONS.MAP_REMOVE_OVERLAY;
            }

            store.dispatch({
                type: action,
                payload: overlay
            });
        };

        vm.hideLayers = function () {
            store.dispatch({
                type: ACTIONS.HIDE_LAYER_SELECTION
            });
        };
    }
})();