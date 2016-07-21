(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .constant('SEARCH_CONFIG', {
            ENDPOINTS: [
                {
                    slug: 'adres',
                    label: 'Adressen',
                    uri: 'atlas/search/adres/'
                }, {
                    slug: 'subject',
                    label: 'Kadastrale subjecten',
                    uri: 'atlas/search/kadastraalsubject/'
                }, {
                    slug: 'object',
                    label: 'Kadastrale objecten',
                    uri: 'atlas/search/kadastraalobject/'
                }, {
                    slug: 'openbareruimte',
                    label: 'Openbare ruimtes',
                    uri: 'atlas/search/openbareruimte/'
                }, {
                    slug: 'meetbouten',
                    label: 'Meetbouten',
                    uri: 'meetbouten/search/'
                }, {
                    slug: 'bouwblokken',
                    label: 'Bouwblokken',
                    uri: 'atlas/search/bouwblok/'
                }
            ]
        });
})();
