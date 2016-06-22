(function () {
    'use strict';

    angular
        .module('atlas')
        .component('atlasDashboard', {
            templateUrl: 'modules/atlas/components/dashboard/dashboard.html',
            controller: AtlasDashboardController,
            controllerAs: 'vm'
        });

    AtlasDashboardController.$inject = ['applicationState'];

    function AtlasDashboardController (applicationState) {
        var vm = this;

        vm.store = applicationState.getStore();

        vm.store.subscribe(setLayout);
        setLayout();

        function setLayout () {
            var state = vm.store.getState();

            vm.showLayerSelection = state.map.showLayerSelection;
            vm.showPage = !vm.showLayerSelection && angular.isString(state.page);
            vm.showDetail = angular.isObject(state.detail);
            vm.showStraatbeeld = angular.isObject(state.straatbeeld);
            vm.showSearchResults = angular.isObject(state.search) &&
                (angular.isString(state.search.query) || angular.isArray(state.search.location));

            vm.sizeLeftColumn = vm.showLayerSelection ? 4 : 0;
            vm.sizeMiddleColumn = vm.showPage || vm.showDetail || vm.showStraatbeeld ? 4 : 8;
            vm.sizeRightColumn = 12 - vm.sizeLeftColumn - vm.sizeMiddleColumn;
        }
    }
})();