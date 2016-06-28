(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('BASE_LAYERS', [
            {
                slug: 'topografie',
                label: 'Topografie',
                urlTemplate: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/topo_RD/EPSG28992/{z}/{x}/{y}.png'
            }, {
                slug: 'luchtfoto_2015',
                label: 'Luchtfoto 2015',
                urlTemplate: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2015_RD/EPSG28992/{z}/{x}/{y}.jpeg'
            }, {
                slug: 'luchtfoto_2014',
                label: 'Luchtfoto 2014',
                urlTemplate: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2014_RD/EPSG28992/{z}/{x}/{y}.jpeg'
            }, {
                slug: 'luchtfoto_2013',
                label: 'Luchtfoto 2013',
                urlTemplate: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2013_RD/EPSG28992/{z}/{x}/{y}.jpeg'
            }, {
                slug: 'luchtfoto_2012',
                label: 'Luchtfoto 2012',
                urlTemplate: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2012_RD/EPSG28992/{z}/{x}/{y}.jpeg'
            }, {
                slug: 'luchtfoto_2011',
                label: 'Luchtfoto 2011',
                urlTemplate: 'https://{s}.datapunt.amsterdam.nl/tms/1.0.0/lufo2011_RD/EPSG28992/{z}/{x}/{y}.jpeg'
            }
        ]);
})();
