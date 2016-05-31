(function () {
    angular
        .module('atlas')
        .component('dpHeader', {
            templateUrl: 'components/header/header.html',
            controller: DpHeaderController,
            controllerAs: 'vm'
        });

    DpHeaderController.$inject = ['store', 'ACTIONS'];

    function DpHeaderController (store, ACTIONS) {
        var vm = this;

        store.subscribe(render);
        render();

        vm.triggerSearch = function () {
            store.dispatch({
                type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
                payload: 'Linnaeus'
            });
        };

        vm.followSuggestion = function () {
            store.dispatch({
                type: ACTIONS.FETCH_DETAIL,
                payload: 'bag/verblijfsobject/03630001958552'
            })
        };

        function render () {
            vm.search = store.getState().search;
        }
    }
})();