(function(){
	'use strict';

	angular
		.module('dpMap')
		.component('dpLegendItem', {
			bindings: {
				overlay: '=',
				zoom: '='
			},
			resrict: 'E',
			templateUrl: 'modules/map/components/overlay-legend/legend-item/legend-item.html',
			controller: LegendItem,
			controllerAs: 'vm'
		});

	LegendItem.$inject = ['$scope', 'OVERLAYS', 'mapConfig', 'store', 'ACTIONS'];

	function LegendItem($scope, OVERLAYS, mapConfig, store, ACTIONS) {
		var vm = this;

		// Setting legend and label
		vm.label = OVERLAYS.SOURCES[vm.overlay.id].label_short;
		vm.legend = OVERLAYS.SOURCES[vm.overlay.id].legend;
		// Checking for external link
		if (vm.legend && !OVERLAYS.SOURCES[vm.overlay.id].external) {
			vm.legend = mapConfig.OVERLAY_ROOT + vm.legend;
		}	
		
		vm.getIcon = function() {
			// Determining which icon to use based on visibility
			var icon = '/assets/icons/'; // The prefix path
			if (vm.overlay.isVisible) {
				if (vm.zoom >= OVERLAYS.SOURCES[vm.overlay.id].minZoom &&
	            	vm.zoom <= OVERLAYS.SOURCES[vm.overlay.id].maxZoom) {
					icon += 'visible.svg';
				} else {
					icon += 'invisible-zoomlevel.svg';
				}
			} else {
				icon += 'invisible-hidden.svg';
			}
			return icon;	
		};
		

		vm.toggleVisibility = function() {
			store.dispatch({
                type: ACTIONS.MAP_TOGGLE_VISIBILITY_OVERLAY,
                payload: vm.overlay.id
            });
		};
	}

})();