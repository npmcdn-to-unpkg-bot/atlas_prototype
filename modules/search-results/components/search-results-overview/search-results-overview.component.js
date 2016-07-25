(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .component('atlasSearchResultsOverview', {
            bindings: {
                searchResults: '='
            },
            templateUrl: 'modules/search-results/components/search-results-overview/search-results-overview.html',
            controller: AtlasSearchResultsOverviewController,
            controllerAs: 'vm'
        });

    AtlasSearchResultsOverviewController.$inject = [];

    function AtlasSearchResultsOverviewController () {
    }
})();