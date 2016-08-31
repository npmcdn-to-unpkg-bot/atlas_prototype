(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelection', {
            templateUrl: 'modules/data-selection/components/data-selection/data-selection.html',
            bindings: {
                state: '='
            },
            controller: DpDataSelectionController,
            controllerAs: 'vm'
        });

    DpDataSelectionController.$inject = ['$scope', 'dataSelectionApi'];

    function DpDataSelectionController ($scope, dataSelectionApi) {
        var vm = this;

        $scope.$watch('state', fetchData);

        function fetchData () {
            console.log('fetchDtaa?');
            vm.isLoading = true;

            dataSelectionApi.query(vm.state.dataset, vm.state.filters).then(function (data) {
                vm.availableFilters = data.filters;
                vm.tableData = data.tableData;

                vm.isLoading = false;
            });
        }
    }
})();