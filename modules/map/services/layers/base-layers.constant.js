(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('BASE_LAYERS', {
            TEMPLATES: {
                topografie: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/topo_RD/EPSG28992/{z}/{x}/{y}.png',
                luchtfoto_2015: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2015_RD/EPSG28992/{z}/{x}/{y}.jpeg',
                luchtfoto_2014: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2014_RD/EPSG28992/{z}/{x}/{y}.jpeg',
                luchtfoto_2013: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2013_RD/EPSG28992/{z}/{x}/{y}.jpeg',
                luchtfoto_2012: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2012_RD/EPSG28992/{z}/{x}/{y}.jpeg',
                luchtfoto_2011: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2011_RD/EPSG28992/{z}/{x}/{y}.jpeg'
            },
            OPTIONS: {
                minZoom: 8,
                maxZoom: 16,
                tms: true
            }
        });
})();
