(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .constant('SEARCH_CONFIG', {
            QUERY_ENDPOINTS: [
                {
                    slug: 'adres',
                    label_singular: 'Adres',
                    label_plural: 'Adressen',
                    uri: 'atlas/search/adres/'
                }, {
                    slug: 'subject',
                    label_singular: 'Kadastraal subject',
                    label_plural: 'Kadastrale subjecten',
                    uri: 'atlas/search/kadastraalsubject/'
                }, {
                    slug: 'object',
                    label_singular: 'Kadastraal object',
                    label_plural: 'Kadastrale objecten',
                    uri: 'atlas/search/kadastraalobject/'
                }, {
                    slug: 'openbareruimte',
                    label_singular: 'Openbare ruimte',
                    label_plural: 'Openbare ruimtes',
                    uri: 'atlas/search/openbareruimte/'
                }, {
                    slug: 'meetbouten',
                    label_singular: 'Meetbout',
                    label_plural: 'Meetbouten',
                    uri: 'meetbouten/search/'
                }, {
                    slug: 'bouwblokken',
                    label_singular: 'Bouwblok',
                    label_plural: 'Bouwblokken',
                    uri: 'atlas/search/bouwblok/'
                }
            ],
            COORDINATES_ENDPOINTS: [
                {
                    uri: 'geosearch/nap/',
                    radius: 25
                }, {
                    uri: 'geosearch/atlas/',
                    radius: null
                }
            ],
            COORDINATES_HIERARCHY: [
                {
                    label: 'Pand',
                    features: ['bag/pand']
                }, {
                    label: 'Standplaats',
                    features: ['bag/standplaats']
                }, {
                    label: 'Ligplaats',
                    features: ['bag/ligplaats']
                }, {
                    label: 'Openbare ruimte',
                    features: ['bag/openbareruimte']
                }, {
                    label: 'Kadastraal object',
                    features: ['kadaster/kadastraal_object']
                }, {
                    label: 'Gebieden',
                    features: [
                        'gebieden/stadsdeel',
                        'gebieden/gebiedsgerichtwerken',
                        'gebieden/grootstedelijkgebied',
                        'gebieden/buurtcombinatie',
                        'gebieden/buurt',
                        'gebieden/bouwblok',
                        'gebieden/unesco'
                    ]
                }, {
                    label: 'Gemeentelijke beperking',
                    features: ['wkpb/beperking']
                }, {
                    label: 'Meetbouten',
                    features: ['meetbouten/meetbout']
                }, {
                    label: 'NAP Peilmerken',
                    features: ['nap/peilmerk']
                }
            ]
        });
})();