(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('MEASURE_CONFIG', {
            position: 'bottomleft',
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: null,
            primaryAreaUnit: 'sqmeters',
            activeColor: '#333',
            completedColor: '#333',
            localization: 'nl'
        });
})();