(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionFilters', {
            bindings: {
                availableFilters: '=',
                activeFilters: '='
            },
            templateUrl: 'modules/data-selection/components/data-selection-filters/data-selection-filters.html',
            controller: DpDataSelectionFilterController,
            controllerAs: 'vm'
        });

    DpDataSelectionFilterController.$inject = [];

    function DpDataSelectionFilterController () {
        //var vm = this;
    }
})();