(function () {
    angular
        .module('atlas')
        .component('dpHeader', {
            templateUrl: 'components/header/header.html',
            controller: DpHeaderController,
            controllerAs: 'vm'
        });

    DpHeaderController.$inject = ['store'];

    function DpHeaderController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        vm.triggerSearch = function () {
            store.dispatch({
                type: 'FETCH_SEARCH_RESULTS_BY_QUERY',
                payload: 'Linnaeus'
            });
        };

        vm.followSuggestion = function () {
            store.dispatch({
                type: 'FETCH_DETAIL',
                payload: 'bag/verblijfsobject/03630001958552'
            })
        };

        function render () {
            vm.search = store.getState().search;
        }
    }
})();