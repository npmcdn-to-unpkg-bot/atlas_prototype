(function () {
    angular
        .module('dpMap')
        .directive('dpMap', dpMapDirective);

    dpMapDirective.$inject = [
        'L',
        'mapConfig',
        'layers',
        'markers',
        'panning',
        'zoom',
        'variableWidth',
        'searchByClick'
    ];

    function dpMapDirective (L, mapConfig, layers, markers, panning, zoom, variableWidth, searchByClick) {
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
            options = angular.merge(mapConfig.MAP_OPTIONS, {
                center: scope.mapState.viewCenter,
                zoom: scope.mapState.zoom
            });

            leafletMap = L.map(container, options);

            markers.initialize(leafletMap, scope.markers);
            panning.initialize(leafletMap);
            zoom.initialize(leafletMap);
            variableWidth.initialize(container, leafletMap);
            searchByClick.initialize(leafletMap);

            scope.$watch('mapState.viewCenter', function (viewCenter) {
                panning.panTo(leafletMap, viewCenter);
            });

            scope.$watch('mapState.zoom', function (zoomLevel) {
                zoom.setZoom(leafletMap, zoomLevel);
            });

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

        }

        function getAddedOverlays (newOverlays, oldOverlays) {
            if (newOverlays === oldOverlays) {
                //scope.$watch is triggered on initialization with the new value equal to the old value
                return newOverlays;
            } else {
                return newOverlays.filter(function (overlay) {
                    return oldOverlays.indexOf(overlay) === -1;
                });
            }
        }

        function getRemovedOverlays (newOverlays, oldOverlays) {
            return oldOverlays.filter(function (overlay) {
                return newOverlays.indexOf(overlay) === -1;
            });
        }
    }
})();