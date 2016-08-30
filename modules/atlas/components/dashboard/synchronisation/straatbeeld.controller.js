(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('StraatbeeldController', StraatbeeldController);

    StraatbeeldController.$inject = ['store'];

    function StraatbeeldController (store) {
        var vm = this;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();
//console.log(state.straatbeeld);
            vm.straatbeeldState = state.straatbeeld;
        }
    }
})();