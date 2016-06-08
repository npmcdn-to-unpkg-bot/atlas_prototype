(function () {
    angular
        .module('dpStraatbeeld')
        .component('dpStraatbeeld', {
            bindings: {
                id: '=',
                camera: '=',
                isLoading: '=',
                store: '='
            },
            templateUrl: 'modules/straatbeeld/components/straatbeeld/straatbeeld.html',
            controller: DpStraatbeeldController,
            controllerAs: 'vm'
        });

    DpStraatbeeldController.$inject = [];

    function DpStraatbeeldController () {
        var vm = this;

        vm.changeHeading = function () {
            var randomHeading = Math.floor(Math.random() * 360);

            vm.store.dispatch({
                type: 'STRAATBEELD_SET_HEADING',
                payload: randomHeading
            });
        };

        vm.changePitch = function () {
            var randomPitch = Math.random() * 2 - 1;

            vm.store.dispatch({
                type: 'STRAATBEELD_SET_PITCH',
                payload: randomPitch
            });
        };

        vm.changeFov = function () {
            var randomFov = Math.random() * (180 - 45) + 45;

            vm.store.dispatch({
                type: 'STRAATBEELD_SET_FOV',
                payload: randomFov
            });
        };
    }
})();