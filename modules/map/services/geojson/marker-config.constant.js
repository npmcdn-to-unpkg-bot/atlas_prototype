(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('MARKER_CONFIG', {
            search: {
                iconUrl: 'assets/icon-search.png',
                iconSize: [30, 48],
                iconAnchor: [15, 51]
            },
            detail: {
                iconUrl: 'assets/icon-detail.png',
                iconSize: [16, 16]
                //iconAnchor
            }
        });
})();