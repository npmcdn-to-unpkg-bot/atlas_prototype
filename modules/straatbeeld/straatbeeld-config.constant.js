(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .constant('STRAATBEELD_CONFIG', {
            DEFAULT_FOV: 80,
            MAX_FOV: 120,
            MAX_RESOLUTION: 16 * 1024,
            RESOLUTION_LEVELS: [
                {
                    tileSize:512,
                    size:512
                }, {
                    tileSize:512,
                    size:1024
                }, {
                    tileSize:512,
                    size:2048
                }
            ],
            HOTSPOT_PERSPECTIVE: {
                perspective: {
                    radius: 750,
                    extraRotations: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                }
            }
        });
})();
