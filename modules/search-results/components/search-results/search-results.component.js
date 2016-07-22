(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .component('atlasSearchResults', {
            bindings: {
                query: '@',
                location: '=',
                category: '@'
            },
            templateUrl: 'modules/search-results/components/search-results/search-results.html',
            controller: AtlasSearchResultsController,
            controllerAs: 'vm'
        });

    AtlasSearchResultsController.$inject = ['$scope', 'SEARCH_CONFIG', 'searchByQuery'];

    function AtlasSearchResultsController ($scope, SEARCH_CONFIG, searchByQuery) {
        var vm = this;

        $scope.$watch('vm.query', function (query) {
            if (angular.isString(query) && query.length) {
                vm.isLoading = true;

                searchByQuery.searchAll(query).then(setSearchResults);
            }
        });

        $scope.$watchCollection('vm.location', function (location) {
            if (angular.isArray(location)) {
                vm.isLoading = true;

                //searchByLocation.search(location).then(setSearchResults);
            }
        });

        $scope.$watch('vm.category', function (category) {
            var activeCategory = SEARCH_CONFIG.ENDPOINTS.filter(function (endpoint) {
                return endpoint.slug === category;
            })[0];

            vm.categoryName = activeCategory && activeCategory.label_singular;
        });

        function setSearchResults (searchResults) {
            vm.isLoading = false;
            vm.searchResults = searchResults;

            vm.numberOfResults = vm.searchResults
                .map(function (searchResult) {
                    return searchResult.count;
                })
                .reduce(function (previous, current) {
                    return previous + current;
                }, 0);
        }
    }
})();