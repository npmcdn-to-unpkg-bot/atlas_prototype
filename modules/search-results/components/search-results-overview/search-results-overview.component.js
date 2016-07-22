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

    AtlasSearchResultsOverviewController.$inject = ['store', 'ACTIONS'];

    function AtlasSearchResultsOverviewController (store, ACTIONS) {
        var vm = this;

        vm.openCategory = function (slug) {
            store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_CATEGORY,
                payload: slug
            });
        };
    }
})();