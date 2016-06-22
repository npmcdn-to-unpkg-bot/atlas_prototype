(function () {
    angular
        .module('dpMap')
        .directive('dpMap', dpMapDirective);

    dpMapDirective.$inject = ['L', 'crsService', 'MAP_CONFIG', 'layers'];

    function dpMapDirective (L, crsService, MAP_CONFIG, layers) {
        return {
            restrict: 'E',
            scope: {
                mapState: '=',
                markers: '=',
                store: '='
            },
            templateUrl: 'modules/map/components/map/map.html',
            controller: DpMapController,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var leafletMap,
                container,
                options;

            container = element[0].querySelector('.js-leaflet-map');

            options = {
                center: L.latLng.apply(null, scope.vm.mapState.viewCenter),
                zoom: scope.vm.mapState.zoom,
                crs: crsService.getRd(),
                zoomControl: false,
                attributionControl: false,
                maxBounds: MAP_CONFIG.AMSTERDAM_BOUNDS
            };

            leafletMap = L.map(container, options);

            scope.$watch('vm.mapState.baseLayer', function (baseLayer) {
                layers.setBaseLayer(leafletMap, baseLayer);
            });
        }
    }

    DpMapController.$inject = ['ACTIONS'];

    function DpMapController (ACTIONS) {
        var vm = this;

        vm.triggerSearch = function (location) {
            vm.store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK,
                payload: location
            });
        };

        vm.panTo = function (location) {
            vm.store.dispatch({
                type: ACTIONS.MAP_PAN,
                payload: location
            });
        };

        vm.zoom = function (zoomLevel) {
            console.log(vm.store);
            vm.store.dispatch({
                type: ACTIONS.MAP_ZOOM,
                payload: zoomLevel
            });
        };

        vm.showLayerSelection = function () {
            vm.store.dispatch({
                type: ACTIONS.SHOW_LAYER_SELECTION
            });
        };
    }
})();