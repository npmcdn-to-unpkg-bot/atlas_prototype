(function () {
    'use strict';

    angular
        .module('atlas')
        .component('dpPanel', {
            bindings: {
                heading: '@',
                isActive: '='
            },
            templateUrl: 'components/ui/panel/panel.html',
            transclude: true,
            controller: DpPanelController,
            controllerAs: 'vm'
        });

    function DpPanelController () {
        var vm = this;
        console.log(vm.isActive);
    }
})();