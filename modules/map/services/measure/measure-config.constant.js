(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('MEASURE_CONFIG', {
            position: 'bottomright',
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: null,
            primaryAreaUnit: 'sqmeters',
            activeColor: '#333',
            completedColor: '#333',
            localization: 'nl'
        });
})();