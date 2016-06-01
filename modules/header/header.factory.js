(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .factory('Header', HeaderFactory);

    function HeaderFactory () {
        return {
            initialize: initialize,
            setQuery: setQuery
        };

        function initialize (HTMLElement, store) {

        }

        function setQuery (query) {
            //query can be null
        }
    }
})();