(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .directive('atlasDropdownMenu', atlasDropdownMenuDirective);

    function atlasDropdownMenuDirective() {
        return {
            restrict: 'E',
            scope: {
                label: '@',
            },
            transclude: true,
            templateUrl:'modules/header/components/menu/dropdown-menu.html',
            link: linkFunction
        };
    }

    function linkFunction(scope, element){
        scope.isVisible = false;

        scope.toggle = function() {
            scope.isVisible = !scope.isVisible;
        };

        var everywhere = angular.element(window.document);

        everywhere.bind('click', function(event){
            var isButtonClick = event.target === element.find('button')[0];

            if(!isButtonClick){
                scope.isVisible = false;
            }

            scope.$apply();
        });
    }
})();