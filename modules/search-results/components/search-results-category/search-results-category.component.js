(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .component('atlasSearchResultsCategory', {
            bindings: {
                searchResults: '='
            },
            templateUrl: 'modules/search-results/components/search-results-category/search-results-category.html',
            controller: AtlasSearchResultsCategoryController,
            controllerAs: 'vm'
        });

    AtlasSearchResultsCategoryController.$inject = ['loadMore'];

    function AtlasSearchResultsCategoryController (loadMore) {
        var vm = this;

        vm.category = angular.copy(vm.searchResults);

        vm.loadMore = function () {
            loadMore.next(vm.category).then(function (data) {
                vm.category = data;
            });
        };
    }
})();