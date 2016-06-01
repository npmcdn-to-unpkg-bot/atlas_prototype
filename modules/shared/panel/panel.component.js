(function () {
    'use strict';

    angular
        .module('atlas')
        .component('dpPanel', {
            bindings: {
                heading: '@'
            },
            templateUrl: 'modules/shared/panel/panel.html',
            transclude: true,
            controller: DpPanelController,
            controllerAs: 'vm'
        });

    function DpPanelController () {
        var vm = this;
    }
})();