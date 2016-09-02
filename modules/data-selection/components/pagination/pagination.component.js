(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionPagination', {
            bindings: {
                currentPage: '=',
                numberOfPages: '='
            },
            templateUrl: 'modules/data-selection/components/pagination/pagination.html',
            controller: DpDataSelectionPaginationController,
            controllerAs: 'vm'
        });

    DpDataSelectionPaginationController.$inject = ['store', 'ACTIONS'];

    function DpDataSelectionPaginationController (store, ACTIONS) {
        var vm = this,
            isFirstPage,
            isLastPage;

        isFirstPage = vm.currentPage === 1;
        isLastPage = vm.currentPage === vm.numberOfPages;

        vm.showPagination = vm.numberOfPages > 1;

        if (vm.showPagination) {
            vm.firstPage = {
                label: 'Eerste',
                page: 1,
                disabled: isFirstPage
            };

            vm.previousPage = {
                label: 'Vorige',
                page: isFirstPage ? null : vm.currentPage - 1,
                disabled: isFirstPage
            };

            vm.nextPage = {
                label: 'Volgende',
                page: isLastPage ? null : vm.currentPage + 1,
                disabled: isLastPage
            };

            vm.lastPage = {
                label: 'Laatste',
                page: vm.numberOfPages,
                disabled: isLastPage
            };
        }

        vm.goToPage = function (event) {
            event.preventDefault();

            store.dispatch({
                type: ACTIONS.NAVIGATE_DATA_SELECTION,
                payload: vm.targetPage
            });
        };
    }
})();