(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .constant('SEARCH_CONFIG', {
            ENDPOINTS: [
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
            ]
        });
})();
