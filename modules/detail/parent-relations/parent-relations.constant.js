(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .constant('PARENT_RELATIONS_CONFIG', [
      'stadsdeel',
      'buurtcombinatie',
      'buurt',
      'bouwblok'
    ]);
})();
