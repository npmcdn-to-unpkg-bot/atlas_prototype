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

        vm.search = function () {
            store.dispatch({
                type: 'SEARCH_BY_QUERY',
                query: 'Linnaeus'
            });
        };

        vm.followSuggestion = function () {
            store.dispatch({
                type: 'FOLLOW_AUTOCOMPLETE_SUGGESTION',
                query: 'Linnaeusstraat 2',
                uri: 'bag/verblijfsobject/03630001958552'
            })
        };

        function render () {
            vm.search = store.getState().search;
        }
    }
})();