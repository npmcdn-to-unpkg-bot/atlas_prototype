(function () {
    angular
        .module('atlas')
        .component('dpSearchResults', {
            templateUrl: 'components/search-results/search-results.html',
            controller: dpSearchResultsController,
            controllerAs: 'vm'
        });

    dpSearchResultsController.$inject = ['store'];

    function dpSearchResultsController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            var state = store.getState();

            vm.search = state.search;
        }
    }
})();