(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .component('dpStraatbeeldMetadata', {
            bindings: {
                date: '=',
                location: '='
            },
            templateUrl: 'modules/straatbeeld/components/metadata/metadata.html',
            controllerAs: 'vm'
        });
})();