(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('ICON_CONFIG', {
            search: {
                iconUrl: 'assets/icon-search.png',
                iconRetinaUrl: 'assets/icon-search-retina.png',
                iconSize: [30, 48],
                iconAnchor: [15, 51]
            },
            detail: {
                iconUrl: 'assets/icon-detail.png',
                iconRetinaUrl: 'assets/icon-detail-retina.png',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            },
            straatbeeld_orientation: {
                iconUrl: 'assets/icon-straatbeeld-orientation.png',
                iconRetinaUrl: 'assets/icon-straatbeeld-orientation-retina.png',
                iconSize: [62, 62],
                iconAnchor: [31, 31]
            },
            straatbeeld_person: {
                iconUrl: 'assets/icon-straatbeeld-person.png',
                iconRetinaUrl: 'assets/icon-straatbeeld-person-retina.png',
                iconSize: [18, 31],
                iconAnchor: [9, 22]
            }
        });
})();