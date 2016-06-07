(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('Straatbeeld', StraatbeeldFactory);

    function StraatbeeldFactory () {
        return {
            initialize: initialize,
            loadScene: loadScene
        };

        function initialize () {
            //HTMLElement, store
        }

        function loadScene () {
            //query
        }

        function searchByCoordinates () {
            //location
        }
    }
})();