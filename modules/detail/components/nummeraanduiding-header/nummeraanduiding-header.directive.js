(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('dpNummeraanduidingHeader', dpNummeraanduidingHeaderDirective);

    /*
     * @description
     * When a verblijfsobject has the status 'Verblijfsobject gevormd'; show the heading in italic and show a red status
     * badge. Show a blue badge when this address is a nevenadres.
     */
    function dpNummeraanduidingHeaderDirective () {
        return {
            restrict: 'E',
            scope: {
                heading: '@',
                metaData: '=',
                hoofdadres: '=',
                verblijfsobject: '='
            },
            templateUrl: 'modules/detail/components/nummeraanduiding-header/nummeraanduiding-header.html',
            controller: DpNummeraanduidingHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function DpNummeraanduidingHeaderController () {
        var vm = this;

        vm.isGevormd = Number(vm.verblijfsobject.status.code) === 18;

        if (vm.isGevormd) {
            vm.headingHtml = '<em>' + vm.heading + '</em>';
        }
    }
})();
