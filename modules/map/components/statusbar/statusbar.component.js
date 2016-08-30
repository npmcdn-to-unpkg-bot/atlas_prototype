(function() {
    'use strict';

    angular
        .module('dpMap')
        .component('dpMapStatusbar', {
            transclude: true,
            templateUrl: 'modules/map/components/statusbar/statusbar.html',
        });

})();
