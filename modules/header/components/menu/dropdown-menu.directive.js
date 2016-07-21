/*                                                                          *
 * <share-and-extras/> This directive will add a linkbutton to the element. *
 *                                                                          *
 * When clicked on the element a menu will be activated                     *
 * Attributes:                                                              *
 * menu-items: print,save,measure,share                                     *
 *                                                                          */
(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .directive('atlasDropdownMenu', atlasDropdownMenu);

    function atlasDropdownMenu() {
        var directive = {
            restrict: 'E',
            scope: {
                template: '=template',
            },
            replace: true,
            templateUrl: function(element, attrs) {
                return 'modules/header/components/menu/templates/'+attrs.template+'.html';
            },
            link: linkFunction
        };
        return directive;
    }

    function linkFunction(scope) {
        scope.visible = true;

        console.log(scope);
    }

})();

