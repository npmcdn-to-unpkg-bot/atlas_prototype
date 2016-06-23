(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .component('atlasHeader', {
            bindings: {
                query: '@'
            },
            templateUrl: 'modules/header/components/header/header.html',
            controller: AtlasHeaderController,
            controllerAs: 'vm'
        });

    AtlasHeaderController.$inject = ['store', 'ACTIONS'];

    function AtlasHeaderController (store, ACTIONS) {
        var vm = this;

        vm.triggerSearch = function () {
            store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_BY_QUERY,
                payload: 'Linnaeus'
            });
        };

        vm.followSuggestion = function () {
            store.dispatch({
                type: ACTIONS.FETCH_DETAIL,
                payload: 'bag/verblijfsobject/03630001958552'
            });
        };
    }
})();


