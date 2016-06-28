(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('searchByClick', searchByClickFactory);

    function searchByClickFactory () {
        return {
            initialize: initialize
        };

        function initialize (leafletMap) {
            leafletMap.addEventListener('click', searchByClick);
        }

        function searchByClick (event) {
            console.log(event);
        }
    }
})();