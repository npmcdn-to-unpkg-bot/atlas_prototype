(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .component('atlasSearchResultsList', {
            bindings: {
                category: '=',
                limitResults: '='
            },
            templateUrl: 'modules/search-results/components/search-results/list/list.html',
            controller: AtlasSearchResultsListController,
            controllerAs: 'vm'
        });

    AtlasSearchResultsListController.$inject = [];

    function AtlasSearchResultsListController () {
        var vm = this;

        vm.showSubtype = function (link) {
            return vm.category.slug === 'openbareruimte' && link.subtype !== 'weg';
        };
    }
})();