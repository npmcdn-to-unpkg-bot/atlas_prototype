(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .directive('atlasDropdownMenu', atlasMenuDirective);

    function atlasMenuDirective() {
        return {
            restrict: 'E',
            scope: {
                label: '@'
            },
            transclude: true,
            templateUrl: 'modules/header/components/menu/menu.html',
            link: linkFunction
        };
    }

    function linkFunction (scope, element){
        var everywhere = angular.element(window.document);

        scope.isVisible = false;

        scope.toggleDropdown = function() {
            scope.isVisible = !scope.isVisible;
        };

        everywhere.bind('click', function(event){
            var isButtonClick = event.target === element.find('button')[0];

            if (!isButtonClick){
                scope.isVisible = false;
            }

            scope.$apply();
        });
    }
})();