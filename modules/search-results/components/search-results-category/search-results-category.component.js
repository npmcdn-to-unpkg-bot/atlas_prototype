(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .component('atlasSearchResultsCategory', {
            bindings: {
                endpoint: '@',
                searchParams: '@',
                results: '='
            },
            templateUrl: 'modules/search-results/components/search-results-category/search-results-category.html',
            controller: AtlasSearchResultsCategoryController,
            controllerAs: 'vm'
        });

    AtlasSearchResultsCategoryController.$inject = ['searchByQuery'];

    function AtlasSearchResultsCategoryController (searchByQuery) {
        var vm = this;

        vm.page = 1;

        vm.loadMore = function () {
            vm.searchParams.page++;

            searchByQuery.searchCategory(vm.endpoint, vm.searchParams.page++).then(function (response) {
                vm.searchResults = vm.searchResults.concat(response);

                vm.page++;
            });
        };
    }
})();