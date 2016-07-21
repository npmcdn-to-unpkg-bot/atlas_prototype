(function () {
    'use strict';

    angular
        .module('atlas')
        .component('atlasDashboard', {
            templateUrl: 'modules/atlas/components/dashboard/dashboard.html',
            controller: AtlasDashboardController,
            controllerAs: 'vm'
        });

    AtlasDashboardController.$inject = ['store'];

    function AtlasDashboardController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(setLayout);
        setLayout();

        function setLayout () {
            var state = store.getState();

            vm.showLayerSelection = state.map.showLayerSelection;
            vm.showPage = !vm.showLayerSelection && angular.isString(state.page);
            vm.showDetail = angular.isObject(state.detail);
            vm.showStraatbeeld = angular.isObject(state.straatbeeld);
            vm.showSearchResults = angular.isObject(state.search) &&
                (angular.isString(state.search.query) || angular.isArray(state.search.location));

            if (vm.showLayerSelection) {
                vm.sizeLeftColumn = 4;
                vm.sizeMiddleColumn = 8;
            } else {
                vm.sizeLeftColumn = 0;
                vm.sizeMiddleColumn = 4;
                vm.sizeRightColumn = 12 - vm.sizeLeftColumn - vm.sizeMiddleColumn;
            }
        }
    }
})();