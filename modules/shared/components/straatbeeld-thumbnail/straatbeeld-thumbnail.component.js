(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpStraatbeeldThumbnail', {
            bindings: {
                location: '='
            },
            templateUrl: 'modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.html',
            controller: AtlasStraatbeeldThumbnailController,
            controllerAs: 'vm'
        });

    AtlasStraatbeeldThumbnailController.$inject = ['sharedConfig', 'api', 'store', 'ACTIONS'];

    function AtlasStraatbeeldThumbnailController (sharedConfig, api, store, ACTIONS) {
        var vm = this,
            url;

        vm.hasStraatbeeld = null;
        vm.isLoading = true;

        url = sharedConfig.STRAATBEELD_THUMB_URL +
            '?lat=' + vm.location[0] +
            '&lon=' + vm.location[1] +
            '&width=240' +
            '&radius=' + sharedConfig.STRAATBEELD_SEARCH_RADIUS;

        api.getByUrl(url).then(function (thumbnailData) {
            if (angular.isObject(thumbnailData)) {
                vm.imageUrl = thumbnailData.url;

                vm.hasStraatbeeld = true;
            } else {
                vm.hasStraatbeeld = false;
            }

            vm.isLoading = false;
        });

        vm.openStraatbeeld = function () {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: vm.location
            });
        };
    }
})();