(function () {
    angular
        .module('dpMap')
        .directive('dpMap', dpMapDirective);

    dpMapDirective.$inject = ['L', 'crsService', 'mapConfig', 'layers', 'variableWidth'];

    function dpMapDirective (L, crsService, mapConfig, layers, variableWidth) {
        return {
            restrict: 'E',
            scope: {
                mapState: '=',
                markers: '='
            },
            templateUrl: 'modules/map/components/map/map.html',
            controller: DpMapController,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var container,
                options;

            container = element[0].querySelector('.js-leaflet-map');

            options = {
                center: L.latLng.apply(null, scope.vm.mapState.viewCenter),
                zoom: scope.vm.mapState.zoom,
                crs: crsService.getRd(),
                zoomControl: false,
                attributionControl: false,
                maxBounds: mapConfig.AMSTERDAM_BOUNDS
            };

            scope.leafletMap = L.map(container, options);

            variableWidth.watch(container, scope.leafletMap);

            scope.$watch('vm.mapState.baseLayer', function (baseLayer) {
                layers.setBaseLayer(scope.leafletMap, baseLayer);
            });
        }
    }

    DpMapController.$inject = ['ACTIONS', 'store'];

    function DpMapController (ACTIONS, store) {
        var vm = this;

        vm.triggerSearch = function (location) {
            store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK,
                payload: location
            });
        };

        vm.panTo = function (location) {
            store.dispatch({
                type: ACTIONS.MAP_PAN,
                payload: location
            });
        };

        vm.zoom = function (zoomLevel) {
            store.dispatch({
                type: ACTIONS.MAP_ZOOM,
                payload: zoomLevel
            });
        };

        vm.showLayerSelection = function () {
            store.dispatch({
                type: ACTIONS.SHOW_LAYER_SELECTION
            });
        };
    }
})();