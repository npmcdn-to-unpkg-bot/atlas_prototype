(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpStraatbeeldThumbnail', {
            bindings: {
                location: '='
            },
            templateUrl: 'modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.html',
            controller: DpStraatbeeldThumbnailController,
            controllerAs: 'vm'
        });

    DpStraatbeeldThumbnailController.$inject = ['detailConfig'];

    function DpStraatbeeldThumbnailController (detailConfig) {
        var vm = this;

        vm.imageUrl = detailConfig.STRAATBEELD_THUMB_URL +
            '?lat=' + vm.location[0] +
            '&lon=' + vm.location[1] +
            '&width=240&height=135';
    }
})();