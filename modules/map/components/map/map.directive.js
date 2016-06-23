(function () {
    angular
        .module('dpMap')
        .directive('dpMap', dpMapDirective);

    dpMapDirective.$inject = ['L', 'crsService', 'mapConfig', 'layers', 'variableWidth', 'panning'];

    function dpMapDirective (L, crsService, mapConfig, layers, variableWidth, panning) {
        return {
            restrict: 'E',
            scope: {
                mapState: '=',
                markers: '='
            },
            templateUrl: 'modules/map/components/map/map.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var leafletMap,
                container,
                options;

            container = element[0].querySelector('.js-leaflet-map');
            options = {
                crs: crsService.getRd(),
                center: scope.mapState.viewCenter,
                zoom: scope.mapState.zoom,
                maxBounds: mapConfig.AMSTERDAM_BOUNDS,
                attributionControl: false,
                zoomControl: false
            };

            leafletMap = L.map(container, options);

            scope.$watch('mapState.baseLayer', function (baseLayer) {
                layers.setBaseLayer(leafletMap, baseLayer);
            });

            scope.$watch('mapState.overlays', function (newOverlays, oldOverlays) {
                getAddedOverlays(newOverlays, oldOverlays).forEach(function (overlay) {
                    layers.addOverlay(leafletMap, overlay);
                });

                getRemovedOverlays(newOverlays, oldOverlays).forEach(function (overlay) {
                    layers.removeOverlay(leafletMap, overlay);
                });
            });

            panning.initialize(leafletMap);
            variableWidth.initialize(container, leafletMap);
        }

        function getAddedOverlays (newOverlays, oldOverlays) {
            return newOverlays.filter(function (overlay) {
                return oldOverlays.indexOf(overlay) === -1;
            });
        }

        function getRemovedOverlays (newOverlays, oldOverlays) {
            return oldOverlays.filter(function (overlay) {
                return newOverlays.indexOf(overlay) === -1;
            });
        }
    }

    /*
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
    */
})();