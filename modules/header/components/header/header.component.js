(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .component('atlasHeader', {
            bindings: {
                query: '@'
            },
            templateUrl: 'modules/header/components/header/header.html',
            controller: AtlasHeaderController,
            controllerAs: 'vm'
        });

    AtlasHeaderController.$inject = ['store', 'ACTIONS'];

    function AtlasHeaderController (store, ACTIONS) {
        var vm = this;
        vm.isVisible = true;

        vm.showPage = function (name) {
            store.dispatch({
                type: ACTIONS.SHOW_PAGE,
                payload: name
            });
        };

        vm.toggle = function() {
            vm.isVisible = !vm.isVisible;
            console.log('hier?');
        };
    }
})();


