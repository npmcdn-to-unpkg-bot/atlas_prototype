(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .factory('SearchResults', SearchResultsFactory);

    function SearchResultsFactory () {
        return {
            initialize: initialize,
            searchByQuery: searchByQuery,
            searchByCoordinates: searchByCoordinates
        };

        function initialize (HTMLElement, store) {
        }

        function searchByQuery (query) {
        }

        function searchByCoordinates (location) {
        }
    }
})();