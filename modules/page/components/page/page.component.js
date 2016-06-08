(function () {
    'use strict';

    angular
        .module('atlasPage')
        .component('atlasPage', {
            bindings: {
                name: '@'
            },
            templateUrl: 'modules/page/page.html',
            controller: AtlasPageController,
            controllerAs: 'vm'
        });

    AtlasPageController.$inject = ['ACTIONS'];

    function AtlasPageController (ACTIONS) {
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
