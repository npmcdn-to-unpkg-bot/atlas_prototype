(function(){

	angular
		.module('dpMap')
		.component('dpOverlayLegenda', {
			bindings: {
				overlay: '='
			},
			resrict: 'E',
			templateUrl: 'modules/map/components/statusbar/overlay-legenda/overlay-legenda.html',
			controller: OverlayLegenda,
			controllerAs: 'vm'
		});

	OverlayLegenda.$inject = ['$scope', 'OVERLAYS', 'mapConfig'];

	function OverlayLegenda($scope, OVERLAYS, mapConfig) {
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
		
		console.log(vm.overlay);

		vm.toggleVisibility = function() {
			console.log(vm.overlay);
		};
	}

})();