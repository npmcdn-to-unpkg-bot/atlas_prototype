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
                query: 'Linnaeusstraat 2'
            });
        };

        vm.followSuggestion = function () {
            store.dispatch({
                type: 'FOLLOW_AUTOCOMPLETE_SUGGESTION',
                query: 'Weesperstraat 113',
                uri: 'bag/verblijfsobject/03630001958552'
            })
        };

        vm.setPage = function (page) {
            store.dispatch({
                type: 'GO_TO_PAGE',
                page: page
            });
        };

        function render () {
            vm.query = store.getState().query;
        }
    }
})();