(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('_dpActiveOverlays', {
            bindings: {
                overlays: '=',
                zoom: '=',
                showActiveOverlays: '='
            },
            templateUrl: 'modules/map/components/active-overlays/active-overlays.html',
            controller: DpActiveOverlaysController,
            controllerAs: 'vm'
        });

    DpActiveOverlaysController.$inject = [];

    function DpActiveOverlaysController () {
        //var vm = this;


    }
})();