(function () {
    'use strict';

    angular
        .module('atlas')
        .component('atlasDashboard', {
            templateUrl: 'modules/atlas/dashboard/dashboard.html',
            controller: AtlasDashboardController,
            controllerAs: 'vm'
        });

    AtlasDashboardController.$inject = ['store'];

    function AtlasDashboardController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            var state;

            state = store.getState();

            vm.showLayerSelection = state.map.showLayerSelection;
            vm.showPage = angular.isString(state.page);
            vm.showDetail = angular.isObject(state.detail);
            vm.showStraatbeeld = angular.isObject(state.straatbeeld);
            vm.showSearchResults = angular.isObject(state.search) &&
                (angular.isString(state.search.query) || angular.isArray(state.search.location));

            vm.sizeLeftColumn = vm.showLayerSelection ? 8 : 0;
            vm.sizeMiddleColumn = vm.showPage || vm.showDetail || vm.showLayerSelection || vm.showStraatbeeld ? 4 : 8;
            vm.sizeRightColumn = 12 - vm.sizeLeftColumn - vm.sizeMiddleColumn;
        }

    }
})();