(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .component('atlasStraatbeeldThumbnail', {
            bindings: {
                location: '='
            },
            templateUrl: 'modules/detail/components/straatbeeld-thumbnail/straatbeeld-thumbnail.html',
            controller: AtlasStraatbeeldThumbnailController,
            controllerAs: 'vm'
        });

    AtlasStraatbeeldThumbnailController.$inject = ['detailConfig'];

    function AtlasStraatbeeldThumbnailController (detailConfig) {
        var vm = this;

        vm.imageUrl = detailConfig.STRAATBEELD_THUMB_URL +
            '?lat=' + vm.location[0] +
            '&lon=' + vm.location[1] +
            '&width=240&height=135';
    }
})();