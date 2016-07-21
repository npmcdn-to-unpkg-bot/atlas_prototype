(function () {
    angular
        .module('atlasSearchResults')
        .component('atlasSearchResults', {
            bindings: {
                query: '@',
                location: '='
            },
            templateUrl: 'modules/search-results/components/search-results/search-results.html',
            controller: dpSearchResultsController,
            controllerAs: 'vm'
        });

    dpSearchResultsController.$inject = ['$scope', 'searchByQuery'];

    function dpSearchResultsController ($scope, searchByQuery) {
        var vm = this;

        $scope.$watch('vm.query', function (query) {
            if (angular.isString(query) && query.length) {
                vm.isLoading = true;
                console.log('a');

                searchByQuery.search(query).then(setSearchResults);
            }
        });

        $scope.$watchCollection('vm.location', function (location) {
            if (angular.isArray(location)) {
                vm.isLoading = true;

                console.log(location);
                //searchByLocation.search(location).then(setSearchResults);
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