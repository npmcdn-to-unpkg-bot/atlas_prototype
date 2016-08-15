(function(){
	'use strict';

	angular
		.module('dpMap')
		.component('dpOverlayLegenda', {
			bindings: {
				overlay: '=',
				visible: '=',
				zoom: '='
			},
			resrict: 'E',
			templateUrl: 'modules/map/components/statusbar/overlay-legenda/overlay-legenda.html',
			controller: OverlayLegenda,
			controllerAs: 'vm'
		});

	OverlayLegenda.$inject = ['$scope', 'OVERLAYS', 'mapConfig', 'store', 'ACTIONS'];

	function OverlayLegenda($scope, OVERLAYS, mapConfig, store, ACTIONS) {
		var vm = this;
		if (OVERLAYS.SOURCES[vm.overlay.id]) {
			vm.label = OVERLAYS.SOURCES[vm.overlay.id].label;
			vm.legend = OVERLAYS.SOURCES[vm.overlay.id].legend;
			// Checking for external link
			if (vm.legend && !OVERLAYS.SOURCES[vm.overlay.id].external) {
				vm.legend = mapConfig.OVERLAY_ROOT + vm.legend;
			}	
		} else {
			// Unknown overlay
			vm.label = vm.overlay.id;
		}
		vm.toggleVisibility = function() {
			var action;

			store.dispatch({
                type: ACTIONS.MAP_TOGGLE_VISIBILITY_OVERLAY,
                payload: vm.overlay
            });
            // Adding or removing
            if (vm.overlay.visibility) {
            	action = ACTIONS.MAP_REMOVE_OVERLAY;
            } else {
            	action = ACTIONS.MAP_ADD_OVERLAY;
            }
            store.dispatch({
                type: action,
                payload: vm.overlay.id
            });
		};

		vm.isOverlayVisible = function(overlay) {
            return vm.zoom >= OVERLAYS.SOURCES[overlay.id].minZoom &&
                vm.zoom <= OVERLAYS.SOURCES[overlay.id].maxZoom &&
                vm.overlay.visibility;
        };
	}

})();