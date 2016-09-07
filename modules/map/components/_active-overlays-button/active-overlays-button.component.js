(function () {
    angular
        .module('dpMap')
        .component('dpActiveOverlaysButton', {
            bindings: {
                overlays: '=',
                zoom: '=',
                showActiveOverlays: '='
            },
            templateUrl: 'modules/map/components/active-overlays-button/active-overlays-button.html',
            controller: DpActiveOverlaysButtonController,
            controllerAs: 'vm'
        });

    DpActiveOverlaysButtonController.$inject = ['$scope', 'store', 'ACTIONS', 'OVERLAYS'];

    function DpActiveOverlaysButtonController ($scope, store, ACTIONS, OVERLAYS) {
        var vm = this;

        vm.toggleActiveOverlays = function () {
            store.dispatch({
                type: vm.showActiveOverlays ? ACTIONS.HIDE_ACTIVE_OVERLAYS : ACTIONS.SHOW_ACTIVE_OVERLAYS
            });
        };

        $scope.$watchCollection(function () {
            return [vm.overlays, vm.showActiveOverlays];
        }, function () {
            var numberOfShownOverlays,
                numberOfActiveOverlays;

            numberOfShownOverlays = vm.overlays.filter(function (overlay) {
                return overlay.isVisible && isVisibleAtCurrentZoom(overlay.id, vm.zoom);
            }).length;
            numberOfActiveOverlays = vm.overlays.length;


            vm.buttonText = !vm.showActiveOverlays ? 'Toon' : 'Verberg';
            vm.buttonText += ' actieve kaartlagen';

            if (numberOfActiveOverlays) {
                vm.buttonText += ' (';

                if (numberOfShownOverlays !== numberOfActiveOverlays) {
                    vm.buttonText += numberOfShownOverlays + '/';
                }

                vm.buttonText += numberOfActiveOverlays + ')';
            }
        });

        function isVisibleAtCurrentZoom (overlay, zoom) {
            return zoom >= OVERLAYS.SOURCES[overlay].minZoom && zoom <= OVERLAYS.SOURCES[overlay].maxZoom;
        }
    }
})();
