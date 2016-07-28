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

        vm.showSubtype = function (link) {
            return angular.isString(link.subtype) && link.subtype !== 'weg';
        };
    }
})();