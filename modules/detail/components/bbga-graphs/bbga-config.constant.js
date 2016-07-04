(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .constant('BBGA_CONFIG', {
      PERSONEN: [
        {
          variable: 'BEVPAARMKINDHH_P',
          compareWithAmsterdam: true
        },
        {
          variable: 'BEV65PLUS_P',
          compareWithAmsterdam: true
        },
        {
          variable: 'BEVOVNW_P',
          compareWithAmsterdam: true
        }
      ],
      HUIZEN: [
        {
          variable: 'WKOOP_P',
          compareWithAmsterdam: false
        },
        {
          variable: 'WCORHUUR_P',
          compareWithAmsterdam: false
        },
        {
          variable: 'WPARTHUUR_P',
          compareWithAmsterdam: false
        },
        {
          variable: 'WWOZ_M2',
          compareWithAmsterdam: true
        }
      ],
      TEVREDENHEID: [
        {
          variable: 'LBUURT_R',
          compareWithAmsterdam: true
        },
        {
          variable: 'WWONING_R',
          compareWithAmsterdam: true
        },
        {
          variable: 'VKPARKEREN_R',
          compareWithAmsterdam: true
        },
        {
          variable: 'ORSCHOONSTRATEN_R',
          compareWithAmsterdam: true
        },
        {
          variable: 'LBETROKKEN_R',
          compareWithAmsterdam: true
        }
      ]
    });
})();
