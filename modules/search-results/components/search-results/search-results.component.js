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

    AtlasSearchResultsController.$inject = ['$scope', 'search', 'geosearch'];

    function AtlasSearchResultsController ($scope, search, geosearch) {
        var vm = this;

        /**
         * SEARCH BY QUERY
         */
        $scope.$watch('vm.query', function (query) {
            if (angular.isString(query) && query.length) {
                vm.isLoading = true;

                search.search(query).then(setSearchResults);
            }
        });

        $scope.$watch('vm.category', function (category) {
            search.search(vm.query, category).then(setSearchResults);
        });

        /**
         * GEOSEARCH
         */
        $scope.$watchCollection('vm.location', function (location) {
            if (angular.isArray(location)) {
                vm.isLoading = true;

                geosearch.search(location).then(setSearchResults);
            }
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