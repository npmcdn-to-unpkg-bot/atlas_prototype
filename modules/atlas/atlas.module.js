(function () {
    'use strict';

    angular
        .module('atlas', [
            'atlasHeader',
            'atlasPage',
            'atlasDetail',
            'atlasSearchResults',
            'atlasLayerSelection',

            //Todo: Move dp (datapunt) modules to their own repositories
            'dpMap',
            'dpStraatbeeld',

            //This atlas module uses dpShared directly because the constant with Redux ACTIONS is defined there
            'dpShared'
        ]);
})();