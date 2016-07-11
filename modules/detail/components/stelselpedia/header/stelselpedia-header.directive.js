(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasStelselpediaHeader', atlasStelselpediaHeaderDirective);

    function atlasStelselpediaHeaderDirective () {
        return {
            restrict: 'E',
            scope: {
                heading: '@',
                definition: '@',
                usePlural: '=',
                metaData: '=',
                brk: '='
            },
            templateUrl: 'modules/detail/components/stelselpedia/header/stelselpedia-header.html',
            transclude: true,
            controller: AtlasStelselpediaHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    AtlasStelselpediaHeaderController.$inject = ['$sce', 'STELSELPEDIA'];

    function AtlasStelselpediaHeaderController ($sce, STELSELPEDIA) {
        var vm = this,
            isVisible = {};

        vm.htmlHeading = $sce.trustAsHtml(vm.heading);

        vm.stelselpedia = STELSELPEDIA.DEFINITIONS[vm.definition];
        vm.stelselpedia.label = vm.usePlural ? vm.stelselpedia.label_plural : vm.stelselpedia.label_singular;

        vm.hasMetaData = angular.isDefined(vm.metaData);

        vm.toggle = function (item) {
            isVisible[item] = !isVisible[item];
        };

        vm.isVisible = function (item) {
            return isVisible[item];
        };
    }
})();
