(function(){

	function OverlayLegenda() {
		var ctrl = this;

		ctrl.toggleVisibility = function() {
			console.log(ctrl.overlay);
		};
	}

	angular
		.module('dpMap')
		.component('dpOverlayLegenda', {
			bindings: {
				overlay: '='
			},
			resrict: 'E',
			templateUrl: 'modules/map/components/statusbar/overlay-legenda/overlay-legenda.html',
			controller: OverlayLegenda
		});
})();