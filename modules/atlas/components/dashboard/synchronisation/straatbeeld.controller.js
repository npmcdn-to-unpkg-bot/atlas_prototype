(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('StraatbeeldController', AtlasHeaderController);

    AtlasHeaderController.$inject = ['store'];

    function AtlasHeaderController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();


        }
    }
})();