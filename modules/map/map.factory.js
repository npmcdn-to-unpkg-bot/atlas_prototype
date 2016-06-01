(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('Header', HeaderFactory);

    function HeaderFactory () {
        return {
            initialize: initialize,
            setBaseLayer: setBaseLayer,
            addOverlay: addOverlay,
            removeOverlay: removeOverlay,
            panTo: panTo,
            setZoom: setZoom,
            setHighlight: setHighlight,
            setLoadingIndicator: setLoadingIndicator
        };

        function initialize (HTMLElement, store) {

        }

        function setBaseLayer (baseLayer) {
        }

        function addOverlay (overlay) {
        }

        function removeOverlay (overlay) {
        }

        function panTo (location) {
        }

        function setZoom (zoomLevel) {
        }

        function setHighlight (GeoJSON) {
            //Where GeoJSON can be null
        }

        function setLoadingIndicator (isLoading) {
        }
    }
})();