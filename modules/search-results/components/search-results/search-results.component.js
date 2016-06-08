(function () {
    angular
        .module('atlasSearchResults')
        .component('atlasSearchResults', {
            bindings: {
                query: '@',
                location: '=',
                store: '='
            },
            templateUrl: 'modules/search-results/components/search-results/search-results.html',
            controller: dpSearchResultsController,
            controllerAs: 'vm'
        });

    dpSearchResultsController.$inject = [];

    function dpSearchResultsController () {
        var vm = this;
    }
})();