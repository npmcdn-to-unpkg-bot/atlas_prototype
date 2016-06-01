(function () {
    angular
        .module('atlas')
        .component('dpStraatbeeld', {
            templateUrl: 'modules/atlas/prototype/components/straatbeeld/straatbeeld.html',
            controller: dpStraatbeeldController,
            controllerAs: 'vm'
        });

    dpStraatbeeldController.$inject = ['store'];

    function dpStraatbeeldController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            vm.straatbeeld = store.getState().straatbeeld;
        }

        vm.changeHeading = function () {
            var randomHeading = Math.floor(Math.random() * 360);

            store.dispatch({
                type: 'STRAATBEELD_SET_HEADING',
                payload: randomHeading
            });
        };

        vm.changePitch = function () {
            var randomPitch = Math.random() * 2 - 1;

            store.dispatch({
                type: 'STRAATBEELD_SET_PITCH',
                payload: randomPitch
            });
        };

        vm.changeFov = function () {
            var randomFov = Math.random() * (180 - 45) + 45;

            store.dispatch({
                type: 'STRAATBEELD_SET_FOV',
                payload: randomFov
            });
        };
    }
})();