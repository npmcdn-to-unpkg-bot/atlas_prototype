(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .component('atlasHeader', {
            bindings: {
                query: '@',
                store: '='
            },
            templateUrl: 'modules/header/components/header/header.html',
            controller: AtlasHeaderController,
            controllerAs: 'vm'
        });

    AtlasHeaderController.$inject = ['ACTIONS'];

    function AtlasHeaderController (ACTIONS) {
        var vm = this;

        vm.triggerSearch = function () {
            vm.store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_BY_QUERY,
                payload: 'Linnaeus'
            });
        };

        vm.followSuggestion = function () {
            vm.store.dispatch({
                type: ACTIONS.FETCH_DETAIL,
                payload: 'bag/verblijfsobject/03630001958552'
            });
        };
    }
})();


