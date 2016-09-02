(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionFilters', {
            bindings: {
                dataset: '@',
                availableFilters: '=',
                activeFilters: '='
            },
            templateUrl: 'modules/data-selection/components/data-selection-filters/data-selection-filters.html',
            controller: DpDataSelectionFilterController,
            controllerAs: 'vm'
        });

    DpDataSelectionFilterController.$inject = ['store', 'ACTIONS', 'DATA_SELECTION_CONFIG'];

    function DpDataSelectionFilterController (store, ACTIONS, DATA_SELECTION_CONFIG) {
        var vm = this;

        vm.formattedActiveFilters = DATA_SELECTION_CONFIG[vm.dataset].FILTERS.filter(function (filter) {
            return angular.isString(vm.activeFilters[filter.slug]);
        }).map(function (filter) {
            return {
                categorySlug: filter.slug,
                categoryLabel: filter.label,
                option: vm.activeFilters[filter.slug]
            };
        });

        vm.isFilterActive = function (categorySlug, filterLabel) {
            return vm.activeFilters[categorySlug] === filterLabel;
        };

        vm.addFilter = function (categorySlug, filterLabel) {
            var filters = angular.copy(vm.activeFilters);

            filters[categorySlug] = filterLabel;

            applyFilters(filters);
        };

        vm.removeFilter = function (categorySlug) {
            var filters = angular.copy(vm.activeFilters);

            delete filters[categorySlug];

            applyFilters(filters);
        };

        function applyFilters (filters) {
            store.dispatch({
                type: ACTIONS.SHOW_DATA_SELECTION,
                payload: {
                    dataset: vm.dataset,
                    filters: filters,
                    page: 1
                }
            });
        }
    }
})();