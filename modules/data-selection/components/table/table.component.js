(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionTable', {
            bindings: {
                content: '='
            },
            templateUrl: 'modules/data-selection/components/table/table.html',
            controller: DpDataSelectionTableController,
            controllerAs: 'vm'
        });

    function DpDataSelectionTableController() {
        var vm = this;

        vm.dpLog = function(text) {
            console.log(text);
        };
    }
})();
