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
                store: '=',
                type: '@',
                payload: '='
            }
        });

    DpLinkController.$inject = ['ACTIONS'];

    function DpLinkController (ACTIONS) {
        var vm = this;

        vm.followLink = function (event) {
            event.preventDefault();

            vm.store.dispatch({
                type: ACTIONS[vm.type],
                payload: vm.payload
            });
        };
    }
})();