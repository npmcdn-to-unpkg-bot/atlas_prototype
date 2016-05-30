(function () {
    angular
        .module('atlas')
        .component('dpStraatbeeld', {
            templateUrl: 'components/sidebar/straatbeeld/straatbeeld.html',
            controller: dpStraatbeeldController,
            controllerAs: 'vm'
        });

    dpStraatbeeldController.$inject = ['store'];

    function dpStraatbeeldController (store) {
        var vm = this;

        vm.id = store.getState().straatbeeld.id;
        vm.heading = store.getState().straatbeeld.heading;
    }
})();