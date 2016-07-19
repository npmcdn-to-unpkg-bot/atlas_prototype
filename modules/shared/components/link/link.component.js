(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLink', {
            templateUrl: 'modules/shared/components/link/link.html',
            transclude: true,
            controller: DpLinkController,
            controllerAs: 'vm',
            bindings: {
                type: '@',
                payload: '='
            }
        });

    DpLinkController.$inject = ['store', 'ACTIONS'];

    function DpLinkController (store, ACTIONS) {
        var vm = this;
        console.log(vm.payload);
        vm.followLink = function () {
            store.dispatch({
                type: ACTIONS[vm.type],
                payload: vm.payload
            });
        };
    }
})();