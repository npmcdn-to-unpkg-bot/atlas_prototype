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

    function DpDataSelectionController () {
        //var vm = this;
    }
})();