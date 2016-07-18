(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .filter('dpYesno', dpYesNoFilter);

    function dpYesNoFilter () {
        return function (bool) {
            if (bool === true) {
                return 'Ja';
            } else if (bool === false) {
                return 'Nee';
            } else {
                return '';
            }
        };
    }
})();
