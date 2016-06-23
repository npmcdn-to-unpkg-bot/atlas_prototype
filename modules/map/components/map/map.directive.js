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
            var leafletMap,
                container,
                options;

            container = element[0].querySelector('.js-leaflet-map');
            options = {
                center: scope.vm.mapState.viewCenter,
                zoom: scope.vm.mapState.zoom,
                crs: crsService.getRd(),
                zoomControl: false,
                attributionControl: false,
                maxBounds: mapConfig.AMSTERDAM_BOUNDS
            };

            leafletMap = L.map(container, options);

            variableWidth.watch(container, leafletMap);

            scope.$watch('vm.mapState.baseLayer', function (baseLayer) {
                layers.setBaseLayer(leafletMap, baseLayer);
            });

            scope.$watch('vm.mapState.overlays', function (newOverlays, oldOverlays) {
                var addedOverlays = getAddedOverlays(newOverlays, oldOverlays),
                    removedOverlays = getRemovedOverlays(newOverlays, oldOverlays);

                addedOverlays.forEach(function (overlay) {
                    console.log('add', overlay);
                    //layers.addOverlay(overlay);
                });

                removedOverlays.forEach(function (overlay) {
                    console.log('remove', overlay);
                    //layers.removeOverlay(overlay);
                });
            });
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