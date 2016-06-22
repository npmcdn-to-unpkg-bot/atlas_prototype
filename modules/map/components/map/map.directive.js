(function () {
    angular
        .module('dpMap')
        .directive('dpMap', dpMapDirective);

    dpMapDirective.$inject = ['L', 'crsService', 'MAP_CONFIG'];

    function dpMapDirective (L, crsService, MAP_CONFIG) {
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
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var leafletMap,
                container,
                options;

            container = element[0].querySelector('.js-leaflet-map');

            options = {
                center: L.latLng.apply(null, scope.mapState.viewCenter),
                zoom: scope.mapState.zoom,
                crs: crsService.getRd(),
                zoomControl: false,
                attributionControl: false,
                maxBounds: MAP_CONFIG.AMSTERDAM_BOUNDS
            };

            leafletMap = L.map(container, options);

            scope.$watch('mapState.baseLayer', function (baseLayer) {
                console.log(baseLayer);
                //layerService.setBaseLayer(leafletMap, baseLayer, scope.isInteractive);
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