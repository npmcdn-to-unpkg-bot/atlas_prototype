(function () {
    'use strict';

    angular
        .module('atlas')
        .component('dpLink', {
            templateUrl: 'application-state/link/link.html',
            transclude: true,
            controller: DpLinkController,
            controllerAs: 'vm',
            bindings: {
                type: '@',
                payload: '='
            }
        });

    DpLinkController.$inject = ['store'];

    function DpLinkController (store) {
        var vm = this;

        //Todo: zet de ng-href, en update deze als de store.getState() veranderd
        vm.href = 'http://www.example.com/';

        vm.followLink = function (event) {
            event.preventDefault();

            store.dispatch({
                type: vm.type,
                payload: vm.payload
            });
        };

    }
})();