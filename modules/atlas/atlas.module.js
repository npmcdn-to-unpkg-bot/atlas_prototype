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

            'dpShared'
        ]);
})();