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

    function AtlasSearchResultsListController () {
        var vm = this;

        vm.showSubtype = function (categorySlug, link) {
            return (categorySlug === 'openbareruimte' && link.subtype !== 'weg') ||
                categorySlug === 'gebied';
        };
    }
})();