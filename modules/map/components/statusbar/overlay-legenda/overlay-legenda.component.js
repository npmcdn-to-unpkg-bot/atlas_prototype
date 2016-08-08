(function(){
	'use strict';

	angular
		.module('dpMap')
		.component('dpOverlayLegenda', {
			bindings: {
				overlay: '=',
				visible: '='
			},
			resrict: 'E',
			templateUrl: 'modules/map/components/statusbar/overlay-legenda/overlay-legenda.html',
			controller: OverlayLegenda,
			controllerAs: 'vm'
		});

	OverlayLegenda.$inject = ['$scope', 'OVERLAYS', 'mapConfig', 'store', 'ACTIONS'];

	function OverlayLegenda($scope, OVERLAYS, mapConfig, store, ACTIONS) {
		var vm = this;
		if (OVERLAYS.SOURCES[vm.overlay]) {
			vm.label = OVERLAYS.SOURCES[vm.overlay].label;
			vm.legend = OVERLAYS.SOURCES[vm.overlay].legend;
			// Checking for external link
			if (vm.legend && !OVERLAYS.SOURCES[vm.overlay].external) {
				vm.legend = mapConfig.OVERLAY_ROOT + vm.legend;
			}	
		} else {
			// Unknown overlay
			vm.label = vm.overlay;
		}

		vm.toggleVisibility = function() {
			store.dispatch({
                type: ACTIONS.MAP_TOGGLE_VISIBILITY_OVERLAY,
                payload: vm.overlay
            });
		};
	}

})();