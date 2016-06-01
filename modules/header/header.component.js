(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .component('atlasHeader', {
            bindings: {
                query: '@',
                store: '='
            },
            templateUrl: 'modules/header/header.html',
            controller: AtlasHeaderController,
            controllerAs: 'vm'
        });

    function AtlasHeaderController () {
        var vm = this;

        vm.triggerSearch = function () {
            vm.store.dispatch({
                type: 'SHOW_SEARCH_RESULTS_BY_QUERY',
                payload: 'Linnaeus'
            });
        };

        vm.followSuggestion = function () {
            vm.store.dispatch({
                type: 'FETCH_DETAIL',
                payload: 'bag/verblijfsobject/03630001958552'
            })
        };
    }
})();


