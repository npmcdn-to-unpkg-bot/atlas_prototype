(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('MEASURE_CONFIG', {
            position: 'bottomleft',
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: null,
            primaryAreaUnit: 'sqmeters',
            activeColor: '#f00000',
            completedColor: '#f00000',
            localization: 'nl'
        });
})();