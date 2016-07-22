(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .filter('yesNo', yesNoFilter);

    function yesNoFilter () {
        return function (input) {
            if (input === true) {
                return 'Ja';
            } else if (input === false) {
                return 'Nee';
            } else {
                return '';
            }
        };
    }
})();
