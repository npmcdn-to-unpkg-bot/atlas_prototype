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

	OverlayLegenda.$inject = ['$scope', 'OVERLAYS', 'mapConfig', 'ACTIONS'];

	function OverlayLegenda($scope, OVERLAYS, mapConfig, ACTIONS) {
		var vm = this;
		console.log(ACTIONS);
		vm.overlay_data = OVERLAYS.SOURCES[vm.overlay];

		vm.label = OVERLAYS.SOURCES[vm.overlay].label;
		vm.legend = OVERLAYS.SOURCES[vm.overlay].legend;
		// Checking for external link
		if (vm.legend && !OVERLAYS.SOURCES[vm.overlay].external) {
			vm.legend = mapConfig.OVERLAY_ROOT + vm.legend;
		}
		console.log(vm.overlay);

		vm.toggleVisibility = function() {
			console.log(vm.overlay);
		};
	}

})();