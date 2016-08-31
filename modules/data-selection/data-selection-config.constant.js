(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .constant('DATA_SELECTION_CONFIG', {
            bag: {
                filters: [
                    {
                        slug: 'stadsdeel',
                        label: 'Stadsdeel'
                    },
                    {
                        slug: 'buurtcombinatie',
                        label: 'Buurtcombinatie'
                    },
                    {
                        slug: 'buurt',
                        label: 'Buurt'
                    }
                ],
                fields: [
                    {
                        slug: 'stadsdeel_naam',
                        label: 'Stadsdeel'
                    },
                    {
                        slug: '_openbare_ruimte_naam',
                        label: 'Straatnaam'
                    },
                    {
                        slug: 'huisnummer',
                        label: 'Huisnummer'
                    },
                    {
                        slug: 'huisnummer_toevoeging',
                        label: 'Toevoeging'
                    },
                    {
                        slug: 'huisletter',
                        label: 'Huisletter'
                    }
                ]
            }
        });
})();