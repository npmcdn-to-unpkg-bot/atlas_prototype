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
                    label_singular: 'Pand',
                    label_plural: 'Panden',
                    features: ['bag/pand']
                }, {
                    label_singular: 'Standplaats',
                    label_plural: 'Standplaatsen',
                    features: ['bag/standplaats']
                }, {
                    label_singular: 'Ligplaats',
                    label_plural: 'Ligplaatsen',
                    features: ['bag/ligplaats']
                }, {
                    label_singular: 'Openbare ruimte',
                    label_plural: 'Openbare ruimtes',
                    features: ['bag/openbareruimte']
                }, {
                    label_singular: 'Kadastraal object',
                    label_plural: 'Kadastrale objecten',
                    features: ['kadaster/kadastraal_object']
                }, {
                    label_singular: 'Gebied',
                    label_plural: 'Gebieden',
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
                    label_singular: 'Gemeentelijke beperking',
                    label_plural: 'Gemeentelijke beperkingen',
                    features: ['wkpb/beperking']
                }, {
                    label_singular: 'Meetbout',
                    label_plural: 'Meetbouten',
                    features: ['meetbouten/meetbout']
                }, {
                    label_singular: 'NAP Peilmerk',
                    label_plural: 'NAP Peilmerken',
                    features: ['nap/peilmerk']
                }
            ]
        });
})();