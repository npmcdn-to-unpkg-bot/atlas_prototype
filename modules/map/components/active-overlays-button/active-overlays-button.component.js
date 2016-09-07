(function () {
    angular
        .module('dpMap')
        .component('dpActiveOverlaysButton', {
            bindings: {
                overlays: '=',
                showActiveOverlays: '='
            },
            templateUrl: 'modules/map/components/active-overlays-button/active-overlays-button.html',
            controller: DpActiveOverlaysButtonController,
            controllerAs: 'vm'
        });

    DpActiveOverlaysButtonController.$inject = ['$scope'];

    function DpActiveOverlaysButtonController ($scope) {
        var vm = this;

        $scope.$watchCollection(function () {
            return [vm.overlays, vm.showActiveOverlays];
        }, setButtonVisibility);

        function setButtonVisibility () {
            vm.hasShowActiveOverlaysButton = vm.overlays.length > 0 && !vm.showActiveOverlays;
            vm.hasHideActiveOverlaysButton = vm.overlays.length > 0 && vm.showActiveOverlays;

            vm.hasShowLayerSelectionButton = vm.overlays.length === 0;
            console.log(vm);
        }
    }
})();
